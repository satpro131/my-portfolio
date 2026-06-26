import { useState, useEffect } from 'react';
import { siteData } from '../data/content';

const ICONS = {
  mail: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="M22 4L12 13 2 4" />
    </svg>
  ),
  twitter: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4l11.733 16h4.267l-11.733-16zM4 20l6.768-6.768M13.232 10.768L20 4" />
    </svg>
  ),
  linkedin: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="3" />
      <line x1="8" y1="11" x2="8" y2="16" />
      <line x1="8" y1="8" x2="8" y2="8.01" />
      <path d="M12 16v-5c0-1 1-2 2-2s2 1 2 2v5" />
    </svg>
  ),
  phone: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  ),
  file: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <polyline points="10 9 9 9 8 9" />
    </svg>
  ),
};

const ACCENTS = {
  mail: '#00d2ff',
  linkedin: '#6366f1',
  phone: '#10b981',
  file: '#f59e0b',
};

export default function ContactPage() {
  const [localTime, setLocalTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const options = {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      };
      const formatter = new Intl.DateTimeFormat([], options);
      setLocalTime(formatter.format(new Date()));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="page-content">
      <div className="contact-page">
        {/* Decorative Grid overlays */}
        <div className="cyber-grid-overlay" />
        <div className="contact-glow glow-left" />
        <div className="contact-glow glow-right" />

        <div className="contact-container">
          {/* Left Column - Headline & Time */}
          <div className="contact-info-panel">
            <span className="contact-eyebrow">// CONNECT WITH ME</span>
            <h1 className="contact-main-title">SAY HELLO.</h1>
            <p className="contact-intro-text">
              Have an idea, project, or contract role you'd like to discuss? Reach out and let's construct high-performance architectures together to make world better.
            </p>

            <div className="contact-timezone-widget">
              <div className="timezone-indicator">
                <span className="live-pulse" />
                <span className="timezone-label">CURRENT ZONE: IST (UTC+5:30)</span>
              </div>
              <div className="timezone-time-value">{localTime || '12:00:00 PM'}</div>
              <div className="timezone-location">BENGALURU, INDIA</div>
            </div>
          </div>

          {/* Right Column - Grid Cards */}
          <div className="contact-grid">
            {siteData.contact.map((link) => {
              const accentColor = ACCENTS[link.icon] || '#ffffff';
              return (
                <a
                  key={link.label}
                  className="contact-card"
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ '--card-accent': accentColor }}
                  data-hover
                >
                  <div className="contact-card-mesh" />
                  <div className="contact-card-header">
                    <span className="contact-card-icon-wrap">
                      {ICONS[link.icon]}
                    </span>
                    <span className="contact-card-label">{link.label}</span>
                  </div>
                  <div className="contact-card-body">
                    <span className="contact-card-value">{link.value}</span>
                    <span className="contact-card-action">
                      {link.icon === 'file' ? 'Download PDF' : 'Send Message'} &rarr;
                    </span>
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
