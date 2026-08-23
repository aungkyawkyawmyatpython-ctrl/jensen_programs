import { useEffect, useState } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { Reveal, SafeImage } from "./components/SiteElements";
import Home from "./pages/Home";
import AboutInstitutionalSections from "./pages/About";
import Admissions from "./pages/Admissions";
import Faculty from "./pages/Faculty";
import StudentLife from "./pages/StudentLife";
import News from "./pages/News";
import Contact from "./pages/Contact";
import Gallery from "./pages/Gallery";
import Calendar from "./pages/Calendar";
import NotFound from "./pages/NotFound";
import ScrollToTop from "./components/ScrollToTop";

const SCHOOL_IMAGES = {
  campus: "/DSC00648.jpg",
  frontView: "/viryaprivateschool_frontview.jpg",
  story: "/student_group.jpg",
};

const menuGroups = [
  {
    path: "/academics",
    title: "Academics",
    links: ["Kindergarten", "Primary School", "Middle School"],
  },
  {
    path: "/admissions",
    title: "Admissions",
    links: ["How to Apply", "Programs Offered", "Tuition & Fees", "Admissions FAQ"],
  },
  {
    path: "/student-life",
    title: "Student Life",
    links: ["Science Fair", "Visit to Yangon", "Football Competition", "Debate", "Martyrs' Day"],
  },
  {
    path: "/faculty",
    title: "Faculty",
    links: ["Faculty Directory", "Founders", "Administration", "Teachers"],
  },
  {
    path: "/news",
    title: "News & Events",
    links: ["Latest Updates", "Upcoming Events"],
  },
  {
    path: "/gallery",
    title: "Gallery",
    links: ["Science Fair", "Visit to Yangon", "Football Competition", "Debate", "Martyrs' Day"],
  },
  {
    path: "/about",
    title: "About",
    links: ["Our Story", "Vision & Mission", "Core Values", "Leadership", "Campus", "Our Journey"],
  },
  {
    path: "/contact",
    title: "Contact",
    links: ["Contact Details", "Visit VIRYA", "Find Us"],
  },
];

const programs = [
  ["Kindergarten", "Kindergarten", "Early literacy, number sense, routines, friendship, discovery, and creative expression."],
  ["Grade 1", "Primary School", "Reading fluency, foundational math, nature study, music, art, and classroom independence."],
  ["Grade 2", "Primary School", "Stronger writing, problem solving, science observation, projects, and collaborative habits."],
  ["Grade 3", "Primary School", "Research skills, multiplication, reading stamina, design challenges, and community service."],
  ["Grade 4", "Primary School", "Inquiry units, presentations, applied math, lab work, athletics, and arts exploration."],
  ["Grade 5", "Primary School", "Leadership practice, deeper projects, transition advising, and confident academic habits."],
  ["Grade 6", "Middle School", "Seminars, advisory, lab science, world cultures, studio electives, and organization coaching."],
  ["Grade 7", "Middle School", "Argument writing, algebra readiness, research, arts, athletics, and service learning."],
  ["Grade 8", "Middle School", "Independent projects, leadership roles, advanced labs, performance, and portfolio development."],
  ["Grade 9", "Middle School", "High-school readiness, advanced seminars, personal advising, and capstone preparation."],
];

const programStages = [
  ["kindergarten", "Kindergarten", "", "Kindergarten begins the VIRYA academic journey.", "Kindergarten"],
  ["primary", "Primary School", "Grades 1–5", "Grades 1 through 5 make up the Primary School stage.", "Primary School"],
  ["middle", "Middle School", "Grades 6–9", "Grades 6 through 9 make up the Middle School stage.", "Middle School"],
];

const kindergartenFocusAreas = [
  "Early Literacy",
  "Number Sense",
  "Friendship",
  "Discovery",
  "Creative Expression",
];

