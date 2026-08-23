import { createServer } from "node:http";
import { Buffer } from "node:buffer";
import { mkdir, readFile, rename, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import process from "node:process";
import crypto from "node:crypto";

const __dirname = dirname(fileURLToPath(import.meta.url));

const getNumberEnv = (name, fallback, min, max) => {
  const value = Number(process.env[name] ?? fallback);
  return Number.isFinite(value) && value >= min && value <= max ? value : fallback;
};

const dataDir = process.env.DATA_DIR || join(__dirname, "..", "data");
const dataFile = join(dataDir, "applications.json");
const bindHost = process.env.HOST || "127.0.0.1";
const port = getNumberEnv("PORT", 4174, 1, 65535);
const maxBodyBytes = getNumberEnv("MAX_BODY_BYTES", 8192, 1024, 1024 * 1024);
const maxStoredApplications = getNumberEnv("MAX_STORED_APPLICATIONS", 1000, 1, 100000);
const rateLimitMax = getNumberEnv("RATE_LIMIT_MAX", 20, 1, 10000);
const rateLimitWindowMs = getNumberEnv("RATE_LIMIT_WINDOW_MS", 60000, 1000, 60 * 60 * 1000);
const adminToken = String(process.env.ADMIN_TOKEN || "");
const isProduction = process.env.NODE_ENV === "production";
const trustProxy = process.env.TRUST_PROXY === "true";
const allowedOrigins = new Set(
  String(process.env.ALLOWED_ORIGINS || "http://127.0.0.1:5173,http://localhost:5173")
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean),
);
const rateLimitBuckets = new Map();
let applicationWriteQueue = Promise.resolve();

const allowedGrades = new Set([
  "Pre-K",
  "Kindergarten",
  "Grade 1",
  "Grade 2",
  "Grade 3",
  "Grade 4",
  "Grade 5",
  "Grade 6",
  "Grade 7",
  "Grade 8",
  "Grade 9",
]);

class HttpError extends Error {
  constructor(status, message, code = "REQUEST_ERROR") {
    super(message);
    this.status = status;
    this.code = code;
  }
}

const getAllowedOrigin = (request) => {
  const origin = request.headers.origin;
  return origin && allowedOrigins.has(origin) ? origin : "";
};

const hasBlockedOrigin = (request) => {
  const origin = request.headers.origin;
  return Boolean(origin && !allowedOrigins.has(origin));
};

const getSecurityHeaders = () => {
  const headers = {
    "Cache-Control": "no-store",
    "Content-Security-Policy": "default-src 'none'; base-uri 'none'; form-action 'none'; frame-ancestors 'none'",
    "Content-Type": "application/json",
    "Cross-Origin-Resource-Policy": "same-origin",
    "Permissions-Policy": "camera=(), microphone=(), geolocation=(), payment=()",
    "Referrer-Policy": "no-referrer",
    "Vary": "Origin",
    "X-Content-Type-Options": "nosniff",
    "X-Frame-Options": "DENY",
    "X-Permitted-Cross-Domain-Policies": "none",
  };

  if (isProduction) {
    headers["Strict-Transport-Security"] = "max-age=31536000";
  }

  return headers;
};

const jsonResponse = (request, response, status, payload, extraHeaders = {}) => {
  const headers = {
    ...getSecurityHeaders(),
    "Access-Control-Allow-Headers": "Authorization, Content-Type",
    "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
    "Access-Control-Max-Age": "600",
    ...extraHeaders,
  };

  const origin = getAllowedOrigin(request);
  if (origin) {
    headers["Access-Control-Allow-Origin"] = origin;
  }

  response.writeHead(status, headers);
  response.end(status === 204 ? undefined : JSON.stringify(payload));
};

const getClientIp = (request) => {
  if (trustProxy) {
    const forwardedFor = String(request.headers["x-forwarded-for"] || "");
    const forwardedIp = forwardedFor.split(",")[0]?.trim();
    if (forwardedIp) {
      return forwardedIp.slice(0, 64);
    }
  }

  return String(request.socket.remoteAddress || "unknown").slice(0, 64);
};

const pruneRateLimitBuckets = (now) => {
  for (const [key, bucket] of rateLimitBuckets.entries()) {
    if (bucket.resetAt <= now) {
      rateLimitBuckets.delete(key);
    }
  }
};

