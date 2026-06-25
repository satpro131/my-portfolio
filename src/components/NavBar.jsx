import { siteData } from '../data/content';

export default function NavBar({ currentPage, onNavigate }) {
  return (
    <nav className="site-nav" id="siteNav">
      <div
        className="nav-left"
        onClick={(e) => {
          e.preventDefault();
          onNavigate?.('home');
        }}
        data-hover
        style={{ cursor: 'none' }}
      >
        <span className="nav-left-text">{siteData.navLeftText}</span>
      </div>

      <div className="nav-icons">
        {/* Three nav icons — subtle decorative */}
        <span className="nav-icon">
          <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
            <circle cx="10" cy="10" r="7" />
          </svg>
        </span>
        <span className="nav-icon">
          <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
            <rect x="4" y="4" width="12" height="12" rx="2" />
          </svg>
        </span>
        <span className="nav-icon">
          <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
            <polygon points="10,3 17,17 3,17" />
          </svg>
        </span>
      </div>

      <div className="nav-right">
        <span className="nav-right-text">
          {currentPage === 'home'
            ? 'PORTFOLIO'
            : currentPage === 'satpro-ai'
            ? 'SATPRO.AI'
            : currentPage?.toUpperCase()}
        </span>
      </div>
    </nav>
  );
}
