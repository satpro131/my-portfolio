import { siteData } from '../data/content';

export default function AboutPage() {
  return (
    <div className="page-content">
      <div className="about-page">
        <div className="projects-header">
          <div className="projects-header-content">
            <h1 className="projects-title">ABOUT ME</h1>
            <p className="projects-subtitle">Education, Technical Skills, Certifications & Publications</p>
          </div>
          <a href="/Satya_Prakash_Resume.pdf" target="_blank" rel="noopener noreferrer" className="about-resume-btn" data-hover>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="btn-icon">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Download Resume
          </a>
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
                  <div className="edu-logo-col">
                    <img src="/assets/iit_bhu_logo.png" alt={`${edu.institution} Logo`} className="edu-logo" />
                  </div>
                  <div className="edu-info-col">
                    <div className="edu-header">
                      <h3 className="edu-degree">{edu.degree}</h3>
                      <span className="edu-period">{edu.period}</span>
                    </div>
                    <h4 className="edu-institution">{edu.institution}</h4>
                    <p className="edu-details">{edu.details}</p>
                  </div>
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

            <section className="about-card" data-hover>
              <h2 className="about-section-title">
                <span className="title-glow-red">//</span> CERTIFICATIONS
              </h2>
              <div className="certs-list">
                {siteData.certifications.map((cert, idx) => (
                  <div key={idx} className="cert-item">
                    <div className="cert-logo-wrapper">
                      <img src="/assets/deeplearning_ai_logo.png" alt="DeepLearning.AI Logo" className="cert-logo" />
                    </div>
                    <div className="cert-content-wrapper">
                      <div className="cert-info">
                        <h3 className="cert-title">{cert.title}</h3>
                        <span className="cert-issuer">{cert.issuer}</span>
                      </div>
                      <span className="cert-year">{cert.year}</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Right Column: Skills */}
          <div className="about-col">
            <section className="about-card" data-hover>
              <h2 className="about-section-title">
                <span className="title-glow-green">//</span> TECHNICAL SKILLS
              </h2>
              <div className="skills-container">
                {siteData.skills.map((group, idx) => {
                  const badgeClasses = [
                    'skill-badge',
                    'skill-badge skill-badge-frontend',
                    'skill-badge skill-badge-systems',
                    'skill-badge skill-badge-tools'
                  ];
                  const badgeClass = badgeClasses[idx % badgeClasses.length];

                  return (
                    <div key={idx} className="skill-group">
                      <h3 className="skill-group-title">{group.category}</h3>
                      <div className="skills-list">
                        {group.items.map((skill) => (
                          <span key={skill} className={badgeClass}>{skill}</span>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
