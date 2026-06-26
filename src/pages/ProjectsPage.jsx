import { useRef, useEffect, useState, useCallback } from 'react';
import { siteData } from '../data/content';

function DecryptText({ text, progress, start, end }) {
  const pct = Math.max(0, Math.min(1, (progress - start) / (end - start)));
  if (pct >= 1) return <span>{text}</span>;
  if (pct <= 0) {
    const garbled = text.split('').map(char => {
      if (char === ' ' || char === '\n' || char === '—' || char === '-') return char;
      const chars = '01#%&XY$@§ΔΩΨΦΞ±≠≈';
      return chars[(char.charCodeAt(0)) % chars.length];
    }).join('');
    return <span className="knox-ciphertext">{garbled}</span>;
  }
  const revealCount = Math.floor(text.length * pct);
  const revealed = text.substring(0, revealCount);
  const remaining = text.substring(revealCount);
  const garbledRemaining = remaining.split('').map((char, index) => {
    if (char === ' ' || char === '\n' || char === '—' || char === '-') return char;
    const chars = '01#%&XY$@§ΔΩΨΦΞ±≠≈';
    return chars[(char.charCodeAt(0) + index) % chars.length];
  }).join('');
  return (
    <span>
      {revealed}
      <span className="knox-ciphertext">{garbledRemaining}</span>
    </span>
  );
}

