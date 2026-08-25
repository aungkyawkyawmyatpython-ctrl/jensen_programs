import "./Home.css";
import { Reveal, SafeImage } from "../components/SiteElements";

const HERO_IMAGE = "/DSC00001.jpg";

export default function Home({ navigate }) {
  return (
    <section className="hero" aria-labelledby="home-hero-title">
      <SafeImage
        className="hero-backdrop"
        src={HERO_IMAGE}
        alt="Virya Private School students and community gathered on campus"
        loading="eager"
      />
      <div className="hero-shade" aria-hidden="true" />

      <Reveal className="hero-inner" direction="left">
        

        <div className="hero-copy">
          <p className="eyebrow">Independent private school - Kindergarten to Grade 9</p>
          <h1 id="home-hero-title">Learn with courage and grow with purpose.</h1>
          <p className="hero-introduction">
            Virya is a close-knit community in Hpa An where ambitious academics,
            personal mentorship, and creative exploration help every student
            build the confidence to shape their future.
          </p>

          <div className="hero-actions" aria-label="Explore Virya">
            <button
              className="button gold"
              type="button"
              onClick={() => navigate("/apply")}
            >
              Start Your Application
            </button>
            <button
              className="button outline"
              type="button"
              onClick={() => navigate("/about")}
            >
              Discover Our School
            </button>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
