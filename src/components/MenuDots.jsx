import { useEffect, useRef } from 'react';

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

export default function MenuDots({ onClick }) {
  const dotsRef = useRef([]);

  useEffect(() => {
    // Set initial positions
    dotsRef.current.forEach((dot, i) => {
      if (dot) {
        dot.style.left = `${GRID_POSITIONS[i].left}px`;
        dot.style.top = `${GRID_POSITIONS[i].top}px`;
      }
    });
  }, []);

  return (
    <button
      className="menu-dots"
      onClick={onClick}
      aria-label="Open navigation menu"
    >
      {Array.from({ length: 9 }).map((_, i) => (
        <span
          key={i}
          ref={el => dotsRef.current[i] = el}
        />
      ))}
    </button>
  );
}
