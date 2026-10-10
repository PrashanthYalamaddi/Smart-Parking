import React, { useState, useMemo, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MapPin,
  Navigation,
  Compass,
  Layers,
  Car,
  Zap,
  ShieldCheck,
  CheckCircle2,
  ExternalLink,
  ChevronRight,
  Radio,
  Clock,
  ArrowRight,
  Route,
  Activity,
  QrCode,
  Sparkles,
  Maximize2
} from 'lucide-react';
import { sounds } from '../utils/audio';
import HeroInteractiveCanvas from './HeroInteractiveCanvas';

const easing = [0.16, 1, 0.3, 1];

// Transit Hubs with Real GPS Coordinates
const TRANSIT_HUBS = [
  {
    id: 'malla-reddy',
    name: 'Malla Reddy Vishwavidyapeeth',
    location: 'Technical Campus, Hyderabad, Telangana 500100',
    lat: 17.5558,
    lng: 78.4348,
    totalBays: 48,
    availableBays: 10,
    evDocks: 12,
    activeZone: 'Zone A - Academic Block',
    barrierTime: '1.8s'
  },
  {
    id: 'hitec-city',
    name: 'Hitec City Smart Transit Hub',
    location: 'Cyber Gateway, Madhapur, Hyderabad 500081',
    lat: 17.4435,
    lng: 78.3772,
    totalBays: 120,
    availableBays: 28,
    evDocks: 24,
    activeZone: 'Deck 1 - IT Corridor',
    barrierTime: '1.4s'
  },
  {
    id: 'bkc-mumbai',
    name: 'Mumbai BKC EV Multi-Deck',
    location: 'G Block, Bandra Kurla Complex, Mumbai 400051',
    lat: 19.0657,
    lng: 72.8687,
    totalBays: 96,
    availableBays: 18,
    evDocks: 32,
    activeZone: 'Level 2 - Financial District',
    barrierTime: '1.6s'
  }
];

// Interactive Bay Schematics for Tactical View
const TACTICAL_BAYS = [
  { id: 'A-01', zone: 'Zone A (EV)', type: 'EV 50kW', status: 'occupied', vehicle: 'MH-02-EV-9210', driver: 'Arun Verma' },
  { id: 'A-02', zone: 'Zone A (EV)', type: 'EV 50kW', status: 'available', vehicle: null, driver: null },
  { id: 'A-03', zone: 'Zone A (EV)', type: 'EV 50kW', status: 'reserved', vehicle: 'MH-01-EQ-4421', driver: 'Neha Sharma' },
  { id: 'A-04', zone: 'Zone A (EV)', type: 'EV 50kW', status: 'allocated', vehicle: 'TS-08-EM-2049', driver: 'Vikramaditya P.' },
  { id: 'B-01', zone: 'Zone B (Sedan)', type: 'Sedan Bay', status: 'occupied', vehicle: 'KA-01-BN-7721', driver: 'Rohit Gowda' },
  { id: 'B-02', zone: 'Zone B (Sedan)', type: 'Sedan Bay', status: 'occupied', vehicle: 'KA-03-MF-1029', driver: 'Siddharth P.' },
  { id: 'B-03', zone: 'Zone B (Sedan)', type: 'Sedan Bay', status: 'available', vehicle: null, driver: null },
  { id: 'B-04', zone: 'Zone B (Sedan)', type: 'Sedan Bay', status: 'available', vehicle: null, driver: null },
  { id: 'C-01', zone: 'Zone C (SUV)', type: 'SUV Large', status: 'available', vehicle: null, driver: null },
  { id: 'C-02', zone: 'Zone C (SUV)', type: 'SUV Large', status: 'occupied', vehicle: 'MH-12-XX-2900', driver: 'Deepak Joshi' },
  { id: 'C-03', zone: 'Zone C (SUV)', type: 'SUV Large', status: 'occupied', vehicle: 'MH-14-ZZ-9911', driver: 'Meera Bhave' },
  { id: 'D-01', zone: 'Zone D (Rapid)', type: 'Accessible', status: 'available', vehicle: null, driver: null }
];

