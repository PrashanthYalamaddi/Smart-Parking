import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Sparkles, Cpu, Zap, CheckCircle2, ShieldCheck, Activity } from 'lucide-react';
import { sounds } from '../utils/audio';

const easing = [0.16, 1, 0.3, 1];

// Dynamic Slot Allocation Simulator Telemetry Sequence
const SIMULATION_STATES = [
  {
    step: '01',
    phase: 'ANPR OCR SCAN',
    vehicle: 'TS-08-EM-2049 (HYUNDAI IONIQ 5)',
    status: 'Plate Validated',
    action: 'FASTag 5.8 GHz RFID Handshake',
    badge: 'ACTIVE SENSOR'
  },
  {
    step: '02',
    phase: 'BAY ALLOCATION',
    vehicle: 'BAY-A04 (EV FAST CHARGE DOCK)',
    status: 'Atomic BSON Commit',
    action: 'MongoDB Atlas Distributed Lock',
    badge: 'SLOT RESERVED'
  },
  {
    step: '03',
    phase: 'TOLL RECONCILIATION',
    vehicle: 'FASTag NETC WALLET DEDUCTION',
    status: '₹40.00 Debited',
    action: 'Bharat UPI QR Auto-Clearance',
    badge: 'PAYMENT CLEARED'
  },
  {
    step: '04',
    phase: 'GATE CLEARANCE',
    vehicle: 'BOOM BARRIER LOWERED IN 1.8s',
    status: 'Vehicle Ingress Complete',
    action: 'Live Grid Occupancy Updated: 38/48',
    badge: 'GRID SYNCHRONIZED'
  }
];

export default function CTA13({ onOpenConsole, onOpenContact }) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  // Cycle through simulation steps automatically
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentStepIndex((prev) => (prev + 1) % SIMULATION_STATES.length);
    }, 3200);
    return () => clearInterval(timer);
  }, []);

  const activeStep = SIMULATION_STATES[currentStepIndex];

  return (
    <section className="px-6 py-16 md:py-28 bg-transparent relative z-10" id="smart-slot-cta">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: easing }}
        className="relative mx-auto max-w-6xl overflow-hidden rounded-3xl bg-[#202632] text-[#F4E8D2] p-8 md:rounded-4xl md:p-16 border border-[#F4E8D2]/20 shadow-2xl"
      >
        {/* Subtle Ambient Radial Lighting in Champagne & Navy */}
        <div className="pointer-events-none absolute -top-40 -right-40 w-96 h-96 rounded-full bg-[#F4E8D2]/10 blur-[100px]" />
        <div className="pointer-events-none absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-[#F4E8D2]/5 blur-[120px]" />

        {/* Elegant Geometric Dot Grid Matrix */}
        <div
          className="pointer-events-none absolute inset-0 opacity-15"
          style={{
            backgroundImage: `radial-gradient(circle, #F4E8D2 1.2px, transparent 1.2px)`,
            backgroundSize: '24px 24px'
          }}
        />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Bold Kinetic Typography & Messaging */}
          <div className="lg:col-span-7 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-mono font-semibold tracking-wider uppercase mb-5 bg-[#F4E8D2]/10 border border-[#F4E8D2]/25 text-[#F4E8D2]">
              <Sparkles className="h-3.5 w-3.5 text-[#F4E8D2] animate-pulse" />
              <span>CIVIC TRANSIT EFFICIENCY // CTA 13</span>
            </div>

            {/* Redesigned Serif & Sans Kinetic Headline */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight leading-[1.08] text-[#F4E8D2]">
              Smarter transport begins with an{' '}
              <span className="font-serif italic text-white underline decoration-[#F4E8D2]/40 underline-offset-8">
                intelligent slot.
              </span>
            </h2>

            <p className="mt-6 text-base md:text-lg text-[#C4B69E] max-w-xl leading-relaxed">
              Eliminate cruising congestion before drivers reach campus gates. Orchestrate live MongoDB BSON slot allocations with sub-50ms API response times.
            </p>

            {/* Interactive Action Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button
                onClick={() => {
                  sounds.playClick();
                  onOpenConsole();
                }}
                className="px-8 py-4 rounded-xl bg-[#F4E8D2] text-[#202632] hover:bg-white font-bold text-sm transition-all duration-300 hover:rounded-[50px] shadow-lg shadow-[#F4E8D2]/15 flex items-center justify-center gap-2.5 cursor-pointer active:scale-95"
              >
                <span>Launch Operations Console</span>
                <ArrowRight className="h-4 w-4" />
              </button>

              <button
                onClick={() => {
                  sounds.playClick();
                  onOpenContact();
                }}
                className="px-6 py-4 rounded-xl bg-white/5 hover:bg-white/10 text-[#F4E8D2] font-semibold text-sm transition-all border border-[#F4E8D2]/20 flex items-center justify-center gap-2 cursor-pointer active:scale-95"
              >
                <Cpu className="h-4 w-4 opacity-80" />
                <span>Request Hardware Demo</span>
              </button>
            </div>
          </div>

          {/* Right Column: Live Slot Orchestration Simulation HUD */}
          <div className="lg:col-span-5">
            <div className="rounded-2xl border border-[#F4E8D2]/25 bg-black/40 backdrop-blur-md p-5 sm:p-6 shadow-xl relative overflow-hidden">
              {/* Telemetry Header */}
              <div className="flex items-center justify-between pb-4 border-b border-[#F4E8D2]/15 text-xs font-mono">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
                  <span className="font-bold text-[#F4E8D2]">MERN TELEMETRY ENGINE</span>
                </div>
                <span className="text-[#C4B69E] bg-[#F4E8D2]/10 px-2 py-0.5 rounded">
                  STEP {activeStep.step} / 04
                </span>
              </div>

              {/* Animated Live Transition Step Card */}
              <div className="mt-4 min-h-[140px] flex flex-col justify-center">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentStepIndex}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.35, ease: easing }}
                    className="space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-mono uppercase tracking-widest text-emerald-400 font-bold flex items-center gap-1.5">
                        <Activity className="h-3.5 w-3.5" />
                        {activeStep.phase}
                      </span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                        {activeStep.badge}
                      </span>
                    </div>

                    <div className="text-base sm:text-lg font-mono font-bold text-white">
                      {activeStep.vehicle}
                    </div>

                    <div className="flex items-center justify-between text-xs font-mono text-[#C4B69E] pt-2 border-t border-white/10">
                      <span>{activeStep.status}</span>
                      <span className="text-white/80">{activeStep.action}</span>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Progress Steps Indicators */}
              <div className="grid grid-cols-4 gap-2 mt-5 pt-4 border-t border-[#F4E8D2]/15">
                {SIMULATION_STATES.map((step, idx) => (
                  <button
                    key={step.step}
                    onClick={() => setCurrentStepIndex(idx)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      idx === currentStepIndex
                        ? 'bg-[#F4E8D2] shadow-sm shadow-[#F4E8D2]'
                        : 'bg-white/15 hover:bg-white/30'
                    }`}
                    aria-label={`Jump to simulation step ${step.step}`}
                  />
                ))}
              </div>

              {/* Live Metric Bar */}
              <div className="mt-4 flex items-center justify-between text-[11px] font-mono text-[#C4B69E]">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
                  Malla Reddy Vishwavidyapeeth Campus
                </span>
                <span className="text-[#F4E8D2] font-semibold">48/48 Synced</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
