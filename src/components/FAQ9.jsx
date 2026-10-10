import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, MessageSquare, Phone, Mail, Clock, HelpCircle, Sparkles } from 'lucide-react';
import { FAQS } from '../data/parkingData';
import { sounds } from '../utils/audio';

const easing = [0.16, 1, 0.3, 1];

export default function FAQ9({ onOpenContact }) {
  const [openIdx, setOpenIdx] = useState(0);

  // Automatically advance to the next FAQ item every 3 seconds without pause-on-hover
  useEffect(() => {
    const timer = setInterval(() => {
      setOpenIdx((prev) => (prev === null ? 0 : (prev + 1) % FAQS.length));
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  const toggle = (idx) => {
    sounds.playClick();
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section className="bg-transparent px-6 py-20 md:py-32 border-t border-border/60 relative z-10" id="faq">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Sticky contact panel on the left (4 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: easing }}
            className="lg:col-span-4 lg:sticky lg:top-28 space-y-6"
          >
            <div>
              <span className="text-xs font-mono font-bold tracking-widest text-accent uppercase bg-accent/15 px-3 py-1.5 rounded-md border border-accent/25 inline-block mb-3">
                KNOWLEDGE BASE // FAQ 9
              </span>
              <h2 className="text-3xl font-medium tracking-tight md:text-4xl text-foreground">
                Frequently Answered Inquiries
              </h2>
              <p className="text-muted-foreground text-sm mt-3 leading-relaxed">
                Clear technical answers regarding MERN database schemas, REST APIs, ultrasonic sensor synchronization, and operational SLAs.
              </p>

              {/* Automatic Cycle Indicator */}
              <div className="mt-4 flex items-center gap-2 text-xs font-mono text-muted-foreground bg-muted/60 p-2.5 rounded-xl border border-border">
                <span className="h-2 w-2 rounded-full bg-accent animate-pulse" />
                <span>Auto-Cycling Questions (3s cadence)</span>
                <span className="ml-auto font-bold text-foreground">
                  {openIdx !== null ? `${openIdx + 1}/${FAQS.length}` : '-'}
                </span>
              </div>
            </div>

            {/* Sticky Contact Box */}
            <div className="rounded-2xl p-6 bg-card border border-border shadow-md space-y-4">
              <h4 className="text-sm font-bold uppercase tracking-wider text-foreground">
                Need Dedicated Architecture Support?
              </h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Our transit engineering staff can answer questions about camera OCR integration or custom MongoDB schemas.
              </p>

              <div className="space-y-2 text-xs font-mono text-muted-foreground pt-3 border-t border-border">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-accent" />
                  <span className="text-foreground">support@smartcity-parking.gov</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-accent" />
                  <span className="text-foreground">Avg Response: Under 15 Minutes</span>
                </div>
              </div>

              <button
                onClick={() => {
                  sounds.playClick();
                  onOpenContact();
                }}
                className="w-full mt-2 py-3 px-4 rounded-xl bg-[#202632] text-[#F4E8D2] hover:bg-[#151A24] dark:bg-[#F4E8D2] dark:text-[#202632] dark:hover:bg-white font-bold text-xs transition-all shadow-sm cursor-pointer hover:rounded-[50px] active:scale-95"
              >
                Open Architecture Inquiry Form
              </button>
            </div>
          </motion.div>

          {/* Accordion list on the right (8 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15, ease: easing }}
            className="lg:col-span-8 bg-card text-foreground rounded-3xl p-6 md:p-10 border border-border shadow-xl"
          >
            <div className="space-y-3">
              {FAQS.map((faq, idx) => {
                const isOpen = openIdx === idx;
                const buttonId = `faq-btn-${idx}`;
                const panelId = `faq-panel-${idx}`;

                return (
                  <div
                    key={idx}
                    className={`rounded-2xl transition-all duration-300 border ${
                      isOpen
                        ? 'bg-muted/40 border-accent/40 shadow-sm'
                        : 'border-border/60 hover:border-border hover:bg-muted/20'
                    }`}
                  >
                    <button
                      id={buttonId}
                      aria-controls={panelId}
                      aria-expanded={isOpen}
                      onClick={() => toggle(idx)}
                      className="group flex w-full items-center justify-between p-5 text-left cursor-pointer"
                    >
                      <div className="flex items-center gap-3.5 pr-4">
                        <span className={`text-xs font-mono font-bold px-2 py-1 rounded transition-colors ${
                          isOpen ? 'bg-[#202632] text-[#F4E8D2] dark:bg-[#F4E8D2] dark:text-[#202632]' : 'bg-muted text-muted-foreground'
                        }`}>
                          0{idx + 1}
                        </span>
                        <span className={`text-base md:text-lg font-medium leading-snug transition-colors ${
                          isOpen ? 'text-foreground font-semibold' : 'text-foreground/90 group-hover:text-foreground'
                        }`}>
                          {faq.q}
                        </span>
                      </div>
                      <div className={`shrink-0 p-1.5 rounded-full transition-colors ${
                        isOpen ? 'bg-[#202632] text-[#F4E8D2] dark:bg-[#F4E8D2] dark:text-[#202632]' : 'bg-muted text-muted-foreground group-hover:text-foreground'
                      }`}>
                        <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                      </div>
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          id={panelId}
                          role="region"
                          aria-labelledby={buttonId}
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.35, ease: easing }}
                          className="overflow-hidden"
                        >
                          <div className="px-5 pb-5 pt-1 text-sm md:text-base text-muted-foreground leading-relaxed border-t border-border/40 mt-1">
                            {faq.a}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
