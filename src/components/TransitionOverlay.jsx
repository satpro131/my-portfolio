import { useState, useRef, useEffect } from 'react';

export default function TransitionOverlay({ active, text, onDone }) {
  const [phase, setPhase] = useState('idle');
  const overlayRef = useRef(null);

  useEffect(() => {
    if (!active) {
      setPhase('idle');
      return;
    }

    setPhase('enter');

    const midTimer = setTimeout(() => {
      setPhase('mid');
    }, 500);

    const exitTimer = setTimeout(() => {
      setPhase('exit');
    }, 900);

    const doneTimer = setTimeout(() => {
      setPhase('idle');
      onDone?.();
    }, 1400);

    return () => {
      clearTimeout(midTimer);
      clearTimeout(exitTimer);
      clearTimeout(doneTimer);
    };
  }, [active, onDone]);

  if (phase === 'idle') return null;

  return (
    <div
      className="tx-overlay active"
      ref={overlayRef}
      style={{
        visibility: 'visible',
      }}
    >
      <div className="tx-panels">
        <div
          className="tx-p tx-p--l"
          style={{
            transform: phase === 'enter' || phase === 'mid'
              ? 'translateY(0)'
              : 'translateY(-100%)',
            transition: 'transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)',
            ...(phase === 'enter' && { animation: 'panelSlideUp 0.4s cubic-bezier(0.22, 1, 0.36, 1) forwards' }),
          }}
        />
        <div
          className="tx-p tx-p--c"
          style={{
            transform: phase === 'enter' || phase === 'mid'
              ? 'translateY(0)'
              : 'translateY(100%)',
            transition: 'transform 0.5s cubic-bezier(0.22, 1, 0.36, 1) 0.05s',
            ...(phase === 'enter' && { animation: 'panelSlideUp 0.4s cubic-bezier(0.22, 1, 0.36, 1) 0.05s forwards' }),
          }}
        />
        <div
          className="tx-p tx-p--r"
          style={{
            transform: phase === 'enter' || phase === 'mid'
              ? 'translateY(0)'
              : 'translateY(-100%)',
            transition: 'transform 0.5s cubic-bezier(0.22, 1, 0.36, 1) 0.1s',
            ...(phase === 'enter' && { animation: 'panelSlideUp 0.4s cubic-bezier(0.22, 1, 0.36, 1) 0.1s forwards' }),
          }}
        />
      </div>
      <div className="tx-text">
        <div className="tx-words">
          <span
            className="tx-word"
            style={{
              opacity: phase === 'mid' ? 1 : 0,
              transform: phase === 'mid' ? 'translateY(0)' : 'translateY(30px)',
              transition: 'opacity 0.3s, transform 0.3s',
            }}
          >
            {text || 'LOADING'}
          </span>
        </div>
      </div>
    </div>
  );
}
