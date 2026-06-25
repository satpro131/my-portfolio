import { siteData } from '../data/content';

export default function ExperiencePage() {
  return (
    <div className="page-content">
      <div className="experience-page">
        <div className="projects-header">
          <h1 className="projects-title">EXPERIENCE</h1>
          <p className="projects-subtitle">Career Journey — Architecture, Leadership & Systems</p>
        </div>

        <div className="timeline-container">
          <div className="timeline-line" />
          {siteData.experience.map((exp, index) => (
            <div key={exp.id} className="timeline-item" data-hover style={{ animationDelay: `${index * 0.15}s` }}>
              <div className="timeline-dot" />
              <div className="timeline-content">
                <div className="timeline-meta">
                  <span className="timeline-period">{exp.period}</span>
                  <span className="timeline-location">{exp.location}</span>
                </div>
                <h3 className="timeline-role">{exp.role}</h3>
                <h4 className="timeline-company">{exp.company}</h4>
                <p className="timeline-desc">{exp.description}</p>
                <div className="timeline-tags">
                  {exp.tags.map((tag) => (
                    <span key={tag} className="timeline-tag-badge">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
