import { Reveal } from "./SiteElements";

export default function Footer({ navigate, contactDetails }) {
  return (
    <footer className="footer">
      <Reveal className="footer-cta">
        <div>
          <h2>Begin at Virya</h2>
          <p>Whether you are exploring, visiting, or ready to apply, we will help you take the next step.</p>
        </div>
      </Reveal>
      <div className="footer-grid">
        <Reveal>
          <div className="footer-contact">
            <div className="footer-brand">
              <img src="/viryaprivate.png" alt="" />
              <strong>Virya Private School</strong>
            </div>
            <strong>Contact Us</strong>
            <address>{contactDetails.address}</address>
            {contactDetails.phones.map((phone) => (
              <a href={`tel:${phone}`} key={phone}>{phone}</a>
            ))}
            <a href={`mailto:${contactDetails.email}`}>{contactDetails.email}</a>
          </div>
        </Reveal>
        <Reveal delay={80}>
          <nav aria-label="Footer academics">
            <strong>Academics</strong>
            <button type="button" onClick={() => navigate("academics")}>Kindergarten</button>
            <button type="button" onClick={() => navigate("academics")}>Primary School</button>
            <button type="button" onClick={() => navigate("academics")}>Middle School</button>
          </nav>
        </Reveal>
        <Reveal delay={160}>
          <nav aria-label="Footer admissions">
            <strong>Admissions</strong>
            <button type="button" onClick={() => navigate("admissions")}>Apply</button>
            <button type="button" onClick={() => navigate("visit")}>Visit</button>
            <button type="button" onClick={() => navigate("admissions")}>Tuition & Aid</button>
          </nav>
        </Reveal>
        <Reveal delay={240}>
          <nav aria-label="Footer community">
            <strong>Community</strong>
            <button type="button" onClick={() => navigate("news")}>News</button>
            <button type="button" onClick={() => navigate("student-life")}>Student Life</button>
            <button type="button" onClick={() => navigate("home")}>Back to Top</button>
          </nav>
        </Reveal>
      </div>
    </footer>
  );
}
