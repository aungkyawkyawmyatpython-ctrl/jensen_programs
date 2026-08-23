import { useEffect, useState } from "react";
import PreloadedGalleryImage from "./PreloadedGalleryImage";
import "./ActivityGalleryLightbox.css";

export default function ActivityGalleryLightbox({
  event,
  initialImageIndex = 0,
  onClose,
}) {
  const [imageIndex, setImageIndex] = useState(initialImageIndex);
  const imageCount = event.images.length;

  const changeImage = (direction) => {
    setImageIndex((current) => (current + direction + imageCount) % imageCount);
  };

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    const handleKeyDown = (keyboardEvent) => {
      if (keyboardEvent.key === "Escape") onClose();
      if (keyboardEvent.key === "ArrowLeft") {
        setImageIndex((current) => (current - 1 + imageCount) % imageCount);
      }
      if (keyboardEvent.key === "ArrowRight") {
        setImageIndex((current) => (current + 1) % imageCount);
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [imageCount, onClose]);

  const currentSrc = event.images[imageIndex];
  const previousSrc = event.images[(imageIndex - 1 + imageCount) % imageCount];
  const nextSrc = event.images[(imageIndex + 1) % imageCount];

  return (
    <div
      className="activity-gallery-modal"
      role="dialog"
      aria-modal="true"
      aria-labelledby="activity-gallery-title"
    >
      <div className="activity-gallery-dialog">
        <header>
          <div>
            <p>{event.year || "Photo Gallery"}</p>
            <h2 id="activity-gallery-title">{event.title}</h2>
          </div>
          <button type="button" onClick={onClose} aria-label="Close photo gallery">
            Close
          </button>
        </header>

        <div className="activity-gallery-image">
          <PreloadedGalleryImage
            key={currentSrc}
            src={currentSrc}
            previousSrc={previousSrc}
            nextSrc={nextSrc}
            alt={`${event.title} activity photo ${imageIndex + 1} of ${imageCount}`}
          />
        </div>

        <footer>
          <button type="button" onClick={() => changeImage(-1)}>
            Previous
          </button>
          <span>
            {imageIndex + 1} / {imageCount}
          </span>
          <button type="button" onClick={() => changeImage(1)}>
            Next
          </button>
        </footer>
      </div>
    </div>
  );
}
