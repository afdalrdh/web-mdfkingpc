'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';

export function ThemeToggle() {
  const { resolvedTheme, theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div
        className="w-[66px] h-[34px] rounded-full bg-slate-800/60 border border-white/10 shrink-0"
        aria-hidden="true"
      />
    );
  }

  const currentTheme = resolvedTheme || theme;
  const isDark = currentTheme === 'dark';

  return (
    <button
      type="button"
      role="switch"
      aria-checked={!isDark}
      aria-label={isDark ? 'Ganti ke Light Mode' : 'Ganti ke Dark Mode'}
      title={isDark ? 'Mode Gelap (Klik untuk beralih ke Mode Terang)' : 'Mode Terang (Klik untuk beralih ke Mode Gelap)'}
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className={`relative inline-flex items-center w-[66px] h-[34px] px-[3px] rounded-full transition-all duration-300 shrink-0 cursor-pointer select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${
        isDark
          ? 'bg-[#0E1322] border border-white/15 shadow-[inset_0_1px_3px_rgba(0,0,0,0.5)]'
          : 'bg-white border border-slate-200/90 shadow-[0_2px_8px_rgba(0,0,0,0.08),inset_0_1px_1px_rgba(255,255,255,0.9)]'
      }`}
    >
      {/* Background static icons layer */}
      <div className="absolute inset-0 flex items-center justify-between px-[9px] pointer-events-none">
        {/* Left slot: Sun icon (visible when dark) */}
        <span
          className={`flex items-center justify-center w-[26px] h-[26px] transition-all duration-300 ${
            !isDark ? 'opacity-0 scale-75' : 'opacity-40 text-slate-400 scale-100'
          }`}
        >
          <Sun className="w-3.5 h-3.5" strokeWidth={2.4} />
        </span>

        {/* Right slot: Moon icon (visible when light - matches reference image) */}
        <span
          className={`flex items-center justify-center w-[26px] h-[26px] transition-all duration-300 ${
            isDark ? 'opacity-0 scale-75' : 'opacity-50 text-slate-400 scale-100'
          }`}
        >
          <Moon className="w-3.5 h-3.5 fill-slate-400/20" strokeWidth={2.4} />
        </span>
      </div>

      {/* Sliding Active Blue Circle Knob with White Icon */}
      <span
        className={`relative z-10 flex items-center justify-center w-[26px] h-[26px] rounded-full bg-blue-600 text-white shadow-[0_2px_8px_rgba(37,99,235,0.45)] transition-transform duration-300 ease-[cubic-bezier(0.34,1.4,0.64,1)] ${
          isDark ? 'translate-x-[32px]' : 'translate-x-0'
        }`}
      >
        {isDark ? (
          <Moon className="w-3.5 h-3.5 text-white fill-white/10" strokeWidth={2.4} />
        ) : (
          <Sun className="w-3.5 h-3.5 text-white" strokeWidth={2.4} />
        )}
      </span>
    </button>
  );
}