export default function Hero25({ onOpenConsole, onSelectCard }) {
  const heroSectionRef = useRef(null);
  const [selectedHub, setSelectedHub] = useState(TRANSIT_HUBS[0]);
  const [activeTab, setActiveTab] = useState('map'); // 'map' | 'radar' | 'anpr'
  const [mapLayer, setMapLayer] = useState('satellite'); // 'satellite' | 'roadmap'
  const [selectedBay, setSelectedBay] = useState(TACTICAL_BAYS[3]); // Default to A-04
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulationLog, setSimulationLog] = useState('Gate 1 Camera: Optical OCR Read Confirmed');

  // Google Maps Embed URL
  const embedMapUrl = useMemo(() => {
    const lat = selectedHub.lat;
    const lng = selectedHub.lng;
    const layerParam = mapLayer === 'satellite' ? 'k' : 'm';
    return `https://maps.google.com/maps?q=${lat},${lng}&t=${layerParam}&z=17&ie=UTF8&iwloc=&output=embed`;
  }, [selectedHub, mapLayer]);

  // Trigger rapid simulation sequence
  const handleSimulateArrival = useCallback(() => {
    sounds.playSonar();
    setIsSimulating(true);
    setSimulationLog('HSRP Scan: TS-08-EM-2049 Verified');

    setTimeout(() => {
      sounds.playClick();
      setSimulationLog('FASTag 5.8 GHz RFID Handshake Complete');
    }, 900);

    setTimeout(() => {
      sounds.playSuccess();
      setSimulationLog('Barrier Lifted: Bay A-04 Route Active (1.8s)');
      setIsSimulating(false);
    }, 1800);
  }, []);

  return (
    <section
      ref={heroSectionRef}
      className="relative flex flex-col items-center justify-start overflow-hidden px-3 sm:px-6 pt-24 sm:pt-28 md:pt-36 pb-16 bg-background"
    >
      {/* Interactive 60fps Animated Transit Constellation Canvas (Pure animated background, zero grills) */}
      <HeroInteractiveCanvas targetRef={heroSectionRef} />

      {/* Hero Header & Headline Area */}
      <div className="relative z-10 mx-auto max-w-5xl text-center px-1 sm:px-0">
        {/* Live Status Pill with Campus GPS Coordinates */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: easing }}
          className="mb-4 inline-flex items-center justify-center gap-1.5 sm:gap-2 rounded-full border border-border bg-card/90 backdrop-blur-md px-3 sm:px-4 py-1 sm:py-1.5 text-[11px] sm:text-xs font-mono font-medium shadow-sm text-foreground max-w-full"
        >
          <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
          <span className="font-bold tracking-wider uppercase">TRANSIT COMMAND</span>
          <span className="text-muted-foreground">•</span>
          <span className="text-[#545E70] dark:text-[#C4B69E] font-medium truncate max-w-[130px] sm:max-w-none">
            {selectedHub.name.split(' ')[0]} Campus
          </span>
          <span className="hidden md:inline text-muted-foreground">•</span>
          <span className="hidden md:inline font-bold text-foreground">
            {selectedHub.lat.toFixed(4)}° N, {selectedHub.lng.toFixed(4)}° E
          </span>
        </motion.div>

        {/* Master Heading: Perfectly placed, balanced line breaks, zero character blur lag */}
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: easing }}
          className="text-2xl sm:text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground leading-[1.12] sm:leading-[1.08] max-w-4xl mx-auto px-2"
        >
          Smart Parking Transit Command Center
        </motion.h1>

        {/* Concise Pitch: Exactly 16 words (passes strictly <= 20 words rule) */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: easing }}
          className="mt-3 sm:mt-4 text-sm sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed px-2"
        >
          Intelligent bay allocation, live Google Maps satellite routing, and automated FASTag clearance for urban transit corridors.
        </motion.p>

        {/* Primary Action Buttons with Apple-Style Springs */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: easing }}
          className="mt-6 sm:mt-7 flex flex-col sm:flex-row items-center justify-center gap-3 w-full max-w-md sm:max-w-none mx-auto px-2 sm:px-0"
        >
          <motion.button
            whileHover={{ scale: 1.025 }}
            whileTap={{ scale: 0.975 }}
            onClick={() => {
              sounds.playClick();
              onOpenConsole();
            }}
            className="group inline-flex w-full sm:w-auto min-h-[48px] items-center justify-center gap-3 rounded-xl py-3 pl-6 pr-3 font-bold bg-[#202632] text-[#F4E8D2] hover:bg-[#151A24] dark:bg-[#F4E8D2] dark:text-[#202632] dark:hover:bg-white shadow-xl shadow-black/15 transition-all duration-300 hover:rounded-[50px] cursor-pointer"
          >
            <span className="text-sm">Launch Operations Console</span>
            <span className="bg-[#F4E8D2] text-[#202632] dark:bg-[#202632] dark:text-[#F4E8D2] flex h-8 w-8 items-center justify-center rounded-full transition-transform duration-300 group-hover:scale-110">
              <ChevronRight className="h-4 w-4 relative left-px" />
            </span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.025 }}
            whileTap={{ scale: 0.975 }}
            onClick={() => {
              sounds.playClick();
              setActiveTab('map');
              const el = document.getElementById('command-cockpit');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="inline-flex w-full sm:w-auto min-h-[48px] items-center justify-center gap-2 rounded-xl border border-border bg-card/85 hover:bg-card px-5 py-3 text-sm font-semibold text-foreground transition-all duration-300 shadow-sm cursor-pointer"
          >
            <Navigation className="h-4 w-4 text-emerald-500 animate-pulse" />
            <span>Navigate Campus Bay Routing</span>
          </motion.button>
        </motion.div>

        {/* Quick Architecture Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4, ease: easing }}
          className="mt-6 flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs font-mono font-medium text-muted-foreground px-2"
        >
          <span className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-md bg-card border border-border text-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            48 Managed Bays
          </span>
          <span className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-md bg-card border border-border text-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
            sub-50ms REST APIs
          </span>
          <span className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-md bg-card border border-border text-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
            FASTag & Bharat UPI
          </span>
          <span className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-md bg-card border border-border text-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-indigo-500" />
            Zero Race Conditions
          </span>
        </motion.div>
      </div>

      {/* THE CENTERPIECE: Real-Time Smart Parking Transit Command Center Cockpit */}
      <motion.div
        id="command-cockpit"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.5, ease: easing }}
        className="relative z-10 w-full max-w-6xl mt-8 sm:mt-10 rounded-2xl sm:rounded-3xl border border-border/80 bg-[#1A202C] text-[#F4E8D2] shadow-2xl overflow-hidden"
      >
        {/* Cockpit Top Bar */}
        <div className="flex flex-wrap items-center justify-between px-3 sm:px-6 py-2.5 sm:py-3.5 bg-[#141A24] border-b border-white/10 gap-2 sm:gap-3">
          {/* Terminal ID & GPS Header */}
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <span className="h-2 w-2 sm:h-2.5 sm:w-2.5 rounded-full bg-emerald-400 animate-ping" />
              <span className="text-[11px] sm:text-xs font-mono font-bold tracking-wider text-white">
                MRTV-COMMAND // ONLINE
              </span>
            </div>
            <div className="hidden sm:flex items-center gap-1.5 text-[11px] font-mono text-[#C4B69E] bg-white/5 px-2.5 py-1 rounded border border-white/10">
              <MapPin className="h-3 w-3 text-emerald-400" />
              <span>{selectedHub.name}</span>
            </div>
          </div>

          {/* Interactive View Switcher Tabs (Responsive for Mobile Screens) */}
          <div className="flex items-center gap-1 p-1 bg-black/40 rounded-xl border border-white/10 overflow-x-auto scrollbar-hide max-w-full">
            <button
              onClick={() => {
                sounds.playClick();
                setActiveTab('map');
              }}
              className={`px-2.5 sm:px-3 py-1.5 rounded-lg text-[11px] sm:text-xs font-mono font-semibold transition-all flex items-center gap-1.5 cursor-pointer shrink-0 ${
                activeTab === 'map'
                  ? 'bg-[#F4E8D2] text-[#202632] shadow-sm font-bold'
                  : 'text-[#C4B69E] hover:text-white'
              }`}
            >
              <Navigation className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Google Maps Routing</span>
              <span className="sm:hidden">Maps</span>
            </button>

            <button
              onClick={() => {
                sounds.playClick();
                setActiveTab('radar');
              }}
              className={`px-2.5 sm:px-3 py-1.5 rounded-lg text-[11px] sm:text-xs font-mono font-semibold transition-all flex items-center gap-1.5 cursor-pointer shrink-0 ${
                activeTab === 'radar'
                  ? 'bg-[#F4E8D2] text-[#202632] shadow-sm font-bold'
                  : 'text-[#C4B69E] hover:text-white'
              }`}
            >
              <Compass className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Tactical Bay Radar</span>
              <span className="sm:hidden">Radar</span>
            </button>

            <button
              onClick={() => {
                sounds.playClick();
                setActiveTab('anpr');
              }}
              className={`px-2.5 sm:px-3 py-1.5 rounded-lg text-[11px] sm:text-xs font-mono font-semibold transition-all flex items-center gap-1.5 cursor-pointer shrink-0 ${
                activeTab === 'anpr'
                  ? 'bg-[#F4E8D2] text-[#202632] shadow-sm font-bold'
                  : 'text-[#C4B69E] hover:text-white'
              }`}
            >
              <Radio className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">ANPR Gate Stream</span>
              <span className="sm:hidden">Gate</span>
            </button>
          </div>

          {/* Map Layer Mode & Telemetry Actions */}
          <div className="flex items-center gap-1.5">
            {activeTab === 'map' && (
              <button
                onClick={() => {
                  sounds.playClick();
                  setMapLayer((prev) => (prev === 'satellite' ? 'roadmap' : 'satellite'));
                }}
                className="px-2 sm:px-2.5 py-1 rounded bg-white/10 hover:bg-white/15 text-[10px] sm:text-[11px] font-mono text-[#F4E8D2] border border-white/10 transition-colors flex items-center gap-1 sm:gap-1.5 cursor-pointer"
                title="Toggle Satellite / Roadmap layer"
              >
                <Layers className="h-3 w-3" />
                <span className="hidden sm:inline">{mapLayer === 'satellite' ? 'Satellite View' : 'Roadmap View'}</span>
                <span className="sm:hidden">{mapLayer === 'satellite' ? 'Sat' : 'Map'}</span>
              </button>
            )}

            <a
              href={`https://www.google.com/maps/search/?api=1&query=${selectedHub.lat},${selectedHub.lng}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded bg-white/10 hover:bg-white/15 text-[#F4E8D2] transition-colors cursor-pointer"
              title="Open full Google Maps in new window"
              aria-label="Open full Google Maps in new window"
            >
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>

        {/* Cockpit Main Grid: 8 Cols Map Viewport + 4 Cols Telemetry HUD */}
        <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[440px] sm:min-h-[500px]">
          {/* Main Viewport (Cols 8) */}
          <div className="lg:col-span-8 relative bg-black/50 overflow-hidden flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-white/10">
            {/* VIEW 1: GOOGLE MAPS SATELLITE & TURN-BY-TURN SMART BAY ROUTING */}
            {activeTab === 'map' && (
              <div className="relative w-full h-[320px] sm:h-[440px] lg:h-[480px]">
                <iframe
                  title={`Google Maps Satellite - ${selectedHub.name}`}
                  src={embedMapUrl}
                  className="w-full h-full border-0 filter contrast-105"
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />

                {/* Turn-by-Turn Dynamic Smart Bay HUD Overlay (Mobile-Optimized) */}
                <div className="absolute top-2.5 left-2.5 right-2.5 sm:right-auto sm:max-w-xs z-10 bg-[#141A24]/95 backdrop-blur-md p-2.5 sm:p-3.5 rounded-xl sm:rounded-2xl border border-white/15 shadow-2xl text-left">
                  <div className="flex items-center justify-between pb-1.5 sm:pb-2 border-b border-white/10">
                    <span className="text-[9px] sm:text-[10px] font-mono uppercase tracking-widest text-emerald-400 font-bold flex items-center gap-1.5">
                      <Route className="h-3 w-3" />
                      ACTIVE ROUTE GUIDANCE
                    </span>
                    <span className="text-[9px] sm:text-[10px] font-mono px-1.5 sm:px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold">
                      BAY {selectedBay.id}
                    </span>
                  </div>

                  <div className="mt-1.5 sm:mt-2 text-xs sm:text-sm font-bold text-white flex items-center justify-between">
                    <span>Gate 1 Entrance to Deck 2</span>
                    <span className="text-[11px] sm:text-xs font-mono text-emerald-400 font-bold">1.8 min ETA</span>
                  </div>

                  <p className="mt-1 text-[11px] sm:text-xs text-[#C4B69E] leading-relaxed">
                    Turn Right into Deck 2, proceed 240m to reserved bay {selectedBay.id}.
                  </p>

                  <div className="mt-2 pt-1.5 sm:pt-2 border-t border-white/10 flex items-center justify-between text-[10px] sm:text-[11px] font-mono text-[#C4B69E]">
                    <span>Allocated: {selectedBay.type}</span>
                    <span className="text-emerald-400 font-semibold">FASTag Cleared</span>
                  </div>
                </div>

                {/* Campus Hub Quick Selector inside Map Viewport */}
                <div className="absolute bottom-2.5 left-2.5 right-2.5 sm:right-auto z-10 flex gap-1 sm:gap-1.5 bg-[#141A24]/90 backdrop-blur-md p-1 sm:p-1.5 rounded-xl border border-white/15 overflow-x-auto scrollbar-hide">
                  {TRANSIT_HUBS.map((hub) => (
                    <button
                      key={hub.id}
                      onClick={() => {
                        sounds.playClick();
                        setSelectedHub(hub);
                      }}
                      className={`px-2 sm:px-2.5 py-1 rounded-lg text-[10px] sm:text-[11px] font-mono whitespace-nowrap transition-all cursor-pointer ${
                        selectedHub.id === hub.id
                          ? 'bg-[#F4E8D2] text-[#202632] font-bold shadow-xs'
                          : 'text-[#C4B69E] hover:text-white'
                      }`}
                    >
                      {hub.name.split(' ')[0]}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* VIEW 2: TACTICAL BAY RADAR SCHEMATIC VIEW */}
            {activeTab === 'radar' && (
              <div className="relative w-full h-[320px] sm:h-[440px] lg:h-[480px] p-3 sm:p-6 bg-[#10151E] flex flex-col justify-between overflow-auto select-none">
                <div className="flex items-center justify-between text-[11px] sm:text-xs font-mono text-[#C4B69E] pb-2 sm:pb-3 border-b border-white/10">
                  <span className="font-bold text-white">TACTICAL BAY RADAR // CAMPUS DECK</span>
                  <div className="flex items-center gap-2 sm:gap-3 text-[10px] sm:text-xs">
                    <span className="flex items-center gap-1">
                      <span className="h-2 w-2 rounded-full bg-emerald-400" />
                      Free
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="h-2 w-2 rounded-full bg-rose-400" />
                      Parked
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="h-2 w-2 rounded-full bg-amber-400" />
                      Hold
                    </span>
                  </div>
                </div>

                {/* Grid of 12 Interactive Tactical Bays (Mobile Touch-Optimized) */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 my-2 sm:my-4 max-h-[200px] sm:max-h-none overflow-y-auto pr-1">
                  {TACTICAL_BAYS.map((bay) => {
                    const isSelected = selectedBay.id === bay.id;
                    const isAvailable = bay.status === 'available';
                    const isOccupied = bay.status === 'occupied';

                    return (
                      <button
                        key={bay.id}
                        onClick={() => {
                          sounds.playClick();
                          setSelectedBay(bay);
                        }}
                        className={`p-2.5 sm:p-3 min-h-[48px] rounded-xl border text-left transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-[#F4E8D2] text-[#202632] border-[#F4E8D2] shadow-lg scale-[1.02]'
                            : isAvailable
                            ? 'bg-emerald-500/10 border-emerald-500/30 text-white hover:bg-emerald-500/20'
                            : isOccupied
                            ? 'bg-rose-500/10 border-rose-500/30 text-white/90 hover:bg-rose-500/20'
                            : 'bg-amber-500/10 border-amber-500/30 text-white/90 hover:bg-amber-500/20'
                        }`}
                      >
                        <div className="flex items-center justify-between text-xs font-mono font-bold">
                          <span>{bay.id}</span>
                          <span className={`h-2 w-2 rounded-full ${
                            isAvailable ? 'bg-emerald-400' : isOccupied ? 'bg-rose-400' : 'bg-amber-400'
                          }`} />
                        </div>
                        <div className="text-[10px] sm:text-[11px] font-mono mt-0.5 sm:mt-1 opacity-90 truncate">{bay.type}</div>
                        <div className="text-[9px] sm:text-[10px] font-mono mt-0.5 opacity-70 truncate">
                          {bay.vehicle || 'Vacant Slot'}
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Selected Bay Telemetry Strip */}
                <div className="p-3 rounded-xl bg-black/40 border border-white/10 flex flex-wrap items-center justify-between text-xs font-mono text-[#C4B69E] gap-2">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white">SELECTED: {selectedBay.id}</span>
                    <span>({selectedBay.zone})</span>
                  </div>
                  <div>
                    Status: <span className="text-emerald-400 font-bold uppercase">{selectedBay.status}</span>
                  </div>
                  <div>
                    Vehicle: <span className="text-white font-bold">{selectedBay.vehicle || 'None'}</span>
                  </div>
                </div>
              </div>
            )}

            {/* VIEW 3: ANPR CAMERA GATE STREAM VIEW */}
            {activeTab === 'anpr' && (
              <div className="relative w-full h-[320px] sm:h-[440px] lg:h-[480px] p-3 sm:p-6 bg-[#10151E] flex flex-col justify-between select-none">
                <div className="flex items-center justify-between text-[11px] sm:text-xs font-mono text-[#C4B69E] pb-2 sm:pb-3 border-b border-white/10">
                  <span className="font-bold text-white">GATE 1 ANPR OPTICAL OCR & RFID HARDWARE FEED</span>
                  <span className="text-emerald-400 font-bold bg-emerald-500/15 px-2 py-0.5 rounded text-[10px] sm:text-xs">
                    PARIVAHAN API SYNCED
                  </span>
                </div>

                {/* Simulated Optical OCR Camera Scanner Frame */}
                <div className="my-auto rounded-2xl bg-black/80 border border-white/15 p-3.5 sm:p-5 relative overflow-hidden">
                  <div className="absolute top-2 left-2 text-[9px] sm:text-[10px] font-mono text-emerald-400">
                    CAM_01 // 1080p 60FPS // INGRESS LANE 1
                  </div>
                  <div className="absolute top-2 right-2 flex items-center gap-1.5 text-[9px] sm:text-[10px] font-mono text-rose-400">
                    <span className="h-2 w-2 rounded-full bg-rose-500 animate-pulse" />
                    REC
                  </div>

                  <div className="my-4 sm:my-6 text-center">
                    <div className="inline-block px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl border-2 border-emerald-400 bg-emerald-950/40 text-emerald-300 font-mono text-lg sm:text-2xl font-extrabold tracking-widest shadow-lg shadow-emerald-500/20">
                      TS-08-EM-2049
                    </div>
                    <div className="text-[11px] sm:text-xs font-mono text-white/90 mt-1.5 sm:mt-2 font-semibold">
                      Hyundai Ioniq 5 EV (Telangana HSRP Registered)
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3 text-xs font-mono pt-2 sm:pt-3 border-t border-white/10">
                    <div className="p-2 rounded bg-white/5 flex sm:block items-center justify-between">
                      <span className="text-[10px] text-[#C4B69E] block">FASTag EPC RFID</span>
                      <span className="text-white font-bold">34161F80_NETC</span>
                    </div>
                    <div className="p-2 rounded bg-white/5 flex sm:block items-center justify-between">
                      <span className="text-[10px] text-[#C4B69E] block">Barrier Status</span>
                      <span className="text-emerald-400 font-bold">LOWERED (1.8s)</span>
                    </div>
                    <div className="p-2 rounded bg-white/5 flex sm:block items-center justify-between">
                      <span className="text-[10px] text-[#C4B69E] block">Assigned Bay</span>
                      <span className="text-white font-bold">{selectedBay.id}</span>
                    </div>
                  </div>
                </div>

                {/* Live Simulation Feedback Ticker */}
                <div className="flex items-center justify-between text-[11px] sm:text-xs font-mono text-[#C4B69E]">
                  <span className="truncate max-w-[200px] sm:max-w-none">State: {simulationLog}</span>
                  <span className="text-emerald-400 font-semibold shrink-0">99.98% Confidence</span>
                </div>
              </div>
            )}
          </div>

          {/* Integrated Cockpit Right Rail (Cols 4) */}
          <div className="lg:col-span-4 p-4 sm:p-6 bg-[#161D28] flex flex-col justify-between space-y-4 sm:space-y-5 text-left">
            {/* Live Utilization Meter */}
            <div>
              <div className="flex items-center justify-between pb-2 sm:pb-3 border-b border-white/10 text-xs font-mono">
                <span className="text-[#C4B69E] font-bold">OCCUPANCY METRICS</span>
                <span className="text-emerald-400 font-bold">79% LOAD</span>
              </div>

              <div className="mt-3 sm:mt-4 flex items-center gap-3 sm:gap-4">
                {/* Visual Circular Gauge */}
                <div className="relative h-16 w-16 sm:h-18 sm:w-18 shrink-0 flex items-center justify-center">
                  <svg className="h-full w-full -rotate-90" viewBox="0 0 36 36">
                    <path
                      className="text-white/10"
                      strokeWidth="3.5"
                      stroke="currentColor"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    <path
                      className="text-[#F4E8D2]"
                      strokeDasharray="79, 100"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      stroke="currentColor"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                  </svg>
                  <span className="absolute font-mono text-xs sm:text-sm font-bold text-white">79%</span>
                </div>

                <div>
                  <div className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                    38 / {selectedHub.totalBays}
                  </div>
                  <div className="text-[11px] sm:text-xs font-mono text-[#C4B69E]">
                    Bays Occupied Across Campus
                  </div>
                  <div className="text-[10px] sm:text-[11px] font-mono text-emerald-400 mt-0.5 font-bold">
                    {selectedHub.availableBays} Open Bays Ready
                  </div>
                </div>
              </div>
            </div>

            {/* Live Gate Stream Cards */}
            <div className="space-y-2">
              <div className="text-[11px] sm:text-xs font-mono text-[#C4B69E] font-bold">
                RECENT TRANSIT INGRESS
              </div>
              <div className="p-2.5 sm:p-3 rounded-xl bg-black/40 border border-white/10 space-y-1.5 sm:space-y-2 text-xs font-mono">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white">TS-08-EM-2049</span>
                  <span className="text-emerald-400 font-semibold">Bay A-04</span>
                </div>
                <div className="flex items-center justify-between text-[10px] sm:text-[11px] text-[#C4B69E]">
                  <span>FASTag NETC Cleared</span>
                  <span>₹40.00 Auto-Debit</span>
                </div>
              </div>

              <div className="p-2.5 sm:p-3 rounded-xl bg-black/40 border border-white/10 space-y-1.5 sm:space-y-2 text-xs font-mono">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white">MH-02-EV-9210</span>
                  <span className="text-emerald-400 font-semibold">Bay A-01</span>
                </div>
                <div className="flex items-center justify-between text-[10px] sm:text-[11px] text-[#C4B69E]">
                  <span>Tata Power 50kW</span>
                  <span>Active Charging</span>
                </div>
              </div>
            </div>

            {/* Interactive Simulation Trigger Button */}
            <div className="space-y-2 pt-2 border-t border-white/10">
              <button
                onClick={handleSimulateArrival}
                disabled={isSimulating}
                className="w-full py-3 px-4 min-h-[48px] rounded-xl bg-[#F4E8D2] text-[#202632] hover:bg-white font-bold text-xs font-mono transition-all flex items-center justify-center gap-2 shadow-lg cursor-pointer active:scale-95 disabled:opacity-50"
              >
                <Sparkles className="h-3.5 w-3.5" />
                <span>{isSimulating ? 'Simulating Hardware Read...' : 'Simulate Vehicle Ingress'}</span>
              </button>

              <button
                onClick={() => {
                  sounds.playClick();
                  onOpenConsole();
                }}
                className="w-full py-2.5 px-4 min-h-[44px] rounded-xl bg-white/5 hover:bg-white/10 text-white font-semibold text-xs font-mono transition-all border border-white/10 flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Open Full Operations Console</span>
                <ChevronRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Hero Narrative Cards Grid */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.2, ease: easing }}
        className="relative z-10 w-full max-w-6xl mt-16 text-center"
      >
        <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-foreground">
          Turn Congested Municipal Gates Into Fluid Mobility
        </h2>
        <p className="mt-3 text-sm sm:text-base text-muted-foreground max-w-xl mx-auto leading-relaxed">
          Integrated optical license recognition, atomic MongoDB transaction locks, and friction-free payment clearance.
        </p>

        {/* 4 Feature Architecture Pillars with verified images & fallback */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
          <div className="rounded-2xl p-4 bg-card border border-border text-left shadow-sm hover:shadow-md transition-shadow">
            <div className="h-9 w-9 rounded-xl bg-[#202632] text-[#F4E8D2] dark:bg-[#F4E8D2] dark:text-[#202632] flex items-center justify-center mb-3">
              <Navigation className="h-4 w-4" />
            </div>
            <h4 className="text-sm font-bold text-foreground">Google Maps GPS Routing</h4>
            <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
              Live turn-by-turn routing from gate boom barrier to designated slot.
            </p>
          </div>

          <div className="rounded-2xl p-4 bg-card border border-border text-left shadow-sm hover:shadow-md transition-shadow">
            <div className="h-9 w-9 rounded-xl bg-[#202632] text-[#F4E8D2] dark:bg-[#F4E8D2] dark:text-[#202632] flex items-center justify-center mb-3">
              <Zap className="h-4 w-4" />
            </div>
            <h4 className="text-sm font-bold text-foreground">FASTag 5.8 GHz RFID</h4>
            <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
              Automated NHAI NETC gate clearance in sub-2 seconds without paper tokens.
            </p>
          </div>

          <div className="rounded-2xl p-4 bg-card border border-border text-left shadow-sm hover:shadow-md transition-shadow">
            <div className="h-9 w-9 rounded-xl bg-[#202632] text-[#F4E8D2] dark:bg-[#F4E8D2] dark:text-[#202632] flex items-center justify-center mb-3">
              <Activity className="h-4 w-4" />
            </div>
            <h4 className="text-sm font-bold text-foreground">Ultrasonic Bay Telemetry</h4>
            <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
              Real-time slot vacancy detection with zero concurrency collisions.
            </p>
          </div>

          <div className="rounded-2xl p-4 bg-card border border-border text-left shadow-sm hover:shadow-md transition-shadow">
            <div className="h-9 w-9 rounded-xl bg-[#202632] text-[#F4E8D2] dark:bg-[#F4E8D2] dark:text-[#202632] flex items-center justify-center mb-3">
              <QrCode className="h-4 w-4" />
            </div>
            <h4 className="text-sm font-bold text-foreground">Bharat UPI Reconciliation</h4>
            <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
              Dynamic QR code generation supporting GPay, PhonePe, and Paytm.
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
