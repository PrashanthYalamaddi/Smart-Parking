import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Radio, X, ArrowRight, CornerDownLeft } from 'lucide-react';
import { sounds } from '../utils/audio';

export default function NotFound404Block({ isOpen, onClose, onSearchSlot }) {
  const [query, setQuery] = useState('');
  const [searchResult, setSearchResult] = useState(null);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!query) return;
    sounds.playSonar();

    // Simulate search
    if (query.toUpperCase().startsWith('A-') || query.toUpperCase().startsWith('B-')) {
      setSearchResult({
        found: true,
        message: `Slot ${query.toUpperCase()} located in Active Zone Registry.`,
        slot: query.toUpperCase()
      });
    } else {
      setSearchResult({
        found: false,
        message: `404: Coordinate '${query}' not indexed in current municipal parking partition.`
      });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative w-full max-w-xl rounded-3xl bg-neutral-950 border border-neutral-800 p-8 text-white shadow-2xl text-center overflow-hidden"
      >
        <button
          onClick={onClose}
          className="absolute right-5 top-5 p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Radar Sweep Graphic */}
        <div className="relative mx-auto my-4 h-48 w-48 rounded-full border border-emerald-500/25 bg-neutral-900/60 overflow-hidden flex items-center justify-center">
          <div className="absolute inset-6 rounded-full border border-emerald-500/20" />
          <div className="absolute inset-16 rounded-full border border-emerald-500/20" />
          <div className="absolute top-0 bottom-0 left-1/2 w-px bg-emerald-500/20 -translate-x-1/2" />
          <div className="absolute left-0 right-0 top-1/2 h-px bg-emerald-500/20 -translate-y-1/2" />

          {/* Rotating beam */}
          <motion.div
            className="pointer-events-none absolute inset-0 rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 3.5, repeat: Infinity, ease: 'linear' }}
            style={{
              background: 'conic-gradient(from 0deg, rgba(16, 185, 129, 0.4) 0deg, transparent 60deg, transparent 360deg)'
            }}
          />

          <span className="relative z-10 text-3xl font-extrabold font-mono text-emerald-400">
            404
          </span>
        </div>

        <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full">
          RADAR SWEEP // 404 7
        </span>

        <h3 className="text-2xl font-bold tracking-tight mt-3">
          Uncharted Parking Partition
        </h3>
        <p className="text-xs text-neutral-400 mt-1 max-w-sm mx-auto">
          The requested coordinate or vehicle token was not found in the live MongoDB routing table.
        </p>

        {/* Inline Search Bar */}
        <form onSubmit={handleSearch} className="mt-6 flex items-center gap-2 max-w-md mx-auto">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search bay ID (e.g. A-04) or vehicle plate..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full px-4 py-2.5 pl-10 text-xs font-mono rounded-xl bg-neutral-900 border border-neutral-700 text-white focus:outline-none focus:ring-1 focus:ring-accent"
            />
            <Search className="absolute left-3.5 top-3 h-3.5 w-3.5 text-neutral-400" />
          </div>

          <button
            type="submit"
            className="px-4 py-2.5 rounded-xl bg-[#202632] text-[#F4E8D2] hover:bg-[#151A24] dark:bg-[#F4E8D2] dark:text-[#202632] dark:hover:bg-white font-bold text-xs transition-colors flex items-center gap-1 cursor-pointer active:scale-95"
          >
            <span>Scan</span>
            <CornerDownLeft className="h-3.5 w-3.5" />
          </button>
        </form>

        {/* Search Results Display */}
        {searchResult && (
          <div className={`mt-4 p-3 rounded-xl text-xs font-mono ${searchResult.found ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30' : 'bg-rose-500/15 text-rose-400 border border-rose-500/30'}`}>
            <p>{searchResult.message}</p>
          </div>
        )}

        <div className="mt-6 pt-4 border-t border-neutral-800 flex items-center justify-between text-xs text-neutral-500 font-mono">
          <span>MongoDB Query Exception</span>
          <button
            onClick={onClose}
            className="text-white hover:text-accent font-semibold underline underline-offset-4"
          >
            Return to Main Dashboard
          </button>
        </div>
      </motion.div>
    </div>
  );
}
