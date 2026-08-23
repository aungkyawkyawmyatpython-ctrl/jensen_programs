import { useEffect, useState } from "react";
import PreloadedGalleryImage from "../components/PreloadedGalleryImage";
import { Reveal, SafeImage } from "../components/SiteElements";
import { studentLifeEvents } from "../data/studentLifeEvents";
import "./StudentLife.css";

export default function StudentLife() {
  const [gallery, setGallery] = useState(null);

  useEffect(() => {
    if (!gallery) return undefined;

    const previousOverflow = document.body.style.overflow;
    const closeOnEscape = (event) => {
      if (event.key === "Escape") setGallery(null);
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", closeOnEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [gallery]);

  const openGallery = (eventIndex, imageIndex = 0) => {
    setGallery({ eventIndex, imageIndex });
  };

  const changeImage = (direction) => {
    setGallery((current) => {
      const images = studentLifeEvents[current.eventIndex].images;
      return {
        ...current,
        imageIndex: (current.imageIndex + direction + images.length) % images.length,
      };
    });
  };

  const activeEvent = gallery ? studentLifeEvents[gallery.eventIndex] : null;

  return (
    <>
      <section
        className="section student-life-experiences"
        aria-labelledby="featured-experiences-title"
      >
        <div className="student-life-inner">
          <Reveal className="student-life-heading">
            <p className="eyebrow">Student Life</p>
            <h2 id="featured-experiences-title">Featured Experiences</h2>
            <p>
              A photographic view of activities and experiences from the VIRYA
              school community.
            </p>
          </Reveal>

          <div className="experience-list">
            {studentLifeEvents.map((event, eventIndex) => (
              <article
                className={`experience-event ${eventIndex % 2 ? "experience-event-reverse" : ""}`}
                key={event.id}
              >
                <Reveal className="experience-media" direction={eventIndex % 2 ? "right" : "left"}>
                  <button
                    className="experience-cover"
                    type="button"
                    onClick={() => openGallery(eventIndex)}
                    aria-label={`View all ${event.images.length} ${event.title} photos`}
                  >
                    <SafeImage
                      src={event.images[0]}
                      alt={`${event.title} activity at VIRYA Private School`}
                      loading={eventIndex === 0 ? "eager" : "lazy"}
                    />
                    <span>View {event.images.length} photos</span>
                  </button>

                  <div className="experience-thumbnails">
                    {event.images.slice(1, 3).map((image, imageIndex) => (
                      <button
                        type="button"
                        onClick={() => openGallery(eventIndex, imageIndex + 1)}
                        aria-label={`Open ${event.title} photo ${imageIndex + 2}`}
                        key={image}
                      >
                        <SafeImage
                          src={image}
                          alt={`${event.title} activity photo ${imageIndex + 2}`}
                        />
                      </button>
                    ))}
                  </div>
                </Reveal>

                <Reveal
                  className="experience-copy"
                  direction={eventIndex % 2 ? "left" : "right"}
                >
                  {event.year && <time dateTime={event.year}>{event.year}</time>}
                  <h2>{event.title}</h2>
                  <p>{event.description}</p>
                  <button
                    className="experience-view-button"
                    type="button"
                    onClick={() => openGallery(eventIndex)}
                  >
                    View Photos <span aria-hidden="true">→</span>
                  </button>
                </Reveal>
              </article>
            ))}
          </div>
        </div>
      </section>

      {activeEvent && (
        <div className="activity-gallery-modal" role="dialog" aria-modal="true" aria-labelledby="activity-gallery-title">
          <div className="activity-gallery-dialog">
            <header>
              <div>
                <p>{activeEvent.year || "Student Life"}</p>
                <h2 id="activity-gallery-title">{activeEvent.title}</h2>
              </div>
              <button type="button" onClick={() => setGallery(null)} aria-label="Close photo gallery">
                Close
              </button>
            </header>

            <div className="activity-gallery-image">
              <PreloadedGalleryImage
                key={activeEvent.images[gallery.imageIndex]}
                src={activeEvent.images[gallery.imageIndex]}
                previousSrc={
                  activeEvent.images[
                    (gallery.imageIndex - 1 + activeEvent.images.length) %
                      activeEvent.images.length
                  ]
                }
                nextSrc={
                  activeEvent.images[
                    (gallery.imageIndex + 1) % activeEvent.images.length
                  ]
                }
                alt={`${activeEvent.title} activity photo ${gallery.imageIndex + 1} of ${activeEvent.images.length}`}
              />
            </div>

            <footer>
              <button type="button" onClick={() => changeImage(-1)}>Previous</button>
              <span>
                {gallery.imageIndex + 1} / {activeEvent.images.length}
              </span>
              <button type="button" onClick={() => changeImage(1)}>Next</button>
            </footer>
          </div>
        </div>
      )}
    </>
  );
}
