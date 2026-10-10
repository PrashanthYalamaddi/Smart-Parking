import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, ShieldCheck, Database, Server, Smartphone, ExternalLink } from 'lucide-react';
import { sounds } from '../utils/audio';

const easing = [0.16, 1, 0.3, 1];

const MENU_CARDS = [
  {
    id: 'operations',
    title: 'OPERATIONS',
    links: [
      { label: 'Live Parking Grid', href: '#live-console', badge: 'LIVE' },
      { label: 'Geospatial Campus Map', href: '#geospatial-map', badge: 'MAP' },
      { label: 'Vehicle Check-In', href: '#live-console', badge: null },
      { label: 'Automated Checkout', href: '#live-console', badge: null },
      { label: 'Sonar Radar Scanner', href: '#sonar-radar', badge: 'NEW' }
    ]
  },
  {
    id: 'mern-stack',
    title: 'MERN ARCHITECTURE',
    links: [
      { label: 'MongoDB Schema & Indexes', href: '#features-accordion', badge: null },
      { label: 'Express.js REST APIs', href: '#features-accordion', badge: null },
      { label: 'Node.js Sensor Engine', href: '#features-accordion', badge: null },
      { label: 'React Dashboard UI', href: '#features-accordion', badge: null }
    ]
  },
  {
    id: 'contact',
    title: 'CONTACT & SPECS',
    links: []
  }
];

