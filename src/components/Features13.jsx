import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronRight,
  Database,
  Server,
  Smartphone,
  Shield,
  Radio,
  Check,
  Code,
  ArrowRight,
  ArrowDown,
  Activity,
  Zap,
  HardDrive,
  Cpu,
  Layers,
  Lock,
  RefreshCw
} from 'lucide-react';
import { sounds } from '../utils/audio';

const easing = [0.16, 1, 0.3, 1];

const ACCORDION_ITEMS = [
  {
    id: 'mongo',
    num: '01',
    stage: 'DATA LAYER',
    title: 'MongoDB Slot Inventory',
    tag: 'NoSQL Data Architecture',
    flowLabel: 'MongoDB Replica Set',
    flowDesc: 'BSON Atomic Locks',
    summary: 'Atomic operations with compound geospatial indexes for zero-collision bay state updates.',
    details: 'Each parking bay is backed by a native MongoDB collection document with atomic status locks. Using findOneAndUpdate with state preconditions prevents race conditions during high-volume rush hours.',
    icon: Database,
    previewType: 'mongo'
  },
  {
    id: 'express',
    num: '02',
    stage: 'BACKEND GATEWAY',
    title: 'Express & Node REST APIs',
    tag: 'Backend Microservices',
    flowLabel: 'Express REST Gateway',
    flowDesc: 'Sub-50ms Routing',
    summary: 'Modular Express routers handling high-volume telemetry ingestion with sub-50ms latency.',
    details: 'Endpoints for /api/v1/slots, /api/v1/vehicles, and /api/v1/checkout feature schema validation, Joi payload filters, and CORS headers ready for edge deployment.',
    icon: Server,
    previewType: 'express'
  },
  {
    id: 'react',
    num: '03',
    stage: 'FRONTEND CLIENT',
    title: 'React Interactive UI',
    tag: 'Frontend Engineering',
    flowLabel: 'React 19 Client UI',
    flowDesc: 'Virtual DOM Re-render',
    summary: 'Stateful 2D slot grid with live status indicators, modal dialogs, and instant filter controls.',
    details: 'Built with React 19 and Framer Motion, the user interface updates state fluidly without full-page reloads, giving drivers and attendants instantaneous clarity.',
    icon: Smartphone,
    previewType: 'ui',
    stats: [
      { label: 'DOM Re-renders', value: '< 16ms' },
      { label: 'Interactive Bays', value: '48 Slots' },
      { label: 'Filter Modes', value: '4 Zones' },
      { label: 'Theme Support', value: 'Light / Dark' }
    ]
  },
  {
    id: 'rbac',
    num: '04',
    stage: 'SECURITY PROTOCOL',
    title: 'Role-Based Access Control',
    tag: 'Security & Auth',
    flowLabel: 'JWT RBAC Auth',
    flowDesc: 'Bearer Token Guards',
    summary: 'Fine-grained JWT authentication separating Super Admins, Station Attendants, and Drivers.',
    details: 'Restricted actions like tariff overrides, sensor recalibration, and gate manual releases require validated Bearer tokens and role assertions verified at the Express gateway.',
    icon: Shield,
    previewType: 'rbac',
    roles: [
      { role: 'Super Admin', perms: 'Full CRUD, Tariff Config, Gate Overrides, Audit Logs' },
      { role: 'Station Attendant', perms: 'Vehicle Check-in, Checkout Processing, Bay Inspection' },
      { role: 'Public Driver', perms: 'Search Available Slots, Reserve Bay, Mobile QR Exit' }
    ]
  }
];

