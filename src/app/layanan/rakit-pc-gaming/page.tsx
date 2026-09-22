'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { PC_COMPONENTS_DB, SITE_INFO, PC_PACKAGES, PcComponentItem } from '@/data/mockData';
import { Cpu, Cpu as GpuIcon, Layers, HardDrive, Zap, Box, Thermometer, Sparkles, Download, MessageSquare, Check, RefreshCw } from 'lucide-react';

export default function RakitPCPage() {
  const [selectedComponents, setSelectedComponents] = useState<Record<string, PcComponentItem>>({
    cpu: PC_COMPONENTS_DB.find((c) => c.id === 'cpu-13400f') || PC_COMPONENTS_DB[0],
    gpu: PC_COMPONENTS_DB.find((c) => c.id === 'gpu-rtx4060') || PC_COMPONENTS_DB[5],
    motherboard: PC_COMPONENTS_DB.find((c) => c.id === 'mb-b760') || PC_COMPONENTS_DB[10],
    ram: PC_COMPONENTS_DB.find((c) => c.id === 'ram-16ddr4') || PC_COMPONENTS_DB[13],
    ssd: PC_COMPONENTS_DB.find((c) => c.id === 'ssd-1tb') || PC_COMPONENTS_DB[17],
    psu: PC_COMPONENTS_DB.find((c) => c.id === 'psu-650w') || PC_COMPONENTS_DB[20],
    case: PC_COMPONENTS_DB.find((c) => c.id === 'case-aquarium') || PC_COMPONENTS_DB[23],
    cooler: PC_COMPONENTS_DB.find((c) => c.id === 'cooler-air-ag400') || PC_COMPONENTS_DB[26],
  });

  const [aiAnalysis, setAiAnalysis] = useState<any>(null);
  const [loadingAi, setLoadingAi] = useState(false);

  const categories = [
    { key: 'cpu', name: 'Processor (CPU)', icon: Cpu },
    { key: 'gpu', name: 'Kartu Grafis (GPU)', icon: GpuIcon },
    { key: 'motherboard', name: 'Motherboard', icon: Layers },
    { key: 'ram', name: 'Memori RAM', icon: Layers },
    { key: 'ssd', name: 'Storage SSD NVMe', icon: HardDrive },
    { key: 'psu', name: 'Power Supply (PSU)', icon: Zap },
    { key: 'case', name: 'Casing PC', icon: Box },
    { key: 'cooler', name: 'Pendingin (Cooler)', icon: Thermometer },
  ];

  const calculateTotal = () => {
    return Object.values(selectedComponents).reduce((acc, curr) => acc + (curr ? curr.price : 0), 0);
  };

  const handleSelectComponent = (category: string, item: PcComponentItem) => {
    setSelectedComponents((prev) => ({ ...prev, [category]: item }));
  };

  // Trigger Groq AI Recommendation API Call
  const handleAnalyzeWithGroq = async () => {
    setLoadingAi(true);
    setAiAnalysis(null);
    try {
      const payload = {
        components: {
          cpu: selectedComponents.cpu?.name,
          gpu: selectedComponents.gpu?.name,
          motherboard: selectedComponents.motherboard?.name,
          ram: selectedComponents.ram?.name,
          ssd: selectedComponents.ssd?.name,
          psu: selectedComponents.psu?.name,
          case: selectedComponents.case?.name,
          cooler: selectedComponents.cooler?.name,
          totalPrice: calculateTotal(),
        },
        targetUsage: 'Gaming 1080p/1440p & Editing Video',
      };

      const res = await fetch('/api/ai/recommend-build', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (data.success) {
        setAiAnalysis(data.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingAi(false);
    }
  };

  // Download notepad (.txt)
  const handleDownloadNotepad = () => {
    const totalFormatted = new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(calculateTotal());

    let content = `====================================================\n`;
    content += `        MDFKINGPC BANDUNG - SPESIFIKASI RAKIT PC     \n`;
    content += `====================================================\n`;
    content += `Tanggal Simulasi : ${new Date().toLocaleDateString('id-ID')}\n`;
    content += `WA Konsultasi    : +62 851-5891-6661\n`;
    content += `Alamat Workshop  : Jl. Ir. H. Juanda No. 154, Dago, Bandung\n\n`;
    content += `RINCIAN KOMPONEN TERPILIH (HARGA ESTIMASI 2025-2026):\n`;
    content += `----------------------------------------------------\n`;

    categories.forEach((cat) => {
      const comp = selectedComponents[cat.key];
      const priceStr = comp ? `Rp ${comp.price.toLocaleString('id-ID')}` : 'Rp 0';
      content += `• ${cat.name.padEnd(22)} : ${comp ? comp.name : 'Belum Dipilih'} (${priceStr})\n`;
    });

    content += `----------------------------------------------------\n`;
    content += `TOTAL ESTIMASI BIAYA : ${totalFormatted}\n`;
    content += `====================================================\n`;
    content += `* Harga sewaktu-waktu dapat berubah sesuai stok distributor.\n`;
    content += `* Sudah termasuk perakitan rapi, cable management, & install OS.\n`;

    const element = document.createElement('a');
    const file = new Blob([content], { type: 'text/plain;charset=utf-8' });
    element.href = URL.createObjectURL(file);
    element.download = `mdfkingpc_simulasi_rakit_pc_${Date.now().toString().slice(-6)}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  // Send Order via WhatsApp to 085158916661
  const handleOrderViaWhatsApp = () => {
    const totalFormatted = new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(calculateTotal());

    let text = `Halo mdfkingpc, saya ingin memesan perakitan PC dengan spesifikasi pilihan berikut:\n\n`;
    categories.forEach((cat) => {
      const comp = selectedComponents[cat.key];
      if (comp) {
        text += `• *${cat.name}*: ${comp.name} (Rp ${comp.price.toLocaleString('id-ID')})\n`;
      }
    });

    text += `\n*TOTAL ESTIMASI BIAYA*: ${totalFormatted}\n\nMohon info stok dan ketersediaan perakitannya di mdfkingpc Bandung. Terima kasih!`;

    const encoded = encodeURIComponent(text);
    window.open(`https://wa.me/${SITE_INFO.whatsapp}?text=${encoded}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-brand-dark text-slate-100 flex flex-col font-sans">
      <main className="flex-1">
        {/* Header Hero */}
        <section className="py-12 bg-gradient-to-b from-brand-dark via-slate-900 to-brand-dark border-b border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs font-bold uppercase tracking-wider mb-4">
              <Sparkles className="w-4 h-4 text-brand-red" />
              <span>Simulasi & Kalkulator Harga Komponen 2025-2026</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
              Simulasi Perhitungan <span className="text-sky-400">Rakit PC Gaming</span>
            </h1>
            <p className="text-slate-400 text-sm sm:text-base max-w-2xl mx-auto">
              Pilih komponen impian Anda, hitung harga otomatis, dan minta analisis kompatibilitas Cerdas bertenaga AI Groq!
            </p>
          </div>
        </section>

        {/* Builder Container */}
        <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left: Component Selectors */}
            <div className="lg:col-span-8 space-y-6">
              {categories.map((cat) => {
                const IconComp = cat.icon;
                const options = PC_COMPONENTS_DB.filter((c) => c.category === cat.key);
                const currentSelected = selectedComponents[cat.key];

                return (
                  <div key={cat.key} className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 shadow-xl backdrop-blur-md">
                    <div className="flex items-center justify-between mb-4 border-b border-slate-800 pb-3">
                      <div className="flex items-center gap-3">
                        <div className="p-2.5 rounded-xl bg-sky-500/10 text-sky-400">
                          <IconComp className="w-5 h-5" />
                        </div>
                        <h3 className="font-bold text-white text-base">{cat.name}</h3>
                      </div>
                      <span className="text-xs font-black text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
                        {currentSelected ? `Rp ${currentSelected.price.toLocaleString('id-ID')}` : 'Rp 0'}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {options.map((item) => {
                        const isSelected = currentSelected?.id === item.id;
                        return (
                          <div
                            key={item.id}
                            onClick={() => handleSelectComponent(cat.key, item)}
                            className={`p-3.5 rounded-2xl border cursor-pointer transition-all ${
                              isSelected
                                ? 'bg-sky-500/15 border-sky-500 text-white shadow-lg shadow-sky-500/10'
                                : 'bg-slate-800/40 border-slate-700/60 hover:border-slate-600 text-slate-300'
                            }`}
                          >
                            <div className="flex items-start justify-between">
                              <div className="text-xs font-bold leading-snug">{item.name}</div>
                              {isSelected && <Check className="w-4 h-4 text-sky-400 flex-shrink-0" />}
                            </div>
                            <div className="text-[11px] text-slate-400 mt-1 line-clamp-1">{item.specs}</div>
                            <div className="text-xs font-black text-emerald-400 mt-2">
                              Rp {item.price.toLocaleString('id-ID')}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Right: Summary & AI Analysis */}
            <div className="lg:col-span-4 space-y-6">
              <div className="sticky top-24 bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-6">
                <h3 className="text-lg font-bold text-white border-b border-slate-800 pb-3 flex items-center justify-between">
                  <span>Ringkasan Biaya</span>
                  <span className="text-xs text-slate-400 font-normal">Harga 2025-2026</span>
                </h3>

                {/* Selected List */}
                <div className="space-y-2 text-xs">
                  {categories.map((cat) => {
                    const comp = selectedComponents[cat.key];
                    return (
                      <div key={cat.key} className="flex justify-between items-center py-1 border-b border-slate-800/50">
                        <span className="text-slate-400 truncate max-w-[150px]">{cat.name}</span>
                        <span className="font-semibold text-slate-200 truncate max-w-[140px]">
                          {comp ? comp.name.split('(')[0] : '-'}
                        </span>
                      </div>
                    );
                  })}
                </div>

                {/* Total Cost Display */}
                <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700 text-center">
                  <span className="text-xs text-slate-400 uppercase font-semibold block">Total Perhitungan</span>
                  <span className="text-2xl font-black text-emerald-400">
                    Rp {calculateTotal().toLocaleString('id-ID')}
                  </span>
                </div>

                {/* Groq AI Trigger Button */}
                <button
                  onClick={handleAnalyzeWithGroq}
                  disabled={loadingAi}
                  className="w-full py-3 px-4 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-purple-600/30 transition-all disabled:opacity-50"
                >
                  {loadingAi ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Menginstal Analisis Groq AI...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 text-amber-300" />
                      <span>Analisis Kompatibilitas Groq AI</span>
                    </>
                  )}
                </button>

                {/* AI Analysis Result Card */}
                {aiAnalysis && (
                  <div className="p-4 rounded-2xl bg-purple-950/40 border border-purple-800/60 text-xs space-y-2 animate-in fade-in">
                    <div className="font-bold text-purple-300 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                      <span>Tier: {aiAnalysis.performanceTier}</span>
                    </div>
                    <p className="text-slate-300 text-[11px] leading-relaxed">
                      {aiAnalysis.recommendationText}
                    </p>
                    <div className="text-[11px] text-purple-200 bg-purple-900/30 p-2 rounded-xl">
                      <strong>Bottleneck Check:</strong> {aiAnalysis.bottleneckAnalysis}
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="space-y-3 pt-2">
                  <button
                    onClick={handleOrderViaWhatsApp}
                    className="w-full py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/30 transition-all"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Pesan Rakit PC Ini via WA</span>
                  </button>

                  <button
                    onClick={handleDownloadNotepad}
                    className="w-full py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs flex items-center justify-center gap-2 border border-slate-700 transition-all"
                  >
                    <Download className="w-4 h-4 text-sky-400" />
                    <span>Download Spec (.txt Notepad)</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Ready Packages Section */}
        <section className="py-16 bg-slate-900/40 border-t border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-white text-center mb-8">
              Atau Pilih Paket Rakit PC Siap Pakai mdfkingpc
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {PC_PACKAGES.map((pkg) => (
                <div key={pkg.id} className="bg-slate-900 border border-slate-800 rounded-3xl p-6 flex flex-col justify-between hover:border-sky-500/40 transition-all">
                  <div>
                    <span className="text-xs font-bold text-sky-400 bg-sky-500/10 px-3 py-1 rounded-full border border-sky-500/20">
                      {pkg.tier}
                    </span>
                    <h3 className="text-xl font-bold text-white mt-3 mb-1">{pkg.name}</h3>
                    <div className="text-2xl font-black text-emerald-400 mb-4">{pkg.price}</div>

                    <ul className="space-y-2 text-xs text-slate-300 border-t border-slate-800 pt-4 mb-6">
                      <li>• <strong>CPU:</strong> {pkg.processor}</li>
                      <li>• <strong>GPU:</strong> {pkg.gpu}</li>
                      <li>• <strong>RAM:</strong> {pkg.ram}</li>
                      <li>• <strong>Storage:</strong> {pkg.storage}</li>
                      <li>• <strong>PSU:</strong> {pkg.psu}</li>
                      <li>• <strong>Case:</strong> {pkg.case}</li>
                    </ul>
                  </div>

                  <a
                    href={`https://wa.me/${SITE_INFO.whatsapp}?text=Halo%20mdfkingpc,%20saya%20tertarik%20dengan%20${encodeURIComponent(pkg.name)}%20harga%20${encodeURIComponent(pkg.price)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 rounded-2xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs text-center transition-all shadow-lg shadow-sky-600/20 block"
                  >
                    Pesan Paket Ini via WA
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
