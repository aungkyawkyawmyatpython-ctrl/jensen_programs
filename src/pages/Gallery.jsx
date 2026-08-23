import { useState } from "react";
import ActivityGalleryLightbox from "../components/ActivityGalleryLightbox";
import { Reveal, SafeImage } from "../components/SiteElements";
import { studentLifeEvents } from "../data/studentLifeEvents";
import "./Gallery.css";

const galleryFilters = ["All", "2025", "2023"];

export default function Gallery() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedEvent, setSelectedEvent] = useState(null);

  const visibleEvents =
    activeFilter === "All"
      ? studentLifeEvents
      : studentLifeEvents.filter((event) => event.year === activeFilter);

  return (
    <>
      <section className="section gallery-archive" aria-labelledby="gallery-archive-title">
        <div className="gallery-inner">
          <Reveal className="gallery-heading">
            <p className="eyebrow">Photo Archive</p>
            <h2 id="gallery-archive-title">Browse School Activities</h2>
            <p>
              Explore photographs from documented VIRYA school activities and
              shared experiences.
            </p>
          </Reveal>

          <Reveal className="gallery-filters" aria-label="Filter gallery by year">
            {galleryFilters.map((filter) => (
              <button
                type="button"
                className={activeFilter === filter ? "is-active" : ""}
                aria-pressed={activeFilter === filter}
                onClick={() => setActiveFilter(filter)}
                key={filter}
              >
                {filter}
              </button>
            ))}
          </Reveal>

          <div className="gallery-event-grid">
            {visibleEvents.map((event, index) => (
              <Reveal delay={(index % 3) * 55} key={event.id}>
                <article className="gallery-event-card">
                  <button
                    className="gallery-event-cover"
                    type="button"
                    onClick={() => setSelectedEvent(event)}
                    aria-label={`View all ${event.images.length} ${event.title} photos`}
                  >
                    <SafeImage
                      src={event.images[0]}
                      alt={`${event.title} activity at VIRYA Private School`}
                    />
                    <span>{event.images.length} photos</span>
                  </button>
                  <div className="gallery-event-details">
                    <p>{event.year || "VIRYA Activity"}</p>
                    <h2>
                      {event.title}
                      {event.year && (
                        <> <span aria-hidden="true">&mdash;</span> {event.year}</>
                      )}
                    </h2>
                    <button type="button" onClick={() => setSelectedEvent(event)}>
                      View Photos <span aria-hidden="true">&rarr;</span>
                    </button>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {selectedEvent && (
        <ActivityGalleryLightbox
          event={selectedEvent}
          onClose={() => setSelectedEvent(null)}
        />
      )}
    </>
  );
}
