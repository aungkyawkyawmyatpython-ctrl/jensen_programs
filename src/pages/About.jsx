import {
  ProfilePhotoPlaceholder,
  Reveal,
  SafeImage,
} from "../components/SiteElements";
import "./About.css";

const officialAboutCopy = {
  educationalPhilosophy: "",
};

const coreValueGroups = [
  ["Empathy", "Compassion", "Caring"],
  ["Resilience", "Perseverance"],
  ["Respect", "Fairness"],
  ["Creativity", "Discipline", "Responsibility"],
  ["Citizenship"],
];

// TODO(VIRYA): Add the principal's approved name, title, photograph, and message.
const principalProfile = {
  name: "",
  title: "",
  photo: "",
  message: "",
};

export default function AboutInstitutionalSections({ navigate }) {
  return (
    <>
      <section className="section about-copy-section about-values" id="core-values">
        <div className="about-content-container">
          <Reveal className="core-values-layout" direction="left">
            <div className="about-copy-heading">
              <p className="eyebrow">Institutional Foundation</p>
              <h2>Core Values</h2>
              <p className="core-values-introduction">
                These values guide student character, relationships, learning,
                and everyday school life.
              </p>
            </div>

            <div className="core-values-groups">
              {coreValueGroups.map((values, index) => (
                <div
                  className="core-value-group"
                  aria-label={`Core values group ${index + 1}`}
                  key={values.join("-")}
                >
                  <ul>
                    {values.map((value) => (
                      <li key={value}>{value}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section
        className="section about-copy-section about-philosophy"
        id="educational-philosophy"
      >
        <div className="about-content-container">
          <Reveal className="about-copy-layout" direction="right">
            <div className="about-copy-heading">
              <p className="eyebrow">Teaching &amp; Learning</p>
              <h2>Educational Philosophy</h2>
            </div>
            {officialAboutCopy.educationalPhilosophy ? (
              <p className="about-copy-body">
                {officialAboutCopy.educationalPhilosophy}
              </p>
            ) : (
              <p className="about-copy-placeholder">
                VIRYA&apos;s official educational philosophy and approved
                teaching-and-learning approach are awaiting school review.
              </p>
            )}
          </Reveal>
        </div>
      </section>

      <section className="section principal-message" id="principal-message">
        <div className="about-content-container">
          <Reveal className="principal-message-layout">
            <div className="principal-portrait">
              {principalProfile.photo ? (
                <SafeImage
                  src={principalProfile.photo}
                  alt={
                    principalProfile.name
                      ? `${principalProfile.name}, Principal of VIRYA Private School`
                      : "Principal of VIRYA Private School"
                  }
                />
              ) : (
                <ProfilePhotoPlaceholder
                  className="principal-photo-placeholder"
                  ariaLabel="Principal photo unavailable"
                />
              )}
            </div>

            <div className="principal-message-copy">
              <p className="eyebrow">School Leadership</p>
              <h2>Principal&apos;s Message</h2>
              {principalProfile.message ? (
                <p>{principalProfile.message}</p>
              ) : (
                <p className="about-copy-placeholder">
                  The principal&apos;s approved message is awaiting confirmation
                  from VIRYA staff.
                </p>
              )}

              {(principalProfile.name || principalProfile.title) && (
                <div className="principal-identity">
                  {principalProfile.name && <strong>{principalProfile.name}</strong>}
                  {principalProfile.title && <span>{principalProfile.title}</span>}
                </div>
              )}
              <button
                className="principal-faculty-link"
                type="button"
                onClick={() => navigate("/faculty")}
              >
                Meet Our Faculty <span aria-hidden="true">→</span>
              </button>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
