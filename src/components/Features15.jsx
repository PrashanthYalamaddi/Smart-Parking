import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Radio, AlertTriangle, CheckCircle2, Info, Wrench, ShieldAlert, Camera, Eye, Radar, Compass } from 'lucide-react';
import { SONAR_FINDINGS } from '../data/parkingData';
import { sounds } from '../utils/audio';

const easing = [0.16, 1, 0.3, 1];

export default function Features15() {
  const [activeFinding, setActiveFinding] = useState(SONAR_FINDINGS[0]);
  const [cycleProgress, setCycleProgress] = useState(0);

  // Auto-cycle through Base Camera and Sonar findings every 3 seconds
  useEffect(() => {
    const intervalTime = 3000;
    const stepTime = 50;
    let elapsed = 0;

    const progressTimer = setInterval(() => {
      elapsed += stepTime;
      setCycleProgress((elapsed / intervalTime) * 100);
      if (elapsed >= intervalTime) {
        elapsed = 0;
        setCycleProgress(0);
        setActiveFinding((prev) => {
          const currentIndex = SONAR_FINDINGS.findIndex((f) => f.id === prev?.id);
          const nextIndex = (currentIndex + 1) % SONAR_FINDINGS.length;
          return SONAR_FINDINGS[nextIndex];
        });
      }
    }, stepTime);

    return () => clearInterval(progressTimer);
  }, []);

  const getSeverityStyle = (sev) => {
    switch (sev) {
      case 'warning':
        return {
          bg: 'bg-amber-500/15',
          text: 'text-amber-500 dark:text-amber-400',
          border: 'border-amber-500/30',
          ping: 'bg-amber-400'
        };
      case 'success':
        return {
          bg: 'bg-emerald-500/15',
          text: 'text-emerald-500 dark:text-emerald-400',
          border: 'border-emerald-500/30',
          ping: 'bg-emerald-400'
        };
      case 'caution':
        return {
          bg: 'bg-rose-500/15',
          text: 'text-rose-500 dark:text-rose-400',
          border: 'border-rose-500/30',
          ping: 'bg-rose-400'
        };
      case 'info':
        return {
          bg: 'bg-blue-500/15',
          text: 'text-blue-500 dark:text-blue-400',
          border: 'border-blue-500/30',
          ping: 'bg-blue-400'
        };
      default:
        return {
          bg: 'bg-muted',
          text: 'text-muted-foreground',
          border: 'border-border',
          ping: 'bg-neutral-400'
        };
    }
  };

  return (
    <section className="relative bg-background px-3 sm:px-6 py-16 sm:py-20 md:py-32 border-t border-border overflow-hidden" id="sonar-radar">
      <div className="mx-auto max-w-6xl">
        {/* Section Header */}
        <div className="mb-10 text-center md:mb-16">
          <span className="text-xs font-mono font-semibold tracking-widest text-muted-foreground uppercase bg-muted px-3 py-1.5 rounded-md border border-border inline-block mb-3">
            RADAR & OPTICAL FIELD TELEMETRY // FEATURES 15
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight text-foreground">
            Lidar & Telemetry Field Operations
          </h2>
          <p className="text-muted-foreground mt-3 text-sm sm:text-base md:text-lg max-w-xl mx-auto px-2">
            Synchronized sensor sweep across metropolitan transit bays. Real-time ultrasonic wave reflections and optical OCR telemetry light up anomalies automatically.
          </p>

          {/* Active Sensor Channels HUD */}
          <div className="mt-5 sm:mt-6 flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 text-[10px] sm:text-[11px] font-mono">
            <span className="px-2.5 py-1 rounded-md bg-card border border-border text-foreground flex items-center gap-1.5 shadow-xs">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              CH-1 OPTICAL OCR
            </span>
            <span className="px-2.5 py-1 rounded-md bg-card border border-border text-foreground flex items-center gap-1.5 shadow-xs">
              <span className="h-2 w-2 rounded-full bg-blue-400 animate-pulse" />
              CH-2 NHAI FASTag RFID
            </span>
            <span className="px-2.5 py-1 rounded-md bg-card border border-border text-foreground flex items-center gap-1.5 shadow-xs">
              <span className="h-2 w-2 rounded-full bg-accent animate-pulse" />
              CH-3 ULTRASONIC 40kHz
            </span>
            <span className="px-2.5 py-1 rounded-md bg-card border border-border text-foreground flex items-center gap-1.5 shadow-xs">
              <span className="h-2 w-2 rounded-full bg-amber-400 animate-pulse" />
              CH-4 BOOM BARRIER
            </span>
          </div>
        </div>

        {/* Main Telemetry & Radar Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center bg-card p-4 sm:p-6 md:p-10 rounded-2xl sm:rounded-3xl border border-border shadow-2xl">
          {/* Tactical Radar Display (7 cols) */}
          <div className="lg:col-span-7 flex flex-col items-center justify-center">
            <div className="relative aspect-square w-full max-w-md rounded-full bg-neutral-950 p-4 sm:p-6 border-2 border-border shadow-2xl overflow-hidden select-none">
              {/* Outer Tactical Degree Ring */}
              <div className="absolute inset-1.5 rounded-full border border-emerald-500/10 pointer-events-none" />
              
              {/* Concentric Range Rings with distance labels */}
              <div className="absolute inset-6 rounded-full border border-emerald-500/20 pointer-events-none">
                <span className="absolute top-1 left-1/2 -translate-x-1/2 text-[9px] font-mono text-emerald-400/50">200m</span>
              </div>
              <div className="absolute inset-14 sm:inset-16 rounded-full border border-emerald-500/20 pointer-events-none">
                <span className="absolute top-1 left-1/2 -translate-x-1/2 text-[9px] font-mono text-emerald-400/50">150m</span>
              </div>
              <div className="absolute inset-24 sm:inset-28 rounded-full border border-emerald-500/20 pointer-events-none">
                <span className="absolute top-1 left-1/2 -translate-x-1/2 text-[9px] font-mono text-emerald-400/50">100m</span>
              </div>
              <div className="absolute inset-32 sm:inset-36 rounded-full border border-emerald-500/20 pointer-events-none">
                <span className="absolute top-1 left-1/2 -translate-x-1/2 text-[9px] font-mono text-emerald-400/50">50m</span>
              </div>

              {/* Crosshair Axes & Cardinal Guides */}
              <div className="absolute top-0 bottom-0 left-1/2 w-px bg-emerald-500/25 -translate-x-1/2 pointer-events-none" />
              <div className="absolute left-0 right-0 top-1/2 h-px bg-emerald-500/25 -translate-y-1/2 pointer-events-none" />
              <span className="absolute top-2 left-1/2 -translate-x-1/2 text-[10px] font-mono font-bold text-emerald-400 pointer-events-none">N</span>
              <span className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[10px] font-mono font-bold text-emerald-400 pointer-events-none">S</span>
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[10px] font-mono font-bold text-emerald-400 pointer-events-none">W</span>
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-mono font-bold text-emerald-400 pointer-events-none">E</span>

              {/* Center Beacon */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-4 w-4 rounded-full bg-accent shadow-[0_0_20px_rgba(244,232,210,0.5)] z-20 pointer-events-none flex items-center justify-center">
                <div className="h-1.5 w-1.5 rounded-full bg-background" />
              </div>

              {/* Rotating Radar Sweep Beam */}
              <motion.div
                className="pointer-events-none absolute inset-0 rounded-full origin-center"
                animate={{ rotate: 360 }}
                transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                style={{
                  background: 'conic-gradient(from 0deg, rgba(244, 232, 210, 0.4) 0deg, rgba(16, 185, 129, 0.25) 45deg, transparent 90deg, transparent 360deg)'
                }}
              />

              {/* Sonar Pings on the plate */}
              {SONAR_FINDINGS.map((ping) => {
                const isSelected = activeFinding?.id === ping.id;
                const style = getSeverityStyle(ping.severity);

                return (
                  <button
                    key={ping.id}
                    onClick={() => {
                      sounds.playSonar();
                      setActiveFinding(ping);
                      setCycleProgress(0);
                    }}
                    style={{ left: `${ping.x}%`, top: `${ping.y}%` }}
                    className="absolute -translate-x-1/2 -translate-y-1/2 z-30 group cursor-pointer p-2.5"
                    aria-label={`Inspect ${ping.code}`}
                  >
                    <span className="relative flex h-5 w-5 items-center justify-center">
                      <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${style.ping}`} />
                      <span className={`relative inline-flex rounded-full h-3.5 w-3.5 ${style.ping} shadow-md border-2 border-white transition-all duration-300 ${isSelected ? 'scale-150 ring-2 ring-accent ring-offset-2 ring-offset-black' : 'group-hover:scale-125'}`} />
                    </span>
                    <span className={`absolute -bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] font-mono font-bold px-1.5 py-0.5 rounded transition-all ${isSelected ? 'text-[#202632] bg-[#F4E8D2] opacity-100 shadow-md font-extrabold' : 'text-white bg-black/85 opacity-70 group-hover:opacity-100'}`}>
                      {ping.code}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Radar Legend */}
            <div className="mt-5 flex flex-wrap items-center justify-center gap-4 text-xs font-mono text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-emerald-400" /> Normal Optical Signal
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-amber-400" /> Overstay Active
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-rose-400" /> Sensor Beam Break
              </span>
            </div>
          </div>

          {/* Telemetry Detail Deck (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <div className="flex items-center justify-between pb-3 border-b border-border">
              <div className="flex items-center gap-2">
                <Radar className="h-4 w-4 text-accent animate-pulse" />
                <span className="text-xs font-mono font-bold uppercase text-foreground">
                  LIVE FIELD EVENT INSPECTOR
                </span>
              </div>
              <span className="text-[11px] font-mono text-emerald-500 font-bold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                ACTIVE 3S SWEEP
              </span>
            </div>

            {/* Continuous Sweep Progress Indicator */}
            <div className="h-1 w-full bg-muted rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-accent"
                style={{ width: `${cycleProgress}%` }}
                transition={{ duration: 0.05, ease: 'linear' }}
              />
            </div>

            {/* Active Finding Inspection Card */}
            <AnimatePresence mode="wait">
              {activeFinding && (
                <motion.div
                  key={activeFinding.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.35, ease: easing }}
                  className="bg-card rounded-2xl p-6 border border-border shadow-lg"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <span className="text-xs font-mono text-muted-foreground uppercase flex items-center gap-1.5">
                        <Eye className="h-3.5 w-3.5 text-accent" />
                        {activeFinding.zone}
                      </span>
                      <h4 className="text-xl font-bold text-foreground mt-1">
                        {activeFinding.title}
                      </h4>
                    </div>
                    <span className={`text-xs font-mono font-bold uppercase px-2.5 py-1 rounded-full border shrink-0 ${getSeverityStyle(activeFinding.severity).bg} ${getSeverityStyle(activeFinding.severity).text} ${getSeverityStyle(activeFinding.severity).border}`}>
                      {activeFinding.code}
                    </span>
                  </div>

                  <div className="mt-4 p-4 rounded-xl bg-muted/60 border border-border">
                    <p className="text-xs font-mono text-foreground/90 leading-relaxed">
                      {activeFinding.details}
                    </p>
                  </div>

                  <div className="mt-5 flex items-center justify-between text-xs font-mono text-muted-foreground pt-4 border-t border-border">
                    <span>Captured: {activeFinding.timestamp}</span>
                    <span className="text-accent font-semibold">BSON Log #{activeFinding.code.slice(-2)}</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Channel Selection Switchboard */}
            <div className="space-y-2 mt-1">
              <span className="text-xs font-mono text-muted-foreground uppercase">
                Sensor Channels:
              </span>
              <div className="grid grid-cols-2 gap-2">
                {SONAR_FINDINGS.map((item) => {
                  const isCur = activeFinding?.id === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        sounds.playSonar();
                        setActiveFinding(item);
                        setCycleProgress(0);
                      }}
                      className={`text-left p-2.5 rounded-xl border text-xs font-mono transition-all flex items-center justify-between cursor-pointer ${
                        isCur
                          ? 'bg-[#202632] text-[#F4E8D2] dark:bg-[#F4E8D2] dark:text-[#202632] border-foreground/30 font-bold shadow-md'
                          : 'bg-card hover:bg-muted border-border text-foreground'
                      }`}
                    >
                      <span className="truncate">{item.code}</span>
                      <span className="text-[10px] opacity-75 uppercase ml-1">{item.zone.split('-')[0]}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
