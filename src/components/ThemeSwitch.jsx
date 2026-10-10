import React, { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';
import { sounds } from '../utils/audio';

export default function ThemeSwitch() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Check initial preference or localStorage
    const saved = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (saved === 'dark' || (!saved && prefersDark)) {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    } else {
      setIsDark(false);
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    sounds.playClick();
    const next = !isDark;
    setIsDark(next);
    if (next) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <button
        onClick={toggleTheme}
        className="flex h-11 w-11 items-center justify-center rounded-full bg-foreground/10 text-foreground backdrop-blur-md border border-foreground/15 shadow-lg transition-all duration-300 hover:scale-110 hover:bg-foreground hover:text-background focus:outline-none"
        aria-label="Toggle light or dark theme"
        title="Toggle color theme"
      >
        {isDark ? (
          <Sun className="h-5 w-5 transition-transform duration-300" />
        ) : (
          <Moon className="h-5 w-5 transition-transform duration-300" />
        )}
      </button>
    </div>
  );
}
