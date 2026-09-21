'use client';

import React from 'react';
import { MessageCircle } from 'lucide-react';
import { SITE_INFO } from '@/data/mockData';

export const WhatsAppButton: React.FC = () => {
  return (
    <a
      href={`https://wa.me/${SITE_INFO.whatsapp}?text=Halo%20mdfkingpc,%20saya%20ingin%20tanya%20service%20atau%20konsultasi%20device`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-3 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-2xl shadow-emerald-900/50 border border-emerald-400/40 transition-all duration-300 transform hover:scale-105 group"
      aria-label="Chat WhatsApp mdfkingpc"
    >
      <div className="relative">
        <MessageCircle className="w-5 h-5 text-white animate-pulse" />
        <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-300 rounded-full animate-ping" />
      </div>
      <span className="hidden sm:inline font-semibold">Konsultasi WhatsApp</span>
    </a>
  );
};