const checkRateLimit = (request, scope) => {
  const now = Date.now();
  if (rateLimitBuckets.size > 10000) {
    pruneRateLimitBuckets(now);
  }

  const key = `${scope}:${getClientIp(request)}`;
  const current = rateLimitBuckets.get(key);
  const bucket = current && current.resetAt > now ? current : { count: 0, resetAt: now + rateLimitWindowMs };
  bucket.count += 1;
  rateLimitBuckets.set(key, bucket);

  const resetSeconds = Math.max(1, Math.ceil((bucket.resetAt - now) / 1000));
  return {
    limited: bucket.count > rateLimitMax,
    remaining: Math.max(0, rateLimitMax - bucket.count),
    resetSeconds,
  };
};

const readJsonBody = async (request) => {
  const contentType = String(request.headers["content-type"] || "").toLowerCase();
  if (!/^application\/json(?:;|$)/.test(contentType)) {
    throw new HttpError(415, "Requests must use application/json.", "UNSUPPORTED_MEDIA_TYPE");
  }

  const contentLength = Number(request.headers["content-length"] || 0);
  if (Number.isFinite(contentLength) && contentLength > maxBodyBytes) {
    throw new HttpError(413, "Request body is too large.", "REQUEST_TOO_LARGE");
  }

  const chunks = [];
  let totalBytes = 0;

  for await (const chunk of request) {
    totalBytes += chunk.length;
    if (totalBytes > maxBodyBytes) {
      throw new HttpError(413, "Request body is too large.", "REQUEST_TOO_LARGE");
    }

    chunks.push(chunk);
  }

  const body = Buffer.concat(chunks).toString("utf8");
  if (!body) {
    throw new HttpError(400, "Request body is required.", "EMPTY_BODY");
  }

  try {
    const payload = JSON.parse(body);
    if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
      throw new HttpError(400, "Request body must be a JSON object.", "INVALID_BODY");
    }

    return payload;
  } catch (error) {
    if (error instanceof HttpError) {
      throw error;
    }

    throw new HttpError(400, "Request body must be valid JSON.", "INVALID_JSON");
  }
};

const ensureDataFile = async () => {
  await mkdir(dataDir, { recursive: true });

  try {
    await readFile(dataFile, "utf8");
  } catch {
    await writeFile(dataFile, "[]\n", { encoding: "utf8", flag: "wx" }).catch((error) => {
      if (error?.code !== "EEXIST") {
        throw error;
      }
    });
  }
};

const readApplications = async () => {
  await ensureDataFile();
  const file = await readFile(dataFile, "utf8");
  const applications = JSON.parse(file);

  if (!Array.isArray(applications)) {
    throw new Error("Application store is invalid.");
  }

  return applications;
};

const saveApplications = async (applications) => {
  const tempFile = join(dataDir, `applications.${process.pid}.${crypto.randomUUID()}.tmp`);
  await writeFile(tempFile, `${JSON.stringify(applications, null, 2)}\n`, { encoding: "utf8", flag: "wx" });
  await rename(tempFile, dataFile);
};

const createApplication = (data) => {
  const operation = applicationWriteQueue.then(async () => {
    const applications = await readApplications();
    const existingApplication = applications.find(
      (application) => String(application.email || "").toLowerCase() === data.email,
    );

    if (existingApplication) {
      return { duplicate: true };
    }

    applications.unshift(data);
    await saveApplications(applications.slice(0, maxStoredApplications));
    return { application: data };
  });

  applicationWriteQueue = operation.catch(() => undefined);
  return operation;
};

const cleanText = (value) =>
  String(value ?? "")
    .normalize("NFKC")
    .split("")
    .filter((character) => {
      const characterCode = character.charCodeAt(0);
      return characterCode > 31 && characterCode !== 127;
    })
    .join("")
    .trim();

const getBearerToken = (request) => {
  const authorization = String(request.headers.authorization || "");
  const [scheme, token] = authorization.split(" ");
  return scheme?.toLowerCase() === "bearer" ? token || "" : "";
};

const hasAdminAccess = (request) => {
  const token = getBearerToken(request);
  if (!adminToken || !token) {
    return false;
  }

  const supplied = Buffer.from(token);
  const expected = Buffer.from(adminToken);
  return supplied.length === expected.length && crypto.timingSafeEqual(supplied, expected);
};