export default function ProjectsPage({ onNavigate }) {
  const sectionsRef = useRef([]);
  const containerRef = useRef(null);
  const xamineSectionRef = useRef(null);
  const carouselRef = useRef(null);
  const [xamineProgress, setXamineProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [activeMobileSlide, setActiveMobileSlide] = useState(0);
  const [scrollLocked, setScrollLocked] = useState(false);
  
  // Kaksha Digital Classroom States & Refs
  const kakshaSectionRef = useRef(null);
  const kakshaCarouselRef = useRef(null);
  const [kakshaProgress, setKakshaProgress] = useState(0);
  const [kakshaHobby, setKakshaHobby] = useState('sports');
  const [qaActive, setQaActive] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [quizAnswered, setQuizAnswered] = useState(false);
  const [quizCorrect, setQuizCorrect] = useState(null);
  const [pulseActive, setPulseActive] = useState(false);
  
  // Kaksha mobile scroll-jacking
  const [activeKakshaSlide, setActiveKakshaSlide] = useState(0);
  const [kakshaScrollLocked, setKakshaScrollLocked] = useState(false);
  const [kakshaOverlayActive, setKakshaOverlayActive] = useState(true);

  // MPL Desktop Poker States & Refs
  const pokerSectionRef = useRef(null);
  const [pokerProgress, setPokerProgress] = useState(0);

  // Bountyverse SDK States & Refs
  const bountySectionRef = useRef(null);
  const [bountyProgress, setBountyProgress] = useState(0);

  // Samsung Knox Security States & Refs
  const knoxSectionRef = useRef(null);
  const [knoxProgress, setKnoxProgress] = useState(0);

  const selectHobby = (hobby) => {
    setKakshaHobby(hobby);
    setPulseActive(true);
    setTimeout(() => setPulseActive(false), 800);
  };
  
  const TOTAL_SLIDES = 8;
  const TOTAL_KAKSHA_SLIDES = 4;

  const isLockedRef = useRef(false);
  const lastTransitionTime = useRef(0);
  const touchStartY = useRef(0);
  const hasLockedThisVisit = useRef(false);
  const activeSlideRef = useRef(0);

  // Kaksha mobile refs
  const isKakshaLockedRef = useRef(false);
  const lastKakshaTransitionTime = useRef(0);
  const touchStartKakshaY = useRef(0);
  const hasKakshaLockedThisVisit = useRef(false);
  const activeKakshaSlideRef = useRef(0);
  const kakshaOverlayActiveRef = useRef(true);

  // Sync refs for event listeners
  useEffect(() => {
    isLockedRef.current = scrollLocked;
  }, [scrollLocked]);

  useEffect(() => {
    isKakshaLockedRef.current = kakshaScrollLocked;
  }, [kakshaScrollLocked]);

  useEffect(() => {
    activeSlideRef.current = activeMobileSlide;
  }, [activeMobileSlide]);

  useEffect(() => {
    activeKakshaSlideRef.current = activeKakshaSlide;
  }, [activeKakshaSlide]);

  useEffect(() => {
    kakshaOverlayActiveRef.current = kakshaOverlayActive;
  }, [kakshaOverlayActive]);

  const scrollToSlide = useCallback((idx) => {
    const carousel = carouselRef.current;
    if (!carousel) return;
    carousel.scrollTo({ left: idx * carousel.offsetWidth, behavior: 'smooth' });
  }, []);

  const handleSlideTransition = useCallback((direction) => {
    const now = Date.now();
    if (now - lastTransitionTime.current < 500) return; // 500ms cooldown

    const currentSlide = activeSlideRef.current;
    if (direction === 1) {
      if (currentSlide < TOTAL_SLIDES - 1) {
        scrollToSlide(currentSlide + 1);
        lastTransitionTime.current = now;
      } else {
        // Last slide scroll down -> release lock
        setScrollLocked(false);
      }
    } else if (direction === -1) {
      if (currentSlide > 0) {
        scrollToSlide(currentSlide - 1);
        lastTransitionTime.current = now;
      } else {
        // First slide scroll up -> release lock
        setScrollLocked(false);
      }
    }
  }, [scrollToSlide]);

  const scrollToKakshaSlide = useCallback((idx) => {
    const carousel = kakshaCarouselRef.current;
    if (!carousel) return;
    carousel.scrollTo({ left: idx * carousel.offsetWidth, behavior: 'smooth' });
  }, []);

  const handleKakshaSlideTransition = useCallback((direction) => {
    const now = Date.now();
    if (now - lastKakshaTransitionTime.current < 500) return; // 500ms cooldown

    const currentSlide = activeKakshaSlideRef.current;
    const isOverlayActive = kakshaOverlayActiveRef.current;

    if (isOverlayActive) {
      if (direction === 1) {
        // Swipe down -> dismiss overlay
        setKakshaOverlayActive(false);
        setActiveKakshaSlide(0);
        scrollToKakshaSlide(0);
        lastKakshaTransitionTime.current = now;
      } else if (direction === -1) {
        // Swipe up -> release lock to scroll up
        setKakshaScrollLocked(false);
        lastKakshaTransitionTime.current = now;
      }
    } else {
      if (direction === 1) {
        if (currentSlide < TOTAL_KAKSHA_SLIDES - 1) {
          scrollToKakshaSlide(currentSlide + 1);
          lastKakshaTransitionTime.current = now;
        } else {
          // Last slide -> release lock to scroll down
          setKakshaScrollLocked(false);
        }
      } else if (direction === -1) {
        if (currentSlide > 0) {
          scrollToKakshaSlide(currentSlide - 1);
          lastKakshaTransitionTime.current = now;
        } else {
          // First slide -> reactivate overlay
          setKakshaOverlayActive(true);
          lastKakshaTransitionTime.current = now;
        }
      }
    }
  }, [scrollToKakshaSlide]);


  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let lastScrollTop = container.scrollTop;

    // Detect mobile viewport
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 800);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);

    // 1. Scroll Progress & Lock Listener
    const handleScroll = () => {
      const containerHeight = container.clientHeight;
      const currentScrollTop = container.scrollTop;
      const isScrollingDown = currentScrollTop > lastScrollTop;
      lastScrollTop = currentScrollTop;

      // Xamine.ai Section scroll progress & lock (Mobile)
      const section = xamineSectionRef.current;
      if (section) {
        const rect = section.getBoundingClientRect();
        if (window.innerWidth <= 800) {
          if (rect.bottom < 0 || rect.top > containerHeight) {
            hasLockedThisVisit.current = false;
          }
          if (!hasLockedThisVisit.current && rect.top >= -50 && rect.top <= 120) {
            container.scrollTo({ top: section.offsetTop, behavior: 'smooth' });
            setScrollLocked(true);
            hasLockedThisVisit.current = true;

            // Set slide index based on entry direction
            if (isScrollingDown) {
              setActiveMobileSlide(0);
              scrollToSlide(0);
            } else {
              setActiveMobileSlide(TOTAL_SLIDES - 1);
              scrollToSlide(TOTAL_SLIDES - 1);
            }
            return;
          }
        } else {
          const sectionHeight = rect.height;
          const scrollTrack = sectionHeight - containerHeight;
          if (scrollTrack > 0) {
            const progress = -rect.top / scrollTrack;
            const clampedProgress = Math.max(0, Math.min(1, progress));
            setXamineProgress(clampedProgress);
          }
        }
      }

      // Kaksha Section scroll progress & lock (Mobile)
      const kSection = kakshaSectionRef.current;
      if (kSection) {
        const kRect = kSection.getBoundingClientRect();
        if (window.innerWidth <= 800) {
          if (kRect.bottom < 0 || kRect.top > containerHeight) {
            hasKakshaLockedThisVisit.current = false;
          }
          if (!hasKakshaLockedThisVisit.current && kRect.top >= -50 && kRect.top <= 120) {
            container.scrollTo({ top: kSection.offsetTop, behavior: 'smooth' });
            setKakshaScrollLocked(true);
            hasKakshaLockedThisVisit.current = true;

            // Set slide index based on entry direction
            if (isScrollingDown) {
              setActiveKakshaSlide(0);
              scrollToKakshaSlide(0);
              setKakshaOverlayActive(true);
            } else {
              setActiveKakshaSlide(TOTAL_KAKSHA_SLIDES - 1);
              scrollToKakshaSlide(TOTAL_KAKSHA_SLIDES - 1);
              setKakshaOverlayActive(false);
            }
            return;
          }
        } else {
          const kScrollTrack = kRect.height - containerHeight;
          if (kScrollTrack > 0) {
            const kProgress = -kRect.top / kScrollTrack;
            setKakshaProgress(Math.max(0, Math.min(1, kProgress)));
          }
        }
      }

      // Poker Section scroll progress
      const pSection = pokerSectionRef.current;
      if (pSection) {
        const pRect = pSection.getBoundingClientRect();
        const pScrollTrack = pRect.height - containerHeight;
        if (pScrollTrack > 0) {
          const pProgress = -pRect.top / pScrollTrack;
          setPokerProgress(Math.max(0, Math.min(1, pProgress)));
        }
      }

      // Bountyverse Section scroll progress
      const bSection = bountySectionRef.current;
      if (bSection) {
        const bRect = bSection.getBoundingClientRect();
        const bScrollTrack = bRect.height - containerHeight;
        if (bScrollTrack > 0) {
          const bProgress = -bRect.top / bScrollTrack;
          setBountyProgress(Math.max(0, Math.min(1, bProgress)));
        }
      }

      // Knox Section scroll progress
      const kxSection = knoxSectionRef.current;
      if (kxSection) {
        const kxRect = kxSection.getBoundingClientRect();
        const kxScrollTrack = kxRect.height - containerHeight;
        if (kxScrollTrack > 0) {
          const kxProgress = -kxRect.top / kxScrollTrack;
          setKnoxProgress(Math.max(0, Math.min(1, kxProgress)));
        }
      }
    };

    container.addEventListener('scroll', handleScroll, { passive: true });

    // 2. IntersectionObserver for other project sections
    const observerOptions = {
      root: container,
      rootMargin: '0px',
      threshold: Array.from({ length: 41 }, (_, i) => i / 40),
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const section = entry.target;
        const ratio = entry.intersectionRatio;
        
        if (entry.isIntersecting) {
          section.classList.add('in-view');
          section.style.setProperty('--scroll-ratio', ratio);
        } else {
          section.classList.remove('in-view');
          section.style.setProperty('--scroll-ratio', '0');
        }
      });
    }, observerOptions);

    sectionsRef.current.forEach((sec) => {
      if (sec) observer.observe(sec);
    });

    // 3. Scroll-jacking touch/wheel listeners for mobile
    const preventScroll = (e) => {
      if (isLockedRef.current || isKakshaLockedRef.current) {
        e.preventDefault();
      }
    };

    const handleWheel = (e) => {
      if (window.innerWidth > 800) return;
      if (isLockedRef.current) {
        e.preventDefault();
        if (Math.abs(e.deltaY) > 10) {
          handleSlideTransition(e.deltaY > 0 ? 1 : -1);
        }
      } else if (isKakshaLockedRef.current) {
        e.preventDefault();
        if (Math.abs(e.deltaY) > 10) {
          handleKakshaSlideTransition(e.deltaY > 0 ? 1 : -1);
        }
      }
    };

    const handleTouchStart = (e) => {
      if (window.innerWidth > 800) return;
      touchStartY.current = e.touches[0].clientY;
      touchStartKakshaY.current = e.touches[0].clientY;
    };

    const handleTouchMove = (e) => {
      if (window.innerWidth > 800) return;
      if (isLockedRef.current) {
        e.preventDefault();
        const currentY = e.touches[0].clientY;
        const deltaY = currentY - touchStartY.current;
        if (Math.abs(deltaY) > 40) {
          handleSlideTransition(deltaY < 0 ? 1 : -1);
          touchStartY.current = currentY;
        }
      } else if (isKakshaLockedRef.current) {
        e.preventDefault();
        const currentY = e.touches[0].clientY;
        const deltaY = currentY - touchStartKakshaY.current;
        if (Math.abs(deltaY) > 40) {
          handleKakshaSlideTransition(deltaY < 0 ? 1 : -1);
          touchStartKakshaY.current = currentY;
        }
      }
    };

    container.addEventListener('wheel', handleWheel, { passive: false });
    container.addEventListener('touchstart', handleTouchStart, { passive: true });
    container.addEventListener('touchmove', handleTouchMove, { passive: false });
    container.addEventListener('touchmove', preventScroll, { passive: false });

    return () => {
      container.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', checkMobile);
      container.removeEventListener('wheel', handleWheel);
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchmove', handleTouchMove);
      container.removeEventListener('touchmove', preventScroll);
      observer.disconnect();
    };
  }, [handleSlideTransition, handleKakshaSlideTransition]);

  // Mobile carousel scroll tracking
  useEffect(() => {
    if (!isMobile) return;
    const carousel = carouselRef.current;
    if (!carousel) return;

    const handleCarouselScroll = () => {
      const scrollLeft = carousel.scrollLeft;
      const cardWidth = carousel.offsetWidth;
      if (cardWidth <= 0) return;
      const idx = Math.round(scrollLeft / cardWidth);
      setActiveMobileSlide(Math.max(0, Math.min(idx, TOTAL_SLIDES - 1)));
    };

    carousel.addEventListener('scroll', handleCarouselScroll, { passive: true });
    return () => carousel.removeEventListener('scroll', handleCarouselScroll);
  }, [isMobile]);

  // Mobile Kaksha carousel scroll tracking
  useEffect(() => {
    if (!isMobile) return;
    const carousel = kakshaCarouselRef.current;
    if (!carousel) return;

    const handleKakshaCarouselScroll = () => {
      const scrollLeft = carousel.scrollLeft;
      const cardWidth = carousel.offsetWidth;
      if (cardWidth <= 0) return;
      const idx = Math.round(scrollLeft / cardWidth);
      setActiveKakshaSlide(Math.max(0, Math.min(idx, TOTAL_KAKSHA_SLIDES - 1)));
    };

    carousel.addEventListener('scroll', handleKakshaCarouselScroll, { passive: true });
    return () => carousel.removeEventListener('scroll', handleKakshaCarouselScroll);
  }, [isMobile]);

  // Calculate leaf angles
  const getAngle = (progress, start, end) => {
    if (progress < start) return 0;
    if (progress > end) return -180;
    const factor = (progress - start) / (end - start);
    return -180 * factor;
  };

  const leaf1Rot = getAngle(xamineProgress, 0.05, 0.22);
  const leaf2Rot = getAngle(xamineProgress, 0.28, 0.48);
  const leaf3Rot = getAngle(xamineProgress, 0.54, 0.74);
  const leaf4Rot = getAngle(xamineProgress, 0.80, 0.95);

  // Stack ordering during flips
  const leaf1Z = leaf1Rot > -90 ? 10 : 1;
  const leaf2Z = leaf2Rot > -90 ? 9 : 2;
  const leaf3Z = leaf3Rot > -90 ? 8 : 3;
  const leaf4Z = leaf4Rot > -90 ? 7 : 4;

  // Active triggers for inner page animations
  const page1Active = xamineProgress > 0.15;
  const examActive = xamineProgress > 0.25;
  const radarActive = xamineProgress > 0.45;
  const subjectActive = xamineProgress > 0.55;
  const trendActive = xamineProgress > 0.70;
  const techActive = xamineProgress > 0.80;

  // Render tech stack logo SVGs
  const renderReactLogo = () => (
    <svg viewBox="-11.5 -10.23174 23 20.46348" className="tech-logo">
      <circle cx="0" cy="0" r="2.05" fill="#61dafb" />
      <g stroke="#61dafb" strokeWidth="1" fill="none">
        <ellipse rx="11" ry="4.2" />
        <ellipse rx="11" ry="4.2" transform="rotate(60)" />
        <ellipse rx="11" ry="4.2" transform="rotate(120)" />
      </g>
    </svg>
  );

  const renderNextjsLogo = () => (
    <svg viewBox="0 0 180 180" className="tech-logo next-logo">
      <circle cx="90" cy="90" r="90" fill="#000000" />
      <path d="M149.508 157.52L69.142 54.004V126H55V44H69.136L135.297 129.247L149.508 157.52Z" fill="#ffffff" />
      <rect x="125" y="44" width="14" height="82" fill="#ffffff" />
    </svg>
  );

  const renderTSLogo = () => (
    <svg viewBox="0 0 100 100" className="tech-logo">
      <rect width="100" height="100" fill="#3178c6" rx="8" />
      <text x="85" y="85" fill="#ffffff" fontFamily="system-ui, sans-serif" fontWeight="bold" fontSize="38" textAnchor="end">TS</text>
    </svg>
  );

  const renderTailwindLogo = () => (
    <svg viewBox="0 0 24 24" className="tech-logo">
      <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C7.666 17.818 9.027 19 12.001 19c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z" fill="#38bdf8" />
    </svg>
  );

  const renderPythonLogo = () => (
    <svg viewBox="0 0 110 110" className="tech-logo">
      <path d="M52.19 2C32.49 2 34 10.55 34 10.55V19.3h18.63v2.6H26.23s-15.68-.86-15.68 14.82v12.2s.26 15.34 14.82 15.34h8.81v-12.4s.34-14.82 14.82-14.82h18.25s14.28 0 14.28-13.78V16s-.78-14-24.34-14zm-9.08 6.08a3.14 3.14 0 1 1 0 6.28 3.14 3.14 0 0 1 0-6.28z" fill="#3776ab" />
      <path d="M57.81 108c19.7 0 18.19-8.55 18.19-8.55v-8.75H57.37v-2.6h26.4s15.68.86 15.68-14.82v-12.2s-.26-15.34-14.82-15.34h-8.81v12.4s-.34 14.82-14.82 14.82H42.77S28.49 71 28.49 84.78V94s.78 14 24.34 14zm9.08-6.08a3.14 3.14 0 1 1 0-6.28 3.14 3.14 0 0 1 0-6.28z" fill="#ffd343" />
    </svg>
  );

  const renderReduxLogo = () => (
    <svg viewBox="0 0 500 500" className="tech-logo">
      <path d="M351.9 329.5c-4.2 8.5-12.1 14.5-21.7 15.9l-13.7 2c-3.1.5-6 .2-8.7-.9l-14-5.3c-20.2-7.7-42.3-5-60.5 7.1-1.6 1.1-3.1 2.3-4.5 3.6l-10.4 9.4c-7.3 6.6-17.7 9.1-27.1 6.5l-13.4-3.7c-3.1-.9-5.8-2.5-7.9-4.8l-9.6-10.2c-13.9-14.8-33.8-22.3-54.1-20.2-1.9.2-3.8.6-5.7 1.1l-13.2 3.8c-9.4 2.7-19.4.5-27-5.8l-10.4-8.7c-2.4-2-4.1-4.7-5-7.7L46.4 306c-6.2-19.5-3.3-40.8 7.9-57.9 1-1.5 2.1-3 3.3-4.3l9.4-10.4c6.6-7.3 9.1-17.7 6.5-27.1l-3.7-13.4c-.9-3.1-2.5-5.8-4.8-7.9l-10.2-9.6c-14.8-13.9-22.3-33.8-20.2-54.1.2-1.9.6-3.8 1.1-5.7l3.8-13.2c2.7-9.4.5-19.4-5.8-27l-8.7-10.4c-2-2.4-4.7-4.1-7.7-5l-13.6-3.9c-19.5-5.6-34.8-19.6-41.5-38.3-6.6-18.7-4.5-39.2 5.9-56l7.8-12.6c1.7-2.8 4.2-5 7.2-6.2l13.1-5.3c18.8-7.6 32-23.4 35.8-43.2.4-2.1.5-4.3.5-6.4l-.6-14c-.4-9.9 4-19.5 11.6-25.7L105 5.8c2.5-2.1 5.6-3.3 8.9-3.4l14.1-.4c20.3-.6 39.4-10.6 52-27.1.9-1.2 1.9-2.3 2.9-3.4l8.3-8.8c6.4-6.8 16.1-9.9 25.4-8.1l13.1 2.6c3.1.6 5.8 2.1 7.9 4.3l9.4 9.9c13.7 14.5 33.4 22.3 53.6 20.8 2.2-.2 4.4-.6 6.5-1.2l13.1-3.6c9.3-2.6 19.1-.5 26.6 5.7l9.8 8.2c2.4 2 4.2 4.7 5.1 7.7l4 13.1c6.1 19.8 20 35.3 38.6 42.4 2 .8 4.1 1.4 6.2 1.8l13.5 2.5c9.5 1.8 17.5 7.9 21.6 16.5l5.9 12.4c1.4 2.9 2 6.1 1.8 9.3l-.9 13.7c-1.3 20.3 6.2 40 20.5 53.7 1.5 1.4 3.1 2.7 4.8 3.8l11.4 7.6c8 5.3 12.4 14.7 11.9 24.3l-.7 13.5c-.2 3.1-1.1 6.1-2.7 8.7l-7.3 12c-10.6 17.4-13.8 38.4-8.8 58.1.5 2.1 1.2 4.1 2.1 6.1l5.9 12.8c4.2 9.1 3.5 19.8-1.9 28.2l-7.8 12.1c-1.8 2.8-4.4 4.9-7.5 6l-13.3 4.8c-19.1 6.9-33 21.7-37.9 41.1-.5 2.1-.8 4.2-.9 6.4v13.6c.1 9.8-4.6 19.1-12.4 25.1l-11.2 8.6c-2.5 1.9-5.5 2.9-8.7 2.9l-13.9-.2zm-88.7-27.1c9.3 0 18.2-3.7 24.8-10.3l122-122c13.7-13.7 13.7-35.9 0-49.6l-122-122c-13.7-13.7-35.9-13.7-49.6 0l-122 122c-13.7 13.7-13.7 35.9 0 49.6l122 122c6.6 6.6 15.5 10.3 24.8 10.3z" fill="#764abc" />
    </svg>
  );

  const renderReactQueryLogo = () => (
    <svg viewBox="0 0 100 100" className="tech-logo">
      <path d="M50 10C27.91 10 10 27.91 10 50s17.91 40 40 40 40-17.91 40-40S72.09 10 50 10zm18.3 54.85l-8.49-8.49a15.914 15.914 0 0 1-9.81 3.39c-8.84 0-16-7.16-16-16s7.16-16 16-16 16 7.16 16 16c0 3.74-1.28 7.18-3.39 9.81l8.49 8.49c4.35-4.35 7.05-10.35 7.05-16.99 0-13.25-10.75-24-24-24s-24 10.75-24 24 10.75 24 24 24c6.64 0 12.64-2.7 16.99-7.05l7.15 7.15c-6.15 6.15-14.6 9.9-24.14 9.9-18.78 0-34-15.22-34-34s15.22-34 34-34 34 15.22 34 34c0 9.54-3.75 17.99-9.9 24.14z" fill="#ff7e1d" />
      <path d="M50 38c-6.63 0-12 5.37-12 12s5.37 12 12 12 12-5.37 12-12-5.37-12-12-12z" fill="#ff7e1d" opacity="0.8" />
    </svg>
  );

  const renderPlaywrightLogo = () => (
    <svg viewBox="0 0 100 100" className="tech-logo">
      <path d="M85 50C85 69.33 69.33 85 50 85S15 69.33 15 50 30.67 15 50 15c9.2 0 17.58 3.54 23.86 9.31L61.74 36.43C58.4 34.25 54.36 33 50 33c-9.39 0-17 7.61-17 17s7.61 17 17 17c6.19 0 11.59-3.3 14.54-8.24l13.12 6.56C72.8 72.8 62.1 78 50 78c-15.46 0-28-12.54-28-28s12.54-28 28-28c7.17 0 13.71 2.7 18.66 7.15L80.95 16.85C72.81 10.42 62.3 7 50 7 26.25 7 7 26.25 7 50s19.25 43 43 43 43-19.25 43-43c0-4.14-3.36-7.5-7.5-7.5s-7.5 3.36-7.5 7.5z" fill="#2ead33" />
      <circle cx="50" cy="50" r="10" fill="#2ead33" />
    </svg>
  );

  const renderAmplifyLogo = () => (
    <svg viewBox="0 0 100 100" className="tech-logo">
      <path d="M50 10L15 75h70L50 10zm-6 25l17.5 30H32.5L44 35z" fill="#ff9900" />
      <path d="M50 20L22 70h56L50 20zm-4 22l12 21H38l8-21z" fill="#ff5c00" />
    </svg>
  );

  const renderJestLogo = () => (

    <svg viewBox="0 0 100 100" className="tech-logo">
      <path d="M50 10c-5.5 0-10.4 2.2-14 5.9L16 36c-3.7 3.6-5.9 8.5-5.9 14s2.2 10.4 5.9 14l20 20.1c3.6 3.7 8.5 5.9 14 5.9s10.4-2.2 14-5.9l20-20.1c3.7-3.6 5.9-8.5 5.9-14s-2.2-10.4-5.9-14L64 15.9c-3.6-3.7-8.5-5.9-14-5.9z" fill="#c21325" />
      <path d="M50 20c-4.1 0-7.8 1.7-10.5 4.4L24.4 39.5c-2.7 2.7-4.4 6.4-4.4 10.5s1.7 7.8 4.4 10.5l15.1 15.1c2.7 2.7 6.4 4.4 10.5 4.4s7.8-1.7 10.5-4.4l15.1-15.1c2.7-2.7 4.4-6.4 4.4-10.5s-1.7-7.8-4.4-10.5L60.5 24.4C57.8 21.7 54.1 20 50 20z" fill="#15c213" />
      <path d="M50 30c-2.8 0-5.3 1.1-7.1 3L32.9 43c-1.8 1.8-3 4.3-3 7.1s1.1 5.3 3 7.1l10.1 10.1c1.8 1.8 4.3 3 7.1 3s5.3-1.1 7.1-3l10.1-10.1c1.8-1.8 3-4.3 3-7.1s-1.1-5.3-3-7.1L57.1 33c-1.8-1.9-4.3-3-7.1-3z" fill="#ffffff" />
    </svg>
  );

  const renderGithubActionsLogo = () => (
    <svg viewBox="0 0 24 24" className="tech-logo">
      <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.577.688.479C19.138 20.164 22 16.418 22 12c0-5.523-4.477-10-10-10z" fill="#24292e" />
    </svg>
  );

  const renderTurboLogo = () => (
    <svg viewBox="0 0 24 24" className="tech-logo">
      <path d="M12 2L2 22h20L12 2zm0 4l6.5 13H5.5L12 6z" fill="#ff007f" />
    </svg>
  );


  return (
    <div className="page-content" ref={containerRef}>
      {/* ── Hero Header ── */}
      <section 
        className="pj-hero" 
        ref={(el) => (sectionsRef.current[0] = el)}
      >
        <div className="pj-hero-content">
          <p className="pj-hero-eyebrow">PORTFOLIO</p>
          <h1 className="pj-hero-title">
            <span className="pj-hero-line">SELECTED</span>
            <span className="pj-hero-line">WORKS</span>
          </h1>
          <p className="pj-hero-subtitle">
            Architecture, Systems & Product Engineering
          </p>
          <div className="pj-scroll-hint" data-hover>
            <span className="pj-scroll-arrow">↓</span>
            <span>Scroll to explore</span>
          </div>
        </div>
      </section>

      {/* ── PROJECT 1: XAMINE.AI ── */}
      <section 
        className={`pj-book-section ${isMobile ? 'mobile-carousel-mode' : ''}`}
        ref={xamineSectionRef}
        style={{ '--accent': '#00d2ff' }}
      >
        <div className="pj-bg-number">01</div>

        {isMobile ? (
          /* ── MOBILE: Horizontal Swipe Carousel ── */
          <div className="mobile-book-carousel-wrapper">
            <div className="mobile-book-carousel" ref={carouselRef}>

              {/* Slide 0: Cover */}
              <div className="carousel-slide">
                <div className="carousel-card cover-page">
                  <div className="cover-inner">
                    <img 
                      src="/assets/xamine_logo.png" 
                      alt="Xamine.ai Logo" 
                      className="book-cover-logo"
                    />
                    <h2 className="cover-title">Xamine.ai</h2>
                    <p className="cover-subtitle">Cognitive Diagnostic Platform</p>
                    <div className="cover-badge">JEE / NEET Prep</div>
                    <div className="carousel-swipe-hint">← Swipe to explore →</div>
                  </div>
                </div>
              </div>

              {/* Slide 1: Architecture */}
              <div className="carousel-slide">
                <div className="carousel-card page-dark">
                  <div className="page-header">
                    <span className="page-num">01</span>
                    <span className="page-category">Architecture</span>
                  </div>
                  <div className="page-body">
                    <h3>Frontend Architecture</h3>
                    <p className="para-highlight">
                      Architected the full frontend from scratch using React, Next.js, and TypeScript.
                    </p>
                    <p className="para-dim">
                      Owned end-to-end component architecture, design system, and UX across the platform. Built using Cursor and Antigravity as core AI-assisted development tools.
                    </p>
                    <div className={`page-pulse-chip ${activeMobileSlide >= 1 ? 'active' : ''}`}>
                      <span className="pulse-dot"></span>
                      <span>Live Production EdTech</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Slide 2: Online Exam Interface */}
              <div className="carousel-slide">
                <div className="carousel-card">
                  <div className="page-header">
                    <span className="page-num">02</span>
                    <span className="page-category">Online Exam Interface</span>
                  </div>
                  <div className="page-body">
                    <p className="para-dim" style={{ marginBottom: '8px' }}>
                      Real-time behavior tracking capturing confidence levels, guesswork patterns, hesitation, and focus drift.
                    </p>
                    <div className="mock-exam-panel">
                      <div className="exam-question-header">
                        <span className="badge-marks">+4 Marks</span>
                        <span className="badge-subject">PHYSICS</span>
                        <span className="badge-difficulty">Medium</span>
                      </div>
                      <p className="question-text">
                        <strong>Q3.</strong> An electromagnetic wave is represented by the electric field E = E₀ n sin[ωt + (6y - 8z)]...
                      </p>
                      <div className="exam-options">
                        <div className="option-row">s = (4j - 3k) / 5</div>
                        <div className="option-row option-correct">s = (-3j + 4k) / 5</div>
                      </div>
                      <div className="exam-behavior-HUD">
                        <div className="hud-header">Behavior Analysis</div>
                        <div className="hud-metric">
                          <span className="hud-label">CONFIDENCE</span>
                          <div className="hud-bar-wrap">
                            <div className="hud-bar bar-green" style={{ width: activeMobileSlide >= 2 ? '100%' : '0%' }} />
                          </div>
                          <span className="hud-value">100%</span>
                        </div>
                        <div className="hud-metric">
                          <span className="hud-label">CONFUSION</span>
                          <div className="hud-bar-wrap">
                            <div className="hud-bar bar-red" style={{ width: activeMobileSlide >= 2 ? '15%' : '0%' }} />
                          </div>
                          <span className="hud-value">15%</span>
                        </div>
                      </div>
                    </div>
                    <p className="para-caption">
                      Built a full-featured online examination interface with real-time student behaviour tracking — capturing confidence levels, guessing patterns, time-per-question hesitation, answer change frequency, stress indicators, and focus drift.
                    </p>
                  </div>
                </div>
              </div>

              {/* Slide 3: Diagnostics */}
              <div className="carousel-slide">
                <div className="carousel-card page-dark">
                  <div className="page-header">
                    <span className="page-num">03</span>
                    <span className="page-category">Diagnostics</span>
                  </div>
                  <div className="page-body">
                    <h3>Diagnostic Dashboards</h3>
                    <p className="para-dim">
                      Surfaces student weak points across micro-level concepts, time management patterns, and exam-day behavioral analytics.
                    </p>
                    <div className="radar-chart-container">
                      <svg viewBox="0 0 120 120" className="radar-svg">
                        <polygon points="60,10 108,45 89,102 31,102 12,45" className="radar-grid" />
                        <polygon points="60,25 96,51 82,94 38,94 24,51" className="radar-grid" />
                        <polygon points="60,40 84,58 74,86 46,86 36,58" className="radar-grid" />
                        <polygon points="60,55 72,64 67,77 53,77 48,64" className="radar-grid" />
                        <line x1="60" y1="60" x2="60" y2="10" className="radar-grid-line" />
                        <line x1="60" y1="60" x2="108" y2="45" className="radar-grid-line" />
                        <line x1="60" y1="60" x2="89" y2="102" className="radar-grid-line" />
                        <line x1="60" y1="60" x2="31" y2="102" className="radar-grid-line" />
                        <line x1="60" y1="60" x2="12" y2="45" className="radar-grid-line" />
                        <polygon 
                          points={activeMobileSlide >= 3 ? "60,25 98,49 71,76 43,85 41,53" : "60,60 60,60 60,60 60,60 60,60"} 
                          className="radar-poly" 
                        />
                        <text x="60" y="8" className="radar-label" textAnchor="middle">Confidence</text>
                        <text x="110" y="47" className="radar-label" textAnchor="start">Guesswork</text>
                        <text x="91" y="110" className="radar-label" textAnchor="start">Persistence</text>
                        <text x="29" y="110" className="radar-label" textAnchor="end">Silly Mistakes</text>
                        <text x="10" y="47" className="radar-label" textAnchor="end">Confusion</text>
                      </svg>
                    </div>
                    <p className="para-caption">
                      Developed dashboards surfacing student weak points across micro-level concepts, time management patterns, and exam-day behavioural analytics.
                    </p>
                  </div>
                </div>
              </div>

              {/* Slide 4: Adaptive Flows */}
              <div className="carousel-slide">
                <div className="carousel-card">
                  <div className="page-header">
                    <span className="page-num">04</span>
                    <span className="page-category">Adaptive Flows</span>
                  </div>
                  <div className="page-body">
                    <h3>Adaptive learning flows</h3>
                    <p className="para-dim" style={{ marginBottom: '10px' }}>
                      Integrated AI recommendation engines for personalised learning paths, connecting directly to backend inference APIs.
                    </p>
                    <div className="concept-mastery-list">
                      <div className="mastery-item">
                        <div className="mastery-lbl">Physics</div>
                        <div className="mastery-bar-wrap">
                          <div className="mastery-bar bar-phys" style={{ width: activeMobileSlide >= 4 ? '90%' : '0%' }} />
                        </div>
                        <span className="mastery-val">90%</span>
                      </div>
                      <div className="mastery-item">
                        <div className="mastery-lbl">Mathematics</div>
                        <div className="mastery-bar-wrap">
                          <div className="mastery-bar bar-math" style={{ width: activeMobileSlide >= 4 ? '85%' : '0%' }} />
                        </div>
                        <span className="mastery-val">85%</span>
                      </div>
                      <div className="mastery-item">
                        <div className="mastery-lbl">Chemistry</div>
                        <div className="mastery-bar-wrap">
                          <div className="mastery-bar bar-chem" style={{ width: activeMobileSlide >= 4 ? '75%' : '0%' }} />
                        </div>
                        <span className="mastery-val">75%</span>
                      </div>
                    </div>
                    <div className="donut-chart-container">
                      <svg viewBox="0 0 100 100" className="donut-svg">
                        <circle cx="50" cy="50" r="40" className="donut-bg" />
                        <circle cx="50" cy="50" r="40" className="donut-segment segment-phys" strokeDasharray="251.2" strokeDashoffset={activeMobileSlide >= 4 ? "100" : "251.2"} />
                        <circle cx="50" cy="50" r="40" className="donut-segment segment-math" strokeDasharray="251.2" strokeDashoffset={activeMobileSlide >= 4 ? "180" : "251.2"} />
                        <circle cx="50" cy="50" r="40" className="donut-segment segment-chem" strokeDasharray="251.2" strokeDashoffset={activeMobileSlide >= 4 ? "220" : "251.2"} />
                        <text x="50" y="55" className="donut-center-text" textAnchor="middle">Time</text>
                      </svg>
                      <div className="donut-legend">
                        <span className="leg-dot dot-phys">Physics</span>
                        <span className="leg-dot dot-math">Maths</span>
                        <span className="leg-dot dot-chem">Chem</span>
                      </div>
                    </div>
                    <p className="para-caption">
                      The platform dynamically re-routes each student based on their evolving performance signals and concept-level gap analysis.
                    </p>
                  </div>
                </div>
              </div>

              {/* Slide 5: DPP Engine */}
              <div className="carousel-slide">
                <div className="carousel-card page-dark">
                  <div className="page-header">
                    <span className="page-num">05</span>
                    <span className="page-category">DPP Engine</span>
                  </div>
                  <div className="page-body">
                    <h3>AI-Recommended DPP</h3>
                    <p className="para-dim">
                      Built the Daily Practice Paper (DPP) UI engine dynamically tailored per student based on performance signals and gap analysis.
                    </p>
                    <div className="line-chart-container">
                      <svg viewBox="0 0 200 100" className="line-svg">
                        <line x1="10" y1="90" x2="190" y2="90" className="chart-axis" />
                        <line x1="10" y1="10" x2="10" y2="90" className="chart-axis" />
                        <path d="M 10 80 Q 50 70 100 45 T 190 25" className="chart-line line-math" style={{ strokeDashoffset: activeMobileSlide >= 5 ? '0' : '200' }} />
                        <path d="M 10 70 Q 50 65 100 62 T 190 60" className="chart-line line-phys" style={{ strokeDashoffset: activeMobileSlide >= 5 ? '0' : '200' }} />
                        <path d="M 10 40 Q 50 45 100 55 T 190 65" className="chart-line line-chem" style={{ strokeDashoffset: activeMobileSlide >= 5 ? '0' : '200' }} />
                        <circle cx="190" cy="25" r="2.5" fill="#a855f7" />
                        <circle cx="190" cy="60" r="2.5" fill="#3b82f6" />
                        <circle cx="190" cy="65" r="2.5" fill="#22c55e" />
                      </svg>
                      <div className="line-legend">
                        <span className="leg-dot dot-math">Maths</span>
                        <span className="leg-dot dot-phys">Physics</span>
                        <span className="leg-dot dot-chem">Chemistry</span>
                      </div>
                    </div>
                    <p className="para-caption">
                      Each paper is generated fresh — no two students receive the same set.
                    </p>
                  </div>
                </div>
              </div>

              {/* Slide 6: Tech Stack */}
              <div className="carousel-slide">
                <div className="carousel-card">
                  <div className="page-header">
                    <span className="page-num">06</span>
                    <span className="page-category">Architecture</span>
                  </div>
                  <div className="page-body">
                    <h3>Technologies Used</h3>
                    <p className="para-dim">Modern scalable front-end and core engineering stack.</p>
                    <div className="tech-stack-book-grid">
                      <div className="tech-card-item active">
                        {renderReactLogo()}
                        <span>React</span>
                      </div>
                      <div className="tech-card-item active">
                        {renderNextjsLogo()}
                        <span>Next.js</span>
                      </div>
                      <div className="tech-card-item active">
                        {renderTSLogo()}
                        <span>TypeScript</span>
                      </div>
                      <div className="tech-card-item active">
                        {renderTailwindLogo()}
                        <span>Tailwind CSS</span>
                      </div>
                      <div className="tech-card-item active">
                        <img src="/assets/redux.png" alt="Redux" className="tech-logo-img" />
                        <span>Redux</span>
                      </div>
                      <div className="tech-card-item active">
                        <img src="/assets/playwright.png" alt="Playwright" className="tech-logo-img" />
                        <span>Playwright</span>
                      </div>
                      <div className="tech-card-item active">
                        <img src="/assets/react-query.png" alt="React Query" className="tech-logo-img" />
                        <span>React Query</span>
                      </div>
                      <div className="tech-card-item active">
                        <img src="/assets/amplify.png" alt="AWS Amplify" className="tech-logo-img" />
                        <span>AWS Amplify</span>
                      </div>
                      <div className="tech-card-item active">
                        <img src="/assets/jest.png" alt="Jest" className="tech-logo-img" />
                        <span>Jest</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Slide 7: Back Cover */}
              <div className="carousel-slide">
                <div className="carousel-card cover-page back-cover">
                  <div className="cover-inner" style={{ padding: '0 10px' }}>
                    <div className="back-cover-logo">
                      <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                        <rect width="48" height="48" rx="12" fill="rgba(0,210,255,0.12)" />
                        <text x="50%" y="55%" dominantBaseline="middle" textAnchor="middle" fontSize="22" fill="#00d2ff" fontWeight="bold" fontFamily="serif">X</text>
                      </svg>
                    </div>
                    <h3 className="back-cover-title">Xamine.ai</h3>
                    <p className="back-cover-tagline">
                      Redefining how India's next generation of engineers and doctors learn, practise, and grow.
                    </p>
                    <div className="divider-glow" style={{ margin: '18px auto' }} />
                    <a 
                      href="https://xamine.ai" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="book-back-btn"
                      style={{ textDecoration: 'none', display: 'inline-block' }}
                      data-hover
                    >
                      Visit Xamine.ai →
                    </a>
                  </div>
                </div>
              </div>

            </div>

            {/* Dot Indicators */}
            <div className="carousel-dots">
              {Array.from({ length: TOTAL_SLIDES }).map((_, i) => (
                <button
                  key={i}
                  className={`carousel-dot ${activeMobileSlide === i ? 'active' : ''}`}
                  onClick={() => scrollToSlide(i)}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>

            {/* Slide counter */}
            <div className="carousel-counter">
              {activeMobileSlide + 1} / {TOTAL_SLIDES}
            </div>
          </div>
        ) : (
          /* ── DESKTOP: 3D Flipping Book ── */
          <div className="book-sticky-wrapper">
          <div className="book-container">
            <div className="book-3d">
              {/* LEAF 1 (Cover / Architecture) */}
              <div 
                className="book-leaf" 
                style={{ 
                  transform: `rotateY(${leaf1Rot}deg)`,
                  zIndex: leaf1Z
                }}
              >
                {/* Front Face: Book Cover */}
                <div className="book-page book-page-front cover-page">
                  <div className="cover-inner">
                    <img 
                      src="/assets/xamine_logo.png" 
                      alt="Xamine.ai Logo" 
                      className="book-cover-logo"
                    />
                    <h2 className="cover-title">Xamine.ai</h2>
                    <p className="cover-subtitle">Cognitive Diagnostic Platform</p>
                    <div className="cover-badge">JEE / NEET Prep</div>
                    <div className="book-flip-hint">Scroll to Open Book</div>
                  </div>
                </div>
                {/* Back Face: Spread 1 Left (Architecture) */}
                <div className="book-page book-page-back spread-left page-dark">
                  <div className="page-header">
                    <span className="page-num">01</span>
                    <span className="page-category">Architecture</span>
                  </div>
                  <div className="page-body">
                    <h3>Frontend Architecture</h3>
                    <p className="para-highlight">
                      Architected the full frontend from scratch using React, Next.js, and TypeScript.
                    </p>
                    <p className="para-dim">
                      Owned end-to-end component architecture, design system, and UX across the platform. Built using Cursor and Antigravity as core AI-assisted development tools.
                    </p>
                    <div className={`page-pulse-chip ${page1Active ? 'active' : ''}`}>
                      <span className="pulse-dot"></span>
                      <span>Live Production EdTech</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* LEAF 2 (Exam Interface / Radar Chart) */}
              <div 
                className="book-leaf" 
                style={{ 
                  transform: `rotateY(${leaf2Rot}deg)`,
                  zIndex: leaf2Z
                }}
              >
                {/* Front Face: Spread 1 Right (Exam Interface) */}
                <div className="book-page book-page-front spread-right">
                  <div className="page-header">
                    <span className="page-num">02</span>
                    <span className="page-category">Online Exam Interface</span>
                  </div>
                  <div className="page-body">
                    <p className="para-dim" style={{ marginBottom: '8px' }}>
                      Real-time behavior tracking capturing confidence levels, guesswork patterns, hesitation, and focus drift.
                    </p>
                    <div className="mock-exam-panel">
                      <div className="exam-question-header">
                        <span className="badge-marks">+4 Marks</span>
                        <span className="badge-subject">PHYSICS</span>
                        <span className="badge-difficulty">Medium</span>
                      </div>
                      <p className="question-text">
                        <strong>Q3.</strong> An electromagnetic wave is represented by the electric field E = E₀ n sin[ωt + (6y - 8z)]...
                      </p>
                      <div className="exam-options">
                        <div className="option-row">s = (4j - 3k) / 5</div>
                        <div className="option-row option-correct">s = (-3j + 4k) / 5</div>
                      </div>
                      <div className="exam-behavior-HUD">
                        <div className="hud-header">Behavior Analysis</div>
                        <div className="hud-metric">
                          <span className="hud-label">CONFIDENCE</span>
                          <div className="hud-bar-wrap">
                            <div className="hud-bar bar-green" style={{ width: examActive ? '100%' : '0%' }} />
                          </div>
                          <span className="hud-value">100%</span>
                        </div>
                        <div className="hud-metric">
                          <span className="hud-label">CONFUSION</span>
                          <div className="hud-bar-wrap">
                            <div className="hud-bar bar-red" style={{ width: examActive ? '15%' : '0%' }} />
                          </div>
                          <span className="hud-value">15%</span>
                        </div>
                      </div>
                    </div>
                    <p className="para-caption">
                      Built a full-featured online examination interface with real-time student behaviour tracking — capturing confidence levels, guessing patterns, time-per-question hesitation, answer change frequency, stress indicators, and focus drift — generating rich post-exam behavioural insight reports.
                    </p>
                  </div>
                </div>
                {/* Back Face: Spread 2 Left (Behavior Radar) */}
                <div className="book-page book-page-back spread-left page-dark">
                  <div className="page-header">
                    <span className="page-num">03</span>
                    <span className="page-category">Diagnostics</span>
                  </div>
                  <div className="page-body">
                    <h3>Diagnostic Dashboards</h3>
                    <p className="para-dim">
                      Surfaces student weak points across micro-level concepts, time management patterns, and exam-day behavioral analytics.
                    </p>
                    <div className="radar-chart-container">
                      <svg viewBox="0 0 120 120" className="radar-svg">
                        <polygon points="60,10 108,45 89,102 31,102 12,45" className="radar-grid" />
                        <polygon points="60,25 96,51 82,94 38,94 24,51" className="radar-grid" />
                        <polygon points="60,40 84,58 74,86 46,86 36,58" className="radar-grid" />
                        <polygon points="60,55 72,64 67,77 53,77 48,64" className="radar-grid" />
                        <line x1="60" y1="60" x2="60" y2="10" className="radar-grid-line" />
                        <line x1="60" y1="60" x2="108" y2="45" className="radar-grid-line" />
                        <line x1="60" y1="60" x2="89" y2="102" className="radar-grid-line" />
                        <line x1="60" y1="60" x2="31" y2="102" className="radar-grid-line" />
                        <line x1="60" y1="60" x2="12" y2="45" className="radar-grid-line" />
                        <polygon 
                          points={radarActive ? "60,25 98,49 71,76 43,85 41,53" : "60,60 60,60 60,60 60,60 60,60"} 
                          className="radar-poly" 
                        />
                        <text x="60" y="8" className="radar-label" textAnchor="middle">Confidence</text>
                        <text x="110" y="47" className="radar-label" textAnchor="start">Guesswork</text>
                        <text x="91" y="110" className="radar-label" textAnchor="start">Persistence</text>
                        <text x="29" y="110" className="radar-label" textAnchor="end">Silly Mistakes</text>
                        <text x="10" y="47" className="radar-label" textAnchor="end">Confusion</text>
                      </svg>
                    </div>
                    <p className="para-caption">
                      Developed dashboards surfacing student weak points across micro-level concepts, time management patterns, and exam-day behavioural analytics — giving teachers and students a granular view of cognitive performance.
                    </p>
                  </div>
                </div>
              </div>

              {/* LEAF 3 (Subject Analytics / Performance Trends) */}
              <div 
                className="book-leaf" 
                style={{ 
                  transform: `rotateY(${leaf3Rot}deg)`,
                  zIndex: leaf3Z
                }}
              >
                {/* Front Face: Spread 2 Right (Adaptive Learning) */}
                <div className="book-page book-page-front spread-right">
                  <div className="page-header">
                    <span className="page-num">04</span>
                    <span className="page-category">Adaptive Flows</span>
                  </div>
                  <div className="page-body">
                    <h3>Adaptive learning flows</h3>
                    <p className="para-dim" style={{ marginBottom: '10px' }}>
                      Integrated AI recommendation engines for personalised learning paths, connecting directly to backend inference APIs.
                    </p>
                    <div className="concept-mastery-list">
                      <div className="mastery-item">
                        <div className="mastery-lbl">Physics</div>
                        <div className="mastery-bar-wrap">
                          <div className="mastery-bar bar-phys" style={{ width: subjectActive ? '90%' : '0%' }} />
                        </div>
                        <span className="mastery-val">90%</span>
                      </div>
                      <div className="mastery-item">
                        <div className="mastery-lbl">Mathematics</div>
                        <div className="mastery-bar-wrap">
                          <div className="mastery-bar bar-math" style={{ width: subjectActive ? '85%' : '0%' }} />
                        </div>
                        <span className="mastery-val">85%</span>
                      </div>
                      <div className="mastery-item">
                        <div className="mastery-lbl">Chemistry</div>
                        <div className="mastery-bar-wrap">
                          <div className="mastery-bar bar-chem" style={{ width: subjectActive ? '75%' : '0%' }} />
                        </div>
                        <span className="mastery-val">75%</span>
                      </div>
                    </div>
                    <div className="donut-chart-container">
                      <svg viewBox="0 0 100 100" className="donut-svg">
                        <circle cx="50" cy="50" r="40" className="donut-bg" />
                        <circle cx="50" cy="50" r="40" className="donut-segment segment-phys" strokeDasharray="251.2" strokeDashoffset={subjectActive ? "100" : "251.2"} />
                        <circle cx="50" cy="50" r="40" className="donut-segment segment-math" strokeDasharray="251.2" strokeDashoffset={subjectActive ? "180" : "251.2"} />
                        <circle cx="50" cy="50" r="40" className="donut-segment segment-chem" strokeDasharray="251.2" strokeDashoffset={subjectActive ? "220" : "251.2"} />
                        <text x="50" y="55" className="donut-center-text" textAnchor="middle">Time</text>
                      </svg>
                      <div className="donut-legend">
                        <span className="leg-dot dot-phys">Physics</span>
                        <span className="leg-dot dot-math">Maths</span>
                        <span className="leg-dot dot-chem">Chem</span>
                      </div>
                    </div>
                    <p className="para-caption">
                      Integrated AI recommendation flows for personalised learning paths, connecting to backend inference APIs. The platform dynamically re-routes each student based on their evolving performance signals and concept-level gap analysis.
                    </p>
                  </div>
                </div>
                {/* Back Face: Spread 3 Left (DPP / Trends Graph) */}
                <div className="book-page book-page-back spread-left page-dark">
                  <div className="page-header">
                    <span className="page-num">05</span>
                    <span className="page-category">DPP Engine</span>
                  </div>
                  <div className="page-body">
                    <h3>AI-Recommended DPP</h3>
                    <p className="para-dim">
                      Built the Daily Practice Paper (DPP) UI engine dynamically tailored per student based on performance signals and gap analysis.
                    </p>
                    <div className="line-chart-container">
                      <svg viewBox="0 0 200 100" className="line-svg">
                        <line x1="10" y1="90" x2="190" y2="90" className="chart-axis" />
                        <line x1="10" y1="10" x2="10" y2="90" className="chart-axis" />
                        <path d="M 10 80 Q 50 70 100 45 T 190 25" className="chart-line line-math" style={{ strokeDashoffset: trendActive ? '0' : '200' }} />
                        <path d="M 10 70 Q 50 65 100 62 T 190 60" className="chart-line line-phys" style={{ strokeDashoffset: trendActive ? '0' : '200' }} />
                        <path d="M 10 40 Q 50 45 100 55 T 190 65" className="chart-line line-chem" style={{ strokeDashoffset: trendActive ? '0' : '200' }} />
                        <circle cx="190" cy="25" r="2.5" fill="#a855f7" />
                        <circle cx="190" cy="60" r="2.5" fill="#3b82f6" />
                        <circle cx="190" cy="65" r="2.5" fill="#22c55e" />
                      </svg>
                      <div className="line-legend">
                        <span className="leg-dot dot-math">Maths</span>
                        <span className="leg-dot dot-phys">Physics</span>
                        <span className="leg-dot dot-chem">Chemistry</span>
                      </div>
                    </div>
                    <p className="para-caption">
                      Built the Daily Practice Paper engine UI, dynamically tailored per student based on performance signals and concept-level gap analysis. Each paper is generated fresh — no two students receive the same set.
                    </p>
                  </div>
                </div>
              </div>

              {/* LEAF 4 (Tech Stack / Summary Back Cover) */}
              <div 
                className="book-leaf" 
                style={{ 
                  transform: `rotateY(${leaf4Rot}deg)`,
                  zIndex: leaf4Z
                }}
              >
                {/* Front Face: Spread 3 Right (Tech Stack) */}
                <div className="book-page book-page-front spread-right">
                  <div className="page-header">
                    <span className="page-num">06</span>
                    <span className="page-category">Architecture</span>
                  </div>
                  <div className="page-body">
                    <h3>Technologies Used</h3>
                    <p className="para-dim">Modern scalable front-end and core engineering stack.</p>
                    <div className="tech-stack-book-grid">
                      <div className={`tech-card-item ${techActive ? 'active' : ''}`} style={{ transitionDelay: '0.05s' }}>
                        {renderReactLogo()}
                        <span>React</span>
                      </div>
                      <div className={`tech-card-item ${techActive ? 'active' : ''}`} style={{ transitionDelay: '0.1s' }}>
                        {renderNextjsLogo()}
                        <span>Next.js</span>
                      </div>
                      <div className={`tech-card-item ${techActive ? 'active' : ''}`} style={{ transitionDelay: '0.15s' }}>
                        {renderTSLogo()}
                        <span>TypeScript</span>
                      </div>
                      <div className={`tech-card-item ${techActive ? 'active' : ''}`} style={{ transitionDelay: '0.2s' }}>
                        {renderTailwindLogo()}
                        <span>Tailwind CSS</span>
                      </div>
                      <div className={`tech-card-item ${techActive ? 'active' : ''}`} style={{ transitionDelay: '0.25s' }}>
                        <img src="/assets/redux.png" alt="Redux" className="tech-logo-img" />
                        <span>Redux</span>
                      </div>
                      <div className={`tech-card-item ${techActive ? 'active' : ''}`} style={{ transitionDelay: '0.3s' }}>
                        <img src="/assets/playwright.png" alt="Playwright" className="tech-logo-img" />
                        <span>Playwright</span>
                      </div>
                      <div className={`tech-card-item ${techActive ? 'active' : ''}`} style={{ transitionDelay: '0.35s' }}>
                        <img src="/assets/react-query.png" alt="React Query" className="tech-logo-img" />
                        <span>React Query</span>
                      </div>
                      <div className={`tech-card-item ${techActive ? 'active' : ''}`} style={{ transitionDelay: '0.4s' }}>
                        <img src="/assets/amplify.png" alt="AWS Amplify" className="tech-logo-img" />
                        <span>AWS Amplify</span>
                      </div>
                      <div className={`tech-card-item ${techActive ? 'active' : ''}`} style={{ transitionDelay: '0.45s' }}>
                        <img src="/assets/jest.png" alt="Jest" className="tech-logo-img" />
                        <span>Jest</span>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Back Face: Book Back Cover */}
                <div className="book-page book-page-back cover-page back-cover">
                  <div className="cover-inner" style={{ padding: '0 10px' }}>
                    <div className="back-cover-logo">
                      <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                        <rect width="48" height="48" rx="12" fill="rgba(0,210,255,0.12)" />
                        <text x="50%" y="55%" dominantBaseline="middle" textAnchor="middle" fontSize="22" fill="#00d2ff" fontWeight="bold" fontFamily="serif">X</text>
                      </svg>
                    </div>
                    <h3 className="back-cover-title">Xamine.ai</h3>
                    <p className="back-cover-tagline">
                      Redefining how India's next generation of engineers and doctors learn, practise, and grow.
                    </p>
                    <div className="divider-glow" style={{ margin: '18px auto' }} />
                    <a 
                      href="https://xamine.ai" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="book-back-btn"
                      style={{ textDecoration: 'none', display: 'inline-block' }}
                      data-hover
                    >
                      Visit Xamine.ai →
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
</div>
        )}
      </section>

      {/* ── OTHER PROJECTS ── */}
      {siteData.projects.slice(1).map((project, index) => {
        const refIndex = index + 2;
        if (project.id === 2) {
          const kProgress = kakshaProgress;
          const roomRotateY = -18 + kProgress * 15;
          const roomRotateX = 15 - kProgress * 8;
          
          const teacherVisible = isMobile || kProgress > 0.05;
          const blackboardActive = isMobile || kProgress > 0.12;
          const agentsActive = isMobile || kProgress > 0.22;
          const deskActive = isMobile || kProgress > 0.32;

          // Scroll-driven active states
          let activeFeatureIndex = -1;
          let calculatedQaActive = qaActive;
          let calculatedDrawerOpen = drawerOpen;
          let calculatedPulseActive = pulseActive;

          if (!isMobile) {
            if (kProgress > 0.12 && kProgress <= 0.32) {
              activeFeatureIndex = 0;
              calculatedQaActive = false;
              calculatedDrawerOpen = false;
            } else if (kProgress > 0.32 && kProgress <= 0.55) {
              activeFeatureIndex = 1;
              calculatedQaActive = true;
              calculatedDrawerOpen = false;
            } else if (kProgress > 0.55 && kProgress <= 0.78) {
              activeFeatureIndex = 2;
              calculatedQaActive = false;
              calculatedDrawerOpen = true;
            } else if (kProgress > 0.78) {
              activeFeatureIndex = 3;
              calculatedQaActive = false;
              calculatedDrawerOpen = false;
              calculatedPulseActive = true;
            }
          } else {
            activeFeatureIndex = activeKakshaSlide - 1;
            if (activeKakshaSlide <= 1) {
              calculatedQaActive = false;
              calculatedDrawerOpen = false;
            } else if (activeKakshaSlide === 2) {
              calculatedQaActive = true;
              calculatedDrawerOpen = false;
            } else if (activeKakshaSlide === 3) {
              calculatedQaActive = false;
              calculatedDrawerOpen = true;
            } else if (activeKakshaSlide === 4) {
              calculatedQaActive = false;
              calculatedDrawerOpen = false;
              calculatedPulseActive = true;
            }
          }

          const drawPercent = Math.min(1, Math.max(0, (kProgress - 0.15) * 4));
          const sportsOffset = 200 - drawPercent * 200;
          const scifiOffset = 250 - drawPercent * 250;
          const gamingOffset = 180 - drawPercent * 180;

          const featuresList = [
            {
              title: "Interactive Classroom",
              desc: "Designed and built an interactive classroom experience with AI-generated whiteboard-style video lectures, dynamically customised per student based on topic choice and learning preferences."
            },
            {
              title: "Real-time Q&A",
              desc: "Implemented in-lecture question and answer interactions, allowing students to interrupt and query the AI teacher mid-session without breaking the lesson flow."
            },
            {
              title: "Post-lecture Engagement",
              desc: "Built the interactive playground and assignment module for hands-on concept reinforcement following each lecture."
            },
            {
              title: "Personalisation Layer",
              desc: "Architected a per-student personalisation system that dynamically adapts content, pacing, and examples to individual learning profiles."
            }
          ];

          if (isMobile) {
            return (
              <section
                key={project.id}
                className="pj-classroom-section mobile-classroom-mode"
                ref={(el) => {
                  kakshaSectionRef.current = el;
                  sectionsRef.current[refIndex] = el;
                }}
                style={{ '--accent': project.accentColor }}
              >
                <div className="pj-bg-number">02</div>

                {/* Independent absolute mobile overlay */}
                <div 
                  className={`kaksha-mobile-overlay ${!kakshaOverlayActive ? 'hidden' : ''}`}
                >
                  <div className="cover-inner">
                    <img 
                      src="/assets/kaksha_logo.png" 
                      alt="Kaksha Logo" 
                      className="kaksha-cover-logo"
                    />
                    <p className="cover-subtitle">Digital Classroom Platform</p>
                    <div className="carousel-swipe-hint">← Swipe up to enter →</div>
                  </div>
                </div>
                
                {/* Hobby controls at the top */}
                <div className="classroom-controls mobile-controls-top">
                  <div className="hobby-btn-group">
                    <button 
                      className={`hobby-btn ${kakshaHobby === 'sports' ? 'active' : ''}`} 
                      onClick={() => selectHobby('sports')}
                    >
                      🏀 Sports
                    </button>
                    <button 
                      className={`hobby-btn ${kakshaHobby === 'sci-fi' ? 'active' : ''}`} 
                      onClick={() => selectHobby('sci-fi')}
                    >
                      🚀 Sci-Fi
                    </button>
                    <button 
                      className={`hobby-btn ${kakshaHobby === 'gaming' ? 'active' : ''}`} 
                      onClick={() => selectHobby('gaming')}
                    >
                      🎮 Gaming
                    </button>
                  </div>
                </div>

                <div className="mobile-classroom-carousel-wrapper">
                  <div className="mobile-classroom-carousel" ref={kakshaCarouselRef}>
                    
                    {/* Slides 0-3: Feature Cards */}
                    {featuresList.map((f, idx) => (
                      <div key={idx} className="carousel-slide">
                        <div className={`carousel-card classroom-card-step ${activeKakshaSlide === idx ? 'active' : ''}`}>
                          <div className="card-step-header">
                            <span className="step-badge">FEATURE 0{idx + 1}</span>
                            <h3>{f.title}</h3>
                            <p className="step-desc">{f.desc}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Interactive Visual room viewport at the bottom */}
                <div className={`mobile-classroom-visual-viewport ${!kakshaOverlayActive ? 'visible' : ''}`}>
                  <div className="mobile-classroom-viewport-inner">
                    
                    {/* Top Row: Whiteboard + Hologram Teacher */}
                    <div className="mobile-room-top-row">
                      
                      {/* Whiteboard */}
                      <div className={`classroom-whiteboard active ${activeKakshaSlide === 1 ? 'whiteboard-paused' : ''}`}>
                        <div className="whiteboard-screen">
                          <div className="whiteboard-header">
                            <span className="whiteboard-dot"></span>
                            <span className="whiteboard-title">AI Lecture Canvas</span>
                          </div>
                          <div className="whiteboard-body">
                            {kakshaHobby === 'sports' && (
                              <svg viewBox="0 0 200 120" className="lecture-svg">
                                <text x="10" y="15" fill="#00ff87" fontSize="8" fontFamily="monospace">Topic: Parabolic Motion</text>
                                <line x1="20" y1="100" x2="180" y2="100" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
                                <line x1="20" y1="20" x2="20" y2="100" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
                                {activeKakshaSlide === 1 ? (
                                  <>
                                    <path d="M 20 80 L 170 30" fill="none" stroke="#ff0055" strokeWidth="2" strokeDasharray="3,3" />
                                    <circle cx="170" cy="30" r="5" fill="#ff0055" />
                                    <text x="110" y="45" fill="#ff0055" fontSize="6">v(t) = v₀ (Zero-G)</text>
                                  </>
                                ) : (
                                  <>
                                    <path d="M 20 80 Q 95 20 170 80" fill="none" stroke="#00ff87" strokeWidth="2" strokeDasharray="3,3" />
                                    <circle cx="170" cy="80" r="5" fill="#ffaa00" />
                                  </>
                                )}
                              </svg>
                            )}
                            {kakshaHobby === 'sci-fi' && (
                              <svg viewBox="0 0 200 120" className="lecture-svg">
                                <text x="10" y="15" fill="#00ff87" fontSize="8" fontFamily="monospace">Topic: Space Time Warp</text>
                                <circle cx="100" cy="65" r="30" fill="none" stroke="rgba(0, 255, 135, 0.15)" />
                                <circle cx="100" cy="65" r="15" fill="none" stroke="rgba(0, 255, 135, 0.3)" />
                                {activeKakshaSlide === 1 ? (
                                  <>
                                    <line x1="20" y1="65" x2="180" y2="65" stroke="#ff0055" strokeWidth="1.5" strokeDasharray="3,3" />
                                    <text x="25" y="55" fill="#ff0055" fontSize="6">Singularity Intersection!</text>
                                  </>
                                ) : (
                                  <path d="M 20 30 Q 100 95 180 30" fill="none" stroke="#38bdf8" strokeWidth="1.5" />
                                )}
                              </svg>
                            )}
                            {kakshaHobby === 'gaming' && (
                              <svg viewBox="0 0 200 120" className="lecture-svg">
                                <text x="10" y="15" fill="#00ff87" fontSize="8" fontFamily="monospace">Topic: Ray Intersection</text>
                                <circle cx="30" cy="60" r="4" fill="#38bdf8" />
                                <rect x="130" y="35" width="40" height="50" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
                                {activeKakshaSlide === 1 ? (
                                  <>
                                    <line x1="30" y1="60" x2="130" y2="60" stroke="#ff0055" strokeWidth="2" />
                                    <circle cx="130" cy="60" r="3" fill="#ff0055" />
                                  </>
                                ) : (
                                  <line x1="30" y1="60" x2="130" y2="45" stroke="#00ff87" strokeWidth="1.5" strokeDasharray="2,2" />
                                )}
                              </svg>
                            )}
                          </div>
                        </div>

                        {/* Q&A Overlaid bubble inside whiteboard (active during Slide 2) */}
                        <div className={`whiteboard-qa-overlay ${activeKakshaSlide === 1 ? 'active' : ''}`}>
                          <div className="qa-dialog-bubble student-bubble" style={{ fontSize: '9px', padding: '6px' }}>
                            <span className="bubble-speaker" style={{ fontSize: '7px' }}>STUDENT:</span>
                            <p className="bubble-txt" style={{ margin: 0 }}>
                              {kakshaHobby === 'sports' ? "What happens if we turn gravity off?" : "How does this adapt to my pace?"}
                            </p>
                          </div>
                          <div className="qa-dialog-bubble teacher-bubble" style={{ fontSize: '9px', padding: '6px', marginTop: '4px' }}>
                            <span className="bubble-speaker" style={{ fontSize: '7px' }}>AI TEACHER:</span>
                            <p className="bubble-txt" style={{ margin: 0 }}>
                              {kakshaHobby === 'sports' ? "Gravity off -> straight vector tangent: v(t)=v₀." : "I adjust pacing and examples based on your metrics!"}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Hologram Teacher Avatar */}
                      <div className="classroom-teacher active">
                        <div className="hologram-mesh" />
                        <div className="hologram-glow" />
                        <div className="teacher-hud">
                          <span className="hud-agent-name">TEACHER.AI</span>
                          <span className="hud-agent-status">{activeKakshaSlide === 1 ? 'ANSWERING' : 'LECTURING'}</span>
                        </div>
                      </div>
                    </div>

                    {/* Middle Row overlay: Multi-Agent System (active during Slide 4) */}
                    <div className={`multi-agent-system ${activeKakshaSlide === 3 ? 'active' : ''}`}>
                      <div className={`agent-laser laser-1 ${activeKakshaSlide === 3 ? 'pulse' : ''}`} style={{ left: '20%', top: '40%', width: '40px', transform: 'rotate(10deg)' }} />
                      <div className={`agent-laser laser-2 ${activeKakshaSlide === 3 ? 'pulse' : ''}`} style={{ left: '50%', top: '45%', width: '40px', transform: 'rotate(-25deg)' }} />
                      
                      <div className="agent-node profiler-node" data-label="Profiler Agent" style={{ left: '5%', top: '10%' }}>👤</div>
                      <div className="agent-node curriculum-node" data-label="Curriculum Agent" style={{ left: '35%', top: '25%' }}>📚</div>
                      <div className="agent-node dialogue-node" data-label="Dialogue Agent" style={{ left: '68%', top: '15%' }}>💬</div>
                      <div className="agent-node whiteboard-node" data-label="Whiteboard Agent" style={{ left: '82%', top: '45%' }}>✏️</div>
                    </div>

                    {/* Bottom Row: Student Desk Drawer Quiz (active during Slide 3) */}
                    <div className="classroom-desk active">
                      <div className="desk-top">
                        <span className="desk-notebook">Notebook Assignment</span>
                      </div>
                      <div className={`desk-drawer ${activeKakshaSlide === 2 ? 'open' : ''}`}>
                        {activeKakshaSlide === 2 ? (
                          <div className="drawer-content" style={{ opacity: 1, position: 'relative', transform: 'none' }}>
                            <p className="playground-title" style={{ margin: '0 0 4px', fontSize: '9px' }}>Assignment Quiz</p>
                            {!quizAnswered ? (
                              <div className="playground-quiz">
                                <p className="quiz-question" style={{ fontSize: '8px', margin: '0 0 6px' }}>Under zero-gravity, what shape is the basketball's path?</p>
                                <div className="quiz-options" style={{ display: 'flex', gap: '6px' }}>
                                  <button style={{ padding: '4px 8px', fontSize: '8px' }} onClick={() => { setQuizAnswered(true); setQuizCorrect(true); }}>Straight Line</button>
                                  <button style={{ padding: '4px 8px', fontSize: '8px' }} onClick={() => { setQuizAnswered(true); setQuizCorrect(false); }}>Hyperbola</button>
                                </div>
                              </div>
                            ) : (
                              <div className="playground-result">
                                {quizCorrect ? <p className="result-text success" style={{ margin: 0, fontSize: '8px' }}>🎉 Correct! (+10 PTS)</p> : <p className="result-text failure" style={{ margin: 0, fontSize: '8px' }}>❌ Incorrect.</p>}
                                <button className="quiz-retry-btn" style={{ padding: '2px 6px', fontSize: '7px', marginTop: '2px' }} onClick={() => { setQuizAnswered(false); setQuizCorrect(null); }}>Reset</button>
                              </div>
                            )}
                          </div>
                        ) : (
                          <div className="drawer-handle" style={{ textAlign: 'center', padding: '8px', fontSize: '9px', color: '#00ff87' }}>
                            <span>▲ Drawer pulls open on Feature 03 scroll</span>
                          </div>
                        )}
                      </div>
                    </div>

                  </div>
                </div>

                {/* Tech Stack Ticker (Mobile) */}
                <div className="kaksha-ticker-wrap">
                  <div className="kaksha-ticker-title">TECH STACK:</div>
                  <div className="kaksha-ticker">
                    <div className="kaksha-ticker-track">
                      {[...Array(1)].map((_, i) => (
                        <div key={i} className="kaksha-ticker-group">
                          <img src="/assets/react_logo.png" alt="React" className="ticker-logo" />
                          <img src="/assets/next_logo.png" alt="Next.js" className="ticker-logo" />
                          <img src="/assets/js_logo.png" alt="JavaScript" className="ticker-logo" />
                          <img src="/assets/ts_logo.png" alt="TypeScript" className="ticker-logo" />
                          <img src="/assets/langchain_logo.png" alt="Langchain" className="ticker-logo" />
                          <img src="/assets/vercel_logo.png" alt="Vercel" className="ticker-logo" />
                          <img src="/assets/copilotkit_logo.png" alt="CopilotKit" className="ticker-logo" />
                          <img src="/assets/lottie_logo.png" alt="Lottie" className="ticker-logo" />
                          <img src="/assets/remotion_logo.png" alt="Remotion" className="ticker-logo" />
                          <img src="/assets/daily_logo.png" alt="Daily.co" className="ticker-logo" />
                          <img src="/assets/tailwind_logo.png" alt="Tailwind CSS" className="ticker-logo" />
                          <img src="/assets/radix_logo.png" alt="Radix UI" className="ticker-logo" />
                          <img src="/assets/framer_logo.png" alt="Framer Motion" className="ticker-logo" />
                          <img src="/assets/zustand_logo.png" alt="Zustand" className="ticker-logo" />
                          <img src="/assets/dexie_logo.png" alt="Dexie.js" className="ticker-logo" />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </section>
            );
          }

          // Desktop: 3D sticky classroom view
          return (
            <section
              key={project.id}
              className="pj-classroom-section"
              ref={(el) => {
                kakshaSectionRef.current = el;
                sectionsRef.current[refIndex] = el;
              }}
              style={{ '--accent': project.accentColor }}
            >
              <div className="pj-bg-number">02</div>
              
              <div className="classroom-sticky-wrapper">
                <div 
                  className="kaksha-scroll-overlay"
                  style={{ 
                    opacity: Math.max(0, 1 - kProgress * 4.5),
                    pointerEvents: kProgress < 0.2 ? 'auto' : 'none',
                    display: kProgress >= 0.22 ? 'none' : 'flex'
                  }}
                >
                  <img src="/assets/kaksha_logo.png" alt="Kaksha Logo" className="kaksha-overlay-logo" />
                </div>

                <div 
                  className="classroom-container"
                  style={{
                    opacity: Math.min(1, kProgress * 4.5)
                  }}
                >
                  
                  <div className="classroom-info-sidebar">
                    <span className="pj-number">02</span>
                    <p className="pj-eyebrow">{project.eyebrow}</p>
                    <h2 className="pj-title">{project.title}</h2>
                    <p className="pj-headline">{project.headline}</p>
                    
                    {/* Hobby Selector Panel (on top) */}
                    <div className="classroom-controls">
                      <p className="controls-label">Select Student Profile Theme:</p>
                      <div className="hobby-btn-group">
                        <button 
                          className={`hobby-btn ${kakshaHobby === 'sports' ? 'active' : ''}`} 
                          onClick={() => selectHobby('sports')}
                        >
                          🏀 Sports
                        </button>
                        <button 
                          className={`hobby-btn ${kakshaHobby === 'sci-fi' ? 'active' : ''}`} 
                          onClick={() => selectHobby('sci-fi')}
                        >
                          🚀 Sci-Fi
                        </button>
                        <button 
                          className={`hobby-btn ${kakshaHobby === 'gaming' ? 'active' : ''}`} 
                          onClick={() => selectHobby('gaming')}
                        >
                          🎮 Gaming
                        </button>
                      </div>
                    </div>
                    
                    {/* Interactive features list */}
                    <div className="classroom-features-list">
                      {featuresList.map((f, idx) => (
                        <div 
                          key={idx} 
                          className={`classroom-feature-item ${activeFeatureIndex === idx ? 'active' : ''}`}
                          onClick={() => {
                            if (idx === 0) { setQaActive(false); setDrawerOpen(false); }
                            else if (idx === 1) { setQaActive(true); setDrawerOpen(false); }
                            else if (idx === 2) { setQaActive(false); setDrawerOpen(true); }
                            else if (idx === 3) { setQaActive(false); setDrawerOpen(false); setPulseActive(true); setTimeout(() => setPulseActive(false), 1200); }
                          }}
                          data-hover
                        >
                          <h4 className="feature-item-title">
                            <span className="feature-dot"></span>
                            {f.title}
                          </h4>
                          <p className="feature-item-desc">{f.desc}</p>
                        </div>
                      ))}
                    </div>

                    <div className="pj-tags">
                      {project.tags.map((tag) => (
                        <span key={tag} className="pj-tag">{tag}</span>
                      ))}
                    </div>
                  </div>

                  <div className="classroom-viewport">
                    <div 
                      className="classroom-3d-stage"
                      style={{ 
                        transform: `rotateX(${roomRotateX}deg) rotateY(${roomRotateY}deg)` 
                      }}
                    >
                      <div className="classroom-floor" />
                      
                      <div className="classroom-wall back-wall">
                        <div className={`classroom-whiteboard ${blackboardActive ? 'active' : ''} ${calculatedQaActive ? 'whiteboard-paused' : ''}`}>
                          <div className="whiteboard-screen">
                            <div className="whiteboard-header">
                              <span className="whiteboard-dot"></span>
                              <span className="whiteboard-title">AI Video Lecture Canvas</span>
                              <span className="whiteboard-pacing">Pacing: {kakshaHobby === 'sports' ? 'Visual / Fast' : kakshaHobby === 'sci-fi' ? 'Theoretical' : 'Hands-on'}</span>
                            </div>
                            
                            <div className="whiteboard-body">
                              {kakshaHobby === 'sports' && (
                                <svg viewBox="0 0 200 120" className="lecture-svg">
                                  <text x="10" y="15" fill="#00ff87" fontSize="8" fontFamily="monospace">Topic: Parabolic Motion</text>
                                  <line x1="20" y1="100" x2="180" y2="100" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
                                  <line x1="20" y1="20" x2="20" y2="100" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
                                  
                                  {calculatedQaActive ? (
                                    <>
                                      <path d="M 20 80 L 170 30" fill="none" stroke="#ff0055" strokeWidth="2" strokeDasharray="3,3" />
                                      <circle cx="170" cy="30" r="5" fill="#ff0055" />
                                      <text x="110" y="45" fill="#ff0055" fontSize="6">v(t) = v₀ (Zero-G)</text>
                                    </>
                                  ) : (
                                    <>
                                      <path 
                                        d="M 20 80 Q 95 20 170 80" 
                                        fill="none" 
                                        stroke="#00ff87" 
                                        strokeWidth="2" 
                                        strokeDasharray="200" 
                                        strokeDashoffset={sportsOffset} 
                                      />
                                      <circle cx="170" cy="80" r="5" fill="#ffaa00" style={{ opacity: drawPercent > 0.9 ? 1 : 0, transition: 'opacity 0.2s' }} />
                                      <text x="80" y="35" fill="#00ff87" fontSize="6" style={{ opacity: drawPercent > 0.5 ? 0.8 : 0 }}>y = -0.05x² + x + 2</text>
                                      <text x="25" y="65" fill="rgba(255,255,255,0.5)" fontSize="5" style={{ opacity: drawPercent > 0.3 ? 1 : 0 }}>F = mg</text>
                                    </>
                                  )}
                                </svg>
                              )}

                              {kakshaHobby === 'sci-fi' && (
                                <svg viewBox="0 0 200 120" className="lecture-svg">
                                  <text x="10" y="15" fill="#00ff87" fontSize="8" fontFamily="monospace">Topic: Space Time Warp</text>
                                  <circle cx="100" cy="65" r="45" fill="none" stroke="rgba(0, 255, 135, 0.08)" />
                                  <circle cx="100" cy="65" r="30" fill="none" stroke="rgba(0, 255, 135, 0.15)" />
                                  <circle cx="100" cy="65" r="15" fill="none" stroke="rgba(0, 255, 135, 0.3)" />
                                  <circle cx="100" cy="65" r="5" fill="#00ff87" />
                                  
                                  {calculatedQaActive ? (
                                    <>
                                      <line x1="20" y1="65" x2="180" y2="65" stroke="#ff0055" strokeWidth="1.5" strokeDasharray="3,3" />
                                      <text x="25" y="55" fill="#ff0055" fontSize="6">Singularity Intersection!</text>
                                    </>
                                  ) : (
                                    <>
                                      <path 
                                        d="M 20 30 Q 100 95 180 30" 
                                        fill="none" 
                                        stroke="#38bdf8" 
                                        strokeWidth="1.5" 
                                        strokeDasharray="250"
                                        strokeDashoffset={scifiOffset}
                                      />
                                      <text x="65" y="105" fill="#00ff87" fontSize="6" style={{ opacity: drawPercent > 0.6 ? 0.8 : 0 }}>G_μν = 8πG T_μν</text>
                                      <text x="140" y="90" fill="rgba(255,255,255,0.5)" fontSize="5" style={{ opacity: drawPercent > 0.4 ? 1 : 0 }}>Warp: 9.9</text>
                                    </>
                                  )}
                                </svg>
                              )}

                              {kakshaHobby === 'gaming' && (
                                <svg viewBox="0 0 200 120" className="lecture-svg">
                                  <text x="10" y="15" fill="#00ff87" fontSize="8" fontFamily="monospace">Topic: 3D Ray Intersections</text>
                                  <circle cx="30" cy="60" r="4" fill="#38bdf8" />
                                  <text x="22" y="75" fill="#38bdf8" fontSize="6">Camera</text>
                                  
                                  <rect x="130" y="35" width="40" height="50" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
                                  <text x="135" y="65" fill="rgba(255,255,255,0.5)" fontSize="6">Object</text>
                                  
                                  {calculatedQaActive ? (
                                    <>
                                      <line x1="30" y1="60" x2="130" y2="60" stroke="#ff0055" strokeWidth="2" />
                                      <circle cx="130" cy="60" r="3" fill="#ff0055" />
                                      <text x="70" y="52" fill="#ff0055" fontSize="6">Collision Reflected!</text>
                                    </>
                                  ) : (
                                    <>
                                      <line 
                                        x1="30" y1="60" x2="130" y2="45" 
                                        stroke="#00ff87" 
                                        strokeWidth="1.5" 
                                        strokeDasharray="180" 
                                        strokeDashoffset={gamingOffset}
                                      />
                                      <line 
                                        x1="30" y1="60" x2="130" y2="75" 
                                        stroke="#00ff87" 
                                        strokeWidth="1.5" 
                                        strokeDasharray="180"
                                        strokeDashoffset={gamingOffset}
                                      />
                                      <text x="60" y="42" fill="#00ff87" fontSize="6" style={{ opacity: drawPercent > 0.5 ? 0.8 : 0 }}>Ray(t) = O + tD</text>
                                    </>
                                  )}
                                </svg>
                              )}
                            </div>
                          </div>

                          <div className={`whiteboard-qa-overlay ${calculatedQaActive ? 'active' : ''}`}>
                            <div className="qa-dialog-bubble student-bubble">
                              <span className="bubble-speaker">STUDENT QUESTION:</span>
                              <p className="bubble-txt">
                                {kakshaHobby === 'sports' 
                                  ? "What happens if we turn gravity off? Does the ball continue straight?" 
                                  : kakshaHobby === 'sci-fi' 
                                  ? "Can a warp drive pass directly through a gravitational singularity?"
                                  : "How do we reflect a ray off the obstacle boundary?"}
                              </p>
                            </div>
                            <div className="qa-dialog-bubble teacher-bubble">
                              <span className="bubble-speaker">AI TEACHER:</span>
                              <p className="bubble-txt">
                                {kakshaHobby === 'sports'
                                  ? "Excellent! Without gravity, acceleration goes to zero. The curve becomes a linear vector tangent to the release: v(t) = v₀. Observe the blackboard!"
                                  : kakshaHobby === 'sci-fi'
                                  ? "Fascinating query! A warp bubble would undergo intense tidal shear. The math says it collapses into infinite curvature. See the board projection."
                                  : "Great! We compute the reflection vector using R = I - 2(N·I)N, where N is the surface normal. Check the whiteboard diagram."}
                              </p>
                            </div>
                            <button className="qa-resume-btn" onClick={() => setQaActive(false)}>
                              Resume Lecture →
                            </button>
                          </div>

                          {!calculatedQaActive && (
                            <button 
                              className="whiteboard-interrupt-trigger" 
                              onClick={() => {
                                setQaActive(true);
                                setPulseActive(true);
                                setTimeout(() => setPulseActive(false), 800);
                              }}
                            >
                              ⚡ Interrupt & Query AI Teacher
                            </button>
                          )}
                        </div>
                      </div>

                      <div className={`classroom-teacher ${teacherVisible ? 'active' : ''}`}>
                        <div className="hologram-mesh" />
                        <div className="hologram-glow" />
                        <div className="teacher-hud">
                          <span className="hud-agent-name">TEACHER.AI</span>
                          <span className="hud-agent-status">TALKING</span>
                        </div>
                      </div>

                      <div className={`multi-agent-system ${agentsActive ? 'active' : ''}`}>
                        <div className={`agent-laser laser-1 ${calculatedPulseActive ? 'pulse' : ''}`} />
                        <div className={`agent-laser laser-2 ${calculatedPulseActive ? 'pulse' : ''}`} />
                        <div className={`agent-laser laser-3 ${calculatedPulseActive ? 'pulse' : ''}`} />

                        <div className="agent-node profiler-node" data-label="Profiler Agent">
                          <span className="node-icon">👤</span>
                          <span className="node-lbl">Profiler</span>
                        </div>
                        <div className="agent-node curriculum-node" data-label="Curriculum Agent">
                          <span className="node-icon">📚</span>
                          <span className="node-lbl">Curriculum</span>
                        </div>
                        <div className="agent-node whiteboard-node" data-label="Whiteboard Writer">
                          <span className="node-icon">✏️</span>
                          <span className="node-lbl">Whiteboard</span>
                        </div>
                        <div className="agent-node dialogue-node" data-label="Dialogue Agent">
                          <span className="node-icon">💬</span>
                          <span className="node-lbl">Dialogue</span>
                        </div>
                      </div>

                      <div className={`classroom-desk ${deskActive ? 'active' : ''}`}>
                        <div className="desk-top">
                          <span className="desk-notebook">Notebook (Playground)</span>
                        </div>
                        
                        <div className={`desk-drawer ${calculatedDrawerOpen ? 'open' : ''}`}>
                          <div className="drawer-handle" onClick={() => setDrawerOpen(!drawerOpen)}>
                            <span>{calculatedDrawerOpen ? '▼ Close Drawer' : '▲ Pull Open Drawer'}</span>
                          </div>
                          
                          <div className="drawer-content">
                            <p className="playground-title">Post-Lecture Playground</p>
                            {!quizAnswered ? (
                              <div className="playground-quiz">
                                <p className="quiz-question">
                                  {kakshaHobby === 'sports'
                                    ? "Q: Under zero-gravity, what shape is the basketball's path?"
                                    : kakshaHobby === 'sci-fi'
                                    ? "Q: Einstein field equations relate gravity to what?"
                                    : "Q: Which vector normalizes the collision reflection?"}
                                </p>
                                <div className="quiz-options">
                                  <button onClick={() => { setQuizAnswered(true); setQuizCorrect(true); }}>
                                    {kakshaHobby === 'sports' ? 'Straight Line (Linear Vector)' : kakshaHobby === 'sci-fi' ? 'Energy & Momentum' : 'Surface Normal N'}
                                  </button>
                                  <button onClick={() => { setQuizAnswered(true); setQuizCorrect(false); }}>
                                    {kakshaHobby === 'sports' ? 'Hyperbola' : kakshaHobby === 'sci-fi' ? 'Warp Speed' : 'Velocity Vector'}
                                  </button>
                                </div>
                              </div>
                            ) : (
                              <div className="playground-result">
                                {quizCorrect ? (
                                  <p className="result-text success">🎉 Correct! Multi-agent core evaluation matched student profile score (+10 PTS)</p>
                                ) : (
                                  <p className="result-text failure">❌ Incorrect. The backend profiler recommends re-evaluating equations.</p>
                                )}
                                <button className="quiz-retry-btn" onClick={() => { setQuizAnswered(false); setQuizCorrect(null); }}>
                                  Reset Challenge
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                </div>

                {/* Tech Stack Ticker (Desktop) */}
                <div 
                  className="kaksha-ticker-wrap"
                  style={{
                    opacity: Math.min(1, kProgress * 4.5),
                    pointerEvents: kProgress >= 0.22 ? 'auto' : 'none'
                  }}
                >
                  <div className="kaksha-ticker-title">TECH STACK:</div>
                  <div className="kaksha-ticker">
                    <div className="kaksha-ticker-track">
                      {[...Array(3)].map((_, i) => (
                        <div key={i} className="kaksha-ticker-group">
                          <img src="/assets/react_logo.png" alt="React" className="ticker-logo" />
                          <img src="/assets/next_logo.png" alt="Next.js" className="ticker-logo" />
                          <img src="/assets/js_logo.png" alt="JavaScript" className="ticker-logo" />
                          <img src="/assets/ts_logo.png" alt="TypeScript" className="ticker-logo" />
                          <img src="/assets/langchain_logo.png" alt="Langchain" className="ticker-logo" />
                          <img src="/assets/vercel_logo.png" alt="Vercel" className="ticker-logo" />
                          <img src="/assets/copilotkit_logo.png" alt="CopilotKit" className="ticker-logo" />
                          <img src="/assets/lottie_logo.png" alt="Lottie" className="ticker-logo" />
                          <img src="/assets/remotion_logo.png" alt="Remotion" className="ticker-logo" />
                          <img src="/assets/daily_logo.png" alt="Daily.co" className="ticker-logo" />
                          <img src="/assets/tailwind_logo.png" alt="Tailwind CSS" className="ticker-logo" />
                          <img src="/assets/radix_logo.png" alt="Radix UI" className="ticker-logo" />
                          <img src="/assets/framer_logo.png" alt="Framer Motion" className="ticker-logo" />
                          <img src="/assets/zustand_logo.png" alt="Zustand" className="ticker-logo" />
                          <img src="/assets/dexie_logo.png" alt="Dexie.js" className="ticker-logo" />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

              </div>
            </section>
          );
        }

        if (project.id === 3) {
          const pProgress = pokerProgress;
          
          const pokerFeaturesList = [
            {
              title: "Electron + Next.js architecture",
              desc: "Designed and scaled a multi-window Desktop Poker application using Next.js, TypeScript, and Electron, supporting concurrent gameplay across 20+ simultaneous tables per user session."
            },
            {
              title: "Micro-frontend integration",
              desc: "Collaborated with parallel frontend teams using a Micro-frontend architecture via Module Federation — enabling independent deployment, team autonomy, and seamless runtime composition."
            },
            {
              title: "Real-time state management",
              desc: "Built a centralised Redux / RTK / RTK Query data layer over WebSocket feeds, achieving <100ms event synchronisation across independent Electron renderer processes."
            },
            {
              title: "Performance & Core Web Vitals",
              desc: "Led memory profiling (React Profiler) and GPU offloads, cutting resources by 40% (60fps gameplay). Boosted LCP by 35%, cut CLS near-zero, and cut INP by 40% via bundle splitting and analyzer tools."
            },
            {
              title: "Test automation",
              desc: "Established Jest unit tests and multi-window Playwright E2E suites; achieved 85%+ coverage on critical user flows, reducing production regression incidents by 60%."
            }
          ];

          let activePokerIndex = -1;
          if (pProgress > 0.15 && pProgress <= 0.30) activePokerIndex = 0;
          else if (pProgress > 0.30 && pProgress <= 0.45) activePokerIndex = 1;
          else if (pProgress > 0.45 && pProgress <= 0.60) activePokerIndex = 2;
          else if (pProgress > 0.60 && pProgress <= 0.75) activePokerIndex = 3;
          else if (pProgress > 0.75 && pProgress <= 0.90) activePokerIndex = 4;
          else if (pProgress > 0.90) activePokerIndex = 5;

          return (
            <section
              key={project.id}
              className="pj-poker-section"
              ref={(el) => {
                pokerSectionRef.current = el;
                sectionsRef.current[refIndex] = el;
              }}
              style={{ '--accent': project.accentColor }}
            >
              <div className="pj-bg-number">03</div>

              <div className="poker-sticky-wrapper">
                <div 
                  className="poker-scroll-overlay"
                  style={{ 
                    opacity: Math.max(0, 1 - pProgress * 6.6),
                    pointerEvents: pProgress < 0.15 ? 'auto' : 'none',
                    display: pProgress >= 0.18 ? 'none' : 'flex'
                  }}
                >
                  <div className="overlay-center-content">
                    <img src="/assets/poker_logo.webp" alt="MPL Poker Logo" className="poker-overlay-logo-img" />
                    <h2 className="poker-overlay-title">DESKTOP POKER</h2>
                    <p className="poker-overlay-subtitle">Ultra-low latency multiplayer architecture</p>
                    <div className="poker-scroll-hint">Scroll down to deal feature cards</div>
                  </div>
                </div>

                <div 
                  className="poker-container"
                  style={{
                    opacity: Math.min(1, pProgress * 6.6)
                  }}
                >
                  <div className="poker-info-sidebar">
                    <span className="pj-number">03</span>
                    <p className="pj-eyebrow">{project.eyebrow}</p>
                    <h2 className="pj-title">{project.title}</h2>
                    <p className="pj-headline">{project.headline}</p>

                    <div className="poker-features-list">
                      {pokerFeaturesList.map((f, idx) => (
                        <div 
                          key={idx} 
                          className={`poker-feature-item ${activePokerIndex === idx ? 'active' : ''}`}
                        >
                          <h4 className="feature-item-title">
                            <span className="poker-dot"></span>
                            {f.title}
                          </h4>
                          <p className="feature-item-desc">{f.desc}</p>
                        </div>
                      ))}
                    </div>

                    <div className="pj-tags">
                      {project.tags.map((tag) => (
                        <span key={tag} className="pj-tag">{tag}</span>
                      ))}
                    </div>
                  </div>

                  <div className="poker-viewport">
                    <div className="poker-3d-stage">
                      <div className="poker-table">
                        <div className="felt-surface-desktop">
                          <div className="felt-inner-ring" />
                          <div className="felt-center-logo-img-wrap">
                            <img src="/assets/poker_logo.webp" alt="MPL Poker Chip" className="felt-center-logo-img" />
                          </div>

                          <div className="poker-seats">
                            <div className="poker-seat seat-1 active">
                              <span className="seat-status-glow" />
                              <img src="/assets/react_logo.png" alt="React" className="seat-logo-img" />
                              <div className="seat-badge">React</div>
                              <div className="seat-meta">Frontend UI</div>
                            </div>
                            <div className="poker-seat seat-2 active">
                              <span className="seat-status-glow" />
                              <img src="/assets/next_logo.png" alt="Next.js" className="seat-logo-img" />
                              <div className="seat-badge">Next.js</div>
                              <div className="seat-meta">App Framework</div>
                            </div>
                            <div className="poker-seat seat-3 active">
                              <span className="seat-status-glow" />
                              <img src="/assets/electron_logo.png" alt="Electron" className="seat-logo-img" />
                              <div className="seat-badge">Electron</div>
                              <div className="seat-meta">Desktop Container</div>
                            </div>
                            <div className="poker-seat seat-4 active">
                              <span className="seat-status-glow" />
                              <img src="/assets/redux.png" alt="Redux" className="seat-logo-img" />
                              <div className="seat-badge">Redux</div>
                              <div className="seat-meta">State Layer</div>
                            </div>
                            <div className="poker-seat seat-5 active">
                              <span className="seat-status-glow" />
                              <img src="/assets/websocket_logo.png" alt="WebSockets" className="seat-logo-img" />
                              <div className="seat-badge">WebSockets</div>
                              <div className="seat-meta">Realtime Feed</div>
                            </div>
                            <div className="poker-seat seat-6 active">
                              <span className="seat-status-glow" />
                              <img src="/assets/ts_logo.png" alt="TypeScript" className="seat-logo-img" />
                              <div className="seat-badge">TypeScript</div>
                              <div className="seat-meta">Core Type Layer</div>
                            </div>
                          </div>

                          <div className="community-cards-desktop">
                            {[0, 1, 2, 3, 4].map((idx) => {
                              const cardProgressStart = 0.15 + idx * 0.15;
                              const cardProgressEnd = cardProgressStart + 0.15;
                              
                              const isFocus = pProgress >= cardProgressStart && pProgress < cardProgressStart + 0.10;
                              const isTransitioning = pProgress >= cardProgressStart + 0.10 && pProgress < cardProgressEnd;
                              const isSettled = pProgress >= cardProgressEnd;

                              const xOffset = isMobile ? (2 - idx) * 68 : (2 - idx) * 75;
                              const yOffset = isMobile ? -80 : -120;
                              const zOffset = isMobile ? 180 : 150;
                              const focusScale = isMobile ? 2.2 : 1.0;

                              let cardStyle = {};
                              if (pProgress < cardProgressStart) {
                                cardStyle = { opacity: 0, transform: 'scale(0.1) translate3d(0, -100px, 0)' };
                              } else if (isFocus) {
                                const focusProgress = (pProgress - cardProgressStart) / 0.10;
                                const scale = 0.3333 + (focusScale - 0.3333) * Math.min(1, focusProgress * 3);
                                const opacity = Math.min(1, focusProgress * 2);
                                cardStyle = {
                                  transform: isMobile
                                    ? `translate(${xOffset}px, ${yOffset}px) scale(${scale})`
                                    : `translate3d(${xOffset}px, ${yOffset}px, ${zOffset}px) scale(${scale})`,
                                  opacity: opacity,
                                  zIndex: 1000,
                                  boxShadow: '0 20px 50px rgba(0,0,0,0.8)'
                                };
                              } else if (isTransitioning) {
                                const transProgress = (pProgress - (cardProgressStart + 0.10)) / 0.05;
                                const scale = focusScale - (focusScale - 0.3333) * transProgress;
                                cardStyle = {
                                  transform: isMobile
                                    ? `translate(calc(${xOffset}px * (1 - ${transProgress})), calc(${yOffset}px * (1 - ${transProgress}))) scale(${scale})`
                                    : `translate3d(calc(${xOffset}px * (1 - ${transProgress})), calc(${yOffset}px * (1 - ${transProgress})), calc(${zOffset}px * (1 - ${transProgress}))) scale(${scale})`,
                                  opacity: 1,
                                  zIndex: 900
                                };
                              } else if (isSettled) {
                                cardStyle = {
                                  opacity: 1,
                                  transform: 'scale(0.3333) translate3d(0,0,0)',
                                  boxShadow: '0 4px 10px rgba(0,0,0,0.4)'
                                };
                              }

                              return (
                                <div 
                                  key={idx} 
                                  className={`poker-card-slot slot-${idx}`}
                                  style={{ zIndex: isFocus || isTransitioning ? 1000 : 1 }}
                                >
                                  <div className="card-placeholder-label">
                                    {idx === 0 && 'FLOP 1'}
                                    {idx === 1 && 'FLOP 2'}
                                    {idx === 2 && 'FLOP 3'}
                                    {idx === 3 && 'TURN'}
                                    {idx === 4 && 'RIVER'}
                                  </div>

                                  {pProgress >= cardProgressStart && (
                                    <div 
                                      className={`poker-flying-card ${isSettled ? 'settled' : ''}`}
                                      style={cardStyle}
                                    >
                                      <div className="card-face">
                                        <div className="card-header-suit">
                                          <span>
                                            {idx === 0 && 'A'}
                                            {idx === 1 && 'K'}
                                            {idx === 2 && 'Q'}
                                            {idx === 3 && 'J'}
                                            {idx === 4 && '10'}
                                          </span>
                                          <span className="suit-symbol">
                                            {idx === 0 && '♠'}
                                            {idx === 1 && '♦'}
                                            {idx === 2 && '♥'}
                                            {idx === 3 && '♣'}
                                            {idx === 4 && '♠'}
                                          </span>
                                        </div>
                                        
                                        <div className="card-summary-text">
                                          {isMobile ? (
                                            <>
                                              {idx === 0 && <>Designed and scaled a multi-window Desktop Poker application using Next.js, TypeScript, and Electron, supporting concurrent gameplay across <span className="card-highlight">20+</span> simultaneous tables per user session.</>}
                                              {idx === 1 && <>Collaborated with parallel frontend teams using a Micro-frontend architecture via Module Federation — enabling independent deployment, team autonomy, and seamless runtime composition.</>}
                                              {idx === 2 && <>Built a centralised Redux / RTK / RTK Query data layer over WebSocket feeds, achieving <span className="card-highlight">&lt;100ms</span> event synchronisation across independent Electron renderer processes.</>}
                                              {idx === 3 && <>Led memory profiling (React Profiler) and GPU offloads, cutting resources by <span className="card-highlight">40%</span> (60fps gameplay). Boosted LCP by 35%, cut CLS near-zero, and cut INP by 40% via bundle splitting and analyzer tools.</>}
                                              {idx === 4 && <>Established Jest unit tests and multi-window Playwright E2E suites; achieved <span className="card-highlight">85%+</span> coverage on critical user flows, reducing production regression incidents by 60%.</>}
                                            </>
                                          ) : (
                                            <>
                                              {idx === 0 && (
                                                <>Multi-window gameplay engine supporting <span className="card-highlight">20+</span> concurrent tables.</>
                                              )}
                                              {idx === 1 && (
                                                <>Micro-frontend architecture via Module Federation for runtime composition.</>
                                              )}
                                              {idx === 2 && (
                                                <>Centralised Redux &amp; RTK Query layer with <span className="card-highlight">&lt;100ms</span> WebSocket sync.</>
                                              )}
                                              {idx === 3 && (
                                                <>React Profiler memory tuning &amp; GPU offloads cutting resource usage by <span className="card-highlight">40%</span>.</>
                                              )}
                                              {idx === 4 && (
                                                <>Multi-window Jest &amp; Playwright E2E coverage achieving <span className="card-highlight">85%+</span> on critical flows.</>
                                              )}
                                            </>
                                          )}
                                        </div>

                                        <div className="card-label">
                                          {idx === 0 && 'ELECTRON DESKTOP ENGINE'}
                                          {idx === 1 && 'MICRO-FRONTEND FEDERATION'}
                                          {idx === 2 && 'REAL-TIME WS SYNC'}
                                          {idx === 3 && 'PERFORMANCE & WEB VITALS'}
                                          {idx === 4 && 'E2E TEST AUTOMATION'}
                                        </div>
                                      </div>
                                    </div>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          );
        }

        if (project.id === 4) {
          const bProgress = bountyProgress;
          
          const bountyPoints = [
            {
              title: "SDK ARCHITECTURE",
              desc: "Designed and shipped Bountyverse — a high-performance JavaScript SDK enabling competitive format on casual gaming, leaderboards, and anti-cheat scoring across 15+ integrated HTML5 game titles.",
              reward: "15+ GAMES"
            },
            {
              title: "ADMIN DASHBOARD",
              desc: "Built a full-featured Admin Dashboard using React.js, Next.js, TypeScript, Redux, and Material UI with a reusable Storybook component library; reduced partner onboarding time from 3 weeks to 4 days.",
              reward: "4 DAYS"
            },
            {
              title: "THEMING & DESIGN SYSTEM",
              desc: "Implemented a modular, scoped styling architecture using Styled Components and Emotion, enabling dynamic theming and consistent UI across partner dashboard and SDK-integrated game surfaces.",
              reward: "DYNAMIC THEME"
            },
            {
              title: "PERFORMANCE ENGINES",
              desc: "Introduced Next.js SSR/SSG strategies and tree-shaking optimisations via Webpack Bundle Analyzer, reducing initial bundle size by 45% and Time-to-Interactive by ~2 seconds.",
              reward: "-45% BUNDLE"
            },
            {
              title: "CI/CD & AUTOMATION",
              desc: "Established CI/CD pipelines (GitHub Actions) and Jest/Playwright automation, raising test coverage to 85%+; zero critical production incidents in final 12 months.",
              reward: "85%+ TESTED"
            }
          ];

          return (
            <section
              key={project.id}
              className="pj-bounty-section"
              ref={(el) => {
                bountySectionRef.current = el;
                sectionsRef.current[refIndex] = el;
              }}
              style={{ '--accent': project.accentColor }}
            >
              <div className="pj-bg-number">04</div>

              <div className="bounty-sticky-wrapper">
                {/* Saloon wooden board background */}
                <div className="saloon-bounty-board">
                  {/* Floating dust particles */}
                  <div className="dust-particle dust-1" />
                  <div className="dust-particle dust-2" />
                  <div className="dust-particle dust-3" />
                  <div className="dust-particle dust-4" />
                  <div className="dust-particle dust-5" />

                  {/* Header title */}
                  <div className="bounty-board-header">
                    <span className="saloon-badge">WANTED FOR INFRASTRUCTURE</span>
                    <h2 className="saloon-title">BOUNTYVERSE SDK</h2>
                    <p className="saloon-subtitle">Competitive format on casual gaming &amp; anti-cheat engine</p>
                  </div>

                  {/* 5 Posters Side-by-Side */}
                  <div className="bounty-posters-container">
                    {bountyPoints.map((pt, idx) => {
                      const duration = 0.18;
                      const step = duration * 0.85; // 0.153
                      const startThreshold = 0.10 + idx * step;

                      let unrollFactor = 0;
                      if (bProgress > startThreshold) {
                        unrollFactor = Math.min(1, (bProgress - startThreshold) / duration);
                      }

                      const isVisible = bProgress > startThreshold || idx === 0;

                      return (
                        <div 
                          key={idx} 
                          className="bounty-poster-wrapper"
                          style={{
                            opacity: isVisible ? 1 : 0,
                            pointerEvents: isVisible ? 'auto' : 'none',
                            zIndex: 10 + idx
                          }}
                        >
                          {/* Rolled Cylinder header */}
                          <div className="poster-roll-top" />

                          {/* Dynamic unrolling sheet */}
                          <div 
                            className="poster-sheet"
                            style={{ 
                              height: `${unrollFactor * 100}%`,
                              opacity: unrollFactor > 0.05 ? 1 : 0
                            }}
                          >
                            <div 
                              className="poster-content"
                              style={{
                                opacity: unrollFactor > 0.6 ? (unrollFactor - 0.6) / 0.4 : 0
                              }}
                            >
                              <div className="poster-wanted">WANTED</div>
                              
                              <div className="poster-logo-wrap">
                                <img src="/assets/bountyverse_logo.png" alt="Bountyverse Star" className="poster-badge-logo" />
                              </div>

                              <h3 className="poster-feature-title">{pt.title}</h3>
                              
                              <p className="poster-feature-desc">{pt.desc}</p>
                              
                              <div className="poster-bounty-payout">
                                <span className="payout-label">BOUNTY REWARD</span>
                                <span className="payout-value">{pt.reward}</span>
                              </div>
                            </div>
                          </div>

                          {/* Rolling bottom rod cylinder */}
                          <div 
                            className="poster-roll-bottom"
                            style={{
                              top: `${unrollFactor * 100}%`
                            }}
                          />
                        </div>
                      );
                    })}
                  </div>

                  {/* Section footer tags */}
                  <div className="bounty-footer-tags">
                    {project.tags.map((tag) => (
                      <span key={tag} className="pj-tag">{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          );
        }

        if (project.id === 5) {
          const kxProg = knoxProgress;

          // Decryption progress and key states
          const outerLockRotate = Math.min(360, kxProg * 2.5 * 360);
          const innerLockRotate = kxProg > 0.4 ? Math.min(360, (kxProg - 0.4) * 2.5 * 360) : 0;

          const isOuterUnlocked = kxProg >= 0.45;
          const isInnerUnlocked = kxProg >= 0.75;

          const knoxPoints = [
            {
              title: "Dual Data-at-Rest (Dual DAR)",
              desc: "Implemented Dual DAR encryption at the file system level (fscrypt / Keymaster) exclusively for flagship Samsung devices, adding a second encryption layer to meet enterprise and government security mandates.",
              start: 0.15,
              end: 0.42,
              layer: "OUTER LAYER"
            },
            {
              title: "Enterprise Partition Manager Migration",
              desc: "Ported the Knox Enterprise Partition Manager from legacy ext4 to fscrypt, enabling per-file/per-directory encryption and hardware-backed key management.",
              start: 0.32,
              end: 0.58,
              layer: "FS DRIVER LAYER"
            },
            {
              title: "Sensitive Data Protection (SDP)",
              desc: "Led a team of 4 engineers to implement Samsung Knox SDP — secure folder encryption feature shipped across all Samsung devices — using C/C++ and Android system APIs.",
              start: 0.50,
              end: 0.76,
              layer: "INNER TEE LAYER"
            },
            {
              title: "Cross-Device Porting",
              desc: "Ported Dual DAR and SDP implementation code across multiple flagship device variants, ensuring compatibility across OS versions and device-specific kernel differences.",
              start: 0.68,
              end: 0.92,
              layer: "SYSTEM PORTING"
            }
          ];

          return (
            <section
              key={project.id}
              className="pj-knox-section"
              ref={(el) => {
                knoxSectionRef.current = el;
                sectionsRef.current[refIndex] = el;
              }}
              style={{ '--accent': project.accentColor }}
            >
              <div className="pj-bg-number">05</div>

              <div className="knox-sticky-wrapper">
                <div className="knox-cyber-board">
                  {/* Glowing background grid */}
                  <div className="cyber-grid-overlay" />

                  {/* Header Title */}
                  <div className="knox-board-header">
                    <span className="knox-security-badge">
                      {isInnerUnlocked ? "UNLOCKED // SECURE CONTEXT ACTIVE" : isOuterUnlocked ? "OUTER DAR DECRYPTED // SDP RESTRICTED" : "LOCKED // DUAL LAYER ENCRYPTED"}
                    </span>
                    <h2 className="knox-title">SAMSUNG KNOX SECURITY</h2>
                    <p className="knox-subtitle">Kernel-level encryption &amp; Trusted Execution Environment (TEE) filesystem engines</p>
                  </div>

                  <div className="knox-vault-container">
                    {/* Vault Core Stages */}
                    <div className="knox-vault-visual">
                      {/* Outer Decryption Ring */}
                      <div 
                        className={`vault-ring ring-outer ${isOuterUnlocked ? 'unlocked' : ''}`}
                        style={{ transform: `rotate(${outerLockRotate}deg)` }}
                      >
                        <div className="ring-notch notch-1">DAR</div>
                        <div className="ring-notch notch-2">FSCRYPT</div>
                        <div className="ring-notch notch-3">KEYMASTER</div>
                      </div>

                      {/* Inner Decryption Ring */}
                      <div 
                        className={`vault-ring ring-inner ${isInnerUnlocked ? 'unlocked' : ''}`}
                        style={{ transform: `rotate(-${innerLockRotate}deg)` }}
                      >
                        <div className="ring-notch notch-inner-1">SDP</div>
                        <div className="ring-notch notch-inner-2">TEE</div>
                        <div className="ring-notch notch-inner-3">RAM WIPE</div>
                      </div>

                      {/* Core Vault Lock */}
                      <div className={`vault-core-lock ${isInnerUnlocked ? 'fully-unlocked' : isOuterUnlocked ? 'partially-unlocked' : 'locked'}`}>
                        <div className="lock-icon-wrap">
                          {isInnerUnlocked ? (
                            <svg className="lock-svg" viewBox="0 0 24 24"><path fill="currentColor" d="M12 17c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm6-9h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6-5c1.66 0 3 1.34 3 3v2H9V6c0-1.66 1.34-3 3-3z"/></svg>
                          ) : (
                            <svg className="lock-svg" viewBox="0 0 24 24"><path fill="currentColor" d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/></svg>
                          )}
                        </div>
                        <div className="lock-status-label">
                          {isInnerUnlocked ? "ACCESS GRANTED" : isOuterUnlocked ? "LAYER 1 CLEAR" : "ENCRYPTED"}
                        </div>
                      </div>
                    </div>

                    {/* Security Points */}
                    <div className="knox-points-list">
                      {knoxPoints.map((pt, idx) => {
                        const isRevealed = kxProg > pt.start;
                        const revealPct = Math.max(0, Math.min(1, (kxProg - pt.start) / (pt.end - pt.start)));
                        
                        return (
                          <div 
                            key={idx} 
                            className={`knox-point-card ${isRevealed ? 'active' : ''} ${revealPct >= 1 ? 'decrypted' : ''}`}
                            style={{
                              opacity: isRevealed ? 0.6 + revealPct * 0.4 : 0.35,
                              transform: isRevealed ? `translateX(${10 * (1 - revealPct)}px)` : 'none',
                              transition: 'opacity 0.3s ease, border-color 0.4s ease, box-shadow 0.4s ease'
                            }}
                          >
                            <div className="point-card-header">
                              <span className="point-layer-tag">{pt.layer}</span>
                              <span className="point-status-indicator">
                                {revealPct >= 1 ? "[SECURE_CLEAR]" : revealPct > 0 ? `[DECRYPTING_${Math.floor(revealPct * 100)}%]` : "[LOCKED]"}
                              </span>
                            </div>
                            <h3 className="point-card-title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                              {revealPct < 1 ? (
                                <svg style={{ width: '14px', height: '14px', color: revealPct > 0 ? '#f59e0b' : '#ef4444' }} viewBox="0 0 24 24">
                                  <path fill="currentColor" d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/>
                                </svg>
                              ) : (
                                <svg style={{ width: '14px', height: '14px', color: '#10b981' }} viewBox="0 0 24 24">
                                  <path fill="currentColor" d="M12 17c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm6-9h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6-5c1.66 0 3 1.34 3 3v2H9V6c0-1.66 1.34-3 3-3z"/>
                                </svg>
                              )}
                              <DecryptText text={pt.title} progress={kxProg} start={pt.start} end={pt.start + 0.12} />
                            </h3>
                            <p className="point-card-desc">
                              <DecryptText text={pt.desc} progress={kxProg} start={pt.start + 0.05} end={pt.end} />
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Section footer tags */}
                  <div className="knox-footer-tags">
                    {project.tags.map((tag) => (
                      <span key={tag} className="pj-tag">{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          );
        }

        return (
          <section
            key={project.id}
            className="pj-section"
            ref={(el) => (sectionsRef.current[refIndex] = el)}
            style={{ '--accent': project.accentColor }}
          >
            {/* Project Number Watermark */}
            <div className="pj-bg-number">
              {String(project.id).padStart(2, '0')}
            </div>

            {/* Media Block */}
            <div className="pj-media-block">
              <div className="pj-media-image-wrap">
                <img
                  className="pj-media-image"
                  src={project.image}
                  alt={project.title}
                  loading="lazy"
                />
                <div className="pj-media-gradient" />
              </div>
            </div>

            {/* Content overlay */}
            <div className="pj-content">
              <span className="pj-number">
                {String(project.id).padStart(2, '0')}
              </span>
              <p className="pj-eyebrow">{project.eyebrow}</p>
              <h2 className="pj-title">{project.title}</h2>
              <p className="pj-headline">{project.headline}</p>
              <p className="pj-desc">{project.description}</p>
              
              <div className="pj-tags">
                {project.tags.map((tag) => (
                  <span key={tag} className="pj-tag">{tag}</span>
                ))}
              </div>
            </div>

            {/* Highlights / Metrics strip */}
            <div className="pj-highlights">
              {project.highlights?.map((h, i) => (
                <div key={i} className="pj-highlight-card" data-hover>
                  <span className="pj-highlight-value">{h.value}</span>
                  <span className="pj-highlight-label">{h.label}</span>
                </div>
              ))}
            </div>
          </section>
        );
      })}

      {/* ── Closing CTA ── */}
      <section 
        className="pj-cta"
        ref={(el) => (sectionsRef.current[siteData.projects.length + 1] = el)}
      >
        <div className="cta-glow glow-1" />
        <div className="cta-glow glow-2" />
        <div className="cyber-grid-overlay" />

        <div className="pj-cta-content">
          <p className="pj-cta-eyebrow">WHAT'S NEXT?</p>
          <h2 className="pj-cta-title">Interested in working together?</h2>
          <p className="pj-cta-subtitle">Let's build something exceptional. Get in touch to collaborate on system architectures and high-performance frontend engineering.</p>
          <button 
            className="pj-cta-btn" 
            onClick={() => onNavigate && onNavigate('contact')}
            data-hover
          >
            <span>Get in Touch</span>
            <svg className="cta-btn-arrow" viewBox="0 0 24 24" width="16" height="16">
              <path fill="currentColor" d="M5 13h11.86l-5.43 5.43 1.42 1.42L21.14 12l-8.29-8.29-1.42 1.42 5.43 5.43H5v2z" />
            </svg>
          </button>
        </div>
      </section>
    </div>
  );
}
