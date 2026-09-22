'use client';

import React, { useState } from 'react';
import { PC_COMPONENTS_DB, SITE_INFO, PC_PACKAGES, PcComponentItem } from '@/data/mockData';
import {
  Cpu,
  Cpu as GpuIcon,
  Layers,
  HardDrive,
  Zap,
  Box,
  Thermometer,
  Sparkles,
  Download,
  MessageSquare,
  Check,
  RefreshCw,
  Wrench,
  DollarSign,
} from 'lucide-react';

export default function RakitPcSimulator() {
  const [activeTab, setActiveTab] = useState<'custom' | 'budget'>('custom');

  // MODE 1: Custom Pick State
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

  const [targetUsageCustom, setTargetUsageCustom] = useState('Gaming Esports 1080p/1440p & Editing Video');
  const [customAiResult, setCustomAiResult] = useState<any>(null);
  const [loadingCustomAi, setLoadingCustomAi] = useState(false);

  // MODE 2: Budget State
  const [budgetInput, setBudgetInput] = useState<number>(10000000);
  const [targetUsageBudget, setTargetUsageBudget] = useState('Gaming Esports 1080p/1440p & Live Streaming');
  const [userNotes, setUserNotes] = useState('');
  const [budgetAiResult, setBudgetAiResult] = useState<any>(null);
  const [loadingBudgetAi, setLoadingBudgetAi] = useState(false);

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

  const presetBudgets = [5000000, 8000000, 12000000, 15000000, 20000000, 30000000];

  const handleSelectComponent = (category: string, item: PcComponentItem) => {
    setSelectedComponents((prev) => ({ ...prev, [category]: item }));
  };

  // Trigger Groq AI ONLY on Button Click for Mode 1
  const handleCalculateCustomPricesWithGroq = async () => {
    setLoadingCustomAi(true);
    setCustomAiResult(null);
    try {
      const payload = {
        mode: 'custom',
        components: {
          cpu: selectedComponents.cpu?.name,
          gpu: selectedComponents.gpu?.name,
          motherboard: selectedComponents.motherboard?.name,
          ram: selectedComponents.ram?.name,
          ssd: selectedComponents.ssd?.name,
          psu: selectedComponents.psu?.name,
          case: selectedComponents.case?.name,
          cooler: selectedComponents.cooler?.name,
          cpuPrice: selectedComponents.cpu?.price,
          gpuPrice: selectedComponents.gpu?.price,
          motherboardPrice: selectedComponents.motherboard?.price,
          ramPrice: selectedComponents.ram?.price,
          ssdPrice: selectedComponents.ssd?.price,
          psuPrice: selectedComponents.psu?.price,
          casePrice: selectedComponents.case?.price,
          coolerPrice: selectedComponents.cooler?.price,
        },
        targetUsage: targetUsageCustom,
      };

      const res = await fetch('/api/ai/recommend-build', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (data.success) {
        setCustomAiResult(data.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingCustomAi(false);
    }
  };

  // Trigger Groq AI ONLY on Button Click for Mode 2
  const handleBuildByBudgetWithGroq = async () => {
    setLoadingBudgetAi(true);
    setBudgetAiResult(null);
    try {
      const payload = {
        mode: 'budget',
        budget: budgetInput,
        targetUsage: targetUsageBudget,
        userNotes,
      };

      const res = await fetch('/api/ai/recommend-build', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (data.success) {
        setBudgetAiResult(data.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingBudgetAi(false);
    }
  };

  // Download notepad (.txt) for Custom Build
  const handleDownloadNotepadCustom = () => {
    const total = customAiResult?.totalPrice || 0;
    const totalFormatted = new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(total);

    let content = `====================================================\n`;
    content += `        MDFKINGPC BANDUNG - SPESIFIKASI RAKIT PC     \n`;
    content += `====================================================\n`;
    content += `Tanggal Simulasi : ${new Date().toLocaleDateString('id-ID')}\n`;
    content += `WA Konsultasi    : +62 851-5891-6661\n`;
    content += `Alamat Workshop  : Jl. Ir. H. Juanda No. 154, Dago, Bandung\n\n`;
    content += `RINCIAN KOMPONEN TERPILIH & ESTIMASI HARGA PASAR 2025-2026:\n`;
    content += `----------------------------------------------------\n`;

    categories.forEach((cat) => {
      const comp = selectedComponents[cat.key];
      const priceVal = customAiResult?.itemizedPrices?.[cat.key] || 0;
      const priceStr = priceVal > 0 ? `Rp ${priceVal.toLocaleString('id-ID')}` : 'Estimasi via AI';
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
    element.download = `mdfkingpc_rakit_spek_sendiri_${Date.now().toString().slice(-6)}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  // Download notepad (.txt) for Budget Build
  const handleDownloadNotepadBudget = () => {
    if (!budgetAiResult) return;
    const total = budgetAiResult.totalPrice || budgetInput;
    const totalFormatted = new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(total);

    let content = `====================================================\n`;
    content += `    MDFKINGPC BANDUNG - PAKET RAKITAN AI BUDGET     \n`;
    content += `====================================================\n`;
    content += `Judul Paket      : ${budgetAiResult.buildTitle}\n`;
    content += `Target Budget    : Rp ${budgetInput.toLocaleString('id-ID')}\n`;
    content += `Tanggal Simulasi : ${new Date().toLocaleDateString('id-ID')}\n`;
    content += `WA Konsultasi    : +62 851-5891-6661\n`;
    content += `Alamat Workshop  : Jl. Ir. H. Juanda No. 154, Dago, Bandung\n\n`;
    content += `RINCIAN KOMPONEN RACIKAN AI GROQ:\n`;
    content += `----------------------------------------------------\n`;

    const comps = budgetAiResult.components || {};
    Object.keys(comps).forEach((key) => {
      const item = comps[key];
      if (item) {
        content += `• ${key.toUpperCase().padEnd(15)} : ${item.name} (Rp ${(item.price || 0).toLocaleString('id-ID')})\n`;
      }
    });

    content += `----------------------------------------------------\n`;
    content += `TOTAL ESTIMASI BIAYA : ${totalFormatted}\n`;
    content += `====================================================\n`;
    content += `* Sudah termasuk perakitan rapi, cable management, & install OS.\n`;

    const element = document.createElement('a');
    const file = new Blob([content], { type: 'text/plain;charset=utf-8' });
    element.href = URL.createObjectURL(file);
    element.download = `mdfkingpc_rakit_budget_${Date.now().toString().slice(-6)}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  // WhatsApp Order for Custom Build
  const handleOrderCustomWhatsApp = () => {
    const total = customAiResult?.totalPrice || 0;
    const totalFormatted = new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(total);

    let text = `Halo mdfkingpc, saya ingin memesan perakitan PC Spek Sendiri dengan rincian berikut:\n\n`;
    categories.forEach((cat) => {
      const comp = selectedComponents[cat.key];
      const priceVal = customAiResult?.itemizedPrices?.[cat.key] || 0;
      if (comp) {
        text += `• *${cat.name}*: ${comp.name}${priceVal > 0 ? ` (Rp ${priceVal.toLocaleString('id-ID')})` : ''}\n`;
      }
    });

    if (total > 0) {
      text += `\n*TOTAL ESTIMASI BIAYA (AI Riset)*: ${totalFormatted}\n`;
    }
    text += `\nMohon info stok dan ketersediaan perakitannya di mdfkingpc Bandung. Terima kasih!`;

    window.open(`https://wa.me/${SITE_INFO.whatsapp}?text=${encodeURIComponent(text)}`, '_blank');
  };

  // WhatsApp Order for Budget Build
  const handleOrderBudgetWhatsApp = () => {
    if (!budgetAiResult) return;
    const total = budgetAiResult.totalPrice || budgetInput;
    const totalFormatted = new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(total);

    let text = `Halo mdfkingpc, saya berminat memesan *${budgetAiResult.buildTitle}* rekomendasi AI Groq (Budget Rp ${budgetInput.toLocaleString('id-ID')}):\n\n`;

    const comps = budgetAiResult.components || {};
    Object.keys(comps).forEach((key) => {
      const item = comps[key];
      if (item) {
        text += `• *${key.toUpperCase()}*: ${item.name} (Rp ${(item.price || 0).toLocaleString('id-ID')})\n`;
      }
    });

    text += `\n*TOTAL BIAYA RAKITAN*: ${totalFormatted}\n\nMohon konfirmasi ketersediaan stok komponen ini di mdfkingpc Bandung. Terima kasih!`;

    window.open(`https://wa.me/${SITE_INFO.whatsapp}?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="space-y-12">
      {/* MAIN SIMULATOR BUILDER CARD */}
      <section className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-10 shadow-sm space-y-8">
        {/* HEADER & TITLE */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-100">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold border border-blue-200/80 mb-2">
              <Sparkles className="w-3.5 h-3.5 text-red-500" />
              <span>Full AI Groq Market Price & Compatibility Engine</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display uppercase">
              Kalkulator & Simulator Rakit PC
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Pilih mode rakitan Anda: susun spesifikasi sendiri atau racik otomatis sesuai budget impian Anda.
            </p>
          </div>

          {activeTab === 'custom' && (
            <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 text-right animate-in fade-in shadow-xs">
              <span className="text-[11px] text-slate-500 block uppercase font-medium">Total Estimasi AI</span>
              {customAiResult ? (
                <span className="text-2xl sm:text-3xl font-black text-blue-600 font-display">
                  Rp {customAiResult.totalPrice.toLocaleString('id-ID')}
                </span>
              ) : (
                <span className="text-xs font-bold text-blue-600 bg-blue-50 border border-blue-100 px-3 py-1.5 rounded-full inline-block mt-1">
                  Hitung via Button AI
                </span>
              )}
            </div>
          )}
        </div>

        {/* TAB SWITCHER TOGGLE */}
        <div>
          <div className="grid grid-cols-2 p-1.5 bg-slate-100/80 border border-slate-200/60 rounded-2xl cut-corner-card gap-2">
            <button
              type="button"
              onClick={() => setActiveTab('custom')}
              className={`py-3 px-4 cut-corner-card font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all uppercase tracking-wider ${
                activeTab === 'custom'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
              }`}
            >
              <Wrench className={`w-4 h-4 ${activeTab === 'custom' ? 'text-white' : 'text-blue-600'}`} />
              <span>1. Rakit Spek Sendiri</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('budget')}
              className={`py-3 px-4 cut-corner-card font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all uppercase tracking-wider ${
                activeTab === 'budget'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
              }`}
            >
              <DollarSign className={`w-4 h-4 ${activeTab === 'budget' ? 'text-white' : 'text-emerald-600'}`} />
              <span>2. Rakit Sesuai Budget (AI)</span>
            </button>
          </div>
        </div>

        {/* MODE 1: RAKIT SPEK SENDIRI */}
        {activeTab === 'custom' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            {/* Target Usage Selector */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-2 uppercase tracking-wider">
                Target Utama Penggunaan PC:
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
                    onClick={() => setTargetUsageCustom(usage)}
                    className={`p-3.5 rounded-2xl border text-xs text-left font-semibold transition-all ${
                      targetUsageCustom === usage
                        ? 'bg-blue-50 border-blue-500 text-blue-700 shadow-xs'
                        : 'bg-slate-50 border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-white'
                    }`}
                  >
                    {usage}
                  </button>
                ))}
              </div>
            </div>

            {/* Clean Component Selection Dropdowns */}
            <div className="space-y-4">
              <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Pilih Komponen Utama Komputer:
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {categories.map((cat) => {
                  const items = PC_COMPONENTS_DB.filter((item) => item.category === cat.key);
                  const currentSelected = selectedComponents[cat.key];
                  const IconComp = cat.icon;

                  return (
                    <div key={cat.key} className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 space-y-2">
                      <div className="flex items-center gap-2">
                        <div className="p-2 rounded-lg bg-blue-50 text-blue-600">
                          <IconComp className="w-4 h-4" />
                        </div>
                        <span className="text-xs font-bold text-slate-900 font-sans">{cat.name}</span>
                      </div>

                      <select
                        value={currentSelected?.id || ''}
                        onChange={(e) => {
                          const found = items.find((i) => i.id === e.target.value);
                          if (found) handleSelectComponent(cat.key, found);
                        }}
                        className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-800 font-medium focus:outline-none focus:border-blue-600 cursor-pointer shadow-xs"
                      >
                        {items.map((item) => (
                          <option key={item.id} value={item.id}>
                            {item.name} ({item.brand})
                          </option>
                        ))}
                      </select>

                      {currentSelected && (
                        <div className="text-[11px] text-slate-500 flex items-center justify-between pt-1">
                          <span>{currentSelected.specs}</span>
                          <span className="text-blue-600 font-semibold">{currentSelected.brand}</span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* AI Groq Action Button */}
            <div className="pt-2 space-y-4">
              <button
                onClick={handleCalculateCustomPricesWithGroq}
                disabled={loadingCustomAi}
                className="btn-hitboox btn-hitboox-primary w-full !py-4 text-xs sm:text-sm font-bold tracking-wider shadow-pill-blue gap-2"
              >
                {loadingCustomAi ? (
                  <>
                    <RefreshCw className="w-5 h-5 animate-spin" />
                    <span>AI Groq Sedang Meriset Harga Pasar 2025-2026 & Memeriksa Kompatibilitas...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5 text-white" />
                    <span>Cek Harga Pasar & Analisis Kompatibilitas AI Groq</span>
                  </>
                )}
              </button>

              {/* AI Groq Custom Result Display */}
              {customAiResult && (
                <div className="bg-slate-50 border border-blue-200 rounded-3xl p-6 sm:p-8 space-y-6 animate-in fade-in duration-300 shadow-sm">
                  <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-4">
                    <div>
                      <span className="text-[10px] text-blue-600 uppercase font-bold tracking-wider block">Tingkat Performa Rakitan</span>
                      <h3 className="text-xl font-extrabold text-slate-900 font-sans">{customAiResult.performanceTier}</h3>
                    </div>

                    <div className="bg-white border border-blue-100 px-5 py-3 rounded-2xl text-right shadow-xs">
                      <span className="text-[10px] text-slate-500 block uppercase font-medium">Total Estimasi Harga Pasar</span>
                      <span className="text-2xl font-black text-blue-600 font-display">
                        Rp {customAiResult.totalPrice.toLocaleString('id-ID')}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-4 text-xs">
                    <div>
                      <span className="font-bold text-blue-700 block mb-1.5">Rekomendasi Teknisi AI mdfkingpc:</span>
                      <p className="leading-relaxed bg-white p-4 rounded-2xl border border-slate-200 text-slate-700">
                        {customAiResult.recommendationText}
                      </p>
                    </div>

                    <div>
                      <span className="font-bold text-amber-600 block mb-1.5">Analisis Bottleneck & Keseimbangan CPU/GPU:</span>
                      <p className="leading-relaxed bg-white p-4 rounded-2xl border border-slate-200 text-slate-700">
                        {customAiResult.bottleneckAnalysis}
                      </p>
                    </div>

                    {/* Itemized Component Price Summary Grid */}
                    <div>
                      <span className="font-bold text-slate-800 block mb-2 uppercase tracking-wider text-[11px]">
                        Rincian Summary Harga Komponen Terpilih (Hasil Riset AI Groq):
                      </span>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
                        {categories.map((cat) => {
                          const comp = selectedComponents[cat.key];
                          const priceVal = customAiResult?.itemizedPrices?.[cat.key] || 0;
                          return (
                            <div key={cat.key} className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs">
                              <div className="flex-1 pr-2 truncate">
                                <span className="text-[10px] text-slate-500 uppercase font-bold block">{cat.name}</span>
                                <span className="font-bold text-slate-900 truncate block">{comp ? comp.name : 'Komponen Terpilih'}</span>
                              </div>
                              <span className="font-black text-blue-600 text-xs shrink-0 ml-2">
                                Rp {priceVal.toLocaleString('id-ID')}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {customAiResult.suggestedUpgrades && customAiResult.suggestedUpgrades.length > 0 && (
                      <div>
                        <span className="font-bold text-blue-700 block mb-1.5">Saran Optimasi / Upgrade Opsional:</span>
                        <ul className="space-y-1.5 bg-white p-4 rounded-2xl border border-slate-200 text-slate-700">
                          {customAiResult.suggestedUpgrades.map((sugg: string, idx: number) => (
                            <li key={idx} className="flex items-center gap-2">
                              <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                              <span>{sugg}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  {/* Actions for Custom Build */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    <button
                      onClick={handleDownloadNotepadCustom}
                      className="btn-hitboox btn-hitboox-secondary !py-3.5 text-xs font-bold gap-2"
                    >
                      <Download className="w-4 h-4 text-blue-600" />
                      <span>Download Spesifikasi (.txt)</span>
                    </button>

                    <button
                      onClick={handleOrderCustomWhatsApp}
                      className="btn-hitboox bg-emerald-600 hover:bg-emerald-700 text-white !py-3.5 text-xs font-bold gap-2 shadow-md shadow-emerald-600/20"
                    >
                      <MessageSquare className="w-4 h-4 fill-white" />
                      <span>Pesan Spesifikasi Ini via WA</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* MODE 2: RAKIT SESUAI BUDGET */}
        {activeTab === 'budget' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            {/* Budget Input & Quick Presets */}
            <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-5 space-y-4">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                Masukkan Target Budget Anda (Rupiah):
              </label>

              <div className="flex flex-col sm:flex-row items-stretch gap-3">
                <div className="relative flex-1">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-sm">Rp</span>
                  <input
                    type="number"
                    step={500000}
                    value={budgetInput}
                    onChange={(e) => setBudgetInput(Number(e.target.value))}
                    className="w-full bg-white border border-slate-200 rounded-xl pl-12 pr-4 py-3 text-base font-extrabold text-blue-600 font-sans focus:outline-none focus:border-blue-600 shadow-xs"
                    placeholder="Contoh: 10000000"
                  />
                </div>

                <div className="px-5 py-3 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-700 flex items-center justify-center shadow-xs">
                  <span>Rp {budgetInput.toLocaleString('id-ID')}</span>
                </div>
              </div>

              {/* Preset Budget Quick Buttons */}
              <div className="space-y-1.5">
                <span className="text-[11px] text-slate-500 font-medium">Pilih Preset Budget Cepat:</span>
                <div className="flex flex-wrap gap-2">
                  {presetBudgets.map((val) => (
                    <button
                      key={val}
                      type="button"
                      onClick={() => setBudgetInput(val)}
                      className={`px-3.5 py-1.5 rounded-full border text-xs font-bold transition-all ${
                        budgetInput === val
                          ? 'bg-blue-600 border-blue-600 text-white shadow-xs'
                          : 'bg-white border-slate-200 text-slate-700 hover:border-blue-400 hover:text-blue-600'
                      }`}
                    >
                      {(val / 1000000).toLocaleString('id-ID')} Juta
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Target Usage Selector */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-2 uppercase tracking-wider">
                Target Penggunaan PC:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  'Gaming Esports 1080p/1440p & Live Streaming',
                  'Gaming 4K Ultra AAA & VR Ready',
                  'Workstation 3D Rendering, Editing 4K & Coding',
                ].map((usage) => (
                  <button
                    key={usage}
                    type="button"
                    onClick={() => setTargetUsageBudget(usage)}
                    className={`p-3.5 rounded-2xl border text-xs text-left font-semibold transition-all ${
                      targetUsageBudget === usage
                        ? 'bg-blue-50 border-blue-500 text-blue-700 shadow-xs'
                        : 'bg-slate-50 border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-white'
                    }`}
                  >
                    {usage}
                  </button>
                ))}
              </div>
            </div>

            {/* Optional Notes */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1 uppercase tracking-wider">
                Catatan / Preferensi Pengguna (Opsional):
              </label>
              <input
                type="text"
                value={userNotes}
                onChange={(e) => setUserNotes(e.target.value)}
                placeholder="Contoh: Utamakan VGA NVIDIA RTX, casing warna putih, atau minimal SSD 1TB..."
                className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-600 shadow-xs"
              />
            </div>

            {/* AI Groq Action Button */}
            <div className="pt-2 space-y-4">
              <button
                onClick={handleBuildByBudgetWithGroq}
                disabled={loadingBudgetAi}
                className="btn-hitboox btn-hitboox-primary w-full !py-4 text-xs sm:text-sm font-bold tracking-wider shadow-pill-blue gap-2"
              >
                {loadingBudgetAi ? (
                  <>
                    <RefreshCw className="w-5 h-5 animate-spin" />
                    <span>AI Groq Sedang Meracik Spesifikasi Terbaik Sesuai Budget...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5 text-white" />
                    <span>Riset & Racik Spek via AI Groq (Budget Rp {budgetInput.toLocaleString('id-ID')})</span>
                  </>
                )}
              </button>

              {/* AI Groq Budget Result Display */}
              {budgetAiResult && (
                <div className="bg-slate-50 border border-blue-200 rounded-3xl p-6 sm:p-8 space-y-6 animate-in fade-in duration-300 shadow-sm">
                  <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-4">
                    <div>
                      <span className="text-[10px] text-blue-600 uppercase font-extrabold tracking-wider block">
                        Rekomendasi Paket AI Groq
                      </span>
                      <h3 className="text-xl font-extrabold text-slate-900 font-sans">{budgetAiResult.buildTitle}</h3>
                      <span className="text-xs text-blue-600 font-semibold">{budgetAiResult.performanceTier}</span>
                    </div>

                    <div className="bg-white border border-blue-100 px-5 py-3 rounded-2xl text-right shadow-xs">
                      <span className="text-[10px] text-slate-500 block uppercase font-medium">Total Estimasi Racikan</span>
                      <span className="text-2xl font-black text-blue-600 font-display">
                        Rp {(budgetAiResult.totalPrice || budgetInput).toLocaleString('id-ID')}
                      </span>
                    </div>
                  </div>

                  {/* Why this build text */}
                  {budgetAiResult.whyThisBuild && (
                    <div className="bg-white p-4 rounded-2xl border border-slate-200 text-xs">
                      <span className="font-bold text-amber-600 block mb-1">Mengapa Racikan Ini Terbaik Untuk Budget Anda?</span>
                      <p className="text-slate-700 leading-relaxed">{budgetAiResult.whyThisBuild}</p>
                    </div>
                  )}

                  {/* Itemized Component Grid */}
                  <div className="space-y-2">
                    <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                      Spesifikasi Komponen Terpilih:
                    </span>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                      {budgetAiResult.components &&
                        Object.keys(budgetAiResult.components).map((catKey) => {
                          const item = budgetAiResult.components[catKey];
                          if (!item) return null;
                          return (
                            <div key={catKey} className="bg-white border border-slate-200 p-3.5 rounded-xl flex items-center justify-between shadow-xs">
                              <div>
                                <span className="text-[10px] text-slate-500 uppercase font-bold block">{catKey}</span>
                                <span className="font-bold text-slate-900">{item.name}</span>
                              </div>
                              <span className="font-bold text-blue-600 text-xs ml-2">
                                Rp {(item.price || 0).toLocaleString('id-ID')}
                              </span>
                            </div>
                          );
                        })}
                    </div>
                  </div>

                  {budgetAiResult.suggestedUpgrades && budgetAiResult.suggestedUpgrades.length > 0 && (
                    <div className="text-xs space-y-1.5">
                      <span className="font-bold text-blue-700 block">Saran Upgrade / Optimasi Masa Depan:</span>
                      <ul className="space-y-1 bg-white p-4 rounded-2xl border border-slate-200 text-slate-700">
                        {budgetAiResult.suggestedUpgrades.map((upg: string, i: number) => (
                          <li key={i} className="flex items-center gap-2">
                            <Check className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                            <span>{upg}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Actions for Budget Build */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    <button
                      onClick={handleDownloadNotepadBudget}
                      className="btn-hitboox btn-hitboox-secondary !py-3.5 text-xs font-bold gap-2"
                    >
                      <Download className="w-4 h-4 text-blue-600" />
                      <span>Download Spesifikasi (.txt)</span>
                    </button>

                    <button
                      onClick={handleOrderBudgetWhatsApp}
                      className="btn-hitboox bg-emerald-600 hover:bg-emerald-700 text-white !py-3.5 text-xs font-bold gap-2 shadow-md shadow-emerald-600/20"
                    >
                      <MessageSquare className="w-4 h-4 fill-white" />
                      <span>Pesan Rakitan AI Ini via WA</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </section>

      {/* PAKET REKOMENDASI RAKIT PC BEST SELLER */}
      <section className="space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 text-blue-700 text-xs font-bold border border-blue-200">
            <Box className="w-3.5 h-3.5 text-red-500" />
            <span>Paket Siap Pakai Best Seller</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display uppercase">
            Paket Rekomendasi Rakit PC mdfkingpc
          </h3>
          <p className="text-xs sm:text-sm text-slate-600">
            Pilihan paket populer bergaransi resmi, sudah siap pakai termasuk perakitan rapi & install OS.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PC_PACKAGES.map((pkg, idx) => (
            <div
              key={idx}
              className="bg-white border border-slate-200/90 hover:border-blue-500/50 rounded-3xl p-6 sm:p-7 space-y-5 transition-all shadow-xs hover:shadow-md flex flex-col justify-between"
            >
              <div className="space-y-4">
                <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-[11px] font-bold border border-blue-100 inline-block">
                  {pkg.tier}
                </span>
                <h4 className="text-lg font-bold text-slate-900 font-sans">{pkg.name}</h4>
                <div className="text-2xl font-black text-blue-600 font-display">{pkg.price}</div>

                <ul className="text-xs text-slate-600 space-y-2 pt-3 border-t border-slate-100">
                  <li>• <strong className="text-slate-800">CPU:</strong> {pkg.processor}</li>
                  <li>• <strong className="text-slate-800">GPU:</strong> {pkg.gpu}</li>
                  <li>• <strong className="text-slate-800">RAM:</strong> {pkg.ram}</li>
                  <li>• <strong className="text-slate-800">SSD:</strong> {pkg.storage}</li>
                  <li>• <strong className="text-slate-800">PSU:</strong> {pkg.psu}</li>
                  <li>• <strong className="text-slate-800">Case:</strong> {pkg.case}</li>
                </ul>
              </div>

              <a
                href={`https://wa.me/${SITE_INFO.whatsapp}?text=Halo%20mdfkingpc,%20saya%20tertarik%20dengan%20${encodeURIComponent(pkg.name)}%20harga%20${encodeURIComponent(pkg.price)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-hitboox btn-hitboox-primary w-full !py-3 text-xs font-bold text-center tracking-wider block shadow-pill-blue"
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
