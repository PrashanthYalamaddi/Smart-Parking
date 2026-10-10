import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Car,
  CheckCircle2,
  Clock,
  Database,
  Filter,
  Plus,
  RefreshCw,
  Search,
  Shield,
  Trash2,
  X,
  Zap,
  ArrowRight,
  Terminal,
  Activity,
  QrCode,
  Radio,
  Check,
  Building2,
  Smartphone,
  Gauge,
  Layers,
  TrendingUp,
  MapPin,
  Flame,
  ArrowUpRight
} from 'lucide-react';
import { INITIAL_SLOTS } from '../data/parkingData';
import { sounds } from '../utils/audio';

const easing = [0.16, 1, 0.3, 1];

// Indian High Security Registration Plate (HSRP) visual badge
export function IndianNumberPlate({ plate, isEV = false }) {
  if (!plate) return null;
  return (
    <div className={`inline-flex items-center rounded-md border-2 border-black/80 font-mono text-xs font-bold tracking-wider overflow-hidden shadow-xs select-none ${isEV ? 'bg-emerald-600 text-white' : 'bg-white text-black'}`}>
      <div className="bg-blue-700 text-white px-1.5 py-0.5 flex flex-col items-center justify-center text-[7px] leading-tight">
        <span>IND</span>
        <span className="text-[6px] opacity-80">🇮🇳</span>
      </div>
      <div className="px-2 py-0.5 tracking-widest uppercase">
        {plate}
      </div>
    </div>
  );
}

