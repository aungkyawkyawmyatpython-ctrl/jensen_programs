import { useCallback, useEffect, useRef, useState } from "react";
import { Reveal, SafeImage } from "../components/SiteElements";
import "./Calendar.css";

const CALENDAR_IMAGE = "/virya_academic_calendar_2026_2027.png";
const CALENDAR_ALT = "VIRYA Academic Calendar 2026\u20132027";

export default function Calendar() {
  const [enlarged, setEnlarged] = useState(false);
  const openButtonRef = useRef(null);
  const closeButtonRef = useRef(null);

  const closeCalendar = useCallback(() => {
    setEnlarged(false);
    window.requestAnimationFrame(() => openButtonRef.current?.focus());
  }, []);

  useEffect(() => {
    if (!enlarged) return undefined;

    const previousOverflow = document.body.style.overflow;
    const handleKeyDown = (event) => {
      if (event.key === "Escape") closeCalendar();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);
    closeButtonRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [closeCalendar, enlarged]);

  return (
    <section className="section calendar-page" aria-labelledby="calendar-section-title">
      <div className="calendar-inner">
        <Reveal className="calendar-heading">
          <div>
            <p className="eyebrow">Academic Year</p>
            <h2 id="calendar-section-title">Academic Calendar 2026&ndash;2027</h2>
          </div>
          <p className="calendar-legend">
            <span aria-hidden="true" />
            Red = School Holiday
          </p>
        </Reveal>

        <Reveal>
          <button
            className="calendar-image-button"
            type="button"
            onClick={() => setEnlarged(true)}
            aria-haspopup="dialog"
            aria-label={`Enlarge the VIRYA Academic Calendar 2026\u20132027`}
            ref={openButtonRef}
          >
            <SafeImage src={CALENDAR_IMAGE} alt={CALENDAR_ALT} />
            <span>Tap or click to enlarge</span>
          </button>
        </Reveal>
      </div>

      {enlarged && (
        <div
          className="calendar-lightbox"
          role="dialog"
          aria-modal="true"
          aria-labelledby="calendar-lightbox-title"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) closeCalendar();
          }}
        >
          <div className="calendar-lightbox-dialog">
            <header>
              <h2 id="calendar-lightbox-title">Academic Calendar 2026&ndash;2027</h2>
              <button type="button" onClick={closeCalendar} ref={closeButtonRef}>
                Close
              </button>
            </header>
            <div className="calendar-lightbox-image">
              <SafeImage src={CALENDAR_IMAGE} alt={CALENDAR_ALT} loading="eager" />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
