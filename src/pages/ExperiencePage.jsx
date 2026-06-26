import { useState, useRef, useEffect } from 'react';
import { siteData } from '../data/content';

export default function ExperiencePage() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedExp, setSelectedExp] = useState(null);
  const containerRef = useRef(null);
  const itemsRef = useRef([]);

  // Setup items array length dynamically
  if (itemsRef.current.length !== siteData.experience.length) {
    itemsRef.current = Array(siteData.experience.length).fill(null);
  }

  // Update active item on scroll based on viewport center
  const handleScroll = () => {
    if (!containerRef.current) return;
    const containerRect = containerRef.current.getBoundingClientRect();
    const containerCenter = containerRect.top + containerRect.height / 2;

    let closestIndex = 0;
    let minDistance = Infinity;

    itemsRef.current.forEach((el, index) => {
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const elCenter = rect.top + rect.height / 2;
      const distance = Math.abs(containerCenter - elCenter);

      // Compute individual 3D perspective attributes based on distance from center
      const maxDistance = 400; // range of effect
      const relativeDist = Math.max(-1, Math.min(1, (elCenter - containerCenter) / maxDistance));
      
      // Calculate depth and rotation values
      const translateZ = -Math.abs(relativeDist) * 150; // push back when far from center
      const rotateX = relativeDist * 30; // tilt up/down
      const opacity = 1 - Math.abs(relativeDist) * 0.6; // fade out slightly

      el.style.setProperty('--card-z', `${translateZ}px`);
      el.style.setProperty('--card-rotate-x', `${rotateX}deg`);
      el.style.setProperty('--card-opacity', `${opacity}`);
      el.style.setProperty('--card-scale', `${1 - Math.abs(relativeDist) * 0.15}`);

      if (distance < minDistance) {
        minDistance = distance;
        closestIndex = index;
      }
    });

    setActiveIndex(closestIndex);
  };

  useEffect(() => {
    handleScroll();
    // Re-check after small timeout to ensure layout is complete
    const timer = setTimeout(handleScroll, 100);
    return () => clearTimeout(timer);
  }, []);

  const scrollToNode = (index) => {
    const el = itemsRef.current[index];
    if (el && containerRef.current) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <div className="page-content">
      <div className="experience-page-container">
        
        {/* LEFT COLUMN: SYSTEM TELEMETRY HUD */}
        <div className="hud-panel">
          <div className="hud-header">
            <span className="hud-title">SYSTEM TELEMETRY</span>
            <span className="hud-status blink">SCANNING...</span>
          </div>

          {/* Core Radar Scanner Visual */}
          <div className="radar-scanner">
            <div className="radar-circle" />
            <div className="radar-sweep" />
            <div className="radar-grid" />
            <div className="radar-dots">
              {siteData.experience.map((exp, idx) => (
                <div 
                  key={exp.id} 
                  className={`radar-dot ${activeIndex === idx ? 'active' : ''}`}
                  style={{
                    transform: `rotate(${idx * (360 / siteData.experience.length)}deg) translate(50px) rotate(-${idx * (360 / siteData.experience.length)}deg)`
                  }}
                  onClick={() => scrollToNode(idx)}
                />
              ))}
            </div>
          </div>

          <div className="hud-stats">
            <div className="hud-stat-box">
              <span className="hud-stat-label">TOTAL TIMELINE</span>
              <span className="hud-stat-value">8+ YEARS</span>
            </div>
          </div>

          {/* Quick Node Selector */}
          <div className="node-selector">
            <span className="selector-label">TIMELINE MAP</span>
            <div className="selector-buttons">
              {siteData.experience.map((exp, idx) => (
                <button
                  key={exp.id}
                  className={`selector-btn ${activeIndex === idx ? 'active' : ''}`}
                  onClick={() => scrollToNode(idx)}
                >
                  <span className="btn-index">0{idx + 1}</span>
                  <span className="btn-label">{exp.company.split(' ')[0]}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="hud-console">
            <span className="console-line">&gt; active_node: {siteData.experience[activeIndex]?.company}</span>
            <span className="console-line">&gt; period: {siteData.experience[activeIndex]?.period}</span>
            <span className="console-line">&gt; location: {siteData.experience[activeIndex]?.location}</span>
          </div>
        </div>

        {/* RIGHT COLUMN: 3D TIMELINE SCROLL */}
        <div 
          className="experience-scroll-viewport" 
          ref={containerRef}
          onScroll={handleScroll}
        >
          <div className="experience-scroll-header">
            <h1 className="experience-title">JOURNEY</h1>
          </div>

          <div className="timeline-perspective-container">
            <div className="timeline-dynamic-line" style={{
              height: `${((activeIndex) / (siteData.experience.length - 1 || 1)) * 100}%`
            }} />
            
            {siteData.experience.map((exp, index) => (
              <div 
                key={exp.id} 
                ref={el => itemsRef.current[index] = el}
                className={`timeline-3d-card ${activeIndex === index ? 'active' : ''}`}
                style={{
                  '--card-z': '0px',
                  '--card-rotate-x': '0deg',
                  '--card-scale': '1',
                  '--card-opacity': '1'
                }}
              >
                <div className="card-connector-line" />
                <div className="card-node-indicator" onClick={() => scrollToNode(index)} />
                
                <div className="card-inner">
                  <div className="card-glow" />
                  
                  <div className="card-header">
                    <span className="card-period">{exp.period}</span>
                    <span className="card-location">{exp.location}</span>
                  </div>

                  <h3 className="card-role">{exp.role}</h3>
                  <h4 className="card-company">{exp.company}</h4>
                  
                  <p className="card-desc">
                    {exp.description.split('\n')[0]}
                  </p>

                  <div className="card-tags">
                    {exp.tags.slice(0, 4).map((tag) => (
                      <span key={tag} className="card-tag">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="card-actions">
                    <button 
                      className="card-btn-diagnostic" 
                      onClick={() => setSelectedExp(exp)}
                    >
                      <span className="btn-glitch-text">LOAD DIAGNOSTIC LOGS</span>
                      <span className="btn-icon-terminal">&gt;_</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="scroll-spacer" />
        </div>

      </div>

      {/* TERMINAL DIAGNOSTIC MODAL */}
      {selectedExp && (
        <div className="diagnostic-modal-overlay" onClick={() => setSelectedExp(null)}>
          <div className="diagnostic-modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-terminal-header">
              <span className="terminal-title">DIAGNOSTIC_LOG // {selectedExp.company.toUpperCase()}</span>
              <button className="terminal-close" onClick={() => setSelectedExp(null)}>✕</button>
            </div>
            <div className="modal-terminal-body">
              <div className="terminal-meta-grid">
                <div><span className="term-label">ROLE:</span> {selectedExp.role}</div>
                <div><span className="term-label">PERIOD:</span> {selectedExp.period}</div>
                <div><span className="term-label">LOCATION:</span> {selectedExp.location}</div>
                <div><span className="term-label">STATUS:</span> SHIPPED_PRODUCTION</div>
              </div>

              <div className="terminal-divider" />

              {selectedExp.metrics && (
                <>
                  <div className="terminal-metrics-showcase">
                    {selectedExp.metrics.map((m, idx) => (
                      <div key={idx} className="terminal-metric-card">
                        <span className="metric-val">{m.value}</span>
                        <span className="metric-lbl">{m.label}</span>
                      </div>
                    ))}
                  </div>
                  <div className="terminal-divider" />
                </>
              )}

              <div className="terminal-content-logs">
                <span className="log-line-indicator">SYS.LOG.INIT // loading database entries...</span>
                <span className="log-line-success">SYS.LOG.SUCCESS // entries loaded successfully.</span>
                
                <div className="log-details-list">
                  {selectedExp.description.split('\n').map((line, idx) => (
                    <div key={idx} className="log-detail-line">
                      <span className="log-bullet">&gt;&gt;</span>
                      <p>{line.startsWith('•') ? line.substring(1).trim() : line}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="terminal-divider" />

              <div className="terminal-tags-grid">
                <span className="term-label">PROVISIONED_STACK:</span>
                <div className="terminal-tags-container">
                  {selectedExp.tags.map(tag => (
                    <span key={tag} className="terminal-tag-item">{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
