import { siteData } from '../data/content';

export default function AboutPage() {
  return (
    <div className="page-content">
      <div className="about-page">
        <div className="projects-header">
          <h1 className="projects-title">ABOUT ME</h1>
          <p className="projects-subtitle">Education, Technical Skills, Certifications & Publications</p>
        </div>

        <div className="about-sections-grid">
          {/* Left Column: Education & Publications */}
          <div className="about-col">
            <section className="about-card" data-hover>
              <h2 className="about-section-title">
                <span className="title-glow-cyan">//</span> EDUCATION
              </h2>
              {siteData.education.map((edu, idx) => (
                <div key={idx} className="edu-item">
                  <div className="edu-header">
                    <h3 className="edu-degree">{edu.degree}</h3>
                    <span className="edu-period">{edu.period}</span>
                  </div>
                  <h4 className="edu-institution">{edu.institution}</h4>
                  <p className="edu-details">{edu.details}</p>
                </div>
              ))}
            </section>

            <section className="about-card" data-hover>
              <h2 className="about-section-title">
                <span className="title-glow-gold">//</span> PUBLICATIONS
              </h2>
              {siteData.publications.map((pub, idx) => (
                <div key={idx} className="pub-item">
                  <div className="pub-header">
                    <h3 className="pub-title">{pub.title}</h3>
                    <span className="pub-year">{pub.year}</span>
                  </div>
                  <h4 className="pub-venue">{pub.venue}</h4>
                  <p className="pub-desc">{pub.description}</p>
                </div>
              ))}
            </section>
          </div>

          {/* Right Column: Skills & Certifications */}
          <div className="about-col">
            <section className="about-card" data-hover>
              <h2 className="about-section-title">
                <span className="title-glow-green">//</span> TECHNICAL SKILLS
              </h2>
              <div className="skills-container">
                <div className="skill-group">
                  <h3 className="skill-group-title">Languages</h3>
                  <div className="skills-list">
                    {siteData.skills.languages.map((skill) => (
                      <span key={skill} className="skill-badge">{skill}</span>
                    ))}
                  </div>
                </div>

                <div className="skill-group">
                  <h3 className="skill-group-title">Frontend Frameworks</h3>
                  <div className="skills-list">
                    {siteData.skills.frontend.map((skill) => (
                      <span key={skill} className="skill-badge skill-badge-frontend">{skill}</span>
                    ))}
                  </div>
                </div>

                <div className="skill-group">
                  <h3 className="skill-group-title">Systems & Cryptography</h3>
                  <div className="skills-list">
                    {siteData.skills.systems.map((skill) => (
                      <span key={skill} className="skill-badge skill-badge-systems">{skill}</span>
                    ))}
                  </div>
                </div>

                <div className="skill-group">
                  <h3 className="skill-group-title">Tools & Infrastructure</h3>
                  <div className="skills-list">
                    {siteData.skills.tools.map((skill) => (
                      <span key={skill} className="skill-badge skill-badge-tools">{skill}</span>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            <section className="about-card" data-hover>
              <h2 className="about-section-title">
                <span className="title-glow-red">//</span> CERTIFICATIONS
              </h2>
              <div className="certs-list">
                {siteData.certifications.map((cert, idx) => (
                  <div key={idx} className="cert-item">
                    <div className="cert-info">
                      <h3 className="cert-title">{cert.title}</h3>
                      <span className="cert-issuer">{cert.issuer}</span>
                    </div>
                    <span className="cert-year">{cert.year}</span>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
