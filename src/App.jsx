import { useState, useCallback } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { useCustomCursor } from './hooks/useCustomCursor';
import { siteData } from './data/content';

import Preloader from './components/Preloader';
import NavBar from './components/NavBar';
import MenuDots from './components/MenuDots';
import NavPanel from './components/NavPanel';
import FluidBackground from './components/FluidBackground';
import TransitionOverlay from './components/TransitionOverlay';

import HomePage from './pages/HomePage';
import ProjectsPage from './pages/ProjectsPage';
import ExperiencePage from './pages/ExperiencePage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import AIAgentPage from './pages/AIAgentPage';

export default function App() {
  const [loading, setLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [transitioning, setTransitioning] = useState(false);
  const [transitionText, setTransitionText] = useState('');
  const [nextPage, setNextPage] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();
  const cursorRef = useCustomCursor();

  const path = location.pathname === '/' ? 'home' : location.pathname.substring(1);

  const handlePreloaderComplete = useCallback(() => {
    setLoading(false);
  }, []);

  const navigateTo = useCallback((page, navState) => {
    const targetPath = page === 'home' ? '/' : `/${page}`;
    if (targetPath === location.pathname || transitioning) return;

    setTransitionText(page.toUpperCase());
    setNextPage({ path: targetPath, state: navState });
    setTransitioning(true);
  }, [location.pathname, transitioning]);

  const handleTransitionDone = useCallback(() => {
    if (nextPage) {
      navigate(nextPage.path, { state: nextPage.state });
      setNextPage(null);
    }
    setTransitioning(false);
  }, [nextPage, navigate]);

  return (
    <>
      {/* Custom cursor */}
      <div className="custom-cursor" ref={cursorRef} />

      {/* Preloader */}
      {loading && <Preloader onComplete={handlePreloaderComplete} />}

      {/* Background */}
      <div className="bg-layer">
        <div className="bg-noise" />
      </div>

      {/* CRT Monitor mockup wrapper */}
      <div className={`crt-container theme-${path}`}>
        <div className="crt-bezel">
          <div className="crt-screen">
            {path === 'home' && <FluidBackground />}
            {/* Main app */}
            <div className="app-container">
              {/* Nav bar */}
              <NavBar currentPage={path} onNavigate={navigateTo} />

              {/* Menu dots */}
              <MenuDots onClick={() => setMenuOpen(true)} />

              {/* Page content using React Router */}
              <Routes>
                <Route path="/" element={<HomePage onNavigate={navigateTo} />} />
                <Route path="/projects" element={<ProjectsPage />} />
                <Route path="/experience" element={<ExperiencePage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/satpro-ai" element={<AIAgentPage />} />
              </Routes>

              {/* Status bar */}
              <div className="status-bar">
                <div className="status-bar-left">
                  <span>{siteData.statusBar.left}</span>
                  <span>{siteData.statusBar.center}</span>
                </div>
                <div className="status-bar-right">
                  <span>{siteData.statusBar.right}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Nav panel (fullscreen menu) */}
      <NavPanel
        isOpen={menuOpen}
        onClose={() => setMenuOpen(false)}
        onNavigate={navigateTo}
      />

      {/* Page transition overlay */}
      <TransitionOverlay
        active={transitioning}
        text={transitionText}
        onDone={handleTransitionDone}
      />
    </>
  );
}