const validateApplication = (payload) => {
  const parentName = cleanText(payload.parentName);
  const email = cleanText(payload.email).toLowerCase();
  const studentGrade = cleanText(payload.studentGrade);

  if (!parentName || parentName.length > 120) {
    return { error: "Parent name is required." };
  }

  if (/[<>]/.test(parentName)) {
    return { error: "Parent name cannot include markup characters." };
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 160) {
    return { error: "A valid email is required." };
  }

  if (!allowedGrades.has(studentGrade)) {
    return { error: "Please select a valid student grade." };
  }

  return {
    data: {
      id: crypto.randomUUID(),
      parentName,
      email,
      studentGrade,
      status: "New",
      submittedAt: new Date().toISOString(),
    },
  };
};

if (isProduction && !process.env.ALLOWED_ORIGINS) {
  console.warn("Set ALLOWED_ORIGINS to your HTTPS domain before public deployment.");
}

if (isProduction && !adminToken) {
  console.warn("Set ADMIN_TOKEN before public deployment if staff need to read applications.");
}

const server = createServer(async (request, response) => {
  try {
    if (String(request.url || "").length > 2048) {
      jsonResponse(request, response, 414, { error: "Request URL is too long.", code: "URL_TOO_LONG" });
      return;
    }

    const requestUrl = new URL(request.url || "/", "http://127.0.0.1");

    if (request.method === "OPTIONS") {
      if (hasBlockedOrigin(request)) {
        jsonResponse(request, response, 403, { error: "Origin is not allowed.", code: "ORIGIN_NOT_ALLOWED" });
        return;
      }

      jsonResponse(request, response, 204, {});
      return;
    }

    if (hasBlockedOrigin(request)) {
      jsonResponse(request, response, 403, { error: "Origin is not allowed.", code: "ORIGIN_NOT_ALLOWED" });
      return;
    }

    if (requestUrl.pathname === "/api/health") {
      if (request.method !== "GET") {
        jsonResponse(request, response, 405, { error: "Method not allowed.", code: "METHOD_NOT_ALLOWED" }, { Allow: "GET, OPTIONS" });
        return;
      }

      jsonResponse(request, response, 200, { ok: true });
      return;
    }

    if (requestUrl.pathname === "/api/applications" && request.method === "GET") {
      const rateLimit = checkRateLimit(request, "applications:admin");
      if (rateLimit.limited) {
        jsonResponse(
          request,
          response,
          429,
          { error: "Too many requests. Please try again soon.", code: "RATE_LIMITED" },
          { "Retry-After": String(rateLimit.resetSeconds) },
        );
        return;
      }

      if (!hasAdminAccess(request)) {
        jsonResponse(request, response, 401, { error: "Admin token is required.", code: "ADMIN_TOKEN_REQUIRED" });
        return;
      }

      await applicationWriteQueue.catch(() => undefined);
      const applications = await readApplications();
      jsonResponse(request, response, 200, { applications });
      return;
    }

    if (requestUrl.pathname === "/api/applications" && request.method === "POST") {
      const rateLimit = checkRateLimit(request, "applications:create");
      if (rateLimit.limited) {
        jsonResponse(
          request,
          response,
          429,
          { error: "Too many requests. Please try again soon.", code: "RATE_LIMITED" },
          { "Retry-After": String(rateLimit.resetSeconds) },
        );
        return;
      }

      const payload = await readJsonBody(request);
      const result = validateApplication(payload);

      if (result.error) {
        jsonResponse(request, response, 400, { error: result.error, code: "VALIDATION_ERROR" });
        return;
      }

      const created = await createApplication(result.data);

      if (created.duplicate) {
        jsonResponse(request, response, 202, { received: true });
        return;
      }

      jsonResponse(request, response, 201, { received: true });
      return;
    }

    if (requestUrl.pathname === "/api/applications") {
      jsonResponse(request, response, 405, { error: "Method not allowed.", code: "METHOD_NOT_ALLOWED" }, { Allow: "GET, POST, OPTIONS" });
      return;
    }

    jsonResponse(request, response, 404, { error: "Route not found.", code: "ROUTE_NOT_FOUND" });
  } catch (error) {
    if (error instanceof HttpError) {
      jsonResponse(request, response, error.status, { error: error.message, code: error.code });
      return;
    }

    console.error("Unhandled API error", error);
    jsonResponse(request, response, 500, { error: "Server error.", code: "SERVER_ERROR" });
  }
});

server.requestTimeout = 10000;
server.headersTimeout = 12000;
server.keepAliveTimeout = 5000;
server.maxHeadersCount = 64;

server.listen(port, bindHost, () => {
  console.log(`Virya admissions API running at http://${bindHost}:${port}`);
});