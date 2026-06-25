import { siteData } from '../data/content';

export default function SideLabels({ onNavigate }) {
  return (
    <>
      {/* Left side label */}
      <a
        href="#projects"
        className="side side--left"
        onClick={(e) => {
          e.preventDefault();
          onNavigate?.('projects');
        }}
        data-hover
      >
        <span className="side-text">{siteData.sideLeft.text}</span>
        <span className="side-nr">{siteData.sideLeft.number}</span>
      </a>

      {/* Right side label */}
      <a
        href="#experience"
        className="side side--right"
        onClick={(e) => {
          e.preventDefault();
          onNavigate?.('experience');
        }}
        data-hover
      >
        <span className="side-text">{siteData.sideRight.text}</span>
        <span className="side-nr">{siteData.sideRight.number}</span>
      </a>
    </>
  );
}
