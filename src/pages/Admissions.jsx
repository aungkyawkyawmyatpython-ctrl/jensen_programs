import { Reveal } from "../components/SiteElements";
import "./Admissions.css";

const schoolStrengths = [
  {
    title: "Learning and Growth",
    text: "VIRYA offers a learning pathway from Kindergarten through Grade 9.",
  },
  {
    title: "Character and Relationships",
    text: "VIRYA's verified core values guide student character, relationships, learning, and everyday school life.",
  },
  {
    title: "Student Experiences",
    text: "School activities include documented science, debate, football, travel, and community experiences.",
  },
];

const programsOffered = [
  { name: "Kindergarten", grades: "Kindergarten" },
  { name: "Primary School", grades: "Grades 1–5" },
  { name: "Middle School", grades: "Grades 6–9" },
];

const inquirySteps = [
  {
    number: "01",
    title: "Explore VIRYA",
    text: "Review the school's academic programs, values, faculty, and student experiences.",
  },
  {
    number: "02",
    title: "Choose a Program",
    text: "Identify the Kindergarten, Primary School, or Middle School grade you are asking about.",
  },
  {
    number: "03",
    title: "Send an Inquiry",
    text: "Use the current online form to share a parent name, email address, and intended grade.",
  },
  {
    number: "04",
    title: "Receive Next Steps",
    text: "The VIRYA admissions team will follow up with the next step for your family.",
  },
];

const admissionsInformation = [
  {
    title: "Admission Requirements",
    text: "Please contact VIRYA Private School for the current documents and admission requirements for your child's grade.",
  },
  {
    title: "Tuition & Fees",
    text: "Please contact VIRYA Private School for current tuition and fee information.",
  },
  {
    title: "Important Dates",
    text: "Please contact VIRYA Private School for current application, enrollment, and school-year dates.",
  },
];

const admissionsFaq = [
  {
    question: "What grade levels does VIRYA offer?",
    answer: "VIRYA offers Kindergarten, Primary School Grades 1–5, and Middle School Grades 6–9.",
  },
  {
    question: "How can I start an application?",
    answer: "Use the admissions inquiry form on this page to share your contact information and intended grade.",
  },
  {
    question: "How can I contact the school?",
    answer: "Families can contact VIRYA by email or telephone using the school's published contact details.",
  },
  {
    question: "Where can I learn more about academics?",
    answer: "The Academics page presents VIRYA's programs from Kindergarten through Grade 9.",
  },
];

export default function Admissions({
  navigate,
  contactDetails,
  onApply,
  applicationForm,
}) {
  return (
    <div className="admissions-page">
      <section className="section admissions-why" aria-labelledby="why-virya-title">
        <div className="admissions-inner">
          <Reveal className="admissions-section-heading">
            <p className="eyebrow">Why VIRYA</p>
            <h2 id="why-virya-title">A clear pathway for learning and school life.</h2>
          </Reveal>
          <div className="admissions-strengths">
            {schoolStrengths.map((strength, index) => (
              <Reveal delay={index * 60} key={strength.title}>
                <article>
                  <h3>{strength.title}</h3>
                  <p>{strength.text}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section admissions-programs" aria-labelledby="programs-offered-title">
        <div className="admissions-inner admissions-programs-layout">
          <Reveal className="admissions-section-heading" direction="left">
            <p className="eyebrow">Grade Levels</p>
            <h2 id="programs-offered-title">Programs Offered</h2>
            <p>
              Program listings describe the grades VIRYA offers and do not
              indicate current seat availability.
            </p>
          </Reveal>
          <div className="admissions-program-list">
            {programsOffered.map((program, index) => (
              <Reveal delay={index * 55} direction="right" key={program.name}>
                <article>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <div>
                    <h3>{program.name}</h3>
                    <p>{program.grades}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section admissions-process" aria-labelledby="admissions-process-title">
        <div className="admissions-inner">
          <Reveal className="admissions-section-heading">
            <p className="eyebrow">Getting Started</p>
            <h2 id="admissions-process-title">How to Get Started</h2>
            <p>
              Explore the programs available at VIRYA, choose the grade that
              fits your inquiry, and share your details so the admissions team
              can follow up with your family.
            </p>
          </Reveal>
          <ol className="admissions-steps">
            {inquirySteps.map((step, index) => (
              <Reveal delay={index * 55} key={step.number}>
                <li>
                  <span>{step.number}</span>
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="section admissions-details" aria-labelledby="admissions-details-title">
        <div className="admissions-inner">
          <Reveal className="admissions-section-heading">
            <p className="eyebrow">Plan Your Inquiry</p>
            <h2 id="admissions-details-title">Current Admissions Information</h2>
          </Reveal>
          <div className="admissions-information-grid">
            {admissionsInformation.map((item, index) => (
              <Reveal delay={index * 60} key={item.title}>
                <article>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </article>
              </Reveal>
            ))}
          </div>
          <Reveal className="admissions-information-contact" delay={120}>
            <p>Contact the school for the latest requirements, fees, and dates.</p>
            <a href={`mailto:${contactDetails.email}`}>Contact VIRYA</a>
          </Reveal>
        </div>
      </section>

      <section className="section admissions-faq" aria-labelledby="admissions-faq-title">
        <div className="admissions-inner admissions-faq-layout">
          <Reveal className="admissions-section-heading" direction="left">
            <p className="eyebrow">Admissions FAQ</p>
            <h2 id="admissions-faq-title">Helpful Starting Points</h2>
            <button type="button" onClick={() => navigate("academics")}>
              Explore Academics <span aria-hidden="true">→</span>
            </button>
          </Reveal>
          <Reveal className="admissions-faq-list" direction="right">
            {admissionsFaq.map((item, index) => (
              <details open={index === 0} key={item.question}>
                <summary>{item.question}</summary>
                <p>{item.answer}</p>
              </details>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="section admissions-final-cta" aria-labelledby="admissions-ready-title">
        <Reveal>
          <p className="eyebrow">Admissions</p>
          <h2 id="admissions-ready-title">Ready to Begin?</h2>
          <p>Start with the current online inquiry form or contact VIRYA directly.</p>
          <div>
            <button className="button gold" type="button" onClick={onApply}>
              Apply Now
            </button>
            <a className="admissions-contact-cta" href={`mailto:${contactDetails.email}`}>
              Contact VIRYA
            </a>
          </div>
        </Reveal>
      </section>

      <div className="admissions-application-entry">{applicationForm}</div>
    </div>
  );
}