export default function Navigation2({ onOpenAuth, onOpenConsole, onOpen404, currentRole }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [hasMounted, setHasMounted] = useState(false);
  const lastScrollY = React.useRef(0);

  useEffect(() => {
    setHasMounted(true);
    if (typeof window !== 'undefined') {
      lastScrollY.current = window.scrollY;
      setIsScrolled(window.scrollY > 20);
    }

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY < 40) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY.current + 8 && currentScrollY > 80) {
        if (!isOpen) setIsVisible(false);
      } else if (currentScrollY < lastScrollY.current - 6) {
        setIsVisible(true);
      }
      setIsScrolled(currentScrollY > 20);
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isOpen]);

  // Close menu on ESC key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <>
      {/* Backdrop overlay when menu is open */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-md"
          />
        )}
      </AnimatePresence>

      <motion.header
        initial={{ y: -16, opacity: 0 }}
        animate={{
          y: isVisible || isOpen ? 0 : -100,
          opacity: 1
        }}
        transition={{
          y: { duration: hasMounted ? 0.35 : 0.6, ease: easing },
          opacity: { duration: 0.5, ease: 'easeOut' }
        }}
        className="fixed top-0 left-0 z-50 flex w-full justify-center px-4 pt-3 sm:pt-4 pointer-events-none"
      >
        <motion.nav
          initial={false}
          animate={{
            width: isOpen ? '94vw' : isScrolled ? 'min(94vw, 42rem)' : 'min(94vw, 45rem)',
            maxWidth: isOpen ? '68rem' : '45rem'
          }}
          transition={{ duration: 0.35, ease: easing }}
          className="pointer-events-auto bg-[#202632]/95 text-[#F4E8D2] backdrop-blur-xl border border-[#F4E8D2]/20 shadow-2xl flex flex-col overflow-hidden rounded-2xl will-change-transform"
        >
          {/* Top Bar */}
          <div className="flex w-full items-center justify-between py-2.5 pr-2.5 pl-4">
            <a
              href="#"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2 group"
            >
              <span className="text-white text-2xl md:text-3xl font-extrabold tracking-tight">
                SPARK<span className="text-[#F4E8D2] ml-1">36</span>
              </span>
              <span className="hidden sm:inline-flex text-[11px] font-mono uppercase tracking-wider text-[#C4B69E] border border-white/20 rounded px-1.5 py-0.5 ml-2 items-center gap-1 bg-white/5">
                <span>🇮🇳</span>
                <span>India Smart Cities // MERN</span>
              </span>
            </a>

            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  sounds.playClick();
                  onOpenConsole();
                }}
                className="hidden md:inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-[#F4E8D2] transition-colors cursor-pointer"
              >
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                Live Console
              </button>

              <button
                onClick={() => {
                  sounds.playClick();
                  setIsOpen(!isOpen);
                }}
                className="text-white/80 hover:text-white flex h-full cursor-pointer items-center gap-2.5 rounded-lg px-3 py-1.5 transition-colors hover:bg-white/10"
                aria-expanded={isOpen}
                aria-label="Toggle Navigation Menu"
              >
                <div className="relative flex h-2.5 w-7 cursor-pointer flex-col justify-between">
                  <motion.span
                    className="block h-0.5 w-full origin-center rounded-full bg-current"
                    animate={isOpen ? { rotate: 45, y: 4 } : { rotate: 0, y: 0 }}
                    transition={{ duration: 0.4, ease: easing }}
                  />
                  <motion.span
                    className="block h-0.5 w-full origin-center rounded-full bg-current"
                    animate={isOpen ? { rotate: -45, y: -4 } : { rotate: 0, y: 0 }}
                    transition={{ duration: 0.4, ease: easing }}
                  />
                </div>
                <span className="text-sm font-semibold tracking-tight">
                  {isOpen ? 'Close' : 'Menu'}
                </span>
              </button>
            </div>
          </div>

          {/* Expandable Menu Panel */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.5, ease: easing }}
                className="overflow-y-auto max-h-[78vh] border-t border-white/10 px-4 pt-4 pb-6 scrollbar-hide"
              >
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                  {MENU_CARDS.map((card) => (
                    <motion.div
                      key={card.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, ease: easing }}
                      className="bg-white/5 min-h-48 rounded-xl p-5 border border-white/10 flex flex-col justify-between"
                    >
                      <div>
                        <span className="text-white/50 text-xs font-mono font-medium tracking-widest uppercase">
                          {card.title}
                        </span>

                        {card.id === 'contact' ? (
                          <div className="mt-4 flex flex-col gap-3">
                            <a
                              href="mailto:contact@smartcity-parking.gov"
                              className="text-white hover:text-accent text-lg font-medium transition-colors"
                            >
                              contact@smartcity-parking.gov
                            </a>
                            <p className="text-white/60 text-xs leading-relaxed">
                              Smart City & Transport Project 36. Full MERN stack implementation for urban slot management.
                            </p>
                            <div className="mt-3 flex items-center gap-2">
                              <span className="text-xs text-[#F4E8D2] font-mono">Role:</span>
                              <span className="text-xs font-semibold bg-[#F4E8D2]/20 text-[#F4E8D2] px-2 py-0.5 rounded capitalize">
                                {currentRole}
                              </span>
                            </div>
                            <button
                              onClick={() => {
                                setIsOpen(false);
                                onOpen404();
                              }}
                              className="mt-2 text-left text-xs text-white/50 hover:text-white transition-colors flex items-center gap-1 cursor-pointer"
                            >
                              <span>Inspect 404 Radar Sweep View</span>
                              <ArrowUpRight className="h-3 w-3" />
                            </button>
                          </div>
                        ) : (
                          <ul className="mt-3 space-y-1">
                            {card.links.map((link) => (
                              <li key={link.label}>
                                <a
                                  href={link.href}
                                  onClick={() => setIsOpen(false)}
                                  className="group flex items-center justify-between py-2 text-sm font-medium text-white/90 hover:text-white transition-colors"
                                >
                                  <span className="flex items-center gap-2 group-hover:translate-x-1 transition-transform">
                                    {link.label}
                                    {link.badge && (
                                      <span className="bg-[#F4E8D2] text-[#202632] text-[10px] font-bold px-1.5 py-0.2 rounded uppercase">
                                        {link.badge}
                                      </span>
                                    )}
                                  </span>
                                  <ArrowUpRight className="h-4 w-4 opacity-40 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                                </a>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Bottom Action Buttons in Dropdown */}
                <div className="mt-5 flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-white/10">
                  <div className="flex items-center gap-2 text-xs text-white/60">
                    <span className="h-2 w-2 rounded-full bg-emerald-400" />
                    <span>MongoDB Atlas: Replica Set Healthy</span>
                    <span className="mx-1">•</span>
                    <span>Express REST: 42ms</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => {
                        setIsOpen(false);
                        onOpenAuth();
                      }}
                      className="text-white rounded-lg bg-white/10 hover:bg-white/20 px-5 py-2.5 text-sm font-medium tracking-tight transition-colors"
                    >
                      Switch Role (Auth 3)
                    </button>
                    <button
                      onClick={() => {
                        setIsOpen(false);
                        onOpenConsole();
                      }}
                      className="group bg-accent relative rounded-lg px-6 py-2.5 text-sm font-semibold tracking-tight text-black transition-all duration-300 hover:rounded-[50px] hover:shadow-lg hover:shadow-accent/25"
                    >
                      <span className="relative block h-[1.25em] overflow-hidden">
                        <span className="flex flex-col duration-0 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-1/2 group-hover:transition-transform group-hover:duration-300">
                          <span className="block leading-[1.25em]">Launch MERN Console</span>
                          <span className="block leading-[1.25em]">Launch MERN Console</span>
                        </span>
                      </span>
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.nav>
      </motion.header>
    </>
  );
}
