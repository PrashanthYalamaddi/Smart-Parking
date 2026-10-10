import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ChevronRight, Zap, Sparkles } from 'lucide-react';
import { sounds } from '../utils/audio';

const easing = [0.16, 1, 0.3, 1];

export default function Pricing1({ onOpenConsole }) {
  const [isAnnual, setIsAnnual] = useState(true);

  const TIERS = [
    {
      id: 'starter',
      name: 'Starter Facility',
      desc: 'For campus testing, small municipal lots, and university academic evaluation.',
      priceMonthly: '₹0',
      priceAnnual: '₹0',
      cadenceMonthly: '/ perpetual',
      cadenceAnnual: '/ perpetual',
      annualTotal: 'Free forever',
      annualSavings: 'Open Source Community Edition',
      badge: 'OPEN SOURCE',
      isPopular: false,
      features: [
        'Up to 50 smart parking bays',
        'Single node MongoDB database',
        'Express REST APIs with CRUD routes',
        'Standard React operations grid',
        'Manual attendant check-in and checkout',
        'Community documentation support'
      ]
    },
    {
      id: 'hub',
      name: 'Municipal Hub',
      desc: 'For Indian shopping complexes, metro interchanges, and busy city parking decks.',
      priceMonthly: '₹999',
      priceAnnual: '₹799',
      cadenceMonthly: '/ month (billed monthly)',
      cadenceAnnual: '/ month (billed ₹9,588 / yr)',
      annualTotal: '₹9,588 billed annually',
      annualSavings: 'Save ₹2,400 per year',
      badge: 'MOST POPULAR',
      isPopular: true,
      features: [
        'Up to 500 smart parking bays',
        'MongoDB Atlas 3-node replica set (India-West)',
        'NHAI NETC FASTag automated RFID barrier clearance',
        'Bharat UPI QR checkout (PhonePe, GPay, Paytm)',
        'Parivahan HSRP plate optical OCR reader',
        'Automated duration tariff with 18% GST invoicing',
        'Role-based access control (RBAC)',
        'Priority 24/7 technical hotline'
      ]
    },
    {
      id: 'fleet',
      name: 'Smart City Fleet',
      desc: 'For metropolitan transit authorities (MMRDA, Pune Smart City, BTP Bengaluru, Delhi NCR).',
      priceMonthly: '₹4,999',
      priceAnnual: '₹3,999',
      cadenceMonthly: '/ month (billed monthly)',
      cadenceAnnual: '/ month (billed ₹47,988 / yr)',
      annualTotal: '₹47,988 billed annually',
      annualSavings: 'Save ₹12,000 per year',
      badge: 'ENTERPRISE',
      isPopular: false,
      features: [
        'Unlimited bays and multi-zone municipal grids',
        'Dedicated high-throughput MongoDB enterprise cluster',
        'Multi-barrier synchronization engine',
        'City traffic command center API federation',
        'MoHUA and Smart Cities Mission compliance',
        'Hardware serial, MQTT and barrier control gateways',
        'Full 99.99% uptime SLA with dedicated field engineer'
      ]
    }
  ];

  return (
    <section className="bg-transparent px-6 py-20 md:py-32 relative" id="pricing">
      <div className="mx-auto max-w-6xl relative z-10">
        <div className="mb-12 text-center md:mb-16">
          <span className="text-xs font-mono font-semibold tracking-widest text-muted-foreground uppercase bg-muted/80 backdrop-blur-sm px-3 py-1.5 rounded-md border border-border inline-block mb-3">
            DEPLOYMENT PLANS // PRICING 1
          </span>
          <h2 className="mb-4 text-3xl font-medium tracking-tight md:text-4xl lg:text-5xl text-foreground">
            Indian Municipal Deployment Tiers
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Affordable pricing in Indian Rupees with built-in FASTag, UPI, and GST compliance. Choose monthly or annual billing.
          </p>

          {/* Billing Cycle Toggle with Legitimate Rate Calculation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: easing }}
            className="mt-8 inline-flex items-center gap-1.5 bg-card/90 backdrop-blur-md p-1.5 rounded-full border border-border shadow-md"
          >
            <button
              onClick={() => {
                sounds.playClick();
                setIsAnnual(false);
              }}
              className={`px-5 py-2 rounded-full text-xs font-mono font-bold transition-all cursor-pointer ${
                !isAnnual
                  ? 'bg-foreground text-background shadow-xs'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Monthly Billing
            </button>
            <button
              onClick={() => {
                sounds.playClick();
                setIsAnnual(true);
              }}
              className={`px-5 py-2 rounded-full text-xs font-mono font-bold transition-all cursor-pointer flex items-center gap-2 ${
                isAnnual
                  ? 'bg-foreground text-background shadow-xs'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <span>Annual Billing</span>
              <span className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded-full ${
                isAnnual ? 'bg-accent text-black font-extrabold' : 'bg-muted text-muted-foreground'
              }`}>
                Annual Rate
              </span>
            </button>
          </motion.div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {TIERS.map((tier, idx) => {
            const isHighlight = tier.isPopular;
            const price = isAnnual ? tier.priceAnnual : tier.priceMonthly;
            const cadence = isAnnual ? tier.cadenceAnnual : tier.cadenceMonthly;

            return (
              <motion.div
                key={tier.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.12, ease: easing }}
                whileHover={{ y: -6, transition: { duration: 0.25 } }}
                className={`rounded-3xl p-8 flex flex-col justify-between border transition-all duration-300 relative shadow-lg backdrop-blur-md ${
                  isHighlight
                    ? 'bg-card/95 border-accent shadow-2xl ring-2 ring-accent'
                    : 'bg-card/90 border-border hover:border-foreground/30 shadow-md'
                }`}
              >
                {/* Popular Badge */}
                {isHighlight && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-accent text-black text-[11px] font-extrabold font-mono uppercase px-3 py-1 rounded-full shadow-md">
                    {tier.badge}
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between">
                    <h3 className="text-2xl font-bold tracking-tight text-foreground">
                      {tier.name}
                    </h3>
                    {!isHighlight && (
                      <span className="text-[11px] font-mono text-muted-foreground uppercase bg-muted px-2 py-0.5 rounded border border-border">
                        {tier.badge}
                      </span>
                    )}
                  </div>

                  <p className="mt-3 text-xs text-muted-foreground leading-relaxed min-h-[40px]">
                    {tier.desc}
                  </p>

                  {/* Smooth Price Transition with Tabular Numeric Stability */}
                  <div className="mt-6 pb-6 border-b border-border flex flex-col justify-end min-h-[72px]">
                    <div className="flex items-baseline gap-1.5 overflow-hidden">
                      <AnimatePresence mode="wait">
                        <motion.span
                          key={price}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.2, ease: easing }}
                          className="text-4xl md:text-5xl font-extrabold tracking-tight text-foreground font-mono tabular-nums inline-block"
                        >
                          {price}
                        </motion.span>
                      </AnimatePresence>
                      <span className="text-xs font-mono text-muted-foreground">
                        {cadence}
                      </span>
                    </div>

                    {/* Calculated Savings or Billing Breakdown */}
                    <div className="mt-1 text-[11px] font-mono text-emerald-500 font-semibold min-h-[16px]">
                      {isAnnual && tier.id !== 'starter' ? (
                        <span>{tier.annualSavings}</span>
                      ) : (
                        <span className="text-muted-foreground">{tier.annualTotal}</span>
                      )}
                    </div>
                  </div>

                  {/* Feature Checklist */}
                  <ul className="mt-6 space-y-3">
                    {tier.features.map((feat) => (
                      <li key={feat} className="flex items-start gap-2.5 text-xs text-foreground/90">
                        <div className={`mt-0.5 rounded-full p-0.5 shrink-0 ${
                          isHighlight ? 'bg-accent text-black' : 'bg-muted text-foreground'
                        }`}>
                          <Check className="h-3 w-3 stroke-[3]" />
                        </div>
                        <span className="leading-snug">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8 pt-6 border-t border-border">
                  <button
                    onClick={() => {
                      sounds.playClick();
                      onOpenConsole();
                    }}
                    className={`w-full py-3.5 px-4 rounded-xl text-xs font-bold font-mono transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer ${
                      isHighlight
                        ? 'bg-accent hover:bg-accent-hover text-black shadow-lg shadow-accent/25 hover:rounded-[50px]'
                        : 'bg-muted hover:bg-foreground hover:text-background text-foreground border border-border hover:rounded-[50px]'
                    }`}
                  >
                    <span>
                      {tier.id === 'starter'
                        ? 'Deploy Starter Plan'
                        : isAnnual
                        ? `Deploy Annual ${tier.name}`
                        : `Deploy Monthly ${tier.name}`}
                    </span>
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