const viryaStrengths = [
  {
    label: "Academics",
    title: "Kindergarten to Grade 9",
    text: "VIRYA provides a continuous learning pathway from Kindergarten through Grade 9.",
    target: "/academics",
    action: "Explore Academics",
  },
  {
    label: "Core Values",
    title: "Character Matters",
    text: "Empathy, resilience, respect, creativity, responsibility, and citizenship guide learning, relationships, and everyday school life.",
    target: "/about",
    action: "Our Values",
  },
  {
    label: "Student Life",
    title: "Learning Beyond the Classroom",
    text: "Science Fair, debate, football competition, visits to Yangon, and Martyrs' Day activities extend learning beyond the classroom.",
    target: "/student-life",
    action: "Explore Student Life",
  },
];

const missionVision = [
  [
    "Mission",
    "Our mission is that Virya will contribute to building social capital for Myanmar through providing quality education and knowledge.",
  ],
  [
    "Vision",
    "Our vision is that every student will reach their highest potential and leave us with the skills, knowledge, and qualifications to go on to enjoy life to the fullest.",
  ],
];

const storyParagraphs = [
  "Virya International Academy was founded in November 2021, followed by Virya Private School in June 2023.",
  "We are a small team and a small school with a future-focused mission. Virya, in Pali, means resilience and perseverance.",
  "Virya was founded because we believe passionately that all young people, regardless of background, can achieve great things.",
  "Our goal is to provide students with choice and opportunity: to go to university if they wish, and to live happy, healthy, productive lives.",
];

const storyMilestones = [
  ["Nov 2021", "Virya International Academy founded"],
  ["Jun 2023", "Virya Private School founded"],
  ["Today", "A community of students, parents, and teachers united by high expectations"],
];

const contactDetails = {
  address: "7/11, Thu Danu Street, Ward (4), Hpa An, Kayin State",
  phones: ["09779137381", "09421127726"],
  email: "viryaprivateschool@gmail.com",
};

const teamMembers = [
  ["တည်ထောင်သူ", "ဦးမင်းညီညီဝင်း", "Institute of Technical Education (Singapore)", "/faculty/u-min-nyi-nyi-win.jpg"],
  ["တည်ထောင်သူ", "ဒေါ်ပြုံးသက်သက်ကျော်", "M.Sc. (University of Birmingham, UK)", "/faculty/daw-pyone-thet-thet-kyaw.jpg"],
  ["ကြီးကြပ်အုပ်ချုပ်သူ", "ဒေါ်ညိုညို", "B.Sc. (မော်လမြိုင် ဒီဂရီကောလိပ်)", "/faculty/daw-nyo-nyo.jpg"],
  ["ဆရာ", "ဦးကျော်လင်းထွေး", "B.Sc. (Physics)", "/faculty/u-kyaw-linn-htwe.jpg"],
  ["ဆရာမ", "ဒေါ်ခင်သက်မော်", "M.Sc. (Chemistry)", "/faculty/daw-khin-thet-maw.jpg"],
  ["ဆရာမ", "ဒေါ်နန်းဝင်းဝင်းအောင်", "B.A. (English, Hpa An University)", "/faculty/daw-nann-win-win-aung.jpg"],
  ["ဆရာမ", "ဒေါ်နန်းနှင်းယုယု", "M.Sc. (Chemistry)", "/faculty/daw-nann-hnin-yu-yu.jpg"],
  ["ဆရာမ", "ဒေါ်အေးသီတာခင်", "M.A. (Myanmar)", "/faculty/daw-aye-thida-khin.jpg"],
  ["ဆရာမ", "ဒေါ်နှင်းယုမွန်", "B.A. (Myanmar)", "/faculty/daw-hnin-yu-mon.jpg"],
  ["ဆရာမ", "ဒေါ်ဖြိုးသိင်္ဂီကျော်", "B.A. (English)", "/faculty/daw-phyo-thin-gyi-kyaw.jpg"],
  ["ဆရာမ", "ဒေါ်ငြိမ်းမြတ်သွယ်", "B.Sc. (Botany)", "/faculty/daw-nyein-myat-thwe.jpg"],
  ["ဆရာမ", "ဒေါ်စေးဘရင်းပေါလ်", "B.A. (Geography)", "/faculty/daw-say-bring-paul.jpg"],
  ["ဆရာမ", "ဒေါ်ဝင့်စန္ဒာထွန်း", "B.A. (Myanmar)", "/faculty/daw-wint-sandar-htun.jpg"],
  ["ဆရာမ", "ဒေါ်အေးအေးသိန်း", "B.Sc-B.Ed. (သင်္ချာ)", "/faculty/daw-aye-aye-thein.jpg"],
  ["ဆရာမ", "ဒေါ်ဖူးသက်ညွှန်းစိမ်း", "B.Com. (Eco)", "/faculty/daw-phu-thet-nyunt-sein.jpg"],
  ["ဆရာမ", "ဒေါ်မိုးအိအိဇော်", "B.Sc. (Math)", null],
];

