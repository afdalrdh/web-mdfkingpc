'use client';

import React, { useRef, useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  ArrowRight, Tag, 
  Clock, Heart, Check
} from 'lucide-react';
import { SERVICES_LIST } from '@/data/mockData';

interface ServiceItem {
  id: string;
  slug: string;
  title: string;
  category: string;
  shortDesc?: string;
  fullDesc?: string;
  priceStarting: string;
  price?: number;
  imageUrl: string;
  badge?: string;
  features?: string[];
}

export default function ServicesSlider() {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [services, setServices] = useState<ServiceItem[]>(SERVICES_LIST);
  const [isDragging, setIsDragging] = useState(false);

  // Drag-to-scroll refs
  const startXRef = useRef(0);
  const scrollLeftStartRef = useRef(0);
  const hasMovedRef = useRef(false);

  // Fetch updated services from API (so admin changes reflect here)
  useEffect(() => {
    fetch('/api/services')
      .then((r) => r.json())
      .then((data) => {
        if (data.success && Array.isArray(data.data) && data.data.length > 0) {
          setServices(data.data);
        }
      })
      .catch(console.error);
  }, []);

  // Load favorites from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem('mdfkingpc_fav_services');
      if (stored) {
        setFavorites(JSON.parse(stored));
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  const toggleFavorite = (serviceId: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setFavorites((prev) => {
      const updated = prev.includes(serviceId)
        ? prev.filter((id) => id !== serviceId)
        : [...prev, serviceId];
      try {
        localStorage.setItem('mdfkingpc_fav_services', JSON.stringify(updated));
      } catch (err) {
        console.error(err);
      }
      return updated;
    });
  };

  const getStepWidth = useCallback(() => {
    if (!sliderRef.current) return 460;
    const firstCard = sliderRef.current.firstElementChild as HTMLElement;
    return firstCard ? firstCard.offsetWidth + 24 : 460;
  }, []);

  const updateActiveIndex = useCallback(() => {
    if (!sliderRef.current) return;
    const { scrollLeft } = sliderRef.current;
    const step = getStepWidth();
    const index = Math.round(scrollLeft / step);
    setActiveIndex(Math.max(0, Math.min(index, services.length - 1)));
  }, [getStepWidth, services.length]);

  useEffect(() => {
    const el = sliderRef.current;
    if (!el) return;

    updateActiveIndex();
    el.addEventListener('scroll', updateActiveIndex, { passive: true });
    window.addEventListener('resize', updateActiveIndex);

    return () => {
      el.removeEventListener('scroll', updateActiveIndex);
      window.removeEventListener('resize', updateActiveIndex);
    };
  }, [updateActiveIndex, services]);

  const scrollToIndex = (index: number) => {
    if (!sliderRef.current) return;
    const step = getStepWidth();
    sliderRef.current.scrollTo({
      left: index * step,
      behavior: 'smooth',
    });
  };

  // Mouse Drag to Scroll handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!sliderRef.current) return;
    setIsDragging(true);
    hasMovedRef.current = false;
    startXRef.current = e.pageX - sliderRef.current.offsetLeft;
    scrollLeftStartRef.current = sliderRef.current.scrollLeft;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !sliderRef.current) return;
    const x = e.pageX - sliderRef.current.offsetLeft;
    const walk = x - startXRef.current;
    if (Math.abs(walk) > 5) {
      hasMovedRef.current = true;
    }
    sliderRef.current.scrollLeft = scrollLeftStartRef.current - walk;
  };

  const handleMouseUpOrLeave = () => {
    if (isDragging) {
      setIsDragging(false);
      updateActiveIndex();
    }
  };

  const handleCardClickCapture = (e: React.MouseEvent) => {
    if (hasMovedRef.current) {
      e.preventDefault();
      e.stopPropagation();
      hasMovedRef.current = false;
    }
  };

  return (
    <div className="relative select-none">
      {/* Outer Slider Wrapper with Smooth Gradient Peek Fades */}
      <div className="relative -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8">
        {/* Scrollable Track */}
        <div
          ref={sliderRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUpOrLeave}
          onMouseLeave={handleMouseUpOrLeave}
          className={`flex gap-6 overflow-x-auto no-scrollbar pb-6 pt-2 ${
            isDragging ? 'cursor-grabbing select-none scroll-auto' : 'cursor-grab snap-x snap-proximity'
          }`}
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {services.map((service) => {
            const isFav = favorites.includes(service.id);
            const detailUrl = `/layanan/${service.slug}`;

            return (
              <div
                key={service.id}
                onClickCapture={handleCardClickCapture}
                className="snap-start shrink-0 w-[86vw] sm:w-[400px] md:w-[430px] lg:w-[460px] group transition-all duration-300"
              >
                {/* Reference Card Container (Wide Rounded Card) */}
                <div className="h-full rounded-[30px] p-3.5 sm:p-4 transition-all duration-300 flex flex-col justify-between
                  dark:bg-[#0C0E17] bg-white
                  border dark:border-white/[0.08] border-slate-200/90
                  shadow-[0_12px_35px_rgba(0,0,0,0.06)] dark:shadow-[0_15px_40px_rgba(0,0,0,0.7)]
                  hover:shadow-[0_20px_50px_rgba(37,99,235,0.15)] dark:hover:shadow-[0_20px_50px_rgba(6,182,212,0.18)]
                  hover:border-blue-400 dark:hover:border-cyan-500/40"
                >
                  <div className="space-y-4">
                    {/* Top Framed Image (Wide Cinematic Aspect Ratio) */}
                    <div className="relative w-full aspect-[16/10] rounded-[22px] overflow-hidden bg-slate-900 border dark:border-white/[0.06] border-slate-100 pointer-events-none">
                      <Image
                        src={service.imageUrl}
                        alt={service.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                        sizes="(max-width: 768px) 86vw, 460px"
                      />

                      {/* Top Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />

                      {/* Top Badges */}
                      <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between pointer-events-none">
                        <span className="px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider backdrop-blur-md dark:bg-black/60 bg-white/90 dark:text-cyan-300 text-slate-800 border dark:border-white/10 border-white/40 shadow-sm">
                          {service.category}
                        </span>

                        {service.badge && (
                          <span className="px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-rose-500 text-white shadow-md shadow-rose-500/30">
                            {service.badge}
                          </span>
                        )}
                      </div>

                      {/* Subtle Bottom Glow inside Image */}
                      <div className="absolute bottom-3 left-3.5 flex items-center gap-1.5 preserve-white-text !text-white text-[11px] font-semibold">
                        <Check className="w-3.5 h-3.5 text-cyan-400" />
                        <span className="!text-white preserve-white-text">Garansi Resmi 30 Hari</span>
                      </div>
                    </div>

                    {/* Card Content Area */}
                    <div className="px-1.5 space-y-3">
                      <div>
                        {/* Title */}
                        <Link href={detailUrl} className="block group/title">
                          <h3 className="text-xl sm:text-2xl font-black tracking-tight leading-snug dark:text-white text-slate-900 font-sans transition-colors group-hover/title:text-blue-500 dark:group-hover/title:text-cyan-400 line-clamp-1">
                            {service.title}
                          </h3>
                        </Link>

                        {/* Subtitle / Service Scope */}
                        <p className="text-xs sm:text-sm dark:text-slate-400 text-slate-500 font-medium mt-1 line-clamp-1">
                          {service.features?.[0] || 'Diagnostik Gratis Rp 0 & Pengerjaan Bergaransi'}
                        </p>
                      </div>

                      {/* Meta Info Row */}
                      <div className="flex flex-wrap items-center gap-3 pt-1 text-xs">
                        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full dark:bg-white/[0.04] bg-slate-100 dark:border-white/[0.08] border-slate-200/80">
                          <Tag className="w-3.5 h-3.5 text-cyan-500 dark:text-cyan-400" />
                          <span className="dark:text-slate-400 text-slate-500 font-medium">Mulai</span>
                          <span className="font-extrabold text-blue-600 dark:text-cyan-300 font-sans">
                            {service.priceStarting}
                          </span>
                        </div>

                        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full dark:bg-white/[0.04] bg-slate-100 dark:border-white/[0.08] border-slate-200/80">
                          <Clock className="w-3.5 h-3.5 text-amber-500" />
                          <span className="dark:text-slate-300 text-slate-700 font-semibold">1-2 Jam Selesai</span>
                        </div>
                      </div>

                      {/* Short Description */}
                      <p className="text-xs dark:text-slate-400 text-slate-600 line-clamp-2 leading-relaxed pt-1">
                        {service.shortDesc}
                      </p>
                    </div>
                  </div>

                  {/* Bottom Action Row */}
                  <div className="flex items-center gap-3 pt-5 mt-4 border-t dark:border-white/[0.06] border-slate-100">
                    {/* Wide Pill Button */}
                    <Link
                      href={detailUrl}
                      className="flex-1 py-3 px-6 rounded-full font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all duration-300
                        dark:bg-gradient-to-r dark:from-blue-600 dark:via-blue-500 dark:to-cyan-500 dark:text-white dark:shadow-[0_0_20px_rgba(37,99,235,0.35)] dark:hover:shadow-[0_0_28px_rgba(6,182,212,0.5)] dark:hover:brightness-110
                        bg-slate-900 hover:bg-blue-600 !text-white shadow-sm hover:shadow-md group/btn cursor-pointer"
                    >
                      <span className="!text-white preserve-white-text font-bold">Detail Layanan</span>
                      <ArrowRight className="w-4 h-4 ml-0.5 group-hover/btn:translate-x-1 transition-transform !text-white preserve-white-text" />
                    </Link>

                    {/* Circular Action Button */}
                    <button
                      type="button"
                      onClick={(e) => toggleFavorite(service.id, e)}
                      title={isFav ? 'Hapus dari Favorit' : 'Simpan Layanan Ini'}
                      aria-label={isFav ? 'Hapus dari Favorit' : 'Simpan Layanan Ini'}
                      className={`w-11 h-11 rounded-full border flex items-center justify-center shrink-0 transition-all duration-200 group/fav cursor-pointer ${
                        isFav
                          ? 'bg-rose-500/15 border-rose-500/40 text-rose-500 shadow-sm'
                          : 'dark:border-white/10 border-slate-200/90 dark:bg-white/[0.03] bg-slate-50 text-slate-400 hover:text-rose-500 hover:border-rose-400/50 hover:bg-rose-500/5'
                      }`}
                    >
                      <Heart
                        className={`w-4 h-4 transition-transform duration-200 group-hover/fav:scale-110 ${
                          isFav ? 'fill-rose-500 text-rose-500' : 'text-slate-400 group-hover/fav:text-rose-500'
                        }`}
                      />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Pagination Dot Indicators */}
      <div className="flex items-center justify-center gap-2 mt-6">
        {services.map((_, dotIdx) => (
          <button
            key={dotIdx}
            type="button"
            onClick={() => scrollToIndex(dotIdx)}
            aria-label={`Ke slide ${dotIdx + 1}`}
            className={`transition-all duration-300 rounded-full cursor-pointer ${
              activeIndex === dotIdx
                ? 'w-7 h-2 bg-gradient-to-r from-blue-500 to-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.4)]'
                : 'w-2 h-2 dark:bg-white/20 bg-slate-300 hover:bg-slate-400 dark:hover:bg-white/40'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
