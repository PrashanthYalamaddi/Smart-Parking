import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Navigation2 from './components/Navigation2';
import ThemeSwitch from './components/ThemeSwitch';
import Hero25 from './components/Hero25';
import About13 from './components/About13';
import HowItWorks5 from './components/HowItWorks5';
import InteractiveConsole from './components/InteractiveConsole';
import ParkingMap from './components/ParkingMap';
import Features15 from './components/Features15';
import Features13 from './components/Features13';
import Stats14 from './components/Stats14';
import Stats10 from './components/Stats10';
import Comparison3 from './components/Comparison3';
import FAQ9 from './components/FAQ9';
import CTA13 from './components/CTA13';
import CTA14 from './components/CTA14';
import Contact7 from './components/Contact7';
import Footer5 from './components/Footer5';
import Auth3Modal from './components/Auth3Modal';
import NotFound404Block from './components/NotFound404Block';

export default function App() {
  const [isConsoleModalOpen, setIsConsoleModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [is404ModalOpen, setIs404ModalOpen] = useState(false);
  const [currentRole, setCurrentRole] = useState('admin'); // 'admin' | 'attendant' | 'driver'

  const scrollToConsole = () => {
    const el = document.getElementById('live-console');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      setIsConsoleModalOpen(true);
    }
  };

  const scrollToContact = () => {
    const el = document.getElementById('contact');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen bg-background font-sans text-foreground antialiased selection:bg-accent selection:text-black">
      {/* Skip to Content for Accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-accent focus:text-black focus:font-bold focus:rounded-md"
      >
        Skip to main content
      </a>

      {/* Floating Glass Navigation (Navigation 2) */}
      <Navigation2
        currentRole={currentRole}
        onOpenAuth={() => setIsAuthModalOpen(true)}
        onOpenConsole={scrollToConsole}
        onOpen404={() => setIs404ModalOpen(true)}
      />

      {/* Floating Theme Switcher */}
      <ThemeSwitch />

      {/* Main Content Area */}
      <main id="main-content" className="flex-1 overflow-x-hidden">
        {/* HERO SECTION (Hero 25 with 360-degree rotating wheel) */}
        <Hero25
          onOpenConsole={scrollToConsole}
          onSelectCard={() => scrollToConsole()}
        />

        {/* ABOUT & VALUES KINETIC SECTION (About 13) */}
        <About13 />

        {/* WORKFLOW STEPS (How It Works 5) */}
        <HowItWorks5 onOpenConsole={scrollToConsole} />

        {/* LIVE MERN SMART PARKING OPERATIONS CONSOLE */}
        <InteractiveConsole
          currentRole={currentRole}
          onRoleChange={setCurrentRole}
        />

        {/* GEOSPATIAL GOOGLE MAPS & TACTICAL RADAR GUIDANCE */}
        <ParkingMap />

        {/* SONAR RADAR SCANNER (Features 15) */}
        <Features15 />

        {/* MERN ARCHITECTURE ACCORDION & PREVIEW (Features 13) */}
        <Features13 onOpenConsole={scrollToConsole} />

        {/* STATS WITH SPARKLINES (Stats 14) */}
        <Stats14 />

        {/* COLOR-BLOCKED COUNT-UP STATS (Stats 10) */}
        <Stats10 />

        {/* BENCHMARK COMPARISON BAR CHART (Comparison 3) */}
        <Comparison3 />

        {/* CONTINUOUS UNIFIED ANIMATED BACKGROUND: DEPLOYMENT PLAN THROUGH OPERATIONAL INQUIRY */}
        <div className="relative overflow-hidden bg-background border-t border-border">
          {/* Continuous Ambient Deep Navy and Champagne Lighting (pointer-events-none, hardware-accelerated static gradients) */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden select-none" aria-hidden="true">
            <div className="absolute top-10 -left-20 w-[600px] h-[600px] rounded-full bg-[#202632]/10 dark:bg-[#F4E8D2]/10 blur-[100px]" />
            <div className="absolute top-1/4 -right-24 w-[600px] h-[600px] rounded-full bg-[#F4E8D2]/15 dark:bg-[#202632]/20 blur-[100px]" />
            <div className="absolute top-2/4 left-1/4 w-[600px] h-[500px] rounded-full bg-[#202632]/10 dark:bg-[#F4E8D2]/10 blur-[100px]" />
            <div className="absolute bottom-10 right-10 w-[600px] h-[600px] rounded-full bg-[#F4E8D2]/15 dark:bg-[#202632]/20 blur-[100px]" />
          </div>

          {/* Transparent Content Layer */}
          <div className="relative z-10">
            {/* KNOWLEDGE BASE FAQ (FAQ 9) */}
            <FAQ9 onOpenContact={scrollToContact} />

            {/* SERIF CTA PANEL WITH HALFTONE (CTA 13) */}
            <CTA13
              onOpenConsole={scrollToConsole}
              onOpenContact={scrollToContact}
            />

            {/* DARK SPLIT CTA WITH TAG MARQUEE (CTA 14) */}
            <CTA14 onOpenConsole={scrollToConsole} />

            {/* NARROW ARCHITECTURE INQUIRY FORM (Contact 7) */}
            <Contact7 />
          </div>
        </div>
      </main>

      {/* FOOTER (Footer 5) */}
      <Footer5
        onOpenConsole={scrollToConsole}
        onOpenContact={scrollToContact}
      />

      {/* AUTH 3 MODAL */}
      <Auth3Modal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        currentRole={currentRole}
        onSelectRole={(role) => setCurrentRole(role)}
      />

      {/* 404 7 RADAR SWEEP MODAL */}
      <NotFound404Block
        isOpen={is404ModalOpen}
        onClose={() => setIs404ModalOpen(false)}
      />
    </div>
  );
}
