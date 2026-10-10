import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cpu, Database, Network, ShieldCheck, Zap, Layers, Award, CheckCircle2 } from 'lucide-react';

const VALUES = [
  'PRECISION',
  'EFFICIENCY',
  'AUTOMATION',
  'RELIABILITY',
  'SECURITY'
];

const easing = [0.16, 1, 0.3, 1];

export default function About13() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % VALUES.length);
    }, 2400);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative bg-background px-3 sm:px-6 py-16 sm:py-20 md:py-32 border-t border-border overflow-hidden">
      <div className="relative mx-auto max-w-6xl">
        {/* Top Header & Score 36 Badge */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono font-semibold tracking-widest text-muted-foreground uppercase bg-muted px-3 py-1.5 rounded-md border border-border mb-3">
              <span className="h-2 w-2 rounded-full bg-accent animate-pulse" />
              <span>PROBLEM STATEMENT 36 // CORE VALUES</span>
            </div>
            <h2 className="text-3xl font-medium tracking-tight md:text-5xl lg:text-6xl text-foreground">
              In modern urban transit, slot orchestration requires
            </h2>
          </div>

          {/* Dedicated Score 36 Badge */}
          <div className="shrink-0 p-4 rounded-2xl bg-card border border-border shadow-md flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#202632] text-[#F4E8D2] dark:bg-[#F4E8D2] dark:text-[#202632] font-extrabold text-xl shadow-xs">
              36
            </div>
            <div className="font-mono">
              <span className="text-[10px] text-muted-foreground block uppercase font-bold tracking-wider">
                Problem Statement ID
              </span>
              <span className="text-xs font-bold text-foreground block">
                Smart Parking System
              </span>
              <span className="text-[10px] text-emerald-500 font-semibold flex items-center gap-1 mt-0.5">
                <CheckCircle2 className="h-3 w-3" /> All Objectives Verified
              </span>
            </div>
          </div>
        </div>

        {/* Kinetic Word Display (Pure clean typography without background skin) */}
        <div className="relative h-20 md:h-32 lg:h-40 w-full overflow-hidden my-4 px-2 sm:px-6 flex items-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={VALUES[index]}
              initial={{ opacity: 0, y: 40, filter: 'blur(12px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -40, filter: 'blur(12px)' }}
              transition={{ duration: 0.6, ease: easing }}
              className="absolute inset-x-6 flex items-center justify-between"
            >
              <span className="text-6xl md:text-8xl lg:text-9xl font-extrabold tracking-tighter text-accent uppercase select-none drop-shadow-md">
                {VALUES[index]}
              </span>
              <span className="hidden md:inline-block font-mono text-xs text-muted-foreground uppercase tracking-widest bg-card px-3 py-1 rounded-md border border-border">
                CORE PILLAR 0{index + 1} / 05
              </span>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Narrative Paragraph */}
        <p className="max-w-3xl text-lg md:text-xl text-muted-foreground leading-relaxed mt-6">
          Across Indian metropolitan hubs like Pune, Mumbai, Bengaluru, and Delhi NCR, cruising for unmanaged bays accounts for 30% of downtown traffic bottlenecks. Our MERN architecture replaces manual paper receipts with deterministic MongoDB ACID transactions, Express REST APIs, and an interactive React client integrated with FASTag and Bharat UPI.
        </p>

        {/* Elevated High-Contrast Architecture Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mt-10 pt-8 border-t border-border">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: easing }}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            className="p-6 rounded-2xl bg-card border border-border shadow-md hover:border-accent/40 transition-all group"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-xl bg-accent/15 text-accent border border-accent/20 group-hover:scale-105 transition-transform">
                <Database className="h-6 w-6 text-accent" />
              </div>
              <span className="text-[11px] font-mono text-emerald-500 font-bold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                ACID LOCKS
              </span>
            </div>
            <h4 className="text-lg font-bold text-foreground">MongoDB Data Store</h4>
            <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
              Atomic slot documents with compound indexes for vehicle, zone, and timestamp records. Zero race conditions during rush hour.
            </p>
            <div className="mt-4 pt-3 border-t border-border text-[11px] font-mono text-muted-foreground flex justify-between">
              <span>Atomic Operations</span>
              <span className="text-foreground font-semibold">findOneAndUpdate</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1, ease: easing }}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            className="p-6 rounded-2xl bg-card border border-border shadow-md hover:border-accent/40 transition-all group"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-xl bg-accent/15 text-accent border border-accent/20 group-hover:scale-105 transition-transform">
                <Network className="h-6 w-6 text-accent" />
              </div>
              <span className="text-[11px] font-mono text-blue-400 font-bold bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/20">
                SUB-50MS REST
              </span>
            </div>
            <h4 className="text-lg font-bold text-foreground">Express.js API Layer</h4>
            <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
              Validated endpoints for check-in, checkout fee audits, and role-based route guards with JWT token verification.
            </p>
            <div className="mt-4 pt-3 border-t border-border text-[11px] font-mono text-muted-foreground flex justify-between">
              <span>Throughput</span>
              <span className="text-foreground font-semibold">1,200 req/sec</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2, ease: easing }}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            className="p-6 rounded-2xl bg-card border border-border shadow-md hover:border-accent/40 transition-all group"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-xl bg-accent/15 text-accent border border-accent/20 group-hover:scale-105 transition-transform">
                <Cpu className="h-6 w-6 text-accent" />
              </div>
              <span className="text-[11px] font-mono text-amber-400 font-bold bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                REAL-TIME
              </span>
            </div>
            <h4 className="text-lg font-bold text-foreground">React Real-Time Grid</h4>
            <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
              Live state machine updating bay availability with zero latency, HSRP number plate rendering, and QR checkout.
            </p>
            <div className="mt-4 pt-3 border-t border-border text-[11px] font-mono text-muted-foreground flex justify-between">
              <span>State Updates</span>
              <span className="text-foreground font-semibold">&lt; 16ms Re-render</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
