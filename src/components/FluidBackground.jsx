import { useRef, useEffect } from 'react';

export default function FluidBackground() {
  const canvasRef = useRef(null);
  const animRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0, tx: 0, ty: 0, speed: 0 });
  const timeRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
      // Initialize mouse to center of screen
      if (mouseRef.current.x === 0) {
        mouseRef.current.x = canvas.width / 2;
        mouseRef.current.y = canvas.height / 2;
        mouseRef.current.tx = canvas.width / 2;
        mouseRef.current.ty = canvas.height / 2;
      }
    };

    resize();
    window.addEventListener('resize', resize);

    const onMouseMove = (e) => {
      const mouse = mouseRef.current;
      const rect = canvas.getBoundingClientRect();
      mouse.tx = e.clientX - rect.left;
      mouse.ty = e.clientY - rect.top;
    };
    window.addEventListener('mousemove', onMouseMove);

    // Number of control points around the blob circles
    const numPoints = 16;
    const angles = [];
    for (let i = 0; i < numPoints; i++) {
      angles.push((i / numPoints) * Math.PI * 2);
    }

    const drawBlob = (cx, cy, baseRadius, timeOffset, speed, scale, color1, color2, color3, opacity) => {
      const w = canvas.width;
      const h = canvas.height;
      const mouse = mouseRef.current;

      const time = timeRef.current * speed + timeOffset;
      const points = [];

      for (let i = 0; i < numPoints; i++) {
        const angle = angles[i];

        // 1. Calculate base morphing radius using overlapping sine waves for liquid flow
        let r = baseRadius;
        r += Math.sin(time + i * 1.5) * (baseRadius * 0.18);
        r += Math.cos(time * 1.8 - i * 0.8) * (baseRadius * 0.12);
        r += Math.sin(time * 2.5 + i * 2.2) * (baseRadius * 0.06);

        // Raw vertex coordinates before mouse interaction
        let vx = cx + Math.cos(angle) * r;
        let vy = cy + Math.sin(angle) * r;

        // 2. Calculate mouse pointer pull force
        const dx = mouse.x - vx;
        const dy = mouse.y - vy;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const maxDist = Math.min(w, h) * 0.45;

        if (dist < maxDist) {
          // Dynamic pull force: closer points stretch more toward mouse position
          const force = (1 - dist / maxDist) * 0.45 * scale;
          vx += (mouse.x - vx) * force;
          vy += (mouse.y - vy) * force;
        }

        points.push({ x: vx, y: vy });
      }

      // 3. Draw the closed path with smooth quadratic bezier curves
      ctx.beginPath();
      const firstMidX = (points[0].x + points[numPoints - 1].x) / 2;
      const firstMidY = (points[0].y + points[numPoints - 1].y) / 2;
      ctx.moveTo(firstMidX, firstMidY);

      for (let i = 0; i < numPoints; i++) {
        const nextIdx = (i + 1) % numPoints;
        const midX = (points[i].x + points[nextIdx].x) / 2;
        const midY = (points[i].y + points[nextIdx].y) / 2;
        ctx.quadraticCurveTo(points[i].x, points[i].y, midX, midY);
      }
      ctx.closePath();

      // 4. Fill path with rich linear gradient
      const grad = ctx.createLinearGradient(cx - baseRadius, cy - baseRadius, cx + baseRadius, cy + baseRadius);
      grad.addColorStop(0, color1);
      grad.addColorStop(0.5, color2);
      grad.addColorStop(1, color3);
      
      ctx.fillStyle = grad;
      ctx.globalAlpha = opacity;
      ctx.fill();
      ctx.globalAlpha = 1.0;
    };

    const draw = () => {
      const w = canvas.width;
      const h = canvas.height;
      const mouse = mouseRef.current;

      // Soft ease the mouse coordinates for smooth lag-like liquid trails
      mouse.x += (mouse.tx - mouse.x) * 0.08;
      mouse.y += (mouse.ty - mouse.y) * 0.08;

      timeRef.current += 0.015;

      ctx.clearRect(0, 0, w, h);

      const cx = w / 2;
      const cy = h / 2;
      const baseRadius = Math.min(w, h) * 0.26;

      // Layer 1: Larger, back ambient morphing blob (deep purple/magenta/orange)
      drawBlob(
        cx, cy, 
        baseRadius * 1.15, 
        0, 0.7, 0.8,
        'rgba(124, 58, 237, 0.25)',  // Violet
        'rgba(219, 39, 119, 0.20)',  // Pink
        'rgba(249, 115, 22, 0.15)',  // Orange
        0.55
      );

      // Layer 2: Core foreground morphing blob (vibrant purple/coral/orange)
      drawBlob(
        cx, cy, 
        baseRadius, 
        Math.PI, 1.1, 1.2,
        '#7c3aed', // Purple
        '#db2777', // Coral Pink
        '#f97316', // Orange
        0.85
      );

      animRef.current = requestAnimationFrame(draw);
    };

    animRef.current = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(animRef.current);
    };
  }, []);

  return <canvas ref={canvasRef} className="fluid-canvas" />;
}
