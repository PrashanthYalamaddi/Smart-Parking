import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, KeyRound, Mail, X, Check, ArrowRight } from 'lucide-react';
import { sounds } from '../utils/audio';

export default function Auth3Modal({ isOpen, onClose, currentRole, onSelectRole }) {
  const [email, setEmail] = useState('admin@smartcity.gov');
  const [password, setPassword] = useState('••••••••••••');
  const [selectedRole, setSelectedRole] = useState(currentRole || 'admin');
  const [isSuccess, setIsSuccess] = useState(false);

  const DEMO_ACCOUNTS = [
    { role: 'admin', label: 'Municipal Admin', email: 'commissioner@smartcity.gov.in', desc: 'Full CRUD, Tariff Overrides & Audits' },
    { role: 'attendant', label: 'Station Attendant', email: 'attendant@bkc-mobility.in', desc: 'Vehicle Check-in & Gate Release' },
    { role: 'driver', label: 'Citizen Driver', email: 'driver@citizen.gov.in', desc: 'Find Available Bays & Reserve' }
  ];

  const handleQuickSelect = (acc) => {
    sounds.playClick();
    setSelectedRole(acc.role);
    setEmail(acc.email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sounds.playSuccess();
    setIsSuccess(true);
    setTimeout(() => {
      onSelectRole(selectedRole);
      setIsSuccess(false);
      onClose();
    }, 700);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md">
      {/* Background Dimmed Photographic Texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-20 bg-cover bg-center"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1506521781263-d8422e82f27a?auto=format&fit=crop&w=1200&q=80')`
        }}
      />

      {/* Centered Sign-In Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative z-10 w-full max-w-md rounded-3xl bg-background border border-foreground/15 p-6 md:p-8 shadow-2xl text-foreground"
      >
        <div className="flex items-center justify-between pb-4 border-b border-foreground/10">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-[#202632] text-[#F4E8D2] dark:bg-[#F4E8D2] dark:text-[#202632]">
              <Shield className="h-4 w-4" />
            </div>
            <div>
              <h3 className="text-lg font-bold">Authentication (Auth 3)</h3>
              <p className="text-[11px] font-mono text-muted-foreground">Role-Based JWT Gateway</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-md text-muted-foreground hover:text-foreground hover:bg-foreground/10 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Quick Demo Role Picker */}
        <div className="mt-4">
          <label className="text-[11px] font-mono font-semibold uppercase text-muted-foreground block mb-2">
            Quick Select Role:
          </label>
          <div className="grid grid-cols-3 gap-2">
            {DEMO_ACCOUNTS.map((acc) => (
              <button
                key={acc.role}
                type="button"
                onClick={() => handleQuickSelect(acc)}
                className={`p-2 rounded-xl text-left border transition-all text-xs font-mono ${selectedRole === acc.role ? 'bg-foreground text-background border-foreground font-bold shadow' : 'bg-muted/50 border-foreground/10 text-muted-foreground hover:text-foreground'}`}
              >
                <div className="truncate font-semibold">{acc.label}</div>
                <div className="text-[9px] opacity-75 truncate">{acc.role}</div>
              </button>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          <div>
            <label className="text-xs font-mono text-muted-foreground block mb-1">
              Operator Email
            </label>
            <div className="relative">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3.5 py-2.5 pl-9 text-xs font-mono rounded-xl border border-foreground/20 bg-muted/30 focus:outline-none focus:ring-1 focus:ring-accent"
              />
              <Mail className="absolute left-3 top-3 h-3.5 w-3.5 text-muted-foreground" />
            </div>
          </div>

          <div>
            <label className="text-xs font-mono text-muted-foreground block mb-1">
              Security Key / Password
            </label>
            <div className="relative">
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3.5 py-2.5 pl-9 text-xs font-mono rounded-xl border border-foreground/20 bg-muted/30 focus:outline-none focus:ring-1 focus:ring-accent"
              />
              <KeyRound className="absolute left-3 top-3 h-3.5 w-3.5 text-muted-foreground" />
            </div>
          </div>

          <div className="flex items-center justify-between text-xs text-muted-foreground pt-1">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" defaultChecked className="rounded text-accent focus:ring-0" />
              <span>Remember Token</span>
            </label>
            <span className="text-accent hover:underline cursor-pointer">Reset Credentials</span>
          </div>

          <button
            type="submit"
            className="w-full mt-2 py-3 rounded-xl bg-[#202632] text-[#F4E8D2] hover:bg-[#151A24] dark:bg-[#F4E8D2] dark:text-[#202632] dark:hover:bg-white font-bold text-xs transition-all duration-300 flex items-center justify-center gap-2 shadow-md cursor-pointer active:scale-95"
          >
            {isSuccess ? (
              <span className="flex items-center gap-1.5 text-emerald-900 font-bold">
                <Check className="h-4 w-4" /> Authenticated!
              </span>
            ) : (
              <span className="flex items-center gap-1.5">
                Sign In As {selectedRole.toUpperCase()}
                <ArrowRight className="h-3.5 w-3.5" />
              </span>
            )}
          </button>
        </form>

        <p className="mt-4 text-center text-[11px] text-muted-foreground font-mono">
          Mock credentials populated for demonstration of Project 36 RBAC.
        </p>
      </motion.div>
    </div>
  );
}
