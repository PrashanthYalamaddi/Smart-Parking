import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, RefreshCw, KeyRound, ArrowRight, Radio, ShieldCheck, CheckCircle2, ChevronRight, Zap } from 'lucide-react';
import { sounds } from '../utils/audio';

const easing = [0.16, 1, 0.3, 1];

const STEPS = [
  {
    step: '01',
    title: 'HSRP & FASTag RFID Ingestion',
    subtitle: 'Hardware Optical OCR & Antenna',
    desc: 'High-speed optical OCR camera scans the Indian HSRP license plate while NHAI NETC RFID reader verifies FASTag in 18ms at the boom barrier.',
    icon: Camera,
    tag: 'Hardware Trigger',
    metric: '18ms Hardware Read',
    highlight: 'Optical Recognition',
    pipelineStatus: 'PARIVAHAN_OCR_VERIFIED',
    payload: '{ plate: "MH-12-RN-9021", rfid: "34161F80", tag: "NETC_FASTAG" }'
  },
  {
    step: '02',
    title: 'MongoDB Atomic Bay Allocation',
    subtitle: 'MERN Cloud Controller',
    desc: 'Express API issues an atomic findOneAndUpdate command, matching vehicle dimensions to open bays with zero race conditions during peak hours.',
    icon: RefreshCw,
    tag: 'MERN Backend',
    metric: 'ACID Guaranteed',
    highlight: 'Zero Race Conditions',
    pipelineStatus: 'MONGO_LOCK_ACQUIRED',
    payload: '{ bay: "A-04", status: "ALLOCATED", lockId: "txn_8892bc" }'
  },
  {
    step: '03',
    title: 'Bharat UPI & Gate Clearance',
    subtitle: 'Driver & Gate Interface',
    desc: 'Driver scans dynamic UPI QR code (PhonePe, GPay, Paytm) or uses FASTag auto-debit. Departure barrier unlocks automatically with invoice generation.',
    icon: KeyRound,
    tag: 'Driver & Attendant',
    metric: 'Instant Barrier Release',
    highlight: 'Auto Reconciliation',
    pipelineStatus: 'GATE_BARRIER_UNLOCKED',
    payload: '{ upiStatus: "PAID", tariff: "₹80.00", boomBarrier: "OPEN" }'
  }
];

