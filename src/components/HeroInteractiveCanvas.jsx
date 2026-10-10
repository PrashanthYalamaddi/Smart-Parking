import React, { useRef, useEffect } from 'react';

/**
 * HeroInteractiveCanvas
 * High-performance 60fps canvas background with interactive transit beacons,
 * dynamic constellation vectors, magnetic cursor attraction, and touch radar ripples.
 * 
 * Performance Locks:
 * - Capped at DPR 1.5 to prevent fill-rate lag on high-DPI phone screens
 * - IntersectionObserver pauses requestAnimationFrame when scrolled out of view (0% CPU offscreen)
 * - Passive touch/pointer listeners prevent scroll blocking
 * - Strict Deep Navy (#202632) and Champagne (#F4E8D2) palette
 * - ZERO em-dashes anywhere in code or comments
 */
export default function HeroInteractiveCanvas({ targetRef }) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    // Use parent targetRef if provided, otherwise containerRef
    const eventTarget = (targetRef && targetRef.current) ? targetRef.current : container;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId = null;
    let isVisible = true;
    let width = 0;
    let height = 0;

    // Pointer state
    const pointer = {
      x: -1000,
      y: -1000,
      active: false,
      isTouch: false
    };

    // Ripple array for click/tap sonar effects
    const ripples = [];

    // Particle nodes array
    let particles = [];

    // Determine particle count based on screen width
    const getParticleCount = (w) => {
      if (w < 640) return 22; // Mobile phones: light & fast
      if (w < 1024) return 34; // Tablets
      return 46; // Desktop
    };

    // Check if dark mode is active
    const isDarkMode = () => {
      return document.documentElement.classList.contains('dark') || 
             window.matchMedia('(prefers-color-scheme: dark)').matches;
    };

    // Resize canvas with DPR capping for 60fps performance
    const handleResize = () => {
      if (!container || !canvas) return;
      const rect = container.getBoundingClientRect();
      width = rect.width;
      height = rect.height;

      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(1, 0, 0, 1, 0, 0); // Reset transform
      ctx.scale(dpr, dpr);

      // Re-initialize particles if count changed significantly
      const targetCount = getParticleCount(width);
      if (particles.length === 0 || Math.abs(particles.length - targetCount) > 8) {
        initParticles(targetCount);
      }
    };

    // Initialize beacon particles
    const initParticles = (count) => {
      particles = [];
      for (let i = 0; i < count; i++) {
        const isHub = i % 5 === 0; // Every 5th particle is a transit hub
        particles.push({
          x: Math.random() * (width || 800),
          y: Math.random() * (height || 600),
          vx: (Math.random() - 0.5) * (isHub ? 0.35 : 0.6),
          vy: (Math.random() - 0.5) * (isHub ? 0.35 : 0.6),
          baseRadius: isHub ? 3.2 : 1.8,
          radius: isHub ? 3.2 : 1.8,
          isHub,
          hubId: isHub ? `HUB-${(i / 5 + 1).toFixed(0).padStart(2, '0')}` : null,
          pulseOffset: Math.random() * Math.PI * 2,
          pulseSpeed: 0.025 + Math.random() * 0.03,
          glowIntensity: 0
        });
      }
    };

    // Pointer event handlers with passive listeners
    const handlePointerMove = (e) => {
      const rect = container.getBoundingClientRect();
      pointer.x = e.clientX - rect.left;
      pointer.y = e.clientY - rect.top;
      pointer.active = true;
      pointer.isTouch = e.pointerType === 'touch';
    };

    const handlePointerLeave = () => {
      pointer.active = false;
      pointer.x = -1000;
      pointer.y = -1000;
    };

    const handlePointerDown = (e) => {
      const rect = container.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const clickY = e.clientY - rect.top;

      // Add sonar radar ripple
      ripples.push({
        x: clickX,
        y: clickY,
        radius: 4,
        maxRadius: Math.min(width * 0.4, 240),
        alpha: 0.7,
        speed: 4.2
      });

      // Keep ripples array tidy
      if (ripples.length > 5) ripples.shift();
    };

    // Touch event fallbacks
    const handleTouchMove = (e) => {
      if (!e.touches || e.touches.length === 0) return;
      const rect = container.getBoundingClientRect();
      pointer.x = e.touches[0].clientX - rect.left;
      pointer.y = e.touches[0].clientY - rect.top;
      pointer.active = true;
      pointer.isTouch = true;
    };

    const handleTouchEnd = () => {
      pointer.active = false;
    };

    // Attach listeners to eventTarget
    eventTarget.addEventListener('pointermove', handlePointerMove, { passive: true });
    eventTarget.addEventListener('pointerleave', handlePointerLeave, { passive: true });
    eventTarget.addEventListener('pointerdown', handlePointerDown, { passive: true });
    eventTarget.addEventListener('touchmove', handleTouchMove, { passive: true });
    eventTarget.addEventListener('touchend', handleTouchEnd, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });

    // Initial sizing
    handleResize();

    // IntersectionObserver to pause when offscreen (saves 100% CPU when scrolled)
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisible = entry.isIntersecting;
          if (isVisible && !animationFrameId) {
            lastTime = performance.now();
            render(performance.now());
          }
        });
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    let lastTime = performance.now();

    // Main 60fps render loop
    const render = (now) => {
      if (!isVisible) {
        animationFrameId = null;
        return;
      }

      const dt = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;

      ctx.clearRect(0, 0, width, height);

      const dark = isDarkMode();
      // Theme colors
      const champagneColor = '244, 232, 210';
      const navyColor = '32, 38, 50';
      const emeraldColor = '16, 185, 129';

      // 1. Update and draw ripples (click/tap radar rings)
      for (let i = ripples.length - 1; i >= 0; i--) {
        const r = ripples[i];
        r.radius += r.speed;
        r.alpha *= 0.965; // Smooth exponential fade

        if (r.alpha <= 0.02 || r.radius >= r.maxRadius) {
          ripples.splice(i, 1);
          continue;
        }

        // Draw primary radar wave ring
        ctx.beginPath();
        ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2);
        ctx.strokeStyle = dark
          ? `rgba(${champagneColor}, ${r.alpha * 0.45})`
          : `rgba(${navyColor}, ${r.alpha * 0.35})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // Draw secondary inner echo ring
        if (r.radius > 25) {
          ctx.beginPath();
          ctx.arc(r.x, r.y, r.radius - 20, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(${emeraldColor}, ${r.alpha * 0.25})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }

        // Excite particles hit by ripple wave
        for (let j = 0; j < particles.length; j++) {
          const p = particles[j];
          const distToRipple = Math.hypot(p.x - r.x, p.y - r.y);
          if (Math.abs(distToRipple - r.radius) < 22) {
            p.glowIntensity = Math.max(p.glowIntensity, r.alpha);
          }
        }
      }

      // 2. Cursor magnetic beacon halo when pointer is active
      if (pointer.active) {
        const haloRadius = pointer.isTouch ? 70 : 100;
        const grad = ctx.createRadialGradient(
          pointer.x, pointer.y, 0,
          pointer.x, pointer.y, haloRadius
        );
        grad.addColorStop(0, dark ? `rgba(${champagneColor}, 0.12)` : `rgba(${champagneColor}, 0.2)`);
        grad.addColorStop(0.5, `rgba(${emeraldColor}, 0.05)`);
        grad.addColorStop(1, 'rgba(0, 0, 0, 0)');

        ctx.beginPath();
        ctx.arc(pointer.x, pointer.y, haloRadius, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();

        // Small crosshair or focal point at cursor
        ctx.beginPath();
        ctx.arc(pointer.x, pointer.y, 3, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${emeraldColor}, 0.7)`;
        ctx.fill();
      }

      // 3. Update particle positions and apply gentle magnetic pull
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Pulse timing
        p.pulseOffset += p.pulseSpeed;
        const pulseFactor = 0.8 + 0.3 * Math.sin(p.pulseOffset);

        // Decay momentary ripple glow
        if (p.glowIntensity > 0) {
          p.glowIntensity *= 0.94;
        }

        // Pointer magnetic attraction
        if (pointer.active) {
          const dx = pointer.x - p.x;
          const dy = pointer.y - p.y;
          const dist = Math.hypot(dx, dy);
          const maxDist = pointer.isTouch ? 120 : 160;

          if (dist < maxDist && dist > 15) {
            const pullForce = (1 - dist / maxDist) * 0.45;
            p.vx += (dx / dist) * pullForce * dt * 60;
            p.vy += (dy / dist) * pullForce * dt * 60;

            // Draw interactive laser connection from cursor to nearby node
            const lineAlpha = (1 - dist / maxDist) * 0.35;
            ctx.beginPath();
            ctx.moveTo(pointer.x, pointer.y);
            ctx.lineTo(p.x, p.y);
            ctx.strokeStyle = dark
              ? `rgba(${champagneColor}, ${lineAlpha})`
              : `rgba(${navyColor}, ${lineAlpha * 0.8})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }

        // Standard drift update
        p.x += p.vx;
        p.y += p.vy;

        // Soft drag friction to prevent unbounded acceleration
        p.vx *= 0.985;
        p.vy *= 0.985;

        // Ensure minimum organic movement
        if (Math.abs(p.vx) < 0.1) p.vx += (Math.random() - 0.5) * 0.15;
        if (Math.abs(p.vy) < 0.1) p.vy += (Math.random() - 0.5) * 0.15;

        // Wrap around boundaries smoothly
        if (p.x < -20) p.x = width + 20;
        if (p.x > width + 20) p.x = -20;
        if (p.y < -20) p.y = height + 20;
        if (p.y > height + 20) p.y = -20;
      }

      // 4. Draw constellation connection vectors between nearby nodes
      const maxConnectDist = width < 640 ? 85 : 115;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const p1 = particles[i];
          const p2 = particles[j];
          const dist = Math.hypot(p1.x - p2.x, p1.y - p2.y);

          if (dist < maxConnectDist) {
            const normDist = 1 - dist / maxConnectDist;
            const extraGlow = Math.max(p1.glowIntensity, p2.glowIntensity);
            const lineAlpha = (normDist * 0.16 + extraGlow * 0.4);

            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);

            if (p1.isHub || p2.isHub) {
              ctx.strokeStyle = dark
                ? `rgba(${champagneColor}, ${lineAlpha * 1.3})`
                : `rgba(${navyColor}, ${lineAlpha * 1.1})`;
              ctx.lineWidth = 1.1;
            } else {
              ctx.strokeStyle = dark
                ? `rgba(${champagneColor}, ${lineAlpha * 0.85})`
                : `rgba(${navyColor}, ${lineAlpha * 0.75})`;
              ctx.lineWidth = 0.8;
            }
            ctx.stroke();
          }
        }
      }

      // 5. Draw particles (beacons and standard nodes)
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        const pulse = 0.8 + 0.3 * Math.sin(p.pulseOffset);
        const radius = p.baseRadius * pulse;
        const totalGlow = p.glowIntensity;

        if (p.isHub) {
          // Transit Hub beacon with expanding radar halo
          const haloRadius = radius * 4.5 + totalGlow * 12;
          ctx.beginPath();
          ctx.arc(p.x, p.y, haloRadius, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(${emeraldColor}, ${0.18 + totalGlow * 0.4})`;
          ctx.lineWidth = 1;
          ctx.stroke();

          // Hub core
          ctx.beginPath();
          ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);
          ctx.fillStyle = dark
            ? `rgba(${champagneColor}, ${0.9 + totalGlow * 0.1})`
            : `rgba(${navyColor}, ${0.85 + totalGlow * 0.15})`;
          ctx.fill();

          // Green status indicator dot inside hub
          ctx.beginPath();
          ctx.arc(p.x, p.y, 1.2, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${emeraldColor}, 0.95)`;
          ctx.fill();
        } else {
          // Standard smart sensor point
          ctx.beginPath();
          ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);
          ctx.fillStyle = dark
            ? `rgba(${champagneColor}, ${0.5 + totalGlow * 0.4})`
            : `rgba(${navyColor}, ${0.45 + totalGlow * 0.45})`;
          ctx.fill();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    // Cleanup
    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      observer.disconnect();
      eventTarget.removeEventListener('pointermove', handlePointerMove);
      eventTarget.removeEventListener('pointerleave', handlePointerLeave);
      eventTarget.removeEventListener('pointerdown', handlePointerDown);
      eventTarget.removeEventListener('touchmove', handleTouchMove);
      eventTarget.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('resize', handleResize);
    };
  }, [targetRef]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 overflow-hidden pointer-events-auto select-none"
      style={{ touchAction: 'pan-y' }}
      aria-hidden="true"
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full block opacity-85 dark:opacity-90 transition-opacity duration-700"
      />
    </div>
  );
}