const pageDetails = {
  academics: {
    title: "Academics",
    headline: "Programs built for confident learners.",
    text: "Explore Virya's Kindergarten through Grade 9 pathways, specialist teachers, enrichment blocks, and learning support.",
    actions: [["/admissions", "Ask About Placement", "button gold"]],
  },
  admissions: {
    title: "Admissions",
    headline: "Admissions",
    text: "Explore programs from Kindergarten through Grade 9 and start an admissions inquiry with VIRYA.",
    actions: [["/apply", "Apply Now", "button gold"]],
  },
  apply: {
    title: "Apply",
    headline: "Start an admissions inquiry.",
    text: "Share a few details and our admissions team will follow up with the right next step for your family.",
    actions: [],
  },
  "student-life": {
    title: "Student Life",
    headline: "Life at VIRYA",
    text: "Learning at VIRYA extends beyond the classroom through activities, shared experiences, teamwork, creativity, and community.",
    actions: [],
  },
  faculty: {
    title: "Faculty",
    headline: "Meet Our Faculty",
    text: "Meet the educators and school leaders currently listed in the VIRYA Private School directory.",
    actions: [],
  },
  about: {
    title: "About Virya",
    headline: "A private school with a public purpose.",
    text: "Virya is a close, ambitious learning community organized around scholarship, character, wellbeing, and service.",
    actions: [["#core-values", "Explore Our Values", "button gold"]],
  },
  contact: {
    title: "Contact & Visit",
    headline: "Contact VIRYA",
    text: "Contact VIRYA Private School with questions, admissions inquiries, or to learn more about visiting the campus.",
    actions: [],
  },
  news: {
    title: "News & Events",
    headline: "News & Events",
    text: "Stay informed about the latest news, announcements, events, and updates from VIRYA Private School.",
    actions: [],
  },
  gallery: {
    title: "Gallery",
    headline: "Gallery",
    text: "Photographs from VIRYA school activities and shared experiences.",
    actions: [],
  },
  calendar: {
    title: "Academic Year",
    headline: "Academic Calendar 2026\u20132027",
    text: "Families can view VIRYA's published academic-year calendar here.",
    actions: [],
  },
};

const utilityLinks = [["/calendar", "Calendar"]];

const gradeOptions = programs.map(([title]) => title);

const searchItems = [
  ...menuGroups.map((group) => ({
    title: group.title,
    text: group.links.join(", "),
    target: group.path,
    type: "Section",
  })),
  ...programs.map(([title, range, text]) => ({
    title,
    text: `${range}. ${text}`,
    target: "/academics",
    type: "Program",
  })),
  ...missionVision.map(([title, text]) => ({
    title,
    text,
    target: "/about",
    type: "About",
  })),
  {
    title: "Our Story",
    text: "Virya International Academy began in 2021 and Virya Private School followed in 2023.",
    target: "/about",
    type: "About",
  },
  { title: "Apply", text: "Start an admissions inquiry", target: "/apply", type: "Action" },
  {
    title: "Academic Calendar",
    text: "VIRYA Academic Calendar 2026\u20132027",
    target: "/calendar",
    type: "Resource",
  },
  {
    title: "Calendar 2026\u20132027",
    text: "View VIRYA's published academic-year calendar",
    target: "/calendar",
    type: "Resource",
  },
];