export default function HowItWorks5({ onOpenConsole }) {
  const [activeStep, setActiveStep] = useState(0);

  // Automatic sequence advancing every 3 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % STEPS.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const handleStepClick = (idx) => {
    sounds.playClick();
    setActiveStep(idx);
  };

  return (
    <section className="relative bg-background px-6 py-20 md:py-32 border-t border-border overflow-hidden" id="how-it-works">
      {/* Background Pipeline Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-accent/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative mx-auto max-w-6xl">
        <div className="mb-12 text-center md:mb-16">
          <span className="text-xs font-mono font-semibold tracking-widest text-muted-foreground uppercase bg-muted px-3 py-1.5 rounded-md border border-border inline-block mb-3">
            WORKFLOW ORCHESTRATION // 3-STEP PIPELINE
          </span>
          <h2 className="text-3xl font-medium tracking-tight md:text-4xl lg:text-5xl text-foreground">
            How The MERN System Works
          </h2>
          <p className="text-muted-foreground mt-3 text-base md:text-lg max-w-xl mx-auto">
            From vehicle arrival to departure, every step is coordinated through REST APIs and live MongoDB documents.
          </p>

          {/* Sequential Stage Navigation Bar */}
          <div className="mt-8 inline-flex items-center gap-2 p-1.5 rounded-full bg-card border border-border shadow-md">
            {STEPS.map((step, idx) => (
              <button
                key={step.step}
                onClick={() => handleStepClick(idx)}
                className={`relative px-4 py-2 rounded-full text-xs font-mono font-bold transition-all cursor-pointer flex items-center gap-2 ${
                  activeStep === idx
                    ? 'bg-foreground text-background shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <span>STAGE {step.step}</span>
                {activeStep === idx && (
                  <span className="h-1.5 w-1.5 rounded-full bg-accent animate-ping" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Connected Step Cards Grid */}
        <div className="relative grid grid-cols-1 gap-6 md:grid-cols-3">
          {STEPS.map((item, index) => {
            const Icon = item.icon;
            const isActive = activeStep === index;
            const isPassed = activeStep > index;

            return (
              <div key={item.step} className="relative flex flex-col">
                <motion.div
                  onClick={() => handleStepClick(index)}
                  animate={{
                    scale: isActive ? 1.02 : 1,
                    borderColor: isActive ? 'var(--color-accent, #10b981)' : 'var(--color-border)'
                  }}
                  transition={{ duration: 0.35, ease: easing }}
                  className={`flex-1 bg-card rounded-3xl p-7 md:p-8 flex flex-col justify-between border cursor-pointer transition-all duration-300 shadow-md hover:shadow-xl group relative overflow-hidden ${
                    isActive
                      ? 'ring-2 ring-accent/30 shadow-accent/10'
                      : 'hover:border-foreground/30'
                  }`}
                >
                  {/* Active Indicator Top Bar */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-muted overflow-hidden">
                    {isActive && (
                      <motion.div
                        initial={{ width: '0%' }}
                        animate={{ width: '100%' }}
                        transition={{ duration: 3, ease: 'linear' }}
                        className="h-full bg-accent"
                      />
                    )}
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <span className={`text-xs font-mono font-bold tracking-wider px-3 py-1 rounded-md border transition-colors ${
                        isActive
                          ? 'text-accent bg-accent/15 border-accent/30'
                          : 'text-muted-foreground bg-muted border-border'
                      }`}>
                        STEP {item.step}
                      </span>
                      <span className="text-[11px] font-mono text-muted-foreground uppercase tracking-wider">
                        {item.tag}
                      </span>
                    </div>

                    <div className="mb-6 flex items-center justify-between">
                      <div className={`p-4 rounded-2xl transition-all duration-300 border ${
                        isActive
                          ? 'bg-accent text-black scale-105 border-accent shadow-md'
                          : 'bg-muted text-foreground border-border group-hover:scale-105'
                      }`}>
                        <Icon className="h-7 w-7" />
                      </div>
                      <span className="text-[11px] font-mono font-semibold text-emerald-500 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                        {item.metric}
                      </span>
                    </div>

                    <span className="text-xs font-mono text-muted-foreground block mb-1">
                      {item.subtitle}
                    </span>
                    <h3 className="mb-3 text-xl font-bold tracking-tight md:text-2xl text-foreground">
                      {item.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                      {item.desc}
                    </p>

                    {/* Animated Step Telemetry Stream */}
                    <div className="rounded-xl p-3 bg-muted/60 border border-border/80 font-mono text-[11px]">
                      <div className="flex items-center justify-between text-muted-foreground mb-1.5">
                        <span className="flex items-center gap-1.5 font-semibold">
                          <span className={`h-1.5 w-1.5 rounded-full ${isActive ? 'bg-accent animate-pulse' : 'bg-muted-foreground'}`} />
                          Telemetry Status:
                        </span>
                        <span className={isActive ? 'text-accent font-bold' : 'text-muted-foreground'}>
                          {item.pipelineStatus}
                        </span>
                      </div>
                      <div className="text-[10px] text-muted-foreground/80 truncate font-mono bg-background/50 px-2 py-1 rounded border border-border/50">
                        {item.payload}
                      </div>
                    </div>
                  </div>

                  <div className="pt-6 mt-6 border-t border-border flex items-center justify-between text-xs text-muted-foreground font-mono">
                    <span>{item.highlight}</span>
                    <span className="text-emerald-500 font-semibold flex items-center gap-1.5">
                      <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                      {isActive ? 'Live Executing' : 'Automated'}
                    </span>
                  </div>
                </motion.div>

                {/* Animated Directional Connector for Desktop between Step 0->1 and 1->2 */}
                {index < STEPS.length - 1 && (
                  <div className="hidden md:flex absolute -right-3.5 top-1/2 -translate-y-1/2 z-20 items-center justify-center pointer-events-none">
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center border shadow-sm transition-all duration-300 ${
                      isActive
                        ? 'bg-[#202632] text-[#F4E8D2] dark:bg-[#F4E8D2] dark:text-[#202632] border-foreground/30 scale-110'
                        : 'bg-card text-muted-foreground border-border'
                    }`}>
                      <ChevronRight className="h-4 w-4" />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Action Button Below Steps */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3, ease: easing }}
          className="mt-14 text-center"
        >
          <button
            onClick={() => {
              sounds.playClick();
              onOpenConsole();
            }}
            className="group inline-flex items-center gap-3 rounded-xl bg-[#202632] text-[#F4E8D2] hover:bg-[#151A24] dark:bg-[#F4E8D2] dark:text-[#202632] dark:hover:bg-white py-3.5 px-7 font-bold shadow-lg shadow-black/15 transition-all duration-300 hover:rounded-[50px] hover:shadow-xl cursor-pointer active:scale-95"
          >
            <span>Simulate A Vehicle Check-In</span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
