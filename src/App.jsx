import { useEffect, useState } from "react";
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

const SCHOOL_IMAGES = {
  academics: "/DSC00134.jpg",
  admissions: "/DSC00136.jpg",
  studentLife: "/DSC00344.jpg",
  campus: "/DSC00648.jpg",
  frontView: "/viryaprivateschool_frontview.jpg",

  story: "/IMG_1105.JPG",
  community: "/IMG_1111.JPG",
};

const menuGroups = [
  {
    id: "academics",
    title: "Academics",
    links: ["Kindergarten", "Primary School", "Middle School"],
    image: SCHOOL_IMAGES.academics,
  },
  {
    id: "admissions",
    title: "Admissions",
    links: ["How to Apply", "Programs Offered", "Tuition & Fees", "Admissions FAQ"],
    image: SCHOOL_IMAGES.admissions,
  },
  {
    id: "student-life",
    title: "Student Life",
    links: ["Science Fair", "Visit to Yangon", "Football Competition", "Debate", "Martyrs' Day"],
    image: SCHOOL_IMAGES.studentLife,
  },
  {
    id: "faculty",
    title: "Faculty",
    links: ["Faculty Directory", "Founders", "Administration", "Teachers"],
    image: SCHOOL_IMAGES.community,
  },
  {
    id: "about",
    title: "About",
    links: ["Mission", "Leadership", "Campus", "Careers"],
    image: SCHOOL_IMAGES.community,
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

const stats = [
  ["14", "Average class size"],
  ["8:1", "Student-advisor ratio"],
  ["24", "Clubs and studios"],
  ["96%", "Families recommend Virya"],
];

const facilities = [
  ["Discovery Lab", "Hands-on science, robotics, and design challenges for young researchers."],
  ["Arts House", "Music rooms, drama studio, visual arts, and student exhibition space."],
  ["Wellbeing Center", "Advisory, counseling, learning support, and family partnership."],
  ["Athletics Court", "Daily movement, team sports, fitness, and community events."],
];

const news = [
  ["Academics", "Virya students present climate solutions at the annual inquiry showcase."],
  ["Community", "Family service day supports local literacy and food security partners."],
  ["Arts", "Middle school theatre ensemble opens spring performance week."],
];

const events = [
  ["Jun 18", "Open Morning", "Tour classrooms and meet admissions."],
  ["Jun 25", "Arts Evening", "Student music, theatre, and gallery work."],
  ["Jul 08", "Admissions Q&A", "A practical session for applicant families."],
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
    actions: [["admissions", "Ask About Placement", "button gold"]],
  },
  admissions: {
    title: "Admissions",
    headline: "Admissions",
    text: "Explore programs from Kindergarten through Grade 9 and start an admissions inquiry with VIRYA.",
    actions: [["admissions-form", "Apply Now", "button gold"]],
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
    actions: [["community", "View School Numbers", "button gold"]],
  },
  visit: {
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
  community: {
    title: "Virya by the Numbers",
    headline: "Small enough to know every child.",
    text: "Families choose Virya for close advising, strong academics, and a culture that feels personal.",
    actions: [["about", "Our Mission", "button gold"]],
  },
  calendar: {
    title: "School Calendar",
    headline: "Plan the weeks ahead.",
    text: "Open mornings, performances, conferences, exhibitions, holidays, and admissions milestones live here.",
    actions: [["visit", "Plan a Visit", "button gold"]],
  },
  portal: {
    title: "Portal",
    headline: "Family and student resources.",
    text: "A future home for forms, messages, payments, and student schedules.",
    actions: [["calendar", "View Calendar", "button gold"]],
  },
  directory: {
    title: "Directory",
    headline: "Find the right office.",
    text: "Admissions, student support, school leadership, faculty teams, and operations contacts.",
    actions: [["admissions", "Admissions Office", "button gold"]],
  },
};

const utilityLinks = [
  ["calendar", "Calendar"],
  ["portal", "Parent Portal"],
  ["directory", "Directory"],
  ["news", "News"],
];

const pageHighlights = {
  about: [
    ["Mission", "A private school with a public purpose", "Virya is built around scholarship, character, wellbeing, and service.", "community", "View Numbers"],
    ["Leadership", "People who guide the culture", "Faculty and school leaders work closely with families and students.", "directory", "Find Offices"],
    ["Campus", "A learning community with room to grow", "Classrooms, labs, arts spaces, and advisory areas support the full school day.", "visit", "Visit Campus"],
  ],
  visit: events.map(([date, title, text]) => [date, title, text, "admissions", "Request Visit"]),
  news: news.map(([tag, title]) => [tag, title, "Read more from classrooms, arts, service, and student life.", "news", "Read More"]),
  community: [
    ["14", "Average class size", "Small groups help teachers know every learner well.", "about", "Our Mission"],
    ["8:1", "Student-advisor ratio", "Close advising supports confidence, planning, and wellbeing.", "student-life", "Student Life"],
    ["96%", "Families recommend Virya", "Families value the balance of ambition, care, and belonging.", "admissions", "Talk to Us"],
  ],
  calendar: events.map(([date, title, text]) => [date, title, text, "visit", "Plan Around It"]),
  portal: [
    ["Forms", "Family documents", "Admissions records, permission forms, and school documents are organized here.", "directory", "Contact Office"],
    ["Messages", "School updates", "Families can keep up with school reminders, events, and community notes.", "news", "Latest News"],
    ["Schedules", "Dates and routines", "Calendar milestones, performances, conferences, and admissions dates stay easy to find.", "calendar", "Open Calendar"],
  ],
  directory: [
    ["Admissions", "Enrollment questions", "For applications, visits, placement, tuition, and start dates.", "admissions", "Apply"],
    ["Student Support", "Wellbeing and learning support", "For advisory, counseling, learning needs, and family partnership.", "student-life", "Student Life"],
    ["Operations", "Campus and records", "For documents, schedules, general office help, and school logistics.", "portal", "Family Portal"],
  ],
};

const gradeOptions = programs.map(([title]) => title);

const searchItems = [
  ...menuGroups.map((group) => ({
    title: group.title,
    text: group.links.join(", "),
    target: group.id,
    type: "Section",
  })),
  ...programs.map(([title, range, text]) => ({
    title,
    text: `${range}. ${text}`,
    target: "academics",
    type: "Program",
  })),
  ...events.map(([date, title, text]) => ({
    title,
    text: `${date}. ${text}`,
    target: "calendar",
    type: "Event",
  })),
  ...missionVision.map(([title, text]) => ({
    title,
    text,
    target: "about",
    type: "About",
  })),
  {
    title: "Our Story",
    text: "Virya International Academy began in 2021 and Virya Private School followed in 2023.",
    target: "about",
    type: "About",
  },
  ...news.map(([tag, title]) => ({
    title,
    text: tag,
    target: "news",
    type: "News",
  })),
  { title: "Apply", text: "Start an admissions inquiry", target: "admissions", type: "Action" },
  { title: "Visit Virya", text: "Open mornings, tours, and student shadow days", target: "visit", type: "Action" },
  { title: "Parent Portal", text: "Forms, schedules, messages, and family resources", target: "portal", type: "Resource" },
];

function App() {
  const [page, setPage] = useState("home");
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

  const navigate = (nextPage) => {
    setPage(nextPage);
    setSearchOpen(false);
    setSearchTerm("");
    setMobileMenuOpen(false);
    setHeaderHidden(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
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
      const response = await fetch("/api/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
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
        page={page}
        searchOpen={searchOpen}
        setSearchOpen={setSearchOpen}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        searchResults={searchResults}
        utilityLinks={utilityLinks}
      />

      {page === "home" && (
        <>
          <Home navigate={navigate} />
          <Notice />
          <MissionVision />
          <OurStory />
          <Programs />
          <Why navigate={navigate} />
          <Campus navigate={navigate} showHomePreview />
          <StoryStrip navigate={navigate} />
          <NewsEvents />
          <AdmissionsForm
            application={application}
            submissionStatus={submissionStatus}
            updateApplication={updateApplication}
            submitApplication={submitApplication}
          />
        </>
      )}

      {page !== "home" && (
        <InteriorPage
          page={page}
          navigate={navigate}
          application={application}
          submissionStatus={submissionStatus}
          updateApplication={updateApplication}
          submitApplication={submitApplication}
        />
      )}

      <Footer navigate={navigate} contactDetails={contactDetails} />
    </main>
  );
}

function Notice() {
  return (
    <Reveal>
      <section className="notice">
        <div>
          <h2>Admissions for 2026 are open</h2>
          <p>Open mornings, student visits, and family consultations are available this month.</p>
        </div>
      </section>
    </Reveal>
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
  return (
    <section className="section our-story" id="story">
      <Reveal className="story-media" direction="left">
        <SafeImage src={SCHOOL_IMAGES.story} alt="Virya school community" />
      </Reveal>
      <Reveal className="story-content" direction="right">
        <p className="eyebrow">{aboutPage ? "About VIRYA" : "Our Story"}</p>
        <h2>A small school with a future-focused mission.</h2>
        {storyParagraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
        {showTimeline && <JourneyTimeline />}
      </Reveal>
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
                          <span aria-hidden="true">
                            {title === "Kindergarten" ? "K" : title.replace("Grade ", "")}
                          </span>
                        </div>
                        <p>{text}</p>
                      </article>
                    </Reveal>
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Why({ navigate }) {
  return (
    <section className="section why" id="about">
      <Reveal direction="left">
        <p className="eyebrow">Why Choose Virya</p>
        <h2>Ambition, support, and belonging in one school day.</h2>
        <p>
          Students learn through direct instruction, guided inquiry, advisory,
          performance, service, and reflection. It feels rigorous because it is personal.
        </p>
        <button type="button" onClick={() => navigate("community")}>Virya by the numbers</button>
      </Reveal>
      <StatsGrid />
    </section>
  );
}

function StatsGrid() {
  return (
    <div className="stat-grid" id="community">
      {stats.map(([value, label], index) => (
        <Reveal delay={index * 70} key={label}>
          <article className="stat-card">
            <strong>{value}</strong>
            <span>{label}</span>
          </article>
        </Reveal>
      ))}
    </div>
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
        {aboutPage ? (
          <p className="about-copy-placeholder about-facilities-placeholder">
            Official facilities information is awaiting confirmation from VIRYA
            staff.
          </p>
        ) : (
          <div className="facility-list">
            {facilities.map(([title, text], index) => (
              <Reveal delay={index * 60} key={title}>
                <article>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </article>
              </Reveal>
            ))}
          </div>
        )}
        {showHomePreview && (
          <button className="campus-preview" type="button" onClick={() => navigate("about")}>
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

function StoryStrip({ navigate }) {
  return (
    <Reveal>
      <section className="section story-strip">
        <div>
          <p className="eyebrow">Student Success</p>
          <h2>"Virya made school feel challenging and safe at the same time."</h2>
          <p>
            A Grade 8 student reflects on learning to lead a science team, perform
            on stage, and ask better questions in every class.
          </p>
        </div>
        <button className="button navy" type="button" onClick={() => navigate("news")}>Read Stories</button>
      </section>
    </Reveal>
  );
}

function NewsEvents() {
  return (
    <section className="section news-events" id="news">
      <div className="news-column">
        <Reveal className="section-heading">
          <p className="eyebrow">Featured News</p>
          <h2>What is happening at Virya.</h2>
        </Reveal>
        {news.map(([tag, title], index) => (
          <Reveal delay={index * 65} key={title}>
            <article className="news-card">
              <span>{tag}</span>
              <h3>{title}</h3>
            </article>
          </Reveal>
        ))}
      </div>
      <div className="events-column" id="visit">
        <Reveal className="section-heading">
          <p className="eyebrow">Upcoming Events</p>
          <h2>Ways to connect.</h2>
        </Reveal>
        {events.map(([date, title, text], index) => (
          <Reveal delay={index * 65} key={title}>
            <article className="event-card">
              <time>{date}</time>
              <div>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function AdmissionsForm({ application, submissionStatus, updateApplication, submitApplication }) {
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
      <Reveal direction="right">
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
      </Reveal>
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
    actions: [["home", "Return Home", "button gold"]],
  };

  const focusAdmissionsForm = () => {
    const formSection = document.getElementById("admissions-inquiry");
    if (!formSection) return;
    formSection.scrollIntoView({ behavior: "smooth", block: "start" });
    window.setTimeout(() => {
      formSection.querySelector("input")?.focus({ preventScroll: true });
    }, 450);
  };

  return (
    <>
      <section className="interior-hero">
        <Reveal direction="left">
          <p className="eyebrow">{content.title}</p>
          <h1>{content.headline}</h1>
          <p>{content.text}</p>
          <div className="hero-actions">
            {content.actions.map(([target, label, className]) => (
              <button className={className} type="button" onClick={() => target === "admissions-form" ? focusAdmissionsForm() : navigate(target)} key={`${page}-${label}`}>
                {label}
              </button>
            ))}
          </div>
        </Reveal>
      </section>

      {page === "about" ? (
        <AboutPageContent navigate={navigate} />
      ) : (
        <>
          {page === "visit" ? (
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
              onApply={focusAdmissionsForm}
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
          ) : (
            <InteriorHighlights page={page} navigate={navigate} />
          )}

          {page === "calendar" && <NewsEvents />}
        </>
      )}
    </>
  );
}

function InteriorHighlights({ page, navigate }) {
  const highlights = pageHighlights[page] || pageHighlights.about;

  return (
    <section className="section page-highlights">
      <Reveal className="section-heading">
        <p className="eyebrow">Explore</p>
        <h2>Choose the path that fits your family.</h2>
      </Reveal>
      <div className="highlight-grid">
        {highlights.map(([kicker, title, text, target, action], index) => (
          <Reveal delay={index * 70} key={`${page}-${kicker}-${title}`}>
            <article className="highlight-card">
              <span>{kicker}</span>
              <h3>{title}</h3>
              <p>{text}</p>
              <button type="button" onClick={() => navigate(target)}>{action}</button>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export default App;
