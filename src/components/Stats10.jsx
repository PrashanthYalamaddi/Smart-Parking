import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Layers, Activity, Zap, CheckCircle2 } from 'lucide-react';

const easing = [0.16, 1, 0.3, 1];

function CountUp({ target, duration = 1.5, suffix = '', prefix = '' }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const end = parseInt(target, 10);
    if (isNaN(end)) return;

    const stepTime = Math.abs(Math.floor((duration * 1000) / end));
    const timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start >= end) clearInterval(timer);
    }, Math.max(stepTime, 20));

    return () => clearInterval(timer);
  }, [isInView, target, duration]);

  return (
    <span ref={ref}>
      {prefix}
      {isInView ? count : 0}
      {suffix}
    </span>
  );
}

export default function Stats10() {
  const cards = [
    {
      label: 'Interactive Bays',
      value: 48,
      suffix: '+',
      desc: 'Active slots monitored across 4 municipal zones in live demo',
      badge: 'LIVE HARDWARE',
      highlight: true
    },
    {
      label: 'MERN Stack Modules',
      value: 4,
      suffix: '',
      desc: 'MongoDB, Express, React, and Node unified into a single runtime',
      badge: 'ZERO REDUNDANCY',
      highlight: false
    },
    {
      label: 'Average API Latency',
      value: 42,
      suffix: 'ms',
      desc: 'Sub-second REST endpoint response times under municipal load',
      badge: 'HIGH THROUGHPUT',
      highlight: false
    },
    {
      label: 'Sensor Synchronization',
      value: 24,
      suffix: '/7',
      desc: 'Continuous ultrasonic and RFID sensor ingestion across hubs',
      badge: 'CONTINUOUS TELEMETRY',
      highlight: false
    }
  ];

  return (
    <section className="relative bg-background px-6 py-20 md:py-32 border-t border-border overflow-hidden">
      <div className="relative mx-auto max-w-6xl">
        <div className="mb-12 text-center md:mb-16">
          <span className="text-xs font-mono font-semibold tracking-widest text-muted-foreground uppercase bg-muted px-3 py-1.5 rounded-md border border-border inline-block mb-3">
            SYSTEM BENCHMARKS // STATS 10
          </span>
          <h2 className="text-3xl font-medium tracking-tight md:text-4xl lg:text-5xl text-foreground">
            Proven Architectural Throughput
          </h2>
          <p className="text-muted-foreground mt-3 text-base md:text-lg max-w-xl mx-auto">
            Real-time execution metrics recorded during concurrent vehicle arrival stress tests.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((c, i) => (
            <motion.div
              key={c.label}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: easing }}
              className={`rounded-3xl p-7 flex flex-col justify-between min-h-[240px] transition-all duration-300 shadow-lg border ${
                c.highlight
                  ? 'bg-[#202632] text-[#F4E8D2] dark:bg-[#F4E8D2] dark:text-[#202632] border-[#202632]/40 dark:border-[#F4E8D2]/40 shadow-xl'
                  : 'bg-card text-card-foreground border-border hover:border-foreground/20'
              }`}
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className={`text-[11px] font-mono font-bold tracking-wider uppercase px-2 py-0.5 rounded ${
                    c.highlight
                      ? 'bg-[#F4E8D2]/15 text-[#F4E8D2] dark:bg-[#202632]/15 dark:text-[#202632]'
                      : 'bg-muted text-muted-foreground border border-border'
                  }`}>
                    {c.badge}
                  </span>
                  <span className={`h-2 w-2 rounded-full ${
                    c.highlight ? 'bg-emerald-400 animate-pulse' : 'bg-emerald-500 animate-pulse'
                  }`} />
                </div>

                <div className={`text-5xl md:text-6xl font-extrabold tracking-tighter mt-5 ${
                  c.highlight ? 'text-[#F4E8D2] dark:text-[#202632]' : 'text-foreground'
                }`}>
                  <CountUp target={c.value} suffix={c.suffix} />
                </div>

                <h4 className={`text-sm font-bold tracking-tight mt-2 ${
                  c.highlight ? 'text-[#F4E8D2]/90 dark:text-[#202632]/90' : 'text-foreground'
                }`}>
                  {c.label}
                </h4>
              </div>

              <p className={`text-xs mt-6 leading-relaxed ${
                c.highlight ? 'text-[#C4B69E] dark:text-[#545E70] font-medium' : 'text-muted-foreground'
              }`}>
                {c.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
