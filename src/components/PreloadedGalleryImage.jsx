import { useEffect, useState } from "react";
import { SafeImage } from "./SiteElements";

const preloadCache = new Map();

function preloadAndDecode(src) {
  if (!src) return Promise.resolve();
  if (preloadCache.has(src)) return preloadCache.get(src);

  const task = new Promise((resolve) => {
    const image = new window.Image();
    image.decoding = "async";

    image.onload = () => {
      const decodeTask =
        typeof image.decode === "function" ? image.decode() : Promise.resolve();

      decodeTask.catch(() => undefined).finally(resolve);
    };
    image.onerror = resolve;
    image.src = src;
  });

  preloadCache.set(src, task);
  return task;
}

export default function PreloadedGalleryImage({
  src,
  previousSrc,
  nextSrc,
  alt,
}) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let active = true;

    const currentTask = preloadAndDecode(src);
    void preloadAndDecode(previousSrc);
    void preloadAndDecode(nextSrc);

    currentTask.then(() => {
      if (active) setReady(true);
    });

    return () => {
      active = false;
    };
  }, [nextSrc, previousSrc, src]);

  if (!ready) {
    return (
      <div className="activity-gallery-loading" role="status">
        <span aria-hidden="true" />
        <p>Loading photo…</p>
      </div>
    );
  }

  return <SafeImage key={src} src={src} alt={alt} loading="eager" />;
}