function App() {
  const location = useLocation();
  const routerNavigate = useNavigate();

  useEffect(() =>{
    const titles = {
      "/": "VIRYA Private School | Hpa An, Kayin State",
      "/about": "About | VIRYA Private School",
      "/academics": "Academics | VIRYA Private School",
      "/admissions": "Admissions | VIRYA Private School",
      "/apply": "Apply | VIRYA Private School",
      "/faculty": "Faculty | VIRYA Private School",
      "/student-life": "Student Life | VIRYA Private School",
      "/gallery": "Gallery | VIRYA Private School",
      "/news": "News & Events | VIRYA Private School",
      "/contact": "Contact | VIRYA Private School",
      "/calendar": "Academic Calendar | VIRYA Private School",
  };
   document.title =
      titles[location.pathname] ||
      "VIRYA Private School | Hpa An, Kayin State";
  }, [location.pathname]);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [headerHidden, setHeaderHidden] = useState(false);
  const [application, setApplication] = useState({
    parentName: "",
    email: "",
    studentGrade: "",
  });
  const [submissionStatus, setSubmissionStatus] = useState("idle");

  const navigate = (path) => {
    setSearchOpen(false);
    setSearchTerm("");
    setMobileMenuOpen(false);
    setHeaderHidden(false);

    if (location.pathname === path) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    routerNavigate(path);
  };

  useEffect(() => {
    let lastScrollY = window.scrollY;
    const updateHeader = () => {
      const currentScrollY = window.scrollY;
      const scrollingDown = currentScrollY > lastScrollY;
      setHeaderHidden(!searchOpen && !mobileMenuOpen && scrollingDown && currentScrollY > 140);
      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", updateHeader, { passive: true });
    return () => window.removeEventListener("scroll", updateHeader);
  }, [mobileMenuOpen, searchOpen]);

  useEffect(() => {
    if (!mobileMenuOpen) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    const mobileNavigation = window.matchMedia("(max-width: 1220px)");
    const closeMenuAtDesktop = (event) => {
      if (!event.matches) setMobileMenuOpen(false);
    };

    mobileNavigation.addEventListener("change", closeMenuAtDesktop);
    return () => mobileNavigation.removeEventListener("change", closeMenuAtDesktop);
  }, []);

  const updateApplication = (event) => {
    const { name, value } = event.target;
    setApplication((current) => ({ ...current, [name]: value }));
    setSubmissionStatus((current) => (current === "sending" ? current : "idle"));
  };

  const submitApplication = async (event) => {
    event.preventDefault();
    setSubmissionStatus("sending");
    const payload = {
      parentName: application.parentName.trim(),
      email: application.email.trim().toLowerCase(),
      studentGrade: application.studentGrade,
    };

    if (!payload.parentName || !payload.email || !gradeOptions.includes(payload.studentGrade)) {
      setSubmissionStatus("invalid");
      return;
    }

    try {
      const response = await fetch("https://formspree.io/f/xgawbpld", {
        method: "POST",
        headers: { "Content-Type": "application/json", 
          Accept: "application/json",
        },
        
        body: JSON.stringify(payload),
      });
      if (!response.ok) {
        throw new Error("Application request failed");
      }

      setSubmissionStatus("success");
      setApplication({ parentName: "", email: "", studentGrade: "" });
    } catch {
      setSubmissionStatus("error");
    }
  };

  const normalizedSearch = searchTerm.trim().toLowerCase();
  const searchResults = normalizedSearch
    ? searchItems.filter((item) =>
        `${item.title} ${item.text} ${item.type}`.toLowerCase().includes(normalizedSearch),
      )
    : searchItems.slice(0, 6);

  return (
    <main className="site-shell" id="top">
      <Header
        headerHidden={headerHidden}
        navigate={navigate}
        menuGroups={menuGroups}
        pathname={location.pathname}
        searchOpen={searchOpen}
        setSearchOpen={setSearchOpen}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        searchResults={searchResults}
        utilityLinks={utilityLinks}
      />

      <ScrollToTop />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Home navigate={navigate} />
              <HomeAdmissionsCta navigate={navigate} />
              <MissionVision />
              <OurStory />
              <Programs />
              <ViryaStrengths navigate={navigate} />
              <Campus navigate={navigate} showHomePreview />
              <AdmissionsForm
                application={application}
                submissionStatus={submissionStatus}
                updateApplication={updateApplication}
                submitApplication={submitApplication}
              />
            </>
          }
        />
        <Route path="/about" element={<InteriorPage page="about" navigate={navigate} application={application} submissionStatus={submissionStatus} updateApplication={updateApplication} submitApplication={submitApplication} />} />
        <Route path="/academics" element={<InteriorPage page="academics" navigate={navigate} application={application} submissionStatus={submissionStatus} updateApplication={updateApplication} submitApplication={submitApplication} />} />
        <Route path="/faculty" element={<InteriorPage page="faculty" navigate={navigate} application={application} submissionStatus={submissionStatus} updateApplication={updateApplication} submitApplication={submitApplication} />} />
        <Route path="/student-life" element={<InteriorPage page="student-life" navigate={navigate} application={application} submissionStatus={submissionStatus} updateApplication={updateApplication} submitApplication={submitApplication} />} />
        <Route path="/admissions" element={<InteriorPage page="admissions" navigate={navigate} application={application} submissionStatus={submissionStatus} updateApplication={updateApplication} submitApplication={submitApplication} />} />
        <Route path="/apply" element={<InteriorPage page="apply" navigate={navigate} application={application} submissionStatus={submissionStatus} updateApplication={updateApplication} submitApplication={submitApplication} />} />
        <Route path="/news" element={<InteriorPage page="news" navigate={navigate} application={application} submissionStatus={submissionStatus} updateApplication={updateApplication} submitApplication={submitApplication} />} />
        <Route path="/calendar" element={<InteriorPage page="calendar" navigate={navigate} application={application} submissionStatus={submissionStatus} updateApplication={updateApplication} submitApplication={submitApplication} />} />
        <Route path="/gallery" element={<InteriorPage page="gallery" navigate={navigate} application={application} submissionStatus={submissionStatus} updateApplication={updateApplication} submitApplication={submitApplication} />} />
        <Route path="/contact" element={<InteriorPage page="contact" navigate={navigate} application={application} submissionStatus={submissionStatus} updateApplication={updateApplication} submitApplication={submitApplication} />} />
        <Route path="*" element={<NotFound navigate={navigate} />} />
      </Routes>

      <Footer navigate={navigate} contactDetails={contactDetails} />
    </main>
  );
}

