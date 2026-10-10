import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, ArrowUpRight } from 'lucide-react';

export default function Footer5({ onOpenConsole, onOpenContact }) {
  return (
    <footer className="bg-[#202632] px-6 py-16 text-[#F4E8D2] md:px-12 lg:px-20 rounded-tr-3xl rounded-tl-3xl md:rounded-tr-4xl md:rounded-tl-4xl mt-12 border-t border-[#F4E8D2]/20">
      <div className="mx-auto max-w-6xl">
        {/* Upper Grid */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-20">
          <div className="max-w-md">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl font-extrabold tracking-tight">
                SPARK<span className="underline decoration-[#F4E8D2]">36</span>
              </span>
              <span className="text-xs font-mono font-bold bg-[#F4E8D2] text-[#202632] px-2 py-0.5 rounded">
                MERN STACK
              </span>
            </div>

            <p className="text-lg leading-relaxed text-[#C4B69E]">
              Ready for intelligent urban mobility? SPARK 36 transforms congested municipal lots into coordinated, real-time parking ecosystems with MongoDB atomic records and Express REST APIs.
            </p>

            <button
              onClick={onOpenConsole}
              className="group mt-8 inline-flex items-center gap-3 rounded-md bg-[#F4E8D2] text-[#202632] py-3 pl-5 pr-3 font-semibold shadow-lg shadow-black/20 transition-all duration-500 ease-out hover:rounded-[50px] hover:bg-white cursor-pointer active:scale-95"
            >
              <span>Launch Live Console</span>
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#202632] text-[#F4E8D2] transition-all duration-300 group-hover:scale-110">
                <ChevronRight className="h-4 w-4 relative left-px" />
              </span>
            </button>
          </div>

          <div className="grid grid-cols-2 gap-8 lg:justify-items-end">
            <div>
              <h4 className="mb-4 text-xs font-mono font-bold uppercase tracking-wider text-[#C4B69E]/70">
                MERN Architecture
              </h4>
              <ul className="space-y-3 text-sm">
                <li>
                  <a href="#features-accordion" className="inline-block text-[#C4B69E] transition-all duration-300 hover:translate-x-1 hover:text-[#F4E8D2]">
                    MongoDB Schema
                  </a>
                </li>
                <li>
                  <a href="#features-accordion" className="inline-block text-[#C4B69E] transition-all duration-300 hover:translate-x-1 hover:text-[#F4E8D2]">
                    Express REST APIs
                  </a>
                </li>
                <li>
                  <a href="#features-accordion" className="inline-block text-[#C4B69E] transition-all duration-300 hover:translate-x-1 hover:text-[#F4E8D2]">
                    Node.js Sensor Engine
                  </a>
                </li>
                <li>
                  <a href="#sonar-radar" className="inline-block text-[#C4B69E] transition-all duration-300 hover:translate-x-1 hover:text-[#F4E8D2]">
                    Sonar Radar Scanner
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="mb-4 text-xs font-mono font-bold uppercase tracking-wider text-[#C4B69E]/70">
                System Navigation
              </h4>
              <ul className="space-y-3 text-sm">
                <li>
                  <a href="#how-it-works" className="inline-block text-[#C4B69E] transition-all duration-300 hover:translate-x-1 hover:text-[#F4E8D2]">
                    Workflow Steps
                  </a>
                </li>
                <li>
                  <a href="#comparison" className="inline-block text-[#C4B69E] transition-all duration-300 hover:translate-x-1 hover:text-[#F4E8D2]">
                    Benchmark Comparison
                  </a>
                </li>
                <li>
                  <a href="#geospatial-map" className="inline-block text-[#C4B69E] transition-all duration-300 hover:translate-x-1 hover:text-[#F4E8D2]">
                    Geospatial Campus Map
                  </a>
                </li>
                <li>
                  <a href="#faq" className="inline-block text-[#C4B69E] transition-all duration-300 hover:translate-x-1 hover:text-[#F4E8D2]">
                    Knowledge Base
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="my-16 h-px bg-[#F4E8D2]/15" />

        {/* Lower Grid: Giant Typography & Contact Details */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <h2 className="text-6xl font-medium leading-none tracking-tight md:text-7xl lg:text-8xl text-[#F4E8D2]">
              Reach<br />Out To Us
            </h2>
            <p className="mt-8 text-xs font-mono text-[#C4B69E]/80">
              © 2026 Smart City & Transport Project 36. MERN System Architecture.
            </p>
          </div>

          <div className="flex flex-col justify-between gap-8 lg:items-end lg:text-right">
            <div className="space-y-6 text-sm">
              <div>
                <h4 className="mb-1 font-bold text-[#F4E8D2]">Smart Mobility Command Centre</h4>
                <p className="text-[#C4B69E] leading-relaxed">
                  Malla Reddy Vishwavidyapeeth Campus<br />
                  Hyderabad, Telangana 500100, India<br />
                  Mon-Fri 9:00 am - 6:00 pm (IST)
                </p>
              </div>

              <a
                href="mailto:contact@smartcity-parking.gov.in"
                className="inline-block text-lg font-bold underline underline-offset-4 text-[#F4E8D2] transition-opacity hover:opacity-75"
              >
                contact@smartcity-parking.gov.in
              </a>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-3 lg:justify-end">
              <a
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-[#F4E8D2] transition-all duration-300 hover:scale-110 hover:bg-[#F4E8D2] hover:text-[#202632]"
                aria-label="Twitter / X"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-[#F4E8D2] transition-all duration-300 hover:scale-110 hover:bg-[#F4E8D2] hover:text-[#202632]"
                aria-label="LinkedIn"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
              <a
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-[#F4E8D2] transition-all duration-300 hover:scale-110 hover:bg-[#F4E8D2] hover:text-[#202632]"
                aria-label="GitHub"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
