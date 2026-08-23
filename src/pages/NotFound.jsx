import { Reveal } from "../components/SiteElements";

export default function NotFound({ navigate }) {
  return (
    <>
      <section className="interior-hero">
        <Reveal direction="left">
          <p className="eyebrow">404</p>
          <h1>Page not found.</h1>
          <p>The page you requested is not available.</p>
          <div className="hero-actions">
            <button className="button gold" type="button" onClick={() => navigate("/")}>
              Return Home
            </button>
          </div>
        </Reveal>
      </section>
    </>
  );
}
