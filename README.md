# Virya Private School Website

React/Vite public website with a small Node admissions API. The current API does not execute SQL; admissions inquiries are stored in a temporary JSON file so the site can be tested before the final production database is chosen.

## Before Publishing

Run these checks before uploading a new build:

```powershell
npm install
npm run lint
npm run build
npm run security:audit
```

Use `npm run dev` for the website and `npm run api` for the local admissions API during development.

## Production API Settings

Copy `.env.example` to `.env` on the server and replace every placeholder value. Do not commit real `.env` files.

Important values:

- `NODE_ENV=production`
- `ALLOWED_ORIGINS=https://your-domain.com,https://www.your-domain.com`
- `ADMIN_TOKEN=` a long random secret if staff will read applications through the API
- `DATA_DIR=` a private folder outside the website source code
- `HOST=127.0.0.1` when the API is behind Nginx/IIS/Apache, or `HOST=0.0.0.0` only when the host platform requires it

Keep HTTPS enabled on the domain. If the static host does not use `public/_headers`, configure the same security headers in the hosting dashboard or reverse proxy.

## Security Notes

The public form endpoint includes JSON-only request handling, strict body-size limits, allowed-grade validation, origin checks, rate limiting, generic duplicate-email responses, security headers, request timeouts, and atomic writes to the temporary JSON store.

SQL injection risk is currently low because runtime code does not execute SQL. If admissions data is moved to SQL Server, use parameterized queries or the supplied `dbo.CreateStudentApplication` stored procedure in `database/sql-server-schema.sql`. Never concatenate form input into SQL strings.

## Deployment Reminder

For a public domain, serve the built `dist` folder through HTTPS and proxy `/api` to the Node server. Do not expose `data/applications.json`, `.env`, source maps containing secrets, server logs, or admin tokens through the static host.