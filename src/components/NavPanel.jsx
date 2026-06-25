export default function NavPanel({ isOpen, onClose, onNavigate }) {
  const items = [
    { label: 'HOME', page: 'home' },
    { label: 'PROJECTS', page: 'projects' },
    { label: 'EXPERIENCE', page: 'experience' },
    { label: 'AI AGENT', page: 'ai-agent' },
    { label: 'CONTACT', page: 'contact' },
  ];

  const handleClick = (page) => {
    onNavigate(page);
    onClose();
  };

  return (
    <div className={`nav-panel ${isOpen ? 'open' : ''}`}>
      <button className="nav-panel-close" onClick={onClose} aria-label="Close menu">
        <span />
        <span />
      </button>
      {items.map((item, i) => (
        <button
          key={item.page}
          className={`nav-panel-item nav-panel-item--${item.page}`}
          onClick={() => handleClick(item.page)}
          style={{ animationDelay: isOpen ? `${0.1 + i * 0.08}s` : '0s' }}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}
