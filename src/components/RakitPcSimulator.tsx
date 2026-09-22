'use client';

import React, { useState } from 'react';
import { PC_COMPONENTS_DB, SITE_INFO, PC_PACKAGES, PcComponentItem } from '@/data/mockData';
import { Cpu, Cpu as GpuIcon, Layers, HardDrive, Zap, Box, Thermometer, Sparkles, Download, MessageSquare, Check, RefreshCw, AlertCircle, ShoppingCart } from 'lucide-react';

export default function RakitPcSimulator() {
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

  const [targetUsage, setTargetUsage] = useState('Gaming Esports 1080p/1440p & Editing Video');
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
        targetUsage,
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
    <div className="space-y-12">
      {/* SIMULATOR BUILDER SECTION */}
      <section className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl backdrop-blur-md">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-slate-800">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-sky-500/10 text-sky-400 text-xs font-bold border border-sky-500/20 mb-2">
              <Sparkles className="w-3.5 h-3.5 text-brand-red" />
              <span>Simulasi Perhitungan Harga Komponen 2025-2026</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Kalkulator & Simulator Rakit PC
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Pilih per komponen PC di bawah ini untuk melihat total harga dan rekomendasi AI Groq.
            </p>
          </div>

          <div className="bg-slate-800/90 border border-slate-700/80 rounded-2xl p-4 text-right">
            <span className="text-xs text-slate-400 block uppercase font-medium">Total Estimasi Harga</span>
            <span className="text-2xl sm:text-3xl font-black text-emerald-400">
              Rp {calculateTotal().toLocaleString('id-ID')}
            </span>
          </div>
        </div>

        {/* TARGET USAGE SELECTOR */}
        <div className="py-6 border-b border-slate-800">
          <label className="block text-xs font-bold text-slate-200 mb-2 uppercase tracking-wider">
            Target Penggunaan PC:
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              'Gaming Esports 1080p/1440p & Editing Video',
              'Gaming 4K Ultra AAA & Live Streaming',
              'Workstation 3D Rendering, CAD & Coding',
            ].map((usage) => (
              <button
                key={usage}
                type="button"
                onClick={() => setTargetUsage(usage)}
                className={`p-3 rounded-xl border text-xs text-left font-semibold transition-all ${
                  targetUsage === usage
                    ? 'bg-sky-600/20 border-sky-500 text-sky-300 shadow-md'
                    : 'bg-slate-800/50 border-slate-700/60 text-slate-400 hover:text-white'
                }`}
              >
                {usage}
              </button>
            ))}
          </div>
        </div>

        {/* COMPONENT SELECTION GRID */}
        <div className="space-y-6 pt-6">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">Pilih Komponen Komputer:</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {categories.map((cat) => {
              const items = PC_COMPONENTS_DB.filter((item) => item.category === cat.key);
              const currentSelected = selectedComponents[cat.key];
              const IconComp = cat.icon;

              return (
                <div key={cat.key} className="bg-slate-800/40 border border-slate-700/60 rounded-2xl p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="p-2 rounded-lg bg-sky-500/10 text-sky-400">
                        <IconComp className="w-4 h-4" />
                      </div>
                      <span className="text-xs font-bold text-white">{cat.name}</span>
                    </div>
                    {currentSelected && (
                      <span className="text-xs font-extrabold text-emerald-400">
                        Rp {currentSelected.price.toLocaleString('id-ID')}
                      </span>
                    )}
                  </div>

                  <select
                    value={currentSelected?.id || ''}
                    onChange={(e) => {
                      const found = items.find((i) => i.id === e.target.value);
                      if (found) handleSelectComponent(cat.key, found);
                    }}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-sky-500"
                  >
                    {items.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.name} — Rp {item.price.toLocaleString('id-ID')}
                      </option>
                    ))}
                  </select>

                  {currentSelected && (
                    <div className="text-[11px] text-slate-400 flex items-center justify-between">
                      <span>{currentSelected.specs}</span>
                      <span className="text-sky-400 font-semibold">{currentSelected.brand}</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* AI GROQ RECOMMENDATION BUTTON & DISPLAY */}
        <div className="pt-8 border-t border-slate-800 space-y-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={handleAnalyzeWithGroq}
              disabled={loadingAi}
              className="flex-1 py-4 px-6 rounded-2xl bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-500 hover:to-indigo-500 text-white font-extrabold text-xs shadow-lg shadow-sky-600/30 transition-all flex items-center justify-center gap-2"
            >
              {loadingAi ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Sedang Menganalisis dengan AI Groq...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  <span>Hitung & Analisis Kompatibilitas AI Groq</span>
                </>
              )}
            </button>

            <button
              onClick={handleDownloadNotepad}
              className="py-4 px-6 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-bold text-xs transition-all flex items-center justify-center gap-2"
            >
              <Download className="w-4 h-4 text-sky-400" />
              <span>Download Spesifikasi (.txt)</span>
            </button>
          </div>

          {/* AI ANALYSIS RESULTS CARD */}
          {aiAnalysis && (
            <div className="bg-gradient-to-br from-slate-900 to-sky-950/60 border border-sky-500/30 rounded-2xl p-6 space-y-4 animate-in fade-in duration-300">
              <div className="flex items-center justify-between border-b border-sky-500/20 pb-3">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-amber-400" />
                  <span className="font-extrabold text-sm text-white">Hasil Analisis Cerdas AI Groq</span>
                </div>
                <span className="px-3 py-1 rounded-full bg-sky-500/20 text-sky-300 text-xs font-bold border border-sky-500/30">
                  {aiAnalysis.performanceTier}
                </span>
              </div>

              <div className="space-y-3 text-xs text-slate-300">
                <div>
                  <span className="font-bold text-sky-400 block mb-1">Rekomendasi Teknisi AI:</span>
                  <p className="leading-relaxed bg-slate-950/40 p-3 rounded-xl border border-slate-800">
                    {aiAnalysis.recommendationText}
                  </p>
                </div>

                <div>
                  <span className="font-bold text-amber-400 block mb-1">Analisis Bottleneck & Keseimbangan:</span>
                  <p className="leading-relaxed bg-slate-950/40 p-3 rounded-xl border border-slate-800">
                    {aiAnalysis.bottleneckAnalysis}
                  </p>
                </div>

                {aiAnalysis.suggestedUpgrades && aiAnalysis.suggestedUpgrades.length > 0 && (
                  <div>
                    <span className="font-bold text-emerald-400 block mb-1">Saran Upgrade / Optimasi:</span>
                    <ul className="space-y-1 bg-slate-950/40 p-3 rounded-xl border border-slate-800">
                      {aiAnalysis.suggestedUpgrades.map((sugg: string, idx: number) => (
                        <li key={idx} className="flex items-center gap-2">
                          <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                          <span>{sugg}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* WhatsApp Order Button */}
          <button
            onClick={handleOrderViaWhatsApp}
            className="w-full py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-sm shadow-xl shadow-emerald-600/20 transition-all flex items-center justify-center gap-2"
          >
            <MessageSquare className="w-5 h-5 fill-white" />
            <span>Pesan Rakit PC Spesifikasi Ini via WA (085158916661)</span>
          </button>
        </div>
      </section>

      {/* PAKET REKOMENDASI RAKIT PC 2025-2026 */}
      <section className="space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 text-red-400 text-xs font-bold border border-red-500/20">
            <Box className="w-3.5 h-3.5 text-brand-red" />
            <span>Paket Siap Pakai Best Seller</span>
          </div>
          <h3 className="text-2xl font-black text-white">
            Paket Rekomendasi Rakit PC mdfkingpc
          </h3>
          <p className="text-xs text-slate-400">
            Pilihan paket populer bergaransi resmi, sudah siap pakai termasuk perakitan rapi & install OS.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PC_PACKAGES.map((pkg, idx) => (
            <div
              key={idx}
              className="bg-slate-900 border border-slate-800 hover:border-sky-500/50 rounded-3xl p-6 space-y-5 transition-all shadow-xl flex flex-col justify-between"
            >
              <div className="space-y-3">
                <span className="px-3 py-1 rounded-full bg-sky-500/10 text-sky-400 text-[11px] font-bold border border-sky-500/20 inline-block">
                  {pkg.tier}
                </span>
                <h4 className="text-lg font-bold text-white">{pkg.name}</h4>
                <div className="text-2xl font-black text-emerald-400">{pkg.price}</div>

                <ul className="text-xs text-slate-300 space-y-1.5 pt-2 border-t border-slate-800">
                  <li>• <strong>CPU:</strong> {pkg.processor}</li>
                  <li>• <strong>GPU:</strong> {pkg.gpu}</li>
                  <li>• <strong>RAM:</strong> {pkg.ram}</li>
                  <li>• <strong>SSD:</strong> {pkg.storage}</li>
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
      </section>
    </div>
  );
}
