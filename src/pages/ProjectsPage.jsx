import { siteData } from '../data/content';

export default function ProjectsPage() {
  return (
    <div className="page-content">
      <div className="projects-page">
        <div className="projects-header">
          <h1 className="projects-title">PROJECTS</h1>
          <p className="projects-subtitle">Selected works — Brand, UI/UX, Digital</p>
        </div>

        <div className="projects-grid">
          {siteData.projects.map((project) => (
            <article key={project.id} className="project-card" data-hover>
              <div style={{ overflow: 'hidden', borderRadius: '8px' }}>
                <img
                  className="project-card-img"
                  src={project.image}
                  alt={project.title}
                  loading="lazy"
                />
              </div>
              <div className="project-card-info">
                <h3 className="project-card-title">{project.title}</h3>
                <p className="project-card-desc">{project.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