function HomeAdmissionsCta({ navigate }) {
  return (
    <section className="home-admissions-cta" aria-labelledby="home-admissions-title">
      <div className="home-admissions-cta-inner">
        <Reveal className="home-admissions-copy" direction="left">
          <p className="eyebrow">Admissions</p>
          <h2 id="home-admissions-title">Begin Your VIRYA Journey</h2>
          <p>
            Explore programs from Kindergarten through Grade 9 and start an admissions inquiry for your family.
          </p>
        </Reveal>
        <Reveal className="home-admissions-actions" direction="right">
          <button className="button gold" type="button" onClick={() => navigate("/admissions")}>
            Explore Admissions
          </button>
          <button
            className="button home-admissions-secondary"
            type="button"
            onClick={() => navigate("/contact")}
          >
            Contact VIRYA
          </button>
        </Reveal>
      </div>
    </section>
  );
}

function MissionVision() {
  return (
    <section className="section mission-vision" id="mission">
      <Reveal className="section-heading">
        <p className="eyebrow">Mission & Vision</p>
        <h2>Why Virya exists, and where we are going.</h2>
      </Reveal>
      <div className="quote-grid">
        {missionVision.map(([title, text], index) => (
          <Reveal delay={index * 90} direction={index === 0 ? "left" : "right"} key={title}>
            <article className="quote-card">
              <span>{title}</span>
              <blockquote>{text}</blockquote>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function JourneyTimeline() {
  return (
    <div className="story-timeline" aria-label="Virya milestones">
      {storyMilestones.map(([date, text], index) => (
        <Reveal delay={index * 60} key={date}>
          <article>
            <time>{date}</time>
            <span>{text}</span>
          </article>
        </Reveal>
      ))}
    </div>
  );
}

function OurStory({ aboutPage = false, showTimeline = true }) {
  const storyImage = aboutPage ? "/studnet_group_pic.jpg" : SCHOOL_IMAGES.story;
  const storyImageAlt = aboutPage
    ? "VIRYA students and teachers together"
    : "VIRYA students together at school";

  return (
    <section className="section our-story-section" id="story">
      <div className="our-story">
        <Reveal className="story-media" direction="left">
          <SafeImage src={storyImage} alt={storyImageAlt} />
        </Reveal>
        <Reveal className="story-content" direction="right">
          <p className="eyebrow">{aboutPage ? "About VIRYA" : "Our Story"}</p>
          <h2>A small school with a future-focused mission.</h2>
          {storyParagraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          {showTimeline && <JourneyTimeline />}
        </Reveal>
      </div>
    </section>
  );
}

function OurJourney() {
  return (
    <section className="section about-journey">
      <div className="about-content-container">
        <Reveal className="section-heading">
          <p className="eyebrow">Our History</p>
          <h2>Our Journey</h2>
        </Reveal>
        <JourneyTimeline />
      </div>
    </section>
  );
}

function Programs() {
  return (
    <section className="section program-journey" id="programs">
      <div className="program-journey-inner">
        <Reveal className="section-heading program-journey-heading">
          <p className="eyebrow">Academic Pathways</p>
          <h2>Our Academic Journey</h2>
          <p>
            VIRYA provides a continuous learning pathway from Kindergarten through Grade 9.
          </p>
        </Reveal>

        <div className="academic-stages">
          {programStages.map(([id, stageTitle, range, introduction, level], stageIndex) => {
            const stagePrograms = programs.filter(([, programLevel]) => programLevel === level);

            return (
              <section
                className={"academic-stage academic-stage-" + id}
                aria-labelledby={"academic-stage-" + id}
                key={id}
              >
                {id === "kindergarten" ? (
                  <Reveal className="kindergarten-feature">
                    <div className="kindergarten-feature-heading">
                      <p className="kindergarten-stage-label">Foundation Stage</p>
                      <h3 id={"academic-stage-" + id}>{stageTitle}</h3>
                      <p className="kindergarten-introduction">{introduction}</p>
                    </div>
                    <article className="kindergarten-program-panel">
                      <p className="kindergarten-program-description">{stagePrograms[0][2]}</p>
                      <ul className="kindergarten-focus-list" aria-label="Kindergarten learning focus">
                        {kindergartenFocusAreas.map((focus) => (
                          <li key={focus}>{focus}</li>
                        ))}
                      </ul>
                    </article>
                  </Reveal>
                ) : (
                  <>
                    <Reveal className="academic-stage-header">
                      <div>
                        <h3 id={"academic-stage-" + id}>{stageTitle}</h3>
                        {range && <span>{range}</span>}
                      </div>
                      <p>{introduction}</p>
                    </Reveal>

                    <div className="academic-grade-grid">
                      {stagePrograms.map(([title, , text], index) => (
                        <Reveal delay={stageIndex * 35 + index * 45} key={title}>
                          <article className="academic-grade-card">
                            <div className="academic-grade-title">
                              <h4>{title}</h4>
                              <span aria-hidden="true">{title.replace("Grade ", "")}</span>
                            </div>
                            <p>{text}</p>
                          </article>
                        </Reveal>
                      ))}
                    </div>
                  </>
                )}
              </section>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function ViryaStrengths({ navigate }) {
  return (
    <section className="section virya-strengths" id="community" aria-labelledby="virya-strengths-title">
      <Reveal className="section-heading">
        <p className="eyebrow">Explore</p>
        <h2 id="virya-strengths-title">What Shapes the VIRYA Experience</h2>
      </Reveal>

      <div className="virya-strength-grid">
        {viryaStrengths.map(({ label, title, text, target, action }, index) => (
          <Reveal delay={index * 70} key={label}>
            <article className="virya-strength-card">
              <span className="virya-strength-marker" aria-hidden="true" />
              <p className="virya-strength-label">{label}</p>
              <h3>{title}</h3>
              <p className="virya-strength-copy">{text}</p>
              <button type="button" onClick={() => navigate(target)}>
                {action} <span aria-hidden="true">→</span>
              </button>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Campus({ aboutPage = false, showHomePreview = false, navigate }) {
  const campusImage = aboutPage ? SCHOOL_IMAGES.frontView : SCHOOL_IMAGES.campus;
  const campusAlt = aboutPage
    ? "Front view of VIRYA Private School campus"
    : "Virya campus and school community";

  return (
    <section className={`campus${aboutPage ? " about-campus" : ""}`} id="life">
      <Reveal className="campus-image" direction="left">
        <SafeImage src={campusImage} alt={campusAlt} />
      </Reveal>
      <Reveal className="campus-content" direction="right">
        <p className="eyebrow">Visit Campus</p>
        <h2>{aboutPage ? "Our Campus" : "Spaces built for discovery, performance, and care."}</h2>
        {aboutPage && (
          <p className="campus-introduction">
            VIRYA Private School provides a welcoming learning environment where students can learn,
            grow, and take part in school life.
          </p>
        )}
        {aboutPage && (
          <p className="about-copy-placeholder about-facilities-placeholder">
            Official facilities information is awaiting confirmation from VIRYA
            staff.
          </p>
        )}
        {showHomePreview && (
          <button className="campus-preview" type="button" onClick={() => navigate("/about")}>
            <SafeImage
              src={SCHOOL_IMAGES.frontView}
              alt="Front view of VIRYA Private School campus"
            />
            <span>
              <strong>View Our Campus</strong>
              <small>Discover Our School →</small>
            </span>
          </button>
        )}
      </Reveal>
    </section>
  );
}

function InquiryForm({ application, submissionStatus, updateApplication, submitApplication }) {
  return (
    <form className="inquiry-form" aria-label="Admissions inquiry" onSubmit={submitApplication}>
      <label>
        Parent name
        <input
          type="text"
          name="parentName"
          placeholder="Your name"
          value={application.parentName}
          onChange={updateApplication}
          autoComplete="name"
          maxLength={120}
          pattern="[^<>]{1,120}"
          title="Please do not include angle brackets."
          required
        />
      </label>
      <label>
        Email
        <input
          type="email"
          name="email"
          placeholder="you@example.com"
          value={application.email}
          onChange={updateApplication}
          autoComplete="email"
          inputMode="email"
          maxLength={160}
          required
        />
      </label>
      <label>
        Student grade
        <select name="studentGrade" value={application.studentGrade} onChange={updateApplication} required>
          <option value="" disabled>Select a grade</option>
          {gradeOptions.map((grade) => (
            <option key={grade}>{grade}</option>
          ))}
        </select>
      </label>
      <button type="submit" disabled={submissionStatus === "sending"}>
        {submissionStatus === "sending" ? "Sending..." : "Request Information"}
      </button>
      <p className={`form-status ${submissionStatus}`} aria-live="polite">
        {submissionStatus === "success" && "Thank you. Your application inquiry has been saved."}
        {submissionStatus === "invalid" && "Please enter your name, email, and a valid grade before sending."}
        {submissionStatus === "error" && "Something went wrong. Please try again or contact admissions."}
      </p>
    </form>
  );
}

function AdmissionsForm({
  application,
  submissionStatus,
  updateApplication,
  submitApplication,
  unifiedContent,
}) {
  const form = (
    <InquiryForm
      application={application}
      submissionStatus={submissionStatus}
      updateApplication={updateApplication}
      submitApplication={submitApplication}
    />
  );

  if (unifiedContent) {
    return (
      <section className="apply-inquiry" id="admissions-inquiry" aria-labelledby="apply-inquiry-title">
        <div className="apply-inquiry-inner">
          <Reveal className="apply-inquiry-copy" direction="left">
            <p className="eyebrow">{unifiedContent.title}</p>
            <h1 id="apply-inquiry-title">{unifiedContent.headline}</h1>
            <p>{unifiedContent.text}</p>
          </Reveal>
          <Reveal className="apply-inquiry-form" direction="right">
            {form}
          </Reveal>
        </div>
      </section>
    );
  }

  return (
    <section className="section admissions" id="admissions-inquiry">
      <Reveal className="admissions-copy" direction="left">
        <p className="eyebrow">Take the Next Step</p>
        <h2>Start an admissions inquiry.</h2>
        <p>
          Share a few details and our admissions team will follow up with the
          right next step for your family.
        </p>
      </Reveal>
      <Reveal direction="right">{form}</Reveal>
    </section>
  );
}

function AboutPageContent({ navigate }) {
  return (
    <>
      <OurStory aboutPage showTimeline={false} />
      <MissionVision />
      <AboutInstitutionalSections navigate={navigate} />
      <Campus aboutPage />
      <OurJourney />
    </>
  );
}

function InteriorPage({ page, navigate, application, submissionStatus, updateApplication, submitApplication }) {
  const content = pageDetails[page] || {
    title: "Virya",
    headline: "Explore our school.",
    text: "Choose a section from the menu to continue.",
    actions: [["/", "Return Home", "button gold"]],
  };

  if (page === "apply") {
    return (
      <AdmissionsForm
        application={application}
        submissionStatus={submissionStatus}
        updateApplication={updateApplication}
        submitApplication={submitApplication}
        unifiedContent={content}
      />
    );
  }

  return (
    <>
      <section className="interior-hero">
        <div className="interior-hero-inner">
          <Reveal className={page === "academics" ? "academics-hero-content" : ""} direction="left">
            <p className="eyebrow">{content.title}</p>
            <h1>{content.headline}</h1>
            <p>{content.text}</p>
            <div className="hero-actions">
              {content.actions.map(([target, label, className]) =>
                target.startsWith("#") ? (
                  <a className={className} href={target} key={`${page}-${label}`}>
                    {label}
                  </a>
                ) : (
                  <button className={className} type="button" onClick={() => navigate(target)} key={`${page}-${label}`}>
                    {label}
                  </button>
                ),
              )}
            </div>
          </Reveal>
        </div>
      </section>

      {page === "about" ? (
        <AboutPageContent navigate={navigate} />
      ) : (
        <>
          {page === "calendar" && <Calendar />}
          {page === "gallery" ? (
            <Gallery />
          ) : page === "contact" ? (
            <Contact navigate={navigate} contactDetails={contactDetails} />
          ) : page === "news" ? (
            <News navigate={navigate} />
          ) : page === "student-life" ? (
            <StudentLife />
          ) : page === "faculty" ? (
            <Faculty facultyData={teamMembers} />
          ) : page === "admissions" ? (
            <Admissions
              navigate={navigate}
              contactDetails={contactDetails}
              onApply={() => navigate("/apply")}
              applicationForm={
                <AdmissionsForm
                  application={application}
                  submissionStatus={submissionStatus}
                  updateApplication={updateApplication}
                  submitApplication={submitApplication}
                />
              }
            />
          ) : page === "academics" ? (
            <Programs />
          ) : null}
        </>
      )}
    </>
  );
}

export default App;
