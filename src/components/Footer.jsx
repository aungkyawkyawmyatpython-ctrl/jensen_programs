import { Reveal } from "./SiteElements";

export default function Footer({ navigate, contactDetails }) {
  return (
    <footer className="footer">
      <Reveal className="footer-cta">
        <div>
          <h2>Begin at VIRYA</h2>
          <p>Whether you are exploring, visiting, or ready to apply, we will help you take the next step.</p>
        </div>
      </Reveal>
      <div className="footer-grid">
        <Reveal>
          <div className="footer-contact">
            <button
              className="footer-brand"
              type="button"
              onClick={() => navigate("/")}
              aria-label="VIRYA Private School home"
            >
              <img src="/viryaprivate.png" alt="" />
              <strong>Virya Private School</strong>
            </button>
            <address>{contactDetails.address}</address>
            {contactDetails.phones.map((phone) => (
              <a href={`tel:${phone}`} key={phone}>{phone}</a>
            ))}
            <a href={`mailto:${contactDetails.email}`}>{contactDetails.email}</a>
          </div>
        </Reveal>
        <Reveal delay={80}>
          <nav aria-label="Footer academics">
            <strong>Academics Overview</strong>
            <button type="button" onClick={() => navigate("/academics")}>Academics</button>
            <button type="button" onClick={() => navigate("/academics")}>Kindergarten</button>
            <button type="button" onClick={() => navigate("/academics")}>Primary School</button>
            <button type="button" onClick={() => navigate("/academics")}>Secondary School</button>
            <button type="button" onClick={() => navigate("/calendar")}>Academic Calendar</button>
          </nav>
        </Reveal>
        <Reveal delay={160}>
          <nav aria-label="Footer admissions">
            <strong>Admissions Overview</strong>
            <button type="button" onClick={() => navigate("/admissions")}>Admissions</button>
            <button type="button" onClick={() => navigate("/apply")}>Apply</button>
          </nav>
        </Reveal>
        <Reveal delay={240}>
          <nav aria-label="Footer explore">
            <strong>Explore</strong>
            <button type="button" onClick={() => navigate("/about")}>About</button>
            <button type="button" onClick={() => navigate("/faculty")}>Faculty</button>
            <button type="button" onClick={() => navigate("/student-life")}>Student Life</button>
            <button type="button" onClick={() => navigate("/news")}>News &amp; Events</button>
            <button type="button" onClick={() => navigate("/gallery")}>Gallery</button>
            <button type="button" onClick={() => navigate("/contact")}>Contact</button>
          </nav>
        </Reveal>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2026 VIRYA Private School. All rights reserved.</p>
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          Back to Top
        </button>
      </div>
    </footer>
  );
}
