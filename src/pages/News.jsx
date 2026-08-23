import { Reveal, SafeImage } from "../components/SiteElements";
import { newsItems, upcomingEvents } from "../data/newsContent";
import "./News.css";

export default function News({ navigate }) {
  return (
    <>
      <section className="section news-hub" aria-labelledby="latest-updates-title">
        <div className="news-hub-inner">
          <div className="news-hub-layout">
            <section className="news-updates">
              <Reveal className="news-hub-heading">
                <p className="eyebrow">School Information</p>
                <h2 id="latest-updates-title">Latest Updates</h2>
                <p>
                  Official VIRYA news and announcements will appear here as
                  they are published.
                </p>
              </Reveal>


              {newsItems.length > 0 ? (
                <div className="news-listing">
                  {newsItems.map((item, index) => (
                    <Reveal delay={(index % 3) * 55} key={item.id}>
                      <article>
                        {item.image && (
                          <SafeImage
                            src={item.image}
                            alt={`${item.title} at VIRYA Private School`}
                          />
                        )}
                        <div>
                          <p className="news-meta">
                            <span>{item.category}</span>
                            <time dateTime={item.date}>{item.date}</time>
                          </p>
                          <h3>{item.title}</h3>
                          <p>{item.summary}</p>
                        </div>
                      </article>
                    </Reveal>
                  ))}
                </div>
              ) : (
                <Reveal className="news-empty-state">
                  <h3>No updates published yet</h3>
                  <p>
                    No school news or announcements have been published yet.
                    Please check back for official updates from VIRYA.
                  </p>
                </Reveal>
              )}
            </section>

            <aside className="upcoming-events" aria-labelledby="upcoming-events-title">
              <Reveal>
                <p className="eyebrow">Calendar</p>
                <h2 id="upcoming-events-title">Upcoming Events</h2>
              </Reveal>

              {upcomingEvents.length > 0 ? (
                <div className="upcoming-event-list">
                  {upcomingEvents.map((event, index) => (
                    <Reveal delay={index * 50} key={event.id}>
                      <article>
                        <time dateTime={event.date}>{event.date}</time>
                        <h3>{event.title}</h3>
                        {event.summary && <p>{event.summary}</p>}
                      </article>
                    </Reveal>
                  ))}
                </div>
              ) : (
                <Reveal className="events-empty-state">
                  <p>No upcoming events have been published yet.</p>
                </Reveal>
              )}
            </aside>
          </div>
        </div>
      </section>

      <section className="section news-activity-reference" aria-labelledby="activity-archive-title">
        <Reveal>
          <div>
            <p className="eyebrow">School Life</p>
            <h2 id="activity-archive-title">Looking for activity photos?</h2>
            <p>
              Visit Student Life for photographs from documented VIRYA school
              activities and experiences.
            </p>
          </div>
          <button className="button gold" type="button" onClick={() => navigate("/student-life")}>
            Explore Student Life <span aria-hidden="true">&rarr;</span>
          </button>
        </Reveal>
      </section>
    </>
  );
}
