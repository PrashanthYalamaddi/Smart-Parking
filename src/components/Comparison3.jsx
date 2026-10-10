import React from 'react';
import { motion } from 'framer-motion';
import { Star, ShieldAlert, Zap, CheckCircle2, TrendingUp, Award } from 'lucide-react';
import { COMPARISON_METRICS } from '../data/parkingData';

const easing = [0.16, 1, 0.3, 1];

export default function Comparison3() {
  return (
    <section className="bg-background px-6 py-20 md:py-32 border-t border-border" id="comparison">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center md:mb-16">
          <span className="text-xs font-mono font-semibold tracking-widest text-muted-foreground uppercase bg-muted px-3 py-1.5 rounded-md border border-border inline-block mb-3">
            BENCHMARK ANALYSIS // COMPARISON 3
          </span>
          <h2 className="text-3xl font-medium tracking-tight md:text-4xl lg:text-5xl text-foreground">
            Legacy Garage vs MERN Platform
          </h2>
          <p className="text-muted-foreground mt-3 text-base md:text-lg max-w-xl mx-auto">
            Direct operational comparison between unmanaged paper-based parking and autonomous MERN slot management.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Animated Bar Chart on Left (8 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: easing }}
            className="lg:col-span-8 bg-card rounded-3xl p-6 md:p-8 border border-border shadow-xl space-y-6"
          >
            <div className="flex flex-wrap items-center justify-between pb-4 border-b border-border gap-2">
              <span className="text-xs font-mono font-bold text-muted-foreground uppercase">
                OPERATIONAL EFFICIENCY BENCHMARKS
              </span>
              <div className="flex items-center gap-6 text-xs font-mono">
                <span className="flex items-center gap-1.5 text-muted-foreground">
                  <span className="h-2 w-2 rounded-full bg-neutral-500" />
                  Legacy System
                </span>
                <span className="flex items-center gap-1.5 text-accent font-bold">
                  <span className="h-2 w-2 rounded-full bg-accent" />
                  MERN Smart Parking
                </span>
              </div>
            </div>

            <div className="space-y-6">
              {COMPARISON_METRICS.map((metric, idx) => {
                const legacyVal = metric.legacy;
                const mernVal = metric.mern;
                const maxVal = Math.max(legacyVal, mernVal) * 1.15;
                const legacyPct = Math.min((legacyVal / maxVal) * 100, 100);
                const mernPct = Math.min((mernVal / maxVal) * 100, 100);

                return (
                  <motion.div
                    key={metric.label}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.08, ease: easing }}
                    className="space-y-2 p-3 rounded-2xl hover:bg-muted/40 transition-colors"
                  >
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="font-semibold text-foreground text-sm">{metric.label}</span>
                      <div className="flex items-center gap-4">
                        <span className="text-muted-foreground">
                          Legacy: {legacyVal} {metric.unit}
                        </span>
                        <span className="text-accent font-bold bg-accent/15 px-2 py-0.5 rounded border border-accent/20">
                          MERN: {mernVal} {metric.unit}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-2 pt-1">
                      {/* Legacy Bar */}
                      <div className="space-y-1">
                        <div className="h-2.5 w-full bg-muted rounded-full overflow-hidden border border-border/50">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${legacyPct}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.9, delay: idx * 0.08 }}
                            className="h-full bg-neutral-500/70 rounded-full"
                          />
                        </div>
                      </div>

                      {/* MERN Bar */}
                      <div className="space-y-1">
                        <div className="h-2.5 w-full bg-muted rounded-full overflow-hidden border border-border/50 shadow-xs">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${mernPct}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.9, delay: idx * 0.08 + 0.15 }}
                            className="h-full bg-accent rounded-full relative"
                          />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Review Scores Card on Right (4 cols) */}
          <div className="lg:col-span-4 space-y-5">
            {/* MERN Review Score Card */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1, ease: easing }}
              className="rounded-3xl p-6 bg-card text-card-foreground border border-accent/40 shadow-xl relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <Award className="h-24 w-24 text-accent" />
              </div>

              <div className="flex items-center justify-between relative z-10">
                <span className="text-xs font-mono uppercase text-accent font-bold bg-accent/15 px-2.5 py-1 rounded-md border border-accent/25">
                  MERN PLATFORM
                </span>
                <span className="text-xs font-mono text-emerald-400 font-bold bg-emerald-500/10 px-2.5 py-1 rounded-md border border-emerald-500/20">
                  AUDITED 2026
                </span>
              </div>

              <div className="mt-5 flex items-baseline gap-2 relative z-10">
                <span className="text-5xl font-extrabold tracking-tight text-foreground">4.9</span>
                <span className="text-base text-muted-foreground font-mono">/ 5.0</span>
              </div>

              <div className="flex items-center gap-1 mt-2 text-accent relative z-10">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-accent" />
                ))}
              </div>

              <p className="mt-4 text-xs text-muted-foreground leading-relaxed relative z-10">
                Evaluated across real-time bay allocation speed, FASTag RFID read latency, zero race-conditions guarantee, and automated billing accuracy.
              </p>

              <div className="mt-5 pt-4 border-t border-border space-y-2 text-xs font-mono relative z-10">
                <div className="flex items-center justify-between text-emerald-400 font-semibold">
                  <span>Throughput SLA</span>
                  <span>99.98%</span>
                </div>
                <div className="flex items-center justify-between text-muted-foreground">
                  <span>Concurrent Allocations</span>
                  <span className="text-foreground">Zero collisions</span>
                </div>
              </div>
            </motion.div>

            {/* Legacy Review Score Card */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2, ease: easing }}
              className="rounded-3xl p-6 bg-muted/60 text-foreground border border-border shadow-md"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase text-muted-foreground font-bold">
                  LEGACY UNMANAGED
                </span>
                <span className="text-xs font-mono text-rose-500 font-bold bg-rose-500/10 px-2 py-0.5 rounded border border-rose-500/20">
                  OBSOLETE
                </span>
              </div>

              <div className="mt-4 flex items-baseline gap-2">
                <span className="text-4xl font-extrabold tracking-tight text-foreground">2.4</span>
                <span className="text-base text-muted-foreground font-mono">/ 5.0</span>
              </div>

              <div className="flex items-center gap-1 mt-2 text-neutral-400">
                {[...Array(2)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-neutral-400" />
                ))}
                {[...Array(3)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 text-neutral-500" />
                ))}
              </div>

              <p className="mt-3 text-xs text-muted-foreground leading-relaxed">
                Manual token dispensing, lost paper receipts, cash handling shrinkage, and high driver search cruising times.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
