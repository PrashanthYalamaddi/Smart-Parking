import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Zap, CheckCircle2 } from 'lucide-react';
import { sounds } from '../utils/audio';

const easing = [0.16, 1, 0.3, 1];

const TAGS = [
  '#SmartCity',
  '#MERNStack',
  '#MongoDB',
  '#ExpressJS',
  '#React19',
  '#NodeJS',
  '#IoTTelemetry',
  '#UltrasonicBays',
  '#RFIDGateControl',
  '#ZeroCongestion',
  '#RESTAPIs',
  '#AtomicSlotLocks',
  '#UrbanTransit',
  '#Project36'
];

export default function CTA14({ onOpenConsole }) {
  return (
    <section className="px-6 py-12 md:py-20 bg-transparent relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: easing }}
        className="relative mx-auto max-w-6xl overflow-hidden rounded-3xl bg-[#202632] text-[#F4E8D2] border border-[#F4E8D2]/20 shadow-2xl"
      >
        {/* Infinite Tag Marquee Banner */}
        <div className="overflow-hidden border-b border-[#F4E8D2]/15 py-3 bg-[#181E29]">
          <motion.div
            className="flex gap-8 whitespace-nowrap"
            animate={{ x: [0, -1000] }}
            transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
          >
            {[...TAGS, ...TAGS, ...TAGS].map((tag, i) => (
              <span
                key={i}
                className="text-xs font-mono font-medium text-[#C4B69E] flex items-center gap-2"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-[#F4E8D2]" />
                {tag}
              </span>
            ))}
          </motion.div>
        </div>

        {/* Split Panel Body */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 p-8 md:p-14 items-center">
          <div className="lg:col-span-8 space-y-4">
            <span className="text-xs font-mono text-[#F4E8D2] font-bold uppercase tracking-wider bg-[#F4E8D2]/10 px-2.5 py-0.5 rounded border border-[#F4E8D2]/20">
              READY FOR MUNICIPAL SCALE
            </span>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white leading-tight">
              Deploy Intelligent Slot Management to Your City Transit Fleet
            </h2>
            <p className="text-sm md:text-base text-[#C4B69E] max-w-xl leading-relaxed">
              Full MERN codebase with pre-configured schemas, REST endpoints, and responsive React dashboards ready for immediate demonstration.
            </p>
          </div>

          <div className="lg:col-span-4 flex flex-col gap-4">
            <motion.button
              whileHover={{ scale: 1.025 }}
              whileTap={{ scale: 0.975 }}
              onClick={() => {
                sounds.playClick();
                onOpenConsole();
              }}
              className="w-full py-4 px-6 rounded-2xl bg-[#F4E8D2] text-[#202632] hover:bg-white font-bold text-sm transition-all duration-300 hover:rounded-[50px] flex items-center justify-center gap-2 shadow-lg shadow-black/20 cursor-pointer active:scale-95"
            >
              <span>Explore Live Bay Grid</span>
              <ArrowUpRight className="h-5 w-5" />
            </motion.button>

            <div className="p-4 rounded-xl bg-black/30 border border-[#F4E8D2]/15 text-xs font-mono text-[#C4B69E] space-y-2">
              <div className="flex items-center justify-between">
                <span>Network Status:</span>
                <span className="text-emerald-400">ACTIVE PROD</span>
              </div>
              <div className="flex items-center justify-between">
                <span>API Gateway:</span>
                <span className="text-white">/api/v1/slots</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Engine:</span>
                <span className="text-[#F4E8D2]">MongoDB 8.0 ACID</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
