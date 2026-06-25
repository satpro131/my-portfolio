import { useRef, useCallback } from 'react';
import { siteData } from '../data/content';

export default function ProjectsPage() {
  const cardsRef = useRef([]);

  const handleMouseMove = useCallback((e, index) => {
    const card = cardsRef.current[index];
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Rotation: max ±12 degrees
    const rotateX = ((y - centerY) / centerY) * -12;
    const rotateY = ((x - centerX) / centerX) * 12;

    // Glow position as percentage
    const glowX = (x / rect.width) * 100;
    const glowY = (y / rect.height) * 100;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    card.style.setProperty('--glow-x', `${glowX}%`);
    card.style.setProperty('--glow-y', `${glowY}%`);
  }, []);

  const handleMouseLeave = useCallback((index) => {
    const card = cardsRef.current[index];
    if (!card) return;
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    card.style.setProperty('--glow-x', '50%');
    card.style.setProperty('--glow-y', '50%');
  }, []);

  return (
    <div className="page-content">
      <div className="projects-page">
        <div className="projects-header">
          <h1 className="projects-title">PROJECTS</h1>
          <p className="projects-subtitle">Selected works — Architecture, Systems & Product Engineering</p>
        </div>

        <div className="projects-grid-3d">
          {siteData.projects.map((project, index) => (
            <article
              key={project.id}
              className={`project-card-3d ${index === 0 ? 'project-card-3d--hero' : ''}`}
              ref={(el) => (cardsRef.current[index] = el)}
              onMouseMove={(e) => handleMouseMove(e, index)}
              onMouseLeave={() => handleMouseLeave(index)}
              style={{ animationDelay: `${index * 0.12}s` }}
              data-hover
            >
              {/* Animated gradient border */}
              <div className="project-card-border" />

              {/* Mouse-tracking glow layer */}
              <div className="project-card-glow" />

              {/* Project number watermark */}
              <span className="project-number">
                {String(index + 1).padStart(2, '0')}
              </span>

              {/* Image */}
              <div className="project-card-img-wrap">
                <img
                  className="project-card-3d-img"
                  src={project.image}
                  alt={project.title}
                  loading="lazy"
                />
              </div>

              {/* Info block */}
              <div className="project-card-3d-info">
                <h3 className="project-card-3d-title">{project.title}</h3>
                <p className="project-card-3d-desc">{project.description}</p>

                {/* Tech tag badges */}
                <div className="project-tags">
                  {project.tags.map((tag) => (
                    <span key={tag} className="project-tag">{tag}</span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
