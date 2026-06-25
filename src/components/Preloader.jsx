import { useState, useEffect, useRef } from 'react';

export default function Preloader({ onComplete }) {
  const [phase, setPhase] = useState('bars'); // bars -> glitch -> collapse -> fadeout
  const [text, setText] = useState('INITIALIZING...');
  const innerRef = useRef(null);

  useEffect(() => {
    const texts = [
      'INITIALIZING...',
      'LOADING SYSTEM...',
      'CALIBRATING DISPLAY...',
      'SIGNAL ACQUIRED',
      'WELCOME',
    ];

    let idx = 0;
    const textInterval = setInterval(() => {
      idx++;
      if (idx < texts.length) {
        setText(texts[idx]);
      }
    }, 500);

    // Start glitching
    const glitchTimer = setTimeout(() => {
      setPhase('glitch');
      innerRef.current?.classList.add('glitching');
    }, 1600);

    // Trigger CRT collapse (shutting down screen content)
    const collapseTimer = setTimeout(() => {
      setPhase('collapse');
      innerRef.current?.classList.remove('glitching');
    }, 2800);

    // Trigger full preloader panel fade out (cabinet disappears)
    const fadeoutTimer = setTimeout(() => {
      setPhase('fadeout');
    }, 3200);

    // Complete loader (unmount from App)
    const completeTimer = setTimeout(() => {
      onComplete?.();
    }, 3800);

    return () => {
      clearInterval(textInterval);
      clearTimeout(glitchTimer);
      clearTimeout(collapseTimer);
      clearTimeout(fadeoutTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <div 
      className={`preloader ${phase === 'collapse' || phase === 'fadeout' ? 'collapsing' : ''} ${phase === 'fadeout' ? 'hiding' : ''}`} 
      id="preloader"
    >
      <div className="tv-cabinet">
        <div className="tv-main-bezel">
          <div className="tv-screen">
            {/* Curved glass flare/reflection overlay */}
            <div className="tv-glass-flare" />
            
            {/* Screen content */}
            <div className="tv-inner" ref={innerRef}>
              {/* SMPTE Color Bars */}
              <div className="tv-bars">
                <div className="tv-bar tv-bar--w" />
                <div className="tv-bar tv-bar--y" />
                <div className="tv-bar tv-bar--c" />
                <div className="tv-bar tv-bar--g" />
                <div className="tv-bar tv-bar--m" />
                <div className="tv-bar tv-bar--r" />
                <div className="tv-bar tv-bar--b" />
              </div>
              {/* Bottom strip */}
              <div className="tv-bars-bottom">
                <div className="tv-bar-b tv-bar-b--1" />
                <div className="tv-bar-b tv-bar-b--2" />
                <div className="tv-bar-b tv-bar-b--3" />
                <div className="tv-bar-b tv-bar-b--4" />
                <div className="tv-bar-b tv-bar-b--5" />
                <div className="tv-bar-b tv-bar-b--6" />
                <div className="tv-bar-b tv-bar-b--7" />
              </div>
            </div>
            
            {/* Monospace status text */}
            <div className="preloader-text">{text}</div>
            
            {/* Phosphor glow, scanlines & static mesh overlay */}
            <div className="tv-crt-overlay" />
          </div>
        </div>
        
        {/* Right control panel of vintage TV cabinet */}
        <div className="tv-controls">
          <div className="tv-dials">
            <div className="tv-dial">
              <div className="tv-dial-notch" />
            </div>
            <div className="tv-dial">
              <div className="tv-dial-notch" style={{ transform: 'rotate(120deg)' }} />
            </div>
          </div>
          
          <div className="tv-speaker">
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
          </div>
          
          <div className="tv-power-section">
            <div className="tv-led-indicator" />
            <button className="tv-power-button" aria-label="Power Button">
              <span>I / O</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
