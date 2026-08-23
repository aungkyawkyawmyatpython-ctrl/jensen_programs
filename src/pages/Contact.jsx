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
            <SafeImage
              src="/schoolmap.png"
              alt="Map showing the location of VIRYA Private School"
            />
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