export default function InteractiveConsole({ isOpen, onClose, currentRole = 'admin', onRoleChange }) {
  const [slots, setSlots] = useState(INITIAL_SLOTS);
  const [selectedZone, setSelectedZone] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [activeTab, setActiveTab] = useState('slots'); // 'slots' | 'vehicles' | 'traffic' | 'backend'
  const [isCheckInModalOpen, setIsCheckInModalOpen] = useState(false);
  const [checkoutModalSlot, setCheckoutModalSlot] = useState(null);
  const [fastagNotification, setFastagNotification] = useState(null);

  // Form state for new check-in
  const [formData, setFormData] = useState({
    vehicleNumber: '',
    slotId: '',
    driverName: '',
    type: 'Standard Sedan',
    city: 'Mumbai',
    isEV: false
  });

  // REST API log history
  const [apiLogs, setApiLogs] = useState([
    { id: 1, method: 'GET', endpoint: '/api/v1/slots', status: 200, time: '10:00:12', latency: '28ms' },
    { id: 2, method: 'POST', endpoint: '/api/v1/fastag/scan', status: 200, time: '10:02:45', latency: '18ms' },
    { id: 3, method: 'POST', endpoint: '/api/v1/vehicles/checkin', status: 201, time: '10:05:18', latency: '32ms' },
    { id: 4, method: 'POST', endpoint: '/api/v1/payments/upi-checkout', status: 200, time: '10:08:40', latency: '22ms' }
  ]);

  // Filter slots
  const filteredSlots = useMemo(() => {
    return slots.filter((slot) => {
      const matchZone = selectedZone === 'ALL' || slot.zone.toLowerCase().includes(selectedZone.toLowerCase()) || slot.city.toLowerCase().includes(selectedZone.toLowerCase());
      const matchStatus = statusFilter === 'ALL' || slot.status === statusFilter;
      const matchSearch =
        !searchQuery ||
        slot.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (slot.vehicle && slot.vehicle.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (slot.driver && slot.driver.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (slot.city && slot.city.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchZone && matchStatus && matchSearch;
    });
  }, [slots, selectedZone, statusFilter, searchQuery]);

  // Real-time slot metrics
  const stats = useMemo(() => {
    const total = slots.length;
    const occupied = slots.filter((s) => s.status === 'occupied').length;
    const available = slots.filter((s) => s.status === 'available').length;
    const reserved = slots.filter((s) => s.status === 'reserved').length;
    const maintenance = slots.filter((s) => s.status === 'maintenance').length;
    const occupancyRate = Math.round((occupied / total) * 100);
    const hourlyRevenue = slots
      .filter((s) => s.status === 'occupied')
      .reduce((sum, s) => sum + s.rate, 0);
    return { total, occupied, available, reserved, maintenance, occupancyRate, hourlyRevenue };
  }, [slots]);

  // Occupied vehicles list for Vehicles Tab
  const occupiedVehicles = useMemo(() => {
    return slots.filter((s) => s.status === 'occupied' && s.vehicle);
  }, [slots]);

  // Trigger simulated FASTag scan
  const triggerFastagSimulation = () => {
    sounds.playSonar();
    const availableSlot = slots.find((s) => s.status === 'available');
    if (!availableSlot) {
      alert('All bays currently full. FASTag entry held in queue.');
      return;
    }

    const randomPlates = ['MH-12-KN-8421', 'DL-01-EQ-5509', 'KA-05-EV-1102', 'TS-09-AB-9090', 'MH-04-GH-7788'];
    const chosenPlate = randomPlates[Math.floor(Math.random() * randomPlates.length)];

    const updated = slots.map((s) => {
      if (s.id === availableSlot.id) {
        return {
          ...s,
          status: 'occupied',
          vehicle: chosenPlate,
          driver: 'FASTag Pass Holder',
          entryTime: new Date().toISOString()
        };
      }
      return s;
    });

    setSlots(updated);
    sounds.playSuccess();

    setFastagNotification({
      plate: chosenPlate,
      slotId: availableSlot.id,
      timestamp: new Date().toLocaleTimeString()
    });

    setApiLogs((prev) => [
      {
        id: Date.now(),
        method: 'POST',
        endpoint: '/api/v1/fastag/scan',
        status: 200,
        time: new Date().toLocaleTimeString(),
        latency: '18ms',
        payload: { tagId: 'NETC-FASTAG-982103', plate: chosenPlate, slot: availableSlot.id }
      },
      ...prev.slice(0, 8)
    ]);

    setTimeout(() => setFastagNotification(null), 5000);
  };

  // Handle vehicle check-in
  const handleCheckInSubmit = (e) => {
    e.preventDefault();
    if (!formData.vehicleNumber || !formData.slotId) return;

    sounds.playClick();
    const targetSlot = slots.find((s) => s.id === formData.slotId);
    if (!targetSlot || targetSlot.status !== 'available') {
      alert('Selected slot is not available. Please choose another.');
      return;
    }

    const updated = slots.map((s) => {
      if (s.id === formData.slotId) {
        return {
          ...s,
          status: 'occupied',
          vehicle: formData.vehicleNumber.toUpperCase(),
          driver: formData.driverName || 'Verified Citizen',
          entryTime: new Date().toISOString()
        };
      }
      return s;
    });

    setSlots(updated);
    sounds.playSuccess();

    setApiLogs((prev) => [
      {
        id: Date.now(),
        method: 'POST',
        endpoint: '/api/v1/vehicles/checkin',
        status: 201,
        time: new Date().toLocaleTimeString(),
        latency: '34ms',
        payload: { vehicle: formData.vehicleNumber, slot: formData.slotId, city: formData.city }
      },
      ...prev.slice(0, 8)
    ]);

    setIsCheckInModalOpen(false);
    setFormData({ vehicleNumber: '', slotId: '', driverName: '', type: 'Standard Sedan', city: 'Mumbai', isEV: false });
  };

  // Complete checkout via UPI payment
  const handleConfirmUPIPayment = () => {
    if (!checkoutModalSlot) return;
    sounds.playSuccess();

    const slotId = checkoutModalSlot.id;
    const updated = slots.map((s) => {
      if (s.id === slotId) {
        return {
          ...s,
          status: 'available',
          vehicle: null,
          driver: null,
          entryTime: null
        };
      }
      return s;
    });

    setSlots(updated);
    if (selectedSlot?.id === slotId) {
      setSelectedSlot(updated.find((s) => s.id === slotId));
    }

    setApiLogs((prev) => [
      {
        id: Date.now(),
        method: 'POST',
        endpoint: '/api/v1/payments/upi-checkout',
        status: 200,
        time: new Date().toLocaleTimeString(),
        latency: '24ms',
        payload: { slotId, settledAmountRupees: checkoutModalSlot.rate * 2, status: 'SUCCESS' }
      },
      ...prev.slice(0, 8)
    ]);

    setCheckoutModalSlot(null);
  };

  // Handle status toggle
  const handleUpdateStatus = (slotId, newStatus) => {
    sounds.playClick();
    const updated = slots.map((s) => {
      if (s.id === slotId) {
        return {
          ...s,
          status: newStatus,
          vehicle: newStatus === 'available' ? null : s.vehicle,
          driver: newStatus === 'available' ? null : s.driver,
          entryTime: newStatus === 'available' ? null : s.entryTime
        };
      }
      return s;
    });
    setSlots(updated);
    if (selectedSlot?.id === slotId) {
      setSelectedSlot(updated.find((s) => s.id === slotId));
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'available':
        return 'text-emerald-500 bg-emerald-500/10 border-emerald-500/25';
      case 'occupied':
        return 'text-rose-500 bg-rose-500/10 border-rose-500/25';
      case 'reserved':
        return 'text-amber-500 bg-amber-500/10 border-amber-500/25';
      case 'maintenance':
        return 'text-neutral-400 bg-neutral-500/10 border-neutral-500/25';
      default:
        return 'text-muted-foreground bg-muted border-border';
    }
  };

  return (
    <section className="bg-background px-3 sm:px-4 md:px-6 py-16 sm:py-20 md:py-32 border-t border-border" id="live-console">
      <div className="mx-auto max-w-6xl rounded-2xl sm:rounded-3xl bg-card border border-border shadow-2xl overflow-hidden flex flex-col">
        {/* Console Header */}
        <div className="p-4 sm:p-5 md:p-6 bg-muted/30 border-b border-border flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-accent">
                MERN LIVE TELEMETRY OPERATIONS CONSOLE
              </span>
            </div>
            <h3 className="text-2xl font-bold tracking-tight text-foreground">
              Smart Parking Transit Command Center
            </h3>
            <p className="text-xs text-muted-foreground mt-0.5">
              Live CRUD bay states, NHAI NETC FASTag toll gateway, Bharat UPI checkout, and MongoDB replica set synchronization.
            </p>
          </div>

          {/* Quick Actions & Role Switcher */}
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={triggerFastagSimulation}
              className="text-xs font-mono font-bold bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-400 border border-emerald-500/30 px-3 py-2 rounded-xl transition-all flex items-center gap-1.5 shadow-xs cursor-pointer"
              title="Simulate vehicle barrier entry via FASTag RFID"
            >
              <Radio className="h-3.5 w-3.5 animate-pulse" />
              <span>Simulate FASTag Ingress</span>
            </button>

            <div className="flex items-center gap-1.5 bg-background border border-border rounded-xl px-3 py-1.5 shadow-xs">
              <span className="text-[11px] font-mono text-muted-foreground">Role:</span>
              <select
                value={currentRole}
                onChange={(e) => {
                  sounds.playClick();
                  onRoleChange && onRoleChange(e.target.value);
                }}
                className="text-xs font-mono font-bold bg-transparent text-foreground focus:outline-none cursor-pointer"
              >
                <option value="admin" className="bg-card text-foreground">Municipal Admin</option>
                <option value="attendant" className="bg-card text-foreground">Station Attendant</option>
                <option value="driver" className="bg-card text-foreground">Public Driver</option>
              </select>
            </div>

            {currentRole !== 'driver' && (
              <button
                onClick={() => {
                  sounds.playClick();
                  setIsCheckInModalOpen(true);
                }}
                className="text-xs font-semibold bg-[#202632] text-[#F4E8D2] hover:bg-[#151A24] dark:bg-[#F4E8D2] dark:text-[#202632] dark:hover:bg-white px-3.5 py-2 rounded-xl transition-all flex items-center gap-1.5 shadow-sm cursor-pointer active:scale-95"
              >
                <Plus className="h-3.5 w-3.5" />
                <span>Manual Check-In</span>
              </button>
            )}

            {onClose && (
              <button
                onClick={onClose}
                className="p-2 rounded-xl hover:bg-muted text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                aria-label="Close Console"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>

        {/* FASTag Notification Banner */}
        <AnimatePresence>
          {fastagNotification && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-emerald-500/15 border-b border-emerald-500/30 px-6 py-2.5 flex items-center justify-between text-xs font-mono text-emerald-400"
            >
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
                <span>NETC FASTag Validated: Plate {fastagNotification.plate} assigned to Bay {fastagNotification.slotId}</span>
              </div>
              <span className="hidden sm:inline">Barrier Gate Raised at {fastagNotification.timestamp}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* SaaS Dashboard KPI Metrics Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 p-4 md:px-6 bg-muted/40 border-b border-border text-xs font-mono">
          <div className="p-3 rounded-2xl bg-card border border-border shadow-xs">
            <span className="text-muted-foreground block text-[11px]">Total Bays Monitored</span>
            <span className="text-xl font-bold text-foreground mt-0.5 block">{stats.total} Bays</span>
          </div>
          <div className="p-3 rounded-2xl bg-card border border-border shadow-xs">
            <span className="text-emerald-500 block text-[11px]">Available Slots</span>
            <span className="text-xl font-bold text-emerald-500 mt-0.5 block">{stats.available} Free</span>
          </div>
          <div className="p-3 rounded-2xl bg-card border border-border shadow-xs">
            <span className="text-rose-500 block text-[11px]">Occupied Bays</span>
            <span className="text-xl font-bold text-rose-500 mt-0.5 block">{stats.occupied} Parked</span>
          </div>
          <div className="p-3 rounded-2xl bg-card border border-border shadow-xs">
            <span className="text-amber-500 block text-[11px]">Reserved Slots</span>
            <span className="text-xl font-bold text-amber-500 mt-0.5 block">{stats.reserved} Reserved</span>
          </div>
          <div className="p-3 rounded-2xl bg-card border border-border shadow-xs">
            <span className="text-accent block text-[11px]">Occupancy Density</span>
            <span className="text-xl font-bold text-foreground mt-0.5 block">{stats.occupancyRate}%</span>
          </div>
          <div className="p-3 rounded-2xl bg-card border border-border shadow-xs">
            <span className="text-emerald-400 block text-[11px]">Hourly Tariff Yield</span>
            <span className="text-xl font-bold text-foreground mt-0.5 block">₹{stats.hourlyRevenue}/hr</span>
          </div>
        </div>

        {/* Console Mode Navigation Tabs */}
        <div className="flex flex-wrap items-center justify-between px-3 sm:px-6 pt-2 border-b border-border bg-card">
          <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto scrollbar-hide max-w-full py-1">
            {[
              { id: 'slots', label: 'Managed Slots Grid', short: 'Slots', count: filteredSlots.length, icon: Car },
              { id: 'vehicles', label: 'Vehicles & Transit Stream', short: 'Vehicles', count: occupiedVehicles.length, icon: Layers },
              { id: 'traffic', label: 'City Traffic & Congestion', short: 'Traffic', icon: Activity },
              { id: 'backend', label: 'MongoDB & Express API Logs', short: 'API Logs', icon: Database }
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    sounds.playClick();
                    setActiveTab(tab.id);
                  }}
                  className={`pb-2.5 pt-1 px-1 sm:px-1.5 text-xs md:text-sm font-semibold border-b-2 transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap shrink-0 ${
                    isActive
                      ? 'border-accent text-foreground'
                      : 'border-transparent text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <Icon className={`h-3.5 w-3.5 sm:h-4 sm:w-4 ${isActive ? 'text-accent' : ''}`} />
                  <span className="hidden sm:inline">{tab.label}</span>
                  <span className="sm:hidden">{tab.short}</span>
                  {tab.count !== undefined && (
                    <span className={`text-[10px] sm:text-[11px] font-mono px-1.5 py-0.2 rounded-full ${isActive ? 'bg-accent/20 text-accent font-bold' : 'bg-muted text-muted-foreground'}`}>
                      {tab.count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* TAB 1: MANAGED SLOTS GRID VIEW */}
        {activeTab === 'slots' && (
          <div className="p-4 md:p-6 space-y-6">
            {/* Filter Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 bg-muted/40 p-3.5 rounded-2xl border border-border">
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="text-xs font-mono text-muted-foreground mr-1">Zone:</span>
                {[
                  { id: 'ALL', label: 'All Cities' },
                  { id: 'Mumbai', label: 'Mumbai BKC' },
                  { id: 'Bengaluru', label: 'Bengaluru' },
                  { id: 'Pune', label: 'Pune FC Rd' },
                  { id: 'Delhi', label: 'Delhi CP' }
                ].map((z) => (
                  <button
                    key={z.id}
                    onClick={() => {
                      sounds.playClick();
                      setSelectedZone(z.id);
                    }}
                    className={`text-xs font-mono px-3 py-1 rounded-xl transition-all cursor-pointer border ${
                      selectedZone === z.id
                        ? 'bg-foreground text-background font-bold border-foreground shadow-xs'
                        : 'bg-card hover:bg-muted text-muted-foreground border-border hover:text-foreground'
                    }`}
                  >
                    {z.label}
                  </button>
                ))}
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <div className="relative">
                  <Search className="h-3.5 w-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search bay, plate, driver..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-8 pr-3 py-1 text-xs font-mono rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-1 focus:ring-accent"
                  />
                </div>

                <div className="flex items-center gap-1">
                  {['ALL', 'available', 'occupied', 'reserved'].map((st) => (
                    <button
                      key={st}
                      onClick={() => {
                        sounds.playClick();
                        setStatusFilter(st);
                      }}
                      className={`text-xs font-mono px-2.5 py-1 rounded-xl capitalize transition-all cursor-pointer border ${
                        statusFilter === st
                          ? 'bg-foreground text-background font-bold border-foreground shadow-xs'
                          : 'bg-card hover:bg-muted text-muted-foreground border-border hover:text-foreground'
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Grid of Parking Bays */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3.5">
              {filteredSlots.map((slot) => {
                const isSelected = selectedSlot?.id === slot.id;
                const statusClass = getStatusColor(slot.status);
                const isEV = slot.type.includes('EV');
                const isOccupied = slot.status === 'occupied';

                return (
                  <motion.div
                    key={slot.id}
                    whileHover={{ y: -3, transition: { duration: 0.15 } }}
                    onClick={() => {
                      sounds.playClick();
                      setSelectedSlot(slot);
                    }}
                    className={`rounded-2xl p-4 border transition-all cursor-pointer flex flex-col justify-between min-h-[145px] shadow-xs relative overflow-hidden group ${
                      isSelected
                        ? 'ring-2 ring-accent border-accent bg-accent/10 shadow-md'
                        : 'bg-card hover:bg-muted/60 hover:border-foreground/30 border-border text-foreground'
                    }`}
                  >
                    {/* Parking Bay Road Stall Marking */}
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-border to-transparent" />

                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-mono font-extrabold text-foreground flex items-center gap-1.5">
                          {isEV && <Zap className="h-3.5 w-3.5 text-emerald-400" />}
                          {slot.id}
                        </span>
                        <span className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded-md border font-bold ${statusClass}`}>
                          {slot.status}
                        </span>
                      </div>

                      {isOccupied ? (
                        <div className="mt-1 space-y-1">
                          <IndianNumberPlate plate={slot.vehicle} isEV={isEV} />
                          <p className="text-[11px] text-muted-foreground truncate font-sans">
                            {slot.driver || 'Driver Pass'}
                          </p>
                        </div>
                      ) : (
                        <div className="mt-2 py-1.5 flex items-center gap-1.5 text-muted-foreground text-xs font-mono">
                          <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                          <span>Bay Open</span>
                        </div>
                      )}
                    </div>

                    <div className="text-[10px] text-muted-foreground font-mono mt-3 pt-2 border-t border-border/80 flex items-center justify-between">
                      <span className="font-bold text-foreground">₹{slot.rate}/hr</span>
                      <span className="uppercase text-[9px] truncate max-w-[70px]">{slot.city}</span>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Selected Bay Detail Drawer */}
            {selectedSlot && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-muted/40 p-5 rounded-3xl border border-border shadow-md"
              >
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="p-3.5 rounded-2xl bg-card border border-border shadow-xs">
                      <Car className="h-6 w-6 text-accent" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2.5">
                        <h4 className="text-lg font-bold text-foreground">
                          Parking Bay {selectedSlot.id}
                        </h4>
                        <span className={`text-xs font-mono font-bold uppercase px-2 py-0.5 rounded-md border ${getStatusColor(selectedSlot.status)}`}>
                          {selectedSlot.status}
                        </span>
                        <span className="text-xs font-mono text-muted-foreground">
                          ({selectedSlot.type})
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-0.5 font-mono">
                        Tariff: ₹{selectedSlot.rate}/hr | Zone: {selectedSlot.zone}
                        {selectedSlot.powerKW ? ` | EV Fast Charger: ${selectedSlot.powerKW}kW` : ''}
                      </p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2">
                    {selectedSlot.status === 'occupied' && (
                      <button
                        onClick={() => {
                          sounds.playClick();
                          setCheckoutModalSlot(selectedSlot);
                        }}
                        className="px-4 py-2.5 rounded-xl bg-[#202632] text-[#F4E8D2] hover:bg-[#151A24] dark:bg-[#F4E8D2] dark:text-[#202632] dark:hover:bg-white font-bold text-xs transition-colors flex items-center gap-1.5 shadow-md cursor-pointer active:scale-95"
                      >
                        <QrCode className="h-4 w-4" />
                        <span>Instant UPI Checkout</span>
                      </button>
                    )}

                    {selectedSlot.status === 'available' && (
                      <button
                        onClick={() => {
                          sounds.playClick();
                          setFormData({ ...formData, slotId: selectedSlot.id, city: selectedSlot.city });
                          setIsCheckInModalOpen(true);
                        }}
                        className="px-4 py-2.5 rounded-xl bg-foreground text-background font-semibold text-xs transition-colors flex items-center gap-1.5 cursor-pointer"
                      >
                        <Plus className="h-3.5 w-3.5" />
                        <span>Assign Vehicle</span>
                      </button>
                    )}

                    {currentRole === 'admin' && (
                      <button
                        onClick={() =>
                          handleUpdateStatus(
                            selectedSlot.id,
                            selectedSlot.status === 'maintenance' ? 'available' : 'maintenance'
                          )
                        }
                        className="px-3.5 py-2.5 rounded-xl bg-card hover:bg-muted border border-border text-xs font-mono text-foreground transition-colors cursor-pointer"
                      >
                        {selectedSlot.status === 'maintenance' ? 'Restore Bay' : 'Mark Maintenance'}
                      </button>
                    )}

                    <button
                      onClick={() => setSelectedSlot(null)}
                      className="px-3.5 py-2.5 rounded-xl bg-card text-xs text-muted-foreground hover:text-foreground border border-border cursor-pointer"
                    >
                      Close
                    </button>
                  </div>
                </div>

                {selectedSlot.status === 'occupied' && (
                  <div className="mt-4 pt-4 border-t border-border grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs font-mono items-center">
                    <div>
                      <span className="text-muted-foreground block text-[11px] mb-1">Vehicle License Plate:</span>
                      <IndianNumberPlate plate={selectedSlot.vehicle} isEV={selectedSlot.type.includes('EV')} />
                    </div>
                    <div>
                      <span className="text-muted-foreground block text-[11px]">Registered Driver:</span>
                      <span className="font-semibold text-foreground text-sm">{selectedSlot.driver || 'N/A'}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground block text-[11px]">Check-In Time:</span>
                      <span className="text-foreground">{new Date(selectedSlot.entryTime).toLocaleTimeString()}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground block text-[11px]">Accrued Tariff:</span>
                      <span className="text-emerald-500 font-bold text-sm">₹{selectedSlot.rate * 2}.00</span>
                    </div>
                  </div>
                )}
              </motion.div>
            )}
          </div>
        )}

        {/* TAB 2: VEHICLES & TRANSIT STREAM VIEW */}
        {activeTab === 'vehicles' && (
          <div className="p-4 md:p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-base font-bold text-foreground">
                  Active Vehicle Registry
                </h4>
                <p className="text-xs text-muted-foreground">
                  Tracked vehicles currently occupying municipal parking slots across all monitored zones.
                </p>
              </div>
              <span className="text-xs font-mono text-accent bg-accent/15 px-3 py-1 rounded-md border border-accent/25">
                {occupiedVehicles.length} Vehicles In Lot
              </span>
            </div>

            <div className="rounded-2xl border border-border overflow-hidden bg-card">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs font-mono">
                  <thead className="bg-muted/60 text-muted-foreground border-b border-border uppercase text-[11px]">
                    <tr>
                      <th className="py-3 px-4">License Plate</th>
                      <th className="py-3 px-4">Driver Name</th>
                      <th className="py-3 px-4">Assigned Bay</th>
                      <th className="py-3 px-4">Classification</th>
                      <th className="py-3 px-4">Ingress Protocol</th>
                      <th className="py-3 px-4">Tariff</th>
                      <th className="py-3 px-4 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {occupiedVehicles.map((v) => (
                      <tr key={v.id} className="hover:bg-muted/30 transition-colors">
                        <td className="py-3 px-4">
                          <IndianNumberPlate plate={v.vehicle} isEV={v.type.includes('EV')} />
                        </td>
                        <td className="py-3 px-4 font-semibold text-foreground font-sans">
                          {v.driver || 'Authorized Driver'}
                        </td>
                        <td className="py-3 px-4">
                          <span className="font-bold text-accent">{v.id}</span>
                          <span className="text-muted-foreground text-[10px] block">{v.city}</span>
                        </td>
                        <td className="py-3 px-4 text-muted-foreground">
                          {v.type}
                        </td>
                        <td className="py-3 px-4">
                          <span className="text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 text-[10px] font-bold">
                            NETC FASTag Auto
                          </span>
                        </td>
                        <td className="py-3 px-4 font-bold text-foreground">
                          ₹{v.rate * 2}.00
                        </td>
                        <td className="py-3 px-4 text-right">
                          <button
                            onClick={() => {
                              sounds.playClick();
                              setCheckoutModalSlot(v);
                            }}
                            className="px-3 py-1.5 rounded-lg bg-[#202632] text-[#F4E8D2] hover:bg-[#151A24] dark:bg-[#F4E8D2] dark:text-[#202632] dark:hover:bg-white font-bold text-[11px] transition-colors cursor-pointer active:scale-95"
                          >
                            Checkout UPI
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: CITY TRAFFIC & CONGESTION OVERVIEW */}
        {activeTab === 'traffic' && (
          <div className="p-4 md:p-6 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-base font-bold text-foreground">
                  Metropolitan Traffic Density & Inflow Metrics
                </h4>
                <p className="text-xs text-muted-foreground">
                  Audited telemetry from municipal boom barriers, FASTag RFID lanes, and Parivahan HSRP camera feeds.
                </p>
              </div>
            </div>

            {/* City Zone Congestion Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { city: 'Mumbai BKC Sector 3', occupancy: '84%', status: 'Peak Flow', vehiclesPerMin: '16.4', latency: '18ms', color: 'text-amber-500' },
                { city: 'Bengaluru Indiranagar', occupancy: '68%', status: 'Normal Flow', vehiclesPerMin: '11.8', latency: '16ms', color: 'text-emerald-500' },
                { city: 'Pune FC Road Corridor', occupancy: '46%', status: 'Light Traffic', vehiclesPerMin: '8.2', latency: '14ms', color: 'text-emerald-500' },
                { city: 'Delhi Connaught Place', occupancy: '92%', status: 'Heavy Density', vehiclesPerMin: '22.0', latency: '22ms', color: 'text-rose-500' }
              ].map((zone) => (
                <div key={zone.city} className="p-4 rounded-2xl bg-card border border-border shadow-xs flex flex-col justify-between">
                  <div>
                    <span className="text-[11px] font-mono text-muted-foreground block">{zone.city}</span>
                    <div className="mt-2 flex items-baseline justify-between">
                      <span className="text-2xl font-extrabold text-foreground font-mono">{zone.occupancy}</span>
                      <span className={`text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded border ${zone.color} bg-muted`}>
                        {zone.status}
                      </span>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-border text-[11px] font-mono text-muted-foreground space-y-1">
                    <div className="flex justify-between">
                      <span>Gate Inflow:</span>
                      <span className="font-bold text-foreground">{zone.vehiclesPerMin} v/min</span>
                    </div>
                    <div className="flex justify-between">
                      <span>FASTag Latency:</span>
                      <span className="font-bold text-emerald-500">{zone.latency}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Payment Method Split & Gate Clearance Distribution */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl bg-muted/30 border border-border">
                <h5 className="text-xs font-mono font-bold uppercase text-foreground mb-3 flex items-center gap-2">
                  <Radio className="h-4 w-4 text-accent" />
                  Payment Clearance Distribution
                </h5>
                <div className="space-y-3 font-mono text-xs">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span>NHAI NETC FASTag Auto-Debit</span>
                      <span className="font-bold text-emerald-500">72%</span>
                    </div>
                    <div className="h-2 rounded-full bg-muted overflow-hidden">
                      <div className="h-full bg-emerald-500 w-[72%]" />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span>Bharat UPI QR (PhonePe / GPay)</span>
                      <span className="font-bold text-accent">28%</span>
                    </div>
                    <div className="h-2 rounded-full bg-muted overflow-hidden">
                      <div className="h-full bg-accent w-[28%]" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-muted/30 border border-border">
                <h5 className="text-xs font-mono font-bold uppercase text-foreground mb-3 flex items-center gap-2">
                  <Activity className="h-4 w-4 text-emerald-400" />
                  Barrier Clearance Latency Breakdown
                </h5>
                <div className="space-y-2 font-mono text-xs text-muted-foreground">
                  <div className="flex justify-between p-2 rounded-lg bg-card border border-border">
                    <span>Optical HSRP Plate OCR:</span>
                    <span className="font-bold text-foreground">12ms</span>
                  </div>
                  <div className="flex justify-between p-2 rounded-lg bg-card border border-border">
                    <span>MongoDB Atomic Lock Execution:</span>
                    <span className="font-bold text-foreground">14ms</span>
                  </div>
                  <div className="flex justify-between p-2 rounded-lg bg-card border border-border">
                    <span>Boom Barrier Motor Trigger:</span>
                    <span className="font-bold text-emerald-400">18ms</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: MONGODB & EXPRESS API LOGS VIEW */}
        {activeTab === 'backend' && (
          <div className="p-4 md:p-6 space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* MongoDB Document Store */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-foreground flex items-center gap-1.5">
                    <Database className="h-4 w-4 text-emerald-400" />
                    MongoDB Atlas BSON Store (`smartparking.slots`)
                  </span>
                  <span className="text-[11px] font-mono text-muted-foreground">
                    Index: slotId_1 (Unique)
                  </span>
                </div>

                <div className="rounded-2xl bg-neutral-950 p-4 border border-neutral-800 text-xs font-mono text-emerald-400 overflow-x-auto shadow-inner max-h-[380px]">
                  <pre>{JSON.stringify(
                    slots.slice(0, 4).map((s) => ({
                      _id: `ObjectId("65e4f${s.id.replace('-', '')}9b0123")`,
                      slotNumber: s.id,
                      zone: s.zone,
                      status: s.status,
                      vehicle: s.vehicle,
                      driver: s.driver,
                      ratePerHourINR: s.rate,
                      checkInTime: s.entryTime,
                      fastagActive: true
                    })),
                    null,
                    2
                  )}</pre>
                </div>
              </div>

              {/* Express.js REST API Logs */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-foreground flex items-center gap-1.5">
                    <Terminal className="h-4 w-4 text-accent" />
                    Express.js REST API Ingress Stream
                  </span>
                  <span className="text-[11px] font-mono text-muted-foreground">
                    Avg Latency: 22ms
                  </span>
                </div>

                <div className="space-y-2 max-h-[380px] overflow-y-auto">
                  {apiLogs.map((log) => (
                    <div
                      key={log.id}
                      className="p-3 rounded-xl bg-card border border-border text-xs font-mono flex flex-col sm:flex-row sm:items-center justify-between gap-2 shadow-xs"
                    >
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-0.5 rounded font-bold text-[10px] ${
                          log.method === 'GET' ? 'bg-blue-500/20 text-blue-400' :
                          'bg-emerald-500/20 text-emerald-400'
                        }`}>
                          {log.method}
                        </span>
                        <span className="font-semibold text-foreground">{log.endpoint}</span>
                        <span className="text-muted-foreground text-[10px]">[{log.status} OK]</span>
                      </div>

                      <div className="flex items-center gap-3 text-muted-foreground text-[11px]">
                        <span>Latency: {log.latency}</span>
                        <span>{log.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* CHECK-IN MODAL FORM */}
      <AnimatePresence>
        {isCheckInModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-md rounded-3xl bg-background border border-border p-6 shadow-2xl text-foreground"
            >
              <div className="flex items-center justify-between pb-3 border-b border-border">
                <div>
                  <h4 className="text-lg font-bold">New Vehicle Check-In</h4>
                  <p className="text-xs text-muted-foreground">Parivahan HSRP Validation & Slot Lock</p>
                </div>
                <button
                  onClick={() => setIsCheckInModalOpen(false)}
                  className="p-1 rounded-md hover:bg-muted cursor-pointer"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <form onSubmit={handleCheckInSubmit} className="mt-4 space-y-4">
                <div>
                  <label className="text-xs font-mono text-muted-foreground block mb-1">
                    Vehicle Registration Plate (HSRP)
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. MH-12-AB-4091 or KA-05-EV-9210"
                    value={formData.vehicleNumber}
                    onChange={(e) => setFormData({ ...formData, vehicleNumber: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs font-mono uppercase rounded-xl border border-border bg-muted/40 focus:outline-none focus:ring-1 focus:ring-accent"
                  />
                </div>

                <div>
                  <label className="text-xs font-mono text-muted-foreground block mb-1">
                    Assign Bay / Slot ID
                  </label>
                  <select
                    required
                    value={formData.slotId}
                    onChange={(e) => setFormData({ ...formData, slotId: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs font-mono rounded-xl border border-border bg-muted/40 focus:outline-none focus:ring-1 focus:ring-accent cursor-pointer"
                  >
                    <option value="">Select an available bay...</option>
                    {slots
                      .filter((s) => s.status === 'available')
                      .map((s) => (
                        <option key={s.id} value={s.id}>
                          {s.id} ({s.zone} - ₹{s.rate}/hr)
                        </option>
                      ))}
                  </select>
                </div>

                <div>
                  <label className="text-xs font-mono text-muted-foreground block mb-1">
                    Driver / Owner Name
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Rahul Sharma"
                    value={formData.driverName}
                    onChange={(e) => setFormData({ ...formData, driverName: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-border bg-muted/40 focus:outline-none focus:ring-1 focus:ring-accent"
                  />
                </div>

                <div className="pt-2 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsCheckInModalOpen(false)}
                    className="px-4 py-2.5 rounded-xl text-xs font-medium border border-border hover:bg-muted cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl text-xs font-bold bg-[#202632] text-[#F4E8D2] hover:bg-[#151A24] dark:bg-[#F4E8D2] dark:text-[#202632] dark:hover:bg-white transition-colors cursor-pointer active:scale-95"
                  >
                    Confirm Check-In
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* UPI CHECKOUT MODAL */}
      <AnimatePresence>
        {checkoutModalSlot && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-sm rounded-3xl bg-background border border-border p-6 shadow-2xl text-foreground text-center"
            >
              <div className="flex items-center justify-between pb-3 border-b border-border">
                <span className="text-xs font-mono font-bold uppercase text-accent">
                  BHARAT UPI INSTANT CLEARANCE
                </span>
                <button
                  onClick={() => setCheckoutModalSlot(null)}
                  className="p-1 rounded-md hover:bg-muted cursor-pointer"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="my-5">
                <div className="mx-auto w-44 h-44 rounded-2xl bg-white p-3 border-2 border-black flex flex-col items-center justify-center shadow-md">
                  {/* Stylized QR Code Graphic */}
                  <div className="w-full h-full border border-black/20 p-2 flex flex-col justify-between bg-neutral-50 rounded">
                    <div className="flex justify-between">
                      <div className="w-7 h-7 border-2 border-black bg-black/10 flex items-center justify-center">
                        <div className="w-3 h-3 bg-black" />
                      </div>
                      <div className="w-7 h-7 border-2 border-black bg-black/10 flex items-center justify-center">
                        <div className="w-3 h-3 bg-black" />
                      </div>
                    </div>
                    <div className="text-center font-mono font-bold text-[9px] text-black">
                      UPI // {checkoutModalSlot.id}
                    </div>
                    <div className="flex justify-between items-end">
                      <div className="w-7 h-7 border-2 border-black bg-black/10 flex items-center justify-center">
                        <div className="w-3 h-3 bg-black" />
                      </div>
                      <span className="text-[8px] font-bold text-neutral-600">SCAN TO PAY</span>
                    </div>
                  </div>
                </div>

                <div className="mt-4">
                  <span className="text-xs font-mono text-muted-foreground block">Payable Tariff (2 hrs parking)</span>
                  <span className="text-3xl font-extrabold text-foreground font-mono block mt-0.5">
                    ₹{checkoutModalSlot.rate * 2}.00
                  </span>
                  <span className="text-[11px] text-muted-foreground font-mono mt-1 block">
                    Plate: {checkoutModalSlot.vehicle} | Bay {checkoutModalSlot.id}
                  </span>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => setCheckoutModalSlot(null)}
                  className="flex-1 py-3 rounded-xl border border-border text-xs font-semibold hover:bg-muted cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmUPIPayment}
                  className="flex-1 py-3 rounded-xl bg-[#202632] text-[#F4E8D2] hover:bg-[#151A24] dark:bg-[#F4E8D2] dark:text-[#202632] dark:hover:bg-white font-bold text-xs transition-colors shadow-sm cursor-pointer active:scale-95"
                >
                  Confirm & Release Gate
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
