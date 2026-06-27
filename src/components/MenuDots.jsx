import { useEffect, useRef, useState } from 'react';

// Dot positions for the 3x3 grid pattern
const GRID_POSITIONS = [
  { left: 8,  top: 8 },  // 1
  { left: 21, top: 8 },  // 2
  { left: 34, top: 8 },  // 3
  { left: 8,  top: 21 }, // 4
  { left: 21, top: 21 }, // 5 (center)
  { left: 34, top: 21 }, // 6
  { left: 8,  top: 34 }, // 7
  { left: 21, top: 34 }, // 8
  { left: 34, top: 34 }, // 9
];

const CHARACTERS = [
  { char: 'S', pattern: [0, 1, 1, 1, 1, 1, 1, 1, 0], color: '#4ade80' }, // Soothing Green
  { char: 'A', pattern: [0, 1, 0, 1, 1, 1, 1, 0, 1], color: '#c084fc' }, // Soothing Violet
  { char: 'T', pattern: [1, 1, 1, 0, 1, 0, 0, 1, 0], color: '#fb7185' }, // Soothing Rose
  { char: 'P', pattern: [1, 1, 1, 1, 1, 1, 1, 0, 0], color: '#fbbf24' }, // Soothing Amber
  { char: 'R', pattern: [1, 1, 1, 1, 1, 1, 1, 0, 1], color: '#2dd4bf' }, // Soothing Teal
  { char: 'O', pattern: [1, 1, 1, 1, 0, 1, 1, 1, 1], color: '#60a5fa' }, // Soothing Blue
];

export default function MenuDots({ onClick }) {
  const dotsRef = useRef([]);
  const [charIndex, setCharIndex] = useState(0);

  // Set initial position of dots
  useEffect(() => {
    dotsRef.current.forEach((dot, i) => {
      if (dot) {
        dot.style.left = `${GRID_POSITIONS[i].left}px`;
        dot.style.top = `${GRID_POSITIONS[i].top}px`;
      }
    });
  }, []);

  // Seamless and continuous character cycle
  useEffect(() => {
    const cycleInterval = setInterval(() => {
      setCharIndex((prev) => (prev + 1) % CHARACTERS.length);
    }, 1100); // 1.1s cycle for readable morphing

    return () => clearInterval(cycleInterval);
  }, []);

  const activePattern = CHARACTERS[charIndex].pattern;
  const activeColor = CHARACTERS[charIndex].color;

  return (
    <button
      className="menu-dots"
      onClick={onClick}
      aria-label="Open navigation menu"
    >
      {Array.from({ length: 9 }).map((_, i) => {
        const isOn = activePattern[i] === 1;
        return (
          <span
            key={i}
            ref={(el) => (dotsRef.current[i] = el)}
            style={{
              backgroundColor: isOn ? activeColor : '#333339',
              opacity: isOn ? 1 : 0.3,
              boxShadow: isOn ? `0 0 12px ${activeColor}, 0 0 4px ${activeColor}` : 'none',
              transform: isOn ? 'scale(1.3)' : 'scale(0.85)',
              transition: 'background-color 0.4s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.4s cubic-bezier(0.4, 0, 0.2, 1), transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
              transitionDelay: `${i * 25}ms`, // Staggered ripple flow
            }}
          />
        );
      })}
    </button>
  );
}
