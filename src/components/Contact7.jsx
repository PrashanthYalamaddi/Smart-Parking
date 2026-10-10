import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle2, Building2, Shield, Sparkles } from 'lucide-react';
import { sounds } from '../utils/audio';

const easing = [0.16, 1, 0.3, 1];

// Interactive Particle Network Canvas with Connecting Lines & Mouse Interaction
function ParticleNetworkCanvas() {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: -1000, y: -1000, radius: 140 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const handleResize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouseRef.current.x = -1000;
      mouseRef.current.y = -1000;
    };

    const sectionEl = canvas.parentElement;
    if (sectionEl) {
      sectionEl.addEventListener('mousemove', handleMouseMove, { passive: true });
      sectionEl.addEventListener('mouseleave', handleMouseLeave, { passive: true });
    }

    // Determine particle count based on canvas dimension
    const particleCount = Math.min(Math.floor((canvas.width * canvas.height) / 12000), 75);
    const particles = Array.from({ length: Math.max(particleCount, 35) }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.6,
      vy: (Math.random() - 0.5) * 0.6,
      radius: Math.random() * 2 + 1.2,
      baseAlpha: Math.random() * 0.45 + 0.25
    }));

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const isDark = document.documentElement.classList.contains('dark');

      // Deep Navy (#202632) in light mode, Champagne (#F4E8D2) in dark mode
      const rgbBase = isDark ? '244, 232, 210' : '32, 38, 50';
      const connectionDist = 120;
      const mouse = mouseRef.current;

      // Update & render particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Position progression
        p.x += p.vx;
        p.y += p.vy;

        // Boundary reflection
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        // Subtle mouse deflection
        const dxMouse = p.x - mouse.x;
        const dyMouse = p.y - mouse.y;
        const distMouse = Math.hypot(dxMouse, dyMouse);
        if (distMouse < mouse.radius && distMouse > 0) {
          const force = (1 - distMouse / mouse.radius) * 1.6;
          p.x += (dxMouse / distMouse) * force;
          p.y += (dyMouse / distMouse) * force;
        }

        // Draw particle node
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${rgbBase}, ${p.baseAlpha})`;
        ctx.fill();

        // Connect with nearby particles within threshold
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.hypot(dx, dy);

          if (dist < connectionDist) {
            const alpha = (1 - dist / connectionDist) * 0.25;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(${rgbBase}, ${alpha})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }

        // Connect with mouse cursor if within proximity
        if (distMouse < mouse.radius) {
          const mouseAlpha = (1 - distMouse / mouse.radius) * 0.38;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = `rgba(${rgbBase}, ${mouseAlpha})`;
          ctx.lineWidth = 1.2;
          ctx.stroke();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (sectionEl) {
        sectionEl.removeEventListener('mousemove', handleMouseMove);
        sectionEl.removeEventListener('mouseleave', handleMouseLeave);
      }
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 h-full w-full opacity-60 z-0"
    />
  );
}

export default function Contact7() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    corporation: 'Pune Smart City (PSCDCL)',
    facilitySize: '100-500 Bays',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    sounds.playSuccess();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: '',
        email: '',
        corporation: 'Pune Smart City (PSCDCL)',
        facilitySize: '100-500 Bays',
        message: ''
      });
    }, 4000);
  };

  return (
    <section className="relative bg-transparent px-6 py-20 md:py-32 border-t border-border/60 z-10 overflow-hidden" id="contact">
      {/* Interactive Particle Network Canvas with mouse connection */}
      <ParticleNetworkCanvas />

      {/* Subtle Ambient Depth Lighting in Deep Navy / Champagne */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none" aria-hidden="true">
        <motion.div
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.08, 0.16, 0.08],
            x: [0, 25, 0],
            y: [0, -20, 0]
          }}
          transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-32 -left-20 w-[550px] h-[550px] rounded-full bg-[#202632]/10 dark:bg-[#F4E8D2]/10 blur-[120px]"
        />

        <motion.div
          animate={{
            scale: [1.1, 0.95, 1.1],
            opacity: [0.1, 0.18, 0.1],
            x: [0, -30, 0],
            y: [0, 25, 0]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -bottom-24 -right-20 w-[600px] h-[600px] rounded-full bg-[#F4E8D2]/15 dark:bg-[#202632]/15 blur-[140px]"
        />
      </div>

      {/* Main Form Container */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: easing }}
        className="relative z-10 mx-auto max-w-xl text-center"
      >
        <span className="text-xs font-mono font-bold tracking-widest text-muted-foreground uppercase bg-muted/80 backdrop-blur-sm px-3 py-1.5 rounded-md border border-border inline-block mb-4">
          OPERATIONAL INQUIRY // CONTACT 7
        </span>

        {/* Serif Headline */}
        <h2 className="text-3xl md:text-5xl font-serif italic tracking-tight text-foreground">
          Deploy smart parking intelligence to your municipal grid.
        </h2>

        <p className="mt-4 text-sm md:text-base text-muted-foreground leading-relaxed">
          Submit your municipal facility specifications to evaluate MERN slot orchestration, NHAI NETC FASTag integration, and custom MongoDB cluster deployments.
        </p>

        {/* Form Card with High-Contrast Inputs */}
        <form
          onSubmit={handleSubmit}
          className="mt-10 text-left space-y-4 bg-card/95 backdrop-blur-xl p-6 md:p-8 rounded-3xl border border-border shadow-2xl relative"
        >
          <div>
            <label className="text-xs font-mono text-foreground font-semibold block mb-1.5">
              Lead Officer or Engineer Name
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Vikramaditya Patil"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-3 text-xs font-mono rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent transition-all placeholder:text-muted-foreground/60"
            />
          </div>

          <div>
            <label className="text-xs font-mono text-foreground font-semibold block mb-1.5">
              Official Government or Authority Email
            </label>
            <input
              type="email"
              required
              placeholder="v.patil@punemunicipal.gov.in"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-3 text-xs font-mono rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent transition-all placeholder:text-muted-foreground/60"
            />
          </div>

          <div>
            <label className="text-xs font-mono text-foreground font-semibold block mb-1.5">
              Municipal Corporation or Authority
            </label>
            <select
              value={formData.corporation}
              onChange={(e) => setFormData({ ...formData, corporation: e.target.value })}
              className="w-full px-4 py-3 text-xs font-mono rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent transition-all cursor-pointer"
            >
              <option value="Pune Smart City (PSCDCL)">Pune Municipal Corp / PSCDCL</option>
              <option value="Mumbai MMRDA / BMC">Mumbai MMRDA / BMC Transit</option>
              <option value="Bengaluru BBMP / BTP">Bengaluru BBMP / Traffic Police</option>
              <option value="Delhi NCR Municipal Council">Delhi NCR Municipal Council</option>
              <option value="Hyderabad GHMC">Hyderabad GHMC Smart Mobility</option>
              <option value="Ahmedabad AMC">Ahmedabad AMC Urban Transport</option>
              <option value="Other Indian Smart City">Other MoHUA Smart City</option>
            </select>
          </div>

          <div>
            <label className="text-xs font-mono text-foreground font-semibold block mb-1.5">
              Estimated Facility Capacity
            </label>
            <select
              value={formData.facilitySize}
              onChange={(e) => setFormData({ ...formData, facilitySize: e.target.value })}
              className="w-full px-4 py-3 text-xs font-mono rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent transition-all cursor-pointer"
            >
              <option value="1-50 Bays">1 to 50 Bays (Campus / Starter)</option>
              <option value="100-500 Bays">100 to 500 Bays (Municipal Zone)</option>
              <option value="500-2000 Bays">500 to 2,000 Bays (Transit Interchange)</option>
              <option value="2000+ Bays">2,000+ Bays (Metropolitan Multi-Deck)</option>
            </select>
          </div>

          <div>
            <label className="text-xs font-mono text-foreground font-semibold block mb-1.5">
              Implementation Notes or Technical Requirements
            </label>
            <textarea
              rows={3}
              placeholder="Specify FASTag lane count, camera OCR models, or custom MongoDB sharding preferences..."
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full px-4 py-3 text-xs font-mono rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent transition-all resize-none placeholder:text-muted-foreground/60"
            />
          </div>

          <button
            type="submit"
            className="w-full mt-2 py-4 px-6 rounded-xl bg-accent hover:bg-accent-hover text-background font-bold text-xs font-mono transition-all duration-300 hover:rounded-[50px] shadow-lg shadow-accent/25 flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98]"
          >
            {isSubmitted ? (
              <>
                <CheckCircle2 className="h-4 w-4" />
                <span>Inquiry Dispatched To Engineering Desk</span>
              </>
            ) : (
              <>
                <Send className="h-4 w-4" />
                <span>Dispatch Municipal Facility Specs</span>
              </>
            )}
          </button>
        </form>
      </motion.div>
    </section>
  );
}
