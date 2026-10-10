import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowUpRight, TrendingUp, CheckCircle2 } from 'lucide-react';
import { STATS_SPARKLINES } from '../data/parkingData';
import { sounds } from '../utils/audio';

const easing = [0.16, 1, 0.3, 1];

function Sparkline({ points, id, color = '#10b981' }) {
  const min = Math.min(...points);
  const max = Math.max(...points);
  const range = max - min || 1;
  const width = 130;
  const height = 44;

  const path = points
    .map((val, idx) => {
      const x = (idx / (points.length - 1)) * width;
      const y = height - ((val - min) / range) * (height - 12) - 6;
      return `${idx === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`;
    })
    .join(' ');

  const areaPath = `${path} L ${width} ${height} L 0 ${height} Z`;

  return (
    <svg width={width} height={height} className="overflow-visible">
      <defs>
        <linearGradient id={`grad-${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.3" />
          <stop offset="100%" stopColor={color} stopOpacity="0.0" />
        </linearGradient>
      </defs>
      <path d={areaPath} fill={`url(#grad-${id})`} />
      <path
        d={path}
        fill="none"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// Config for smooth metric count-up and hover target animation
const METRIC_CONFIGS = [
  {
    initialNum: 99.8,
    targetNum: 98.0,
    format: (v) => `${v.toFixed(1)}%`,
    hoverFormat: (v) => `${Math.round(v)}%`,
    labelHover: 'Stress SLA: 98% guaranteed',
    labelNormal: 'audited across Indian metro hubs'
  },
  {
    initialNum: 3.2,
    targetNum: 31.0,
    format: (v) => `${v.toFixed(1)} min`,
    hoverFormat: (v) => `${Math.round(v)} minutes`,
    labelHover: 'Unmanaged city baseline: 31 minutes',
    labelNormal: 'down from 22 mins in peak traffic'
  },
  {
    initialNum: 42500,
    targetNum: 42500,
    hoverFromNum: 32000,
    format: (v) => `${Math.round(v).toLocaleString('en-IN')}+`,
    hoverFormat: (v) => `${Math.round(v).toLocaleString('en-IN')}`,
    labelHover: 'Target peak capacity: 42,500 slots',
    labelNormal: 'across Pune, Mumbai, Bangalore & Delhi'
  },
  {
    initialNum: 0,
    targetNum: 0,
    format: () => '₹0.00',
    hoverFormat: () => '₹0.00',
    labelHover: 'Zero revenue loss across all gates',
    labelNormal: 'guaranteed by FASTag & UPI ledger'
  }
];

function AnimatedMetricCard({ stat, index }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });
  const [currentVal, setCurrentVal] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const config = METRIC_CONFIGS[index] || METRIC_CONFIGS[0];

  // Viewport entrance count-up
  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const end = config.initialNum;
    const duration = 1200; // ms
    const startTime = performance.now();

    const animateCount = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // easeOutExpo
      const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const val = start + (end - start) * ease;
      setCurrentVal(val);

      if (progress < 1) {
        requestAnimationFrame(animateCount);
      } else {
        setCurrentVal(end);
      }
    };

    requestAnimationFrame(animateCount);
  }, [isInView, config.initialNum]);

  // Hover target animation
  const handleMouseEnter = () => {
    sounds.playHover();
    setIsHovered(true);

    const fromVal = config.hoverFromNum !== undefined ? config.hoverFromNum : currentVal;
    const toVal = config.targetNum;
    const duration = 500;
    const startTime = performance.now();

    const animateHover = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const val = fromVal + (toVal - fromVal) * ease;
      setCurrentVal(val);

      if (progress < 1) {
        requestAnimationFrame(animateHover);
      } else {
        setCurrentVal(toVal);
      }
    };

    requestAnimationFrame(animateHover);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);

    const fromVal = currentVal;
    const toVal = config.initialNum;
    const duration = 500;
    const startTime = performance.now();

    const animateLeave = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const val = fromVal + (toVal - fromVal) * ease;
      setCurrentVal(val);

      if (progress < 1) {
        requestAnimationFrame(animateLeave);
      } else {
        setCurrentVal(toVal);
      }
    };

    requestAnimationFrame(animateLeave);
  };

  const formattedDisplay = isHovered
    ? config.hoverFormat(currentVal)
    : config.format(currentVal);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: easing }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`bg-card rounded-2xl p-6 border flex flex-col justify-between transition-all duration-300 shadow-sm group cursor-pointer ${
        isHovered
          ? 'border-accent shadow-xl scale-[1.02] ring-1 ring-accent/30'
          : 'border-border hover:border-foreground/20 hover:shadow-md'
      }`}
    >
      <div>
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono font-semibold text-muted-foreground uppercase">
            {stat.title}
          </span>
          <span className="flex items-center gap-0.5 text-xs font-mono font-bold text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
            <ArrowUpRight className="h-3 w-3" />
            {stat.delta}
          </span>
        </div>

        <div className="mt-4 flex items-baseline justify-between min-h-[44px]">
          <h3 className="text-3xl md:text-4xl font-extrabold tracking-tight text-foreground font-mono tabular-nums">
            {isInView ? formattedDisplay : stat.value}
          </h3>
        </div>

        <p className="text-xs text-muted-foreground mt-2 font-mono min-h-[32px] transition-colors leading-relaxed">
          {isHovered ? (
            <span className="text-accent font-semibold">{config.labelHover}</span>
          ) : (
            config.labelNormal
          )}
        </p>
      </div>

      <div className="mt-6 pt-4 border-t border-border flex items-center justify-between">
        <span className="text-[11px] font-mono text-muted-foreground">
          {isHovered ? 'Active Target:' : 'Trendline:'}
        </span>
        <div className="text-emerald-500">
          <Sparkline points={stat.trendPoints} id={index} color="#10b981" />
        </div>
      </div>
    </motion.div>
  );
}

export default function Stats14() {
  return (
    <section className="bg-background px-6 py-20 md:py-32 border-t border-border" id="stats">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center md:mb-16">
          <span className="text-xs font-mono font-semibold tracking-widest text-muted-foreground uppercase bg-muted px-3 py-1.5 rounded-md border border-border inline-block mb-3">
            PERFORMANCE METRICS // STATS 14
          </span>
          <h2 className="text-3xl font-medium tracking-tight md:text-4xl lg:text-5xl text-foreground">
            Quantifiable Urban Transit Gains
          </h2>
          <p className="text-muted-foreground mt-3 text-base md:text-lg max-w-xl mx-auto">
            Audited performance indicators measured across test facilities in high-density metropolitan sectors. Hover over cards to inspect benchmark target comparisons.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {STATS_SPARKLINES.map((stat, index) => (
            <AnimatedMetricCard key={stat.title} stat={stat} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
