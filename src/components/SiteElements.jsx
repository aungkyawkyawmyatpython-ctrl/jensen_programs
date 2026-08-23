import { useEffect, useRef, useState } from "react";

const FALLBACK_IMAGE = "/DSC00001.jpg";

export function Reveal({ children, className = "", direction = "up", delay = 0 }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -70px", threshold: 0.12 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal reveal-${direction} ${visible ? "is-visible" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

export function SafeImage({ src, alt = "", className = "", loading = "lazy" }) {
  return (
    <img
      className={className}
      src={src}
      alt={alt}
      loading={loading}
      decoding="async"
      onError={(event) => {
        event.currentTarget.onerror = null;
        event.currentTarget.src = FALLBACK_IMAGE;
      }}
    />
  );
}

export function ProfilePhotoPlaceholder({
  label = "Photo Coming Soon",
  ariaLabel = "Profile photo unavailable",
  className = "",
}) {
  return (
    <div
      className={`profile-photo-placeholder ${className}`}
      role="img"
      aria-label={ariaLabel}
    >
      <span>{label}</span>
    </div>
  );
}
