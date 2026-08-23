import { useState } from "react";
import {
  ProfilePhotoPlaceholder,
  Reveal,
  SafeImage,
} from "../components/SiteElements";
import "./Faculty.css";

const facultyFilters = [
  { id: "all", label: "All", roles: null },
  { id: "founders", label: "Founders", roles: ["တည်ထောင်သူ"] },
  {
    id: "administration",
    label: "Administration",
    roles: ["ကြီးကြပ်အုပ်ချုပ်သူ"],
  },
  { id: "teachers", label: "Teachers", roles: ["ဆရာ", "ဆရာမ"] },
];

export default function Faculty({ facultyData }) {
  const [activeFilter, setActiveFilter] = useState("all");
  const selectedFilter = facultyFilters.find(
    (filter) => filter.id === activeFilter,
  );
  const visibleFaculty = selectedFilter.roles
    ? facultyData.filter(([role]) => selectedFilter.roles.includes(role))
    : facultyData;

  return (
    <section className="section faculty-directory" aria-labelledby="faculty-directory-title">
      <div className="faculty-directory-inner">
        <Reveal className="faculty-directory-heading">
          <p className="eyebrow">Faculty Directory</p>
          <h2 id="faculty-directory-title">Our School Team</h2>
          <p>
            Browse the educators, founders, and administrators currently listed
            in the VIRYA school directory.
          </p>
        </Reveal>

        <Reveal className="faculty-filters" delay={60}>
          <div aria-label="Filter faculty by role">
            {facultyFilters.map((filter) => (
              <button
                className={activeFilter === filter.id ? "active" : ""}
                type="button"
                aria-pressed={activeFilter === filter.id}
                onClick={() => setActiveFilter(filter.id)}
                key={filter.id}
              >
                {filter.label}
              </button>
            ))}
          </div>
          <p aria-live="polite">
            {visibleFaculty.length} {visibleFaculty.length === 1 ? "person" : "people"}
          </p>
        </Reveal>

        <div className="faculty-grid">
          {visibleFaculty.map(([role, name, education, photo], index) => (
            <Reveal delay={(index % 4) * 45} key={name}>
              <article className="faculty-card">
                {photo ? (
                  <SafeImage src={photo} alt={`${name}, ${role} at VIRYA Private School`} />
                ) : (
                  <ProfilePhotoPlaceholder
                    ariaLabel={`Profile photo unavailable for ${name}`}
                  />
                )}
                <div className="faculty-card-content">
                  <p className="faculty-role" lang="my">{role}</p>
                  <h3 lang="my">{name}</h3>
                  {education && <p className="faculty-education">{education}</p>}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
