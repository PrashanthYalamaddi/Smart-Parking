import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MapPin,
  Navigation,
  Compass,
  Layers,
  Car,
  Zap,
  Shield,
  Search,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  Clock,
  BatteryCharging,
  Maximize2,
  ChevronRight,
  Radio,
  Sliders,
  LocateFixed,
  Route,
  Building2,
  Fuel
} from 'lucide-react';
import { sounds } from '../utils/audio';

const easing = [0.16, 1, 0.3, 1];

// Transit Hubs & Campus Coordinates
const HUBS = [
  {
    id: 'mrtc-hyd',
    name: 'Malla Reddy Vishwavidyapeeth',
    location: 'Technical Campus, Hyderabad, Telangana 500100',
    lat: 17.5558,
    lng: 78.4348,
    baysTotal: 48,
    baysAvailable: 10,
    zones: 4,
    gateStatus: 'FASTag 5.8 GHz Active',
    isPrimary: true
  },
  {
    id: 'hitec-hyd',
    name: 'Hitec City Smart Mobility Hub',
    location: 'Cyber Gateway, Madhapur, Hyderabad 500081',
    lat: 17.4435,
    lng: 78.3772,
    baysTotal: 120,
    baysAvailable: 28,
    zones: 6,
    gateStatus: 'RFID & ANPR Active',
    isPrimary: false
  },
  {
    id: 'bkc-mum',
    name: 'Mumbai BKC EV Fast Charging Deck',
    location: 'G Block, Bandra Kurla Complex, Mumbai 400051',
    lat: 19.0657,
    lng: 72.8687,
    baysTotal: 64,
    baysAvailable: 14,
    zones: 4,
    gateStatus: 'Dual Barrier Online',
    isPrimary: false
  },
  {
    id: 'indira-blr',
    name: 'Bengaluru Indiranagar Metro Deck',
    location: '100ft Road, Indiranagar, Bengaluru 560038',
    lat: 12.9784,
    lng: 77.6408,
    baysTotal: 80,
    baysAvailable: 18,
    zones: 5,
    gateStatus: 'NETC FASTag Online',
    isPrimary: false
  },
  {
    id: 'shiva-pune',
    name: 'Pune Shivaji Nagar Central Hub',
    location: 'FC Road Junction, Shivaji Nagar, Pune 411005',
    lat: 18.5308,
    lng: 73.8475,
    baysTotal: 56,
    baysAvailable: 12,
    zones: 4,
    gateStatus: 'Automated Gate Active',
    isPrimary: false
  },
  {
    id: 'cp-delhi',
    name: 'Delhi Connaught Place Rapid Transit',
    location: 'Inner Circle, Block C, New Delhi 110001',
    lat: 28.6315,
    lng: 77.2167,
    baysTotal: 72,
    baysAvailable: 16,
    zones: 4,
    gateStatus: 'FASTag & UPI Active',
    isPrimary: false
  }
];

// 48 Campus Bays Data with 2D Schematic Coordinates
const CAMPUS_BAYS = Array.from({ length: 48 }, (_, i) => {
  const num = i + 1;
  const isZoneA = num <= 12;
  const isZoneB = num > 12 && num <= 24;
  const isZoneC = num > 24 && num <= 36;
  const isZoneD = num > 36;

  let zone = 'Zone A (EV Fast Hub)';
  let type = 'EV Fast Charge (50kW)';
  let rate = 50;
  let powerKW = 50;

  if (isZoneB) {
    zone = 'Zone B (Sedan Deck)';
    type = 'Standard Sedan';
    rate = 30;
    powerKW = null;
  } else if (isZoneC) {
    zone = 'Zone C (SUV Transit)';
    type = 'SUV Large Bay';
    rate = 40;
    powerKW = null;
  } else if (isZoneD) {
    zone = 'Zone D (Rapid / Accessible)';
    type = num % 2 === 0 ? 'Accessible Bay' : 'Rapid Bay (30m)';
    rate = 20;
    powerKW = null;
  }

  // Pre-configured occupancy matching website telemetry
  const occupiedSet = new Set([
    1, 2, 4, 5, 6, 8, 9, 10, 11, 12, 13, 15, 16, 18, 19, 20, 21, 23, 24, 25,
    26, 28, 29, 30, 31, 32, 34, 35, 36, 37, 39, 40, 41, 42, 44, 45, 46, 47
  ]);
  const isIngress = num === 14;
  const isOccupied = occupiedSet.has(num);
  const status = isIngress ? 'ingress' : isOccupied ? 'occupied' : 'available';

  // 2D grid coordinates for schematic map
  const row = Math.floor(i / 12);
  const col = i % 12;
  const x = 70 + col * 74;
  const y = 90 + row * 92;

  return {
    id: `BAY-${num < 10 ? '0' + num : num}`,
    number: num,
    zone,
    type,
    rate,
    powerKW,
    status,
    x,
    y,
    walkingDist: `${28 + (num % 8) * 4}m`,
    destBlock: num <= 24 ? 'Main Academic Block' : 'Engineering Block B'
  };
});

