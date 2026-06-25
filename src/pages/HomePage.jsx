import { useState } from 'react';
import { siteData } from '../data/content';
import SideLabels from '../components/SideLabels';

export default function HomePage({ onNavigate }) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    onNavigate?.('satpro-ai', { initialQuery: query });
  };

  return (
    <>
      <SideLabels onNavigate={onNavigate} />

      {/* Portrait image section */}
      <div className="portrait-section">
        <img
          className="portrait-img"
          src="/satpro_portrait.png"
          alt="Portrait"
          loading="eager"
        />
      </div>

      {/* Name overlay */}
      <div className="name-overlay">
        <div className="name-text name-text--outline">{siteData.nameOutline}</div>
        <div className="name-text">{siteData.name}</div>
      </div>

      {/* AI Agent HUD Console Prompt */}
      <div className="ai-agent-teaser">
        <div className="teaser-badge">
          <span className="pulse-dot"></span>
          SATPRO.AI: ACTIVE
        </div>
        <form onSubmit={handleSubmit} className="teaser-input-wrapper">
          <span className="teaser-prompt">satpro-chat:~$</span>
          <input
            type="text"
            className="teaser-input"
            placeholder="Ask AI about my projects, experience, skills..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            data-hover
          />
          <button type="submit" className="teaser-btn" data-hover>
            ASK
          </button>
        </form>
      </div>
    </>
  );
}
