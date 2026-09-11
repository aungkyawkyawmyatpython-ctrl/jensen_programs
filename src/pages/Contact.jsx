import { Reveal, SafeImage } from "../components/SiteElements";
import "./Contact.css";

const phoneHref = (phone) => `tel:${phone.replace(/[^\d+]/g, "")}`;

export default function Contact({ navigate, contactDetails }) {
  return (
    <div className="contact-page">
      <section className="section contact-details" aria-labelledby="contact-details-title">
        <div className="contact-inner contact-details-layout">
          <Reveal className="contact-section-heading" direction="left">
            <p className="eyebrow">Contact Details</p>
            <h2 id="contact-details-title">Get in touch with VIRYA.</h2>
            <p>
              Contact the school directly with general questions, visit
              inquiries, or requests for admissions information.
            </p>
            <address>
              <strong>VIRYA Private School</strong>
              <span>{contactDetails.address}</span>
            </address>
          </Reveal>

          <Reveal className="contact-channels" direction="right">
            <div className="contact-channel-group">
              <p>Telephone</p>
              {contactDetails.phones.map((phone) => (
                <a href={phoneHref(phone)} key={phone}>
                  {phone}
                </a>
              ))}
            </div>
            <div className="contact-channel-group">
              <p>Email</p>
              <a href={`mailto:${contactDetails.email}`}>
                {contactDetails.email}
              </a>
            </div>
            <div className="contact-channel-actions">
              <a className="button gold" href={`mailto:${contactDetails.email}`}>
                Email VIRYA
              </a>
              <button className="button navy" type="button" onClick={() => navigate("/admissions")}>
                Admissions Inquiry
              </button>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section contact-visit" aria-labelledby="visit-campus-title">
        <div className="contact-inner contact-visit-layout">
          <Reveal className="contact-campus-image" direction="left">
            <SafeImage
              src="/viryaprivateschool_frontview.jpg"
              alt="Front view of VIRYA Private School campus"
            />
          </Reveal>
          <Reveal className="contact-visit-copy" direction="right">
            <p className="eyebrow">Visit VIRYA</p>
            <h2 id="visit-campus-title">Visit Our Campus</h2>
            <p>
              Families who would like to visit the school can contact VIRYA
              directly to ask about arranging a campus visit.
            </p>
            <a className="button navy" href={`mailto:${contactDetails.email}`}>
              Contact VIRYA
            </a>
          </Reveal>
        </div>
      </section>

      <section className="section contact-location" aria-labelledby="school-location-title">
        <div className="contact-inner contact-location-layout">
          <Reveal className="contact-location-copy" direction="left">
            <p className="eyebrow">School Location</p>
            <h2 id="school-location-title">Find Us</h2>
            <address>
              <strong>VIRYA Private School</strong>
              <span>{contactDetails.address}</span>
            </address>
          </Reveal>
          <Reveal className="contact-map" direction="right">
            <iframe
            title="VIRYA Private School Location on Google Maps"
            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3868.2907501928344!2d97.6543724!3d16.8476854!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30c2c9b9eb433a6d%3A0x2aef45505f5abb66!2sVirya%20Private%20School%20-%20Theindawgyi%20Kamaut%20Kasin%20Campus!5e1!3m2!1sen!2smm!4v1789144748008!5m2!1sen!2smm"
            loading="lazy"
            allowFullScreen
            referrerpolicy="no-referrer-when-downgrade"
            />
            <a
              className="button navy contact-map-button"
              href="https://maps.app.goo.gl/sg48oKfrixSqVjrc6"
              target="_blank"
              rel="noopener noreferrer"
            >
              Open in Google Maps
            </a>
          </Reveal>
        </div>
      </section>

      <section className="section contact-next-step" aria-labelledby="contact-next-step-title">
        <Reveal>
          <div>
            <p className="eyebrow">How Can We Help?</p>
            <h2 id="contact-next-step-title">Choose the right next step.</h2>
            <p>
              Email VIRYA for general questions or use the existing admissions
              inquiry page for questions about Kindergarten through Grade 9.
            </p>
          </div>
          <div className="contact-next-step-actions">
            <a className="button gold" href={`mailto:${contactDetails.email}`}>
              General Questions
            </a>
            <button className="button outline" type="button" onClick={() => navigate("/admissions")}>
              Go to Admissions
            </button>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