export default function Features13({ onOpenConsole }) {
  const [activeId, setActiveId] = useState('mongo');
  const [progress, setProgress] = useState(0);

  // Automatically advance to the next MERN state every 3.5 seconds
  useEffect(() => {
    const duration = 3500;
    const interval = 50;
    let elapsed = 0;

    const timer = setInterval(() => {
      elapsed += interval;
      setProgress((elapsed / duration) * 100);

      if (elapsed >= duration) {
        elapsed = 0;
        setProgress(0);
        setActiveId((current) => {
          const idx = ACCORDION_ITEMS.findIndex((item) => item.id === current);
          const nextIdx = (idx + 1) % ACCORDION_ITEMS.length;
          return ACCORDION_ITEMS[nextIdx].id;
        });
      }
    }, interval);

    return () => clearInterval(timer);
  }, []);

  const activeIndex = ACCORDION_ITEMS.findIndex((item) => item.id === activeId);
  const activeItem = ACCORDION_ITEMS[activeIndex] || ACCORDION_ITEMS[0];

  return (
    <section className="bg-background px-6 py-20 md:py-32 border-t border-border" id="features-accordion">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-12 text-center md:mb-16">
          <span className="text-xs font-mono font-semibold tracking-widest text-muted-foreground uppercase bg-muted px-3 py-1.5 rounded-md border border-border inline-block mb-3">
            TECHNICAL DEEP DIVE // FEATURES 13
          </span>
          <h2 className="text-3xl font-medium tracking-tight md:text-4xl lg:text-5xl text-foreground">
            MERN Architecture & Live Data Flow
          </h2>
          <p className="text-muted-foreground mt-3 text-base md:text-lg max-w-xl mx-auto">
            Sequential data transit visualization. Observe how hardware telemetry triggers pass through Node and Express to atomic MongoDB records and real-time React renders.
          </p>
        </div>

        {/* Animated MERN Stack Data Flow Highway */}
        <div className="mb-10 p-5 rounded-3xl bg-card border border-border shadow-md relative overflow-hidden">
          {/* Subtle Ambient Background Glow */}
          <div className="absolute top-0 right-1/4 w-96 h-32 bg-accent/5 blur-3xl pointer-events-none" />

          <div className="flex items-center justify-between pb-3 mb-4 border-b border-border">
            <span className="text-xs font-mono font-bold uppercase text-foreground flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-accent animate-pulse" />
              MERN End-to-End Execution Pipeline
            </span>
            <div className="flex items-center gap-2 text-[11px] font-mono text-muted-foreground">
              <span className="hidden sm:inline">Active Bus Latency:</span>
              <span className="text-emerald-500 font-bold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                18ms Average
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 relative">
            {ACCORDION_ITEMS.map((item, idx) => {
              const isCurrent = item.id === activeId;
              const isPast = idx < activeIndex;

              return (
                <div
                  key={item.id}
                  onClick={() => {
                    sounds.playClick();
                    setActiveId(item.id);
                    setProgress(0);
                  }}
                  className={`p-4 rounded-2xl border transition-all duration-300 cursor-pointer relative overflow-hidden flex flex-col justify-between ${
                    isCurrent
                      ? 'bg-accent/15 border-accent shadow-md ring-1 ring-accent'
                      : 'bg-muted/40 hover:bg-muted/70 border-border'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono font-bold uppercase text-muted-foreground">
                      STAGE 0{idx + 1}
                    </span>
                    <span className={`h-2 w-2 rounded-full ${isCurrent ? 'bg-accent animate-ping' : isPast ? 'bg-emerald-500' : 'bg-muted-foreground/40'}`} />
                  </div>

                  <div>
                    <h5 className={`text-xs font-bold ${isCurrent ? 'text-accent' : 'text-foreground'}`}>
                      {item.flowLabel}
                    </h5>
                    <span className="text-[10px] font-mono text-muted-foreground">
                      {item.flowDesc}
                    </span>
                  </div>

                  {/* Directional Connector Arrow with Animated Pulsing Data Packet */}
                  {idx < ACCORDION_ITEMS.length - 1 && (
                    <div className="hidden sm:flex absolute right-1.5 top-1/2 -translate-y-1/2 text-muted-foreground/40 items-center">
                      {isCurrent && (
                        <motion.span
                          animate={{ x: [0, 8, 0], opacity: [0.4, 1, 0.4] }}
                          transition={{ duration: 1.2, repeat: Infinity }}
                          className="h-1.5 w-1.5 rounded-full bg-accent absolute -left-2"
                        />
                      )}
                      <ArrowRight className={`h-3.5 w-3.5 ${isCurrent ? 'text-accent' : ''}`} />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Detailed Accordion & Interactive Inspector Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Accordion list on the left (5 cols) */}
          <div className="lg:col-span-5 space-y-3">
            {ACCORDION_ITEMS.map((item) => {
              const isActive = item.id === activeId;
              const Icon = item.icon;

              return (
                <div
                  key={item.id}
                  onClick={() => {
                    sounds.playClick();
                    setActiveId(item.id);
                    setProgress(0);
                  }}
                  className={`rounded-2xl p-5 border transition-all cursor-pointer relative overflow-hidden ${
                    isActive
                      ? 'bg-card border-accent shadow-md ring-1 ring-accent'
                      : 'bg-card hover:bg-muted border-border hover:border-foreground/20'
                  }`}
                >
                  {/* Synchronized Step Progress Bar */}
                  {isActive && (
                    <div className="absolute top-0 left-0 right-0 h-1 bg-muted">
                      <motion.div
                        className="h-full bg-accent"
                        style={{ width: `${progress}%` }}
                        transition={{ duration: 0.05, ease: 'linear' }}
                      />
                    </div>
                  )}

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-xl transition-colors ${isActive ? 'bg-[#202632] text-[#F4E8D2] dark:bg-[#F4E8D2] dark:text-[#202632] font-bold' : 'bg-muted text-foreground'}`}>
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <span className="text-xs font-mono font-bold text-muted-foreground block">
                          MODULE {item.num} // {item.stage}
                        </span>
                        <h4 className="text-base font-bold text-foreground">
                          {item.title}
                        </h4>
                      </div>
                    </div>
                    <span className="text-xs font-mono text-muted-foreground uppercase">
                      {item.tag}
                    </span>
                  </div>

                  {isActive && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      transition={{ duration: 0.3 }}
                      className="mt-3 pt-3 border-t border-border"
                    >
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        {item.summary}
                      </p>
                    </motion.div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Interactive Preview Panel on the right (7 cols) */}
          <div className="lg:col-span-7 bg-card rounded-3xl p-6 md:p-8 border border-border shadow-2xl min-h-[500px] flex flex-col justify-between">
            <div className="flex items-center justify-between pb-4 border-b border-border">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs font-mono font-bold uppercase text-foreground">
                  LIVE COMPONENT INSPECTOR // {activeItem.title}
                </span>
              </div>
              <span className="text-xs font-mono text-accent font-bold bg-accent/15 px-2.5 py-0.5 rounded border border-accent/25">
                STAGE {activeItem.num} ACTIVE
              </span>
            </div>

            <div className="py-6 flex-1">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeItem.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.35, ease: easing }}
                  className="space-y-4"
                >
                  <p className="text-xs text-foreground/90 leading-relaxed font-mono bg-muted/60 p-3.5 rounded-xl border border-border">
                    {activeItem.details}
                  </p>

                  {/* PREVIEW 1: MONGODB DATA STORAGE REDESIGN */}
                  {activeItem.previewType === 'mongo' && (
                    <div className="space-y-4">
                      {/* 3-Node Replica Set Cluster Visualization */}
                      <div className="p-4 rounded-2xl bg-neutral-950 border border-border/80 text-white font-mono shadow-inner">
                        <div className="flex items-center justify-between pb-2.5 mb-3 border-b border-neutral-800 text-[11px]">
                          <span className="text-accent flex items-center gap-1.5 font-bold">
                            <Database className="h-3.5 w-3.5" />
                            MongoDB Atlas 8.0 // 3-Node Cluster (India-West)
                          </span>
                          <span className="text-emerald-400 flex items-center gap-1">
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                            Heartbeat: 12ms
                          </span>
                        </div>

                        {/* Replica Nodes Row */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                          <div className="p-2.5 rounded-xl bg-neutral-900 border border-accent/40 flex flex-col justify-between">
                            <div className="flex items-center justify-between text-[10px] text-accent font-bold">
                              <span>PRIMARY (MUM)</span>
                              <span className="h-1.5 w-1.5 rounded-full bg-accent animate-ping" />
                            </div>
                            <span className="text-neutral-300 text-[11px] mt-1">Port 27017</span>
                            <span className="text-emerald-400 text-[10px] mt-0.5">Write Master (ACID)</span>
                          </div>

                          <div className="p-2.5 rounded-xl bg-neutral-900 border border-neutral-800 flex flex-col justify-between">
                            <div className="flex items-center justify-between text-[10px] text-neutral-400 font-bold">
                              <span>SECONDARY-1 (PUN)</span>
                              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                            </div>
                            <span className="text-neutral-300 text-[11px] mt-1">Port 27018</span>
                            <span className="text-neutral-400 text-[10px] mt-0.5">Sync Lag: 0ms</span>
                          </div>

                          <div className="p-2.5 rounded-xl bg-neutral-900 border border-neutral-800 flex flex-col justify-between">
                            <div className="flex items-center justify-between text-[10px] text-neutral-400 font-bold">
                              <span>SECONDARY-2 (BLR)</span>
                              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                            </div>
                            <span className="text-neutral-300 text-[11px] mt-1">Port 27019</span>
                            <span className="text-neutral-400 text-[10px] mt-0.5">Read Replica</span>
                          </div>
                        </div>

                        {/* Cluster Telemetry Stats */}
                        <div className="mt-3 pt-2.5 border-t border-neutral-800/80 flex flex-wrap items-center justify-between text-[10px] text-neutral-400 gap-2">
                          <span>WiredTiger Cache: 4.8GB / 8GB</span>
                          <span>Compound Index: slotId_1_status_1</span>
                          <span className="text-emerald-400">Write Throughput: 240 ops/sec</span>
                        </div>
                      </div>

                      {/* Live BSON Document Viewer with Atomic Lock Highlighting */}
                      <div className="rounded-2xl bg-neutral-950 p-4 border border-border/80 font-mono text-xs overflow-x-auto shadow-inner">
                        <div className="flex items-center justify-between pb-2 mb-2 border-b border-neutral-800 text-[11px] text-neutral-400">
                          <span className="text-neutral-300 flex items-center gap-1.5 font-bold">
                            <Lock className="h-3.5 w-3.5 text-accent" />
                            collection(&quot;slots&quot;).findOneAndUpdate() Document Record
                          </span>
                          <span className="text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 text-[10px]">
                            LOCK_COMMITTED
                          </span>
                        </div>

                        <pre className="text-neutral-300 leading-relaxed text-[11px]">
                          <code>
{`{
  "_id": ObjectId("653a982f1b4c9012e847c102"),
  "slotId": "BAY_A04",
  "status": "OCCUPIED",
  "vehicle": "MH-12-RN-9021",
  "driver": "Aakash Deshmukh",
  "zone": "Zone A (Mumbai BKC)",
  "ratePerHour": 80,
  "isEV": true,
  "fastagTagId": "NETC-34161F80",
  "lockStatus": "ACID_ATOMIC_HELD",
  "updatedAt": ISODate("2026-10-09T17:28:00Z")
}`}
                          </code>
                        </pre>
                      </div>
                    </div>
                  )}

                  {/* PREVIEW 2: EXPRESS.JS REST API & BACKEND PROCESSING REDESIGN */}
                  {activeItem.previewType === 'express' && (
                    <div className="space-y-4">
                      {/* Visual Request-Response Pipeline Flow */}
                      <div className="p-4 rounded-2xl bg-neutral-950 border border-border/80 font-mono text-white shadow-inner">
                        <div className="flex items-center justify-between pb-2.5 mb-3 border-b border-neutral-800 text-[11px]">
                          <span className="text-accent flex items-center gap-1.5 font-bold">
                            <Server className="h-3.5 w-3.5" />
                            Express Request Processing Pipeline
                          </span>
                          <span className="text-emerald-400">Response: 201 Created (18ms)</span>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px]">
                          <div className="p-2.5 rounded-xl bg-neutral-900 border border-neutral-800">
                            <span className="text-blue-400 block text-[9px] font-bold">STAGE 1</span>
                            <span className="text-white font-semibold">HTTP Ingress</span>
                            <span className="text-neutral-400 block text-[9px] mt-0.5">POST /checkin</span>
                          </div>
                          <div className="p-2.5 rounded-xl bg-neutral-900 border border-neutral-800">
                            <span className="text-amber-400 block text-[9px] font-bold">STAGE 2</span>
                            <span className="text-white font-semibold">JWT Middleware</span>
                            <span className="text-neutral-400 block text-[9px] mt-0.5">Bearer Token Valid</span>
                          </div>
                          <div className="p-2.5 rounded-xl bg-neutral-900 border border-neutral-800">
                            <span className="text-sky-400 block text-[9px] font-bold">STAGE 3</span>
                            <span className="text-white font-semibold">Joi Schema</span>
                            <span className="text-neutral-400 block text-[9px] mt-0.5">HSRP Plate Regex</span>
                          </div>
                          <div className="p-2.5 rounded-xl bg-neutral-900 border border-accent/40">
                            <span className="text-accent block text-[9px] font-bold">STAGE 4</span>
                            <span className="text-white font-semibold">Mongo Controller</span>
                            <span className="text-emerald-400 block text-[9px] mt-0.5">Atomic Commit</span>
                          </div>
                        </div>
                      </div>

                      {/* Live API Route Endpoints with Response Status */}
                      <div className="space-y-2">
                        {[
                          { method: 'GET', path: '/api/v1/slots', status: '200 OK', latency: '14ms', desc: 'Fetch all 48 bays with live availability' },
                          { method: 'POST', path: '/api/v1/vehicles/checkin', status: '201 Created', latency: '22ms', desc: 'Atomic check-in and slot assignment' },
                          { method: 'POST', path: '/api/v1/fastag/scan', status: '200 OK', latency: '18ms', desc: 'NHAI NETC RFID validation in 18ms' },
                          { method: 'POST', path: '/api/v1/payments/upi-checkout', status: '200 OK', latency: '28ms', desc: 'Dynamic Bharat UPI QR and gate release' }
                        ].map((ep) => (
                          <div
                            key={ep.path}
                            className="flex items-center justify-between p-3 rounded-xl bg-muted/60 border border-border text-xs font-mono hover:border-accent/40 transition-colors"
                          >
                            <div className="flex items-center gap-2.5">
                              <span className={`px-2 py-0.5 rounded font-bold text-[10px] ${
                                ep.method === 'GET' ? 'bg-blue-500/20 text-blue-400' :
                                'bg-emerald-500/20 text-emerald-400'
                              }`}>
                                {ep.method}
                              </span>
                              <span className="text-foreground font-semibold">{ep.path}</span>
                            </div>
                            <div className="flex items-center gap-2 text-[11px]">
                              <span className="text-muted-foreground hidden sm:inline">{ep.desc}</span>
                              <span className="text-emerald-500 font-bold bg-emerald-500/10 px-1.5 py-0.5 rounded">
                                {ep.latency}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* PREVIEW 3: REACT UI STATS */}
                  {activeItem.previewType === 'ui' && (
                    <div className="grid grid-cols-2 gap-3">
                      {activeItem.stats.map((st) => (
                        <div key={st.label} className="p-4 rounded-2xl bg-muted/60 border border-border hover:border-accent/40 transition-colors">
                          <span className="text-xs font-mono text-muted-foreground">{st.label}</span>
                          <span className="text-2xl font-extrabold text-foreground block mt-1">{st.value}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* PREVIEW 4: RBAC PERMISSIONS */}
                  {activeItem.previewType === 'rbac' && (
                    <div className="space-y-2.5">
                      {activeItem.roles.map((r) => (
                        <div key={r.role} className="p-3.5 rounded-xl bg-muted/60 border border-border text-xs font-mono hover:border-accent/40 transition-colors">
                          <span className="font-bold text-accent block mb-1">{r.role}</span>
                          <span className="text-muted-foreground">{r.perms}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="pt-4 border-t border-border flex items-center justify-between">
              <span className="text-xs font-mono text-muted-foreground">
                MERN Architectural Schema v3.8
              </span>
              <button
                onClick={() => {
                  sounds.playClick();
                  onOpenConsole();
                }}
                className="text-xs font-bold font-mono text-accent hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span>Jump To Live Operations Console</span>
                <ChevronRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