export default function ParkingMap() {
  const [selectedHub, setSelectedHub] = useState(HUBS[0]);
  const [viewMode, setViewMode] = useState('radar'); // 'radar' | 'google' | 'route'
  const [filterType, setFilterType] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBay, setSelectedBay] = useState(CAMPUS_BAYS[13]); // Default Bay 14 (Active Ingress)
  const [isNavigating, setIsNavigating] = useState(true);

  // Filtered bays for schematic view
  const filteredBays = useMemo(() => {
    return CAMPUS_BAYS.filter((b) => {
      const matchType =
        filterType === 'ALL' ||
        (filterType === 'EV' && b.type.includes('EV')) ||
        (filterType === 'SEDAN' && b.type.includes('Sedan')) ||
        (filterType === 'SUV' && b.type.includes('SUV')) ||
        (filterType === 'ACCESSIBLE' && b.type.includes('Accessible'));

      const matchSearch =
        !searchQuery ||
        b.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.zone.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.type.toLowerCase().includes(searchQuery.toLowerCase());

      return matchType && matchSearch;
    });
  }, [filterType, searchQuery]);

  // Google Maps Deep-link for live GPS navigation
  const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${selectedHub.lat},${selectedHub.lng}&travelmode=driving`;
  const googleMapsSearchUrl = `https://www.google.com/maps/search/?api=1&query=${selectedHub.lat},${selectedHub.lng}`;

  // Embedded Google Map interactive URL with satellite/hybrid mode
  const embedMapUrl = `https://maps.google.com/maps?q=${selectedHub.lat},${selectedHub.lng}&t=m&z=17&ie=UTF8&iwloc=&output=embed`;

  return (
    <section id="geospatial-map" className="relative py-20 px-4 sm:px-6 lg:px-8 bg-background border-t border-border">
      <div className="max-w-7xl mx-auto">
        {/* SECTION HEADER */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase mb-3 bg-[#202632]/10 dark:bg-[#F4E8D2]/10 border border-[#202632]/20 dark:border-[#F4E8D2]/20 text-[#202632] dark:text-[#F4E8D2]">
              <Compass className="w-3.5 h-3.5 text-[#202632] dark:text-[#F4E8D2] animate-spin-slow" />
              <span>GEOSPATIAL FLEET & CAMPUS NAVIGATION</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#202632] dark:text-[#F4E8D2]">
              Google Maps Telemetry & Smart Bay Routing
            </h2>
            <p className="mt-3 text-base sm:text-lg text-[#545E70] dark:text-[#C4B69E] leading-relaxed">
              Explore satellite positioning, live bay occupancy radar, and turnkey GPS guidance for
              <strong className="text-[#202632] dark:text-[#F4E8D2] font-semibold"> Malla Reddy Vishwavidyapeeth Campus</strong> and regional transit corridors.
            </p>
          </div>

          {/* QUICK TELEMETRY PILL */}
          <div className="flex items-center gap-3 self-start md:self-end">
            <a
              href={googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-xs sm:text-sm bg-[#202632] text-[#F4E8D2] hover:bg-[#151A24] dark:bg-[#F4E8D2] dark:text-[#202632] dark:hover:bg-[#E8D9BD] transition-all shadow-sm active:scale-95"
            >
              <Navigation className="w-4 h-4" />
              <span>Launch Google Maps GPS</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-80" />
            </a>
          </div>
        </div>

        {/* HUB SELECTOR TABS */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 scrollbar-hide">
          {HUBS.map((hub) => {
            const isSelected = selectedHub.id === hub.id;
            return (
              <button
                key={hub.id}
                onClick={() => {
                  sounds.playClick();
                  setSelectedHub(hub);
                }}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all border ${
                  isSelected
                    ? 'bg-[#202632] text-[#F4E8D2] border-[#202632] dark:bg-[#F4E8D2] dark:text-[#202632] dark:border-[#F4E8D2] shadow-sm'
                    : 'bg-card text-foreground border-border hover:border-[#202632]/40 dark:hover:border-[#F4E8D2]/40'
                }`}
              >
                <MapPin className={`w-3.5 h-3.5 ${isSelected ? 'text-[#F4E8D2] dark:text-[#202632]' : 'text-muted-foreground'}`} />
                <span>{hub.name}</span>
                {hub.isPrimary && (
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-sm font-bold uppercase ${
                    isSelected ? 'bg-[#F4E8D2]/20 dark:bg-[#202632]/20' : 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                  }`}>
                    Testbed
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* MAIN MAP CONTAINER */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-card border border-border rounded-2xl p-4 sm:p-6 shadow-sm overflow-hidden">
          {/* MAP CANVAS COLUMN (8 COLS) */}
          <div className="lg:col-span-8 flex flex-col gap-4">
            {/* VIEW MODE TOOLBAR */}
            <div className="flex flex-wrap items-center justify-between gap-2 sm:gap-3 bg-muted/50 p-2 sm:p-2.5 rounded-xl border border-border">
              {/* Left View Mode Toggles */}
              <div className="flex items-center gap-1 sm:gap-1.5 overflow-x-auto scrollbar-hide max-w-full">
                <button
                  onClick={() => {
                    sounds.playClick();
                    setViewMode('radar');
                  }}
                  className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-semibold transition-all shrink-0 cursor-pointer ${
                    viewMode === 'radar'
                      ? 'bg-[#202632] text-[#F4E8D2] dark:bg-[#F4E8D2] dark:text-[#202632] shadow-xs'
                      : 'text-foreground hover:bg-muted'
                  }`}
                >
                  <Radio className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Tactical Bay Radar</span>
                  <span className="sm:hidden">Radar</span>
                </button>

                <button
                  onClick={() => {
                    sounds.playClick();
                    setViewMode('google');
                  }}
                  className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-semibold transition-all shrink-0 cursor-pointer ${
                    viewMode === 'google'
                      ? 'bg-[#202632] text-[#F4E8D2] dark:bg-[#F4E8D2] dark:text-[#202632] shadow-xs'
                      : 'text-foreground hover:bg-muted'
                  }`}
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Google Interactive Map</span>
                  <span className="sm:hidden">Google Map</span>
                </button>

                <button
                  onClick={() => {
                    sounds.playClick();
                    setViewMode('route');
                  }}
                  className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-semibold transition-all shrink-0 cursor-pointer ${
                    viewMode === 'route'
                      ? 'bg-[#202632] text-[#F4E8D2] dark:bg-[#F4E8D2] dark:text-[#202632] shadow-xs'
                      : 'text-foreground hover:bg-muted'
                  }`}
                >
                  <Route className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Gate Navigation Path</span>
                  <span className="sm:hidden">Route</span>
                </button>
              </div>

              {/* Status Indicator */}
              <div className="flex items-center gap-2 text-xs text-muted-foreground font-mono">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>{selectedHub.lat.toFixed(4)}° N, {selectedHub.lng.toFixed(4)}° E</span>
              </div>
            </div>

            {/* MAP VIEWPORT */}
            <div className="relative w-full h-[460px] sm:h-[520px] rounded-xl overflow-hidden border border-border bg-[#202632]">
              {/* 1. GOOGLE INTERACTIVE EMBED VIEW */}
              {viewMode === 'google' && (
                <div className="relative w-full h-full">
                  <iframe
                    title={`Google Map - ${selectedHub.name}`}
                    src={embedMapUrl}
                    className="w-full h-full border-0 filter contrast-105"
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                  {/* Top Floating Badge */}
                  <div className="absolute top-3 left-3 z-10 bg-[#202632]/90 backdrop-blur-md text-[#F4E8D2] px-3.5 py-2 rounded-lg border border-[#F4E8D2]/20 shadow-md text-xs">
                    <p className="font-bold flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                      <span>{selectedHub.name}</span>
                    </p>
                    <p className="text-[11px] text-[#C4B69E] mt-0.5">{selectedHub.location}</p>
                  </div>
                </div>
              )}

              {/* 2. TACTICAL BAY RADAR SCHEMATIC VIEW */}
              {(viewMode === 'radar' || viewMode === 'route') && (
                <div className="relative w-full h-full bg-[#181E29] overflow-auto p-4 select-none">
                  {/* SVG Map Canvas */}
                  <svg
                    viewBox="0 0 1000 500"
                    className="w-full h-full min-w-[700px] min-h-[420px]"
                    style={{ fontFeatureSettings: '"tnum"' }}
                  >
                    {/* Background Grid Pattern */}
                    <defs>
                      <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#2D3748" strokeWidth="0.6" strokeOpacity="0.4" />
                      </pattern>
                      <linearGradient id="routeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.9" />
                        <stop offset="100%" stopColor="#F4E8D2" stopOpacity="0.9" />
                      </linearGradient>
                    </defs>

                    <rect width="1000" height="500" fill="url(#grid)" />

                    {/* Perimeter Campus Fence & Roadways */}
                    <rect x="20" y="20" width="960" height="460" rx="12" fill="none" stroke="#384458" strokeWidth="2" strokeDasharray="6 4" />

                    {/* Entrance Gate 01 */}
                    <g transform="translate(40, 210)">
                      <rect x="0" y="0" width="100" height="70" rx="8" fill="#202632" stroke="#F4E8D2" strokeWidth="1.5" />
                      <text x="50" y="26" textAnchor="middle" fill="#F4E8D2" fontSize="10" fontWeight="bold">GATE 01 INGRESS</text>
                      <text x="50" y="44" textAnchor="middle" fill="#34D399" fontSize="8" fontFamily="monospace">RFID 5.8 GHz</text>
                      <text x="50" y="58" textAnchor="middle" fill="#C4B69E" fontSize="8">Barrier Lift 1.8s</text>
                    </g>

                    {/* Central Internal Circulation Avenues */}
                    <path d="M 140 245 L 940 245" stroke="#334155" strokeWidth="18" strokeLinecap="round" />
                    <path d="M 140 245 L 940 245" stroke="#F4E8D2" strokeWidth="1.5" strokeDasharray="8 8" strokeOpacity="0.5" />

                    {/* Destination Academic Block Footprints */}
                    <g transform="translate(180, 30)">
                      <rect x="0" y="0" width="220" height="40" rx="6" fill="#202632" stroke="#475569" strokeWidth="1" />
                      <text x="110" y="24" textAnchor="middle" fill="#F4E8D2" fontSize="9" fontWeight="bold">MAIN ACADEMIC BLOCK</text>
                    </g>
                    <g transform="translate(560, 30)">
                      <rect x="0" y="0" width="240" height="40" rx="6" fill="#202632" stroke="#475569" strokeWidth="1" />
                      <text x="120" y="24" textAnchor="middle" fill="#F4E8D2" fontSize="9" fontWeight="bold">ENGINEERING & AUDITORIUM BLOCK</text>
                    </g>

                    {/* Dynamic Walking / Ingress Route Polyline */}
                    {viewMode === 'route' && selectedBay && (
                      <g>
                        <path
                          d={`M 140 245 L 280 245 L 280 ${selectedBay.y + 24} L ${selectedBay.x + 30} ${selectedBay.y + 24}`}
                          fill="none"
                          stroke="url(#routeGradient)"
                          strokeWidth="4"
                          strokeLinecap="round"
                          strokeDasharray="6 4"
                          className="animate-pulse"
                        />
                        {/* Vehicle Marker at Ingress */}
                        <circle cx="140" cy="245" r="8" fill="#38BDF8" stroke="#FFFFFF" strokeWidth="2" />
                        <text x="140" y="270" textAnchor="middle" fill="#38BDF8" fontSize="8" fontWeight="bold">TS08-EP-2024</text>

                        {/* Walking Flag at Destination */}
                        <circle cx={selectedBay.x + 30} cy={selectedBay.y + 24} r="6" fill="#F4E8D2" stroke="#202632" strokeWidth="2" />
                      </g>
                    )}

                    {/* Render 48 Parking Bays */}
                    {filteredBays.map((bay) => {
                      const isSelected = selectedBay?.id === bay.id;
                      let fillCol = '#065F46'; // Available (Dark Emerald)
                      let strokeCol = '#10B981';
                      let statusLabel = 'FREE';

                      if (bay.status === 'ingress') {
                        fillCol = '#0284C7'; // Ingress Blue
                        strokeCol = '#38BDF8';
                        statusLabel = 'IN';
                      } else if (bay.status === 'occupied') {
                        fillCol = '#881337'; // Occupied Red
                        strokeCol = '#F43F5E';
                        statusLabel = 'OCC';
                      }

                      if (isSelected) {
                        strokeCol = '#F4E8D2';
                      }

                      return (
                        <g
                          key={bay.id}
                          transform={`translate(${bay.x}, ${bay.y})`}
                          onClick={() => {
                            sounds.playClick();
                            setSelectedBay(bay);
                          }}
                          className="cursor-pointer transition-transform hover:scale-105"
                        >
                          {/* Bay Box */}
                          <rect
                            x="0"
                            y="0"
                            width="64"
                            height="48"
                            rx="6"
                            fill={fillCol}
                            stroke={strokeCol}
                            strokeWidth={isSelected ? '2.5' : '1.2'}
                            fillOpacity={isSelected ? '1' : '0.85'}
                          />

                          {/* Bay ID Label */}
                          <text x="32" y="20" textAnchor="middle" fill="#FFFFFF" fontSize="9" fontWeight="bold" fontFamily="monospace">
                            {bay.id.replace('BAY-', 'B')}
                          </text>

                          {/* Status Badge */}
                          <text x="32" y="38" textAnchor="middle" fill="#F4E8D2" fontSize="8" fontWeight="bold">
                            {bay.type.includes('EV') ? '⚡ EV' : statusLabel}
                          </text>

                          {/* Active Ring on Selected */}
                          {isSelected && (
                            <circle cx="32" cy="-6" r="4" fill="#F4E8D2" className="animate-ping" />
                          )}
                        </g>
                      );
                    })}
                  </svg>

                  {/* Tactical Map Overlay Legend */}
                  <div className="absolute bottom-3 left-3 bg-[#202632]/90 backdrop-blur-md px-3 py-2 rounded-lg border border-[#384458] flex items-center gap-3 text-[11px] text-[#F4E8D2]">
                    <span className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-sm bg-emerald-500" /> Free ({selectedHub.baysAvailable})
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-sm bg-rose-500" /> Occupied (38)
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-sm bg-sky-500" /> Active Ingress (Bay 14)
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* QUICK STATS FOOTER BAR */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="bg-muted/40 border border-border p-3 rounded-xl">
                <p className="text-xs text-muted-foreground uppercase font-semibold">Managed Bays</p>
                <p className="text-xl font-bold text-[#202632] dark:text-[#F4E8D2] mt-0.5">{selectedHub.baysTotal} Bays</p>
              </div>
              <div className="bg-muted/40 border border-border p-3 rounded-xl">
                <p className="text-xs text-muted-foreground uppercase font-semibold">Vacant Stalls</p>
                <p className="text-xl font-bold text-emerald-600 dark:text-emerald-400 mt-0.5">{selectedHub.baysAvailable} Open</p>
              </div>
              <div className="bg-muted/40 border border-border p-3 rounded-xl">
                <p className="text-xs text-muted-foreground uppercase font-semibold">Avg Walking Dist</p>
                <p className="text-xl font-bold text-[#202632] dark:text-[#F4E8D2] mt-0.5">38 Meters</p>
              </div>
              <div className="bg-muted/40 border border-border p-3 rounded-xl">
                <p className="text-xs text-muted-foreground uppercase font-semibold">Ingress Gate Speed</p>
                <p className="text-xl font-bold text-sky-600 dark:text-sky-400 mt-0.5">1.8 Seconds</p>
              </div>
            </div>
          </div>

          {/* INSPECTION SIDEBAR (4 COLS) */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            {/* SEARCH & FILTER */}
            <div className="bg-muted/30 border border-border p-4 rounded-xl flex flex-col gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-2.5 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search stall (e.g. B-14, EV)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 bg-background border border-border rounded-lg text-xs font-medium text-foreground focus:outline-hidden focus:ring-1 focus:ring-accent"
                />
              </div>

              {/* Filter Chips */}
              <div className="flex flex-wrap gap-1.5">
                {[
                  { id: 'ALL', label: 'All' },
                  { id: 'EV', label: '⚡ EV 50kW' },
                  { id: 'SEDAN', label: 'Sedans' },
                  { id: 'SUV', label: 'SUVs' },
                  { id: 'ACCESSIBLE', label: 'Accessible' }
                ].map((chip) => (
                  <button
                    key={chip.id}
                    onClick={() => {
                      sounds.playClick();
                      setFilterType(chip.id);
                    }}
                    className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-all ${
                      filterType === chip.id
                        ? 'bg-[#202632] text-[#F4E8D2] dark:bg-[#F4E8D2] dark:text-[#202632]'
                        : 'bg-muted text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    {chip.label}
                  </button>
                ))}
              </div>
            </div>

            {/* SELECTED BAY INSPECTOR CARD */}
            {selectedBay ? (
              <motion.div
                key={selectedBay.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-card border-2 border-[#202632] dark:border-[#F4E8D2] p-5 rounded-xl shadow-xs flex-1 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between border-b border-border pb-3 mb-4">
                    <div>
                      <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                        SELECTED BAY TELEMETRY
                      </span>
                      <h3 className="text-2xl font-black text-[#202632] dark:text-[#F4E8D2]">
                        {selectedBay.id}
                      </h3>
                    </div>
                    <span className={`px-2.5 py-1 rounded-full text-xs font-bold uppercase ${
                      selectedBay.status === 'available'
                        ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30'
                        : selectedBay.status === 'ingress'
                        ? 'bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-500/30'
                        : 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/30'
                    }`}>
                      {selectedBay.status}
                    </span>
                  </div>

                  <div className="space-y-3 text-xs">
                    <div className="flex justify-between items-center py-1 border-b border-border/50">
                      <span className="text-muted-foreground flex items-center gap-1.5">
                        <Building2 className="w-3.5 h-3.5" /> Zone Classification
                      </span>
                      <span className="font-semibold text-foreground">{selectedBay.zone}</span>
                    </div>

                    <div className="flex justify-between items-center py-1 border-b border-border/50">
                      <span className="text-muted-foreground flex items-center gap-1.5">
                        <Car className="w-3.5 h-3.5" /> Stall Type
                      </span>
                      <span className="font-semibold text-foreground">{selectedBay.type}</span>
                    </div>

                    <div className="flex justify-between items-center py-1 border-b border-border/50">
                      <span className="text-muted-foreground flex items-center gap-1.5">
                        <Fuel className="w-3.5 h-3.5" /> Hourly Tariff
                      </span>
                      <span className="font-bold text-[#202632] dark:text-[#F4E8D2]">₹{selectedBay.rate} / hour</span>
                    </div>

                    <div className="flex justify-between items-center py-1 border-b border-border/50">
                      <span className="text-muted-foreground flex items-center gap-1.5">
                        <Navigation className="w-3.5 h-3.5" /> Walking Proximity
                      </span>
                      <span className="font-semibold text-foreground">{selectedBay.walkingDist} (to {selectedBay.destBlock})</span>
                    </div>

                    {selectedBay.powerKW && (
                      <div className="flex justify-between items-center py-1 border-b border-border/50">
                        <span className="text-muted-foreground flex items-center gap-1.5">
                          <Zap className="w-3.5 h-3.5 text-amber-500" /> Charger Output
                        </span>
                        <span className="font-bold text-amber-600 dark:text-amber-400">{selectedBay.powerKW} kW DC Fast</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* ACTION BUTTONS */}
                <div className="pt-5 space-y-2.5">
                  <button
                    onClick={() => {
                      sounds.playClick();
                      setViewMode('route');
                    }}
                    className="w-full py-2.5 rounded-lg text-xs font-bold bg-[#202632] text-[#F4E8D2] dark:bg-[#F4E8D2] dark:text-[#202632] hover:opacity-90 transition-all flex items-center justify-center gap-2 shadow-xs"
                  >
                    <Route className="w-4 h-4" />
                    <span>Plot Gate Ingress Route</span>
                  </button>

                  <a
                    href={googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2 rounded-lg text-xs font-semibold bg-muted text-foreground hover:bg-muted/80 transition-all flex items-center justify-center gap-2 border border-border"
                  >
                    <ExternalLink className="w-3.5 h-3.5 text-muted-foreground" />
                    <span>Open in Google Maps Driving Navigation</span>
                  </a>
                </div>
              </motion.div>
            ) : (
              <div className="bg-muted/20 border border-dashed border-border p-6 rounded-xl text-center text-xs text-muted-foreground flex flex-col items-center justify-center flex-1">
                <MapPin className="w-8 h-8 opacity-40 mb-2" />
                <p>Click on any parking stall on the radar map to inspect live telemetry and route guidance.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
