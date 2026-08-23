import { useState } from "react";
import ActivityGalleryLightbox from "../components/ActivityGalleryLightbox";
import { Reveal, SafeImage } from "../components/SiteElements";
import { studentLifeEvents } from "../data/studentLifeEvents";
import "./StudentLife.css";

export default function StudentLife() {
  const [gallery, setGallery] = useState(null);

  const openGallery = (eventIndex, imageIndex = 0) => {
    setGallery({ eventIndex, imageIndex });
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
                    View Photos <span aria-hidden="true">&rarr;</span>
                  </button>
                </Reveal>
              </article>
            ))}
          </div>
        </div>
      </section>

      {activeEvent && (
        <ActivityGalleryLightbox
          key={`${activeEvent.id}-${gallery.imageIndex}`}
          event={activeEvent}
          initialImageIndex={gallery.imageIndex}
          onClose={() => setGallery(null)}
        />
      )}
    </>
  );
}
