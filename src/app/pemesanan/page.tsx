'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { 
  Wrench, Upload, CheckCircle2, AlertCircle, Loader2, ArrowRight, ShieldCheck, 
  MousePointer, Keyboard, Gamepad2, Laptop, Cpu, Download, FileText 
} from 'lucide-react';
import { SITE_INFO } from '@/data/mockData';

type FormTab = 'laptop' | 'mouse' | 'keyboard' | 'gamepad' | 'rakit-pc' | 'instalasi';

function PemesananContent() {
  const searchParams = useSearchParams();
  const serviceQuery = searchParams.get('service') || '';
  const formQuery = searchParams.get('form') as FormTab | null;

  const [activeTab, setActiveTab] = useState<FormTab>('laptop');

  // Common Fields
  const [customerName, setCustomerName] = useState('');
  const [phoneWA, setPhoneWA] = useState('');
  const [deviceModel, setDeviceModel] = useState('');
  const [problemDescription, setProblemDescription] = useState('');

  // Specialized Fields
  // Mouse
  const [mouseBrand, setMouseBrand] = useState('Logitech');
  const [mouseIssues, setMouseIssues] = useState<string[]>([]);
  const [switchChoice, setSwitchChoice] = useState('TTC Gold Dustproof 80M');

  // Keyboard
  const [keyboardType, setKeyboardType] = useState('Mechanical Keyboard');
  const [keyboardIssues, setKeyboardIssues] = useState<string[]>([]);
  const [specificFaultyKeys, setSpecificFaultyKeys] = useState('');

  // Gamepad
  const [gamepadType, setGamepadType] = useState('PlayStation 5 DualSense');
  const [gamepadIssues, setGamepadIssues] = useState<string[]>([]);
  const [upgradeHallEffect, setUpgradeHallEffect] = useState(true);

  // Rakit PC
  const [pcBudget, setPcBudget] = useState('Rp 8.000.000 - Rp 15.000.000');
  const [pcPurpose, setPcPurpose] = useState('Gaming Esports 1080p');
  const [cpuPref, setCpuPref] = useState('Intel Core i5');
  const [gpuPref, setGpuPref] = useState('NVIDIA RTX 4060');
  const [caseStyle, setCaseStyle] = useState('Aquarium Panoramic RGB');

  // Instalasi
  const [osType, setOsType] = useState('Windows 11 64-Bit');
  const [selectedSoftwarePacks, setSelectedSoftwarePacks] = useState<string[]>(['Paket Office & Produktivitas']);
  const [customSoftwareReq, setCustomSoftwareReq] = useState('');

  // File Upload State (Cloudinary)
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [paymentProofUrl, setPaymentProofUrl] = useState('');
  const [uploadPreview, setUploadPreview] = useState<string | null>(null);

  // Form submission state
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [bookingSuccess, setBookingSuccess] = useState<any | null>(null);

  useEffect(() => {
    if (formQuery) {
      setActiveTab(formQuery);
    } else if (serviceQuery) {
      if (serviceQuery.includes('mouse')) setActiveTab('mouse');
      else if (serviceQuery.includes('keyboard')) setActiveTab('keyboard');
      else if (serviceQuery.includes('joystick') || serviceQuery.includes('gamepad')) setActiveTab('gamepad');
      else if (serviceQuery.includes('rakit')) setActiveTab('rakit-pc');
      else if (serviceQuery.includes('instal')) setActiveTab('instalasi');
      else setActiveTab('laptop');
    }
  }, [serviceQuery, formQuery]);

  const handleCheckboxToggle = (list: string[], setList: (v: string[]) => void, item: string) => {
    if (list.includes(item)) {
      setList(list.filter((i) => i !== item));
    } else {
      setList([...list, item]);
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    setFile(selectedFile);
    setUploadPreview(URL.createObjectURL(selectedFile));
    setUploading(true);
    setErrorMsg('');

    try {
      const formData = new FormData();
      formData.append('file', selectedFile);

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (data.success) {
        setPaymentProofUrl(data.url);
        if (data.previewUrl) {
          setUploadPreview(data.previewUrl);
        }
      } else {
        setErrorMsg(data.message || 'Gagal mengunggah berkas.');
      }
    } catch (err) {
      setErrorMsg('Terjadi kesalahan koneksi saat mengunggah file ke Cloudinary.');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !phoneWA) {
      setErrorMsg('Mohon isi Nama Lengkap & Nomor WhatsApp wajib (*)');
      return;
    }

    setSubmitting(true);
    setErrorMsg('');

    let serviceTypeTitle = 'Service Laptop & Perangkat';
    let details: any = {};

    if (activeTab === 'mouse') {
      serviceTypeTitle = 'Form Order Service Mouse';
      details = { mouseBrand, mouseIssues, switchChoice };
    } else if (activeTab === 'keyboard') {
      serviceTypeTitle = 'Form Order Service Keyboard';
      details = { keyboardType, keyboardIssues, specificFaultyKeys };
    } else if (activeTab === 'gamepad') {
      serviceTypeTitle = 'Form Order Service Gamepad / Controller';
      details = { gamepadType, gamepadIssues, upgradeHallEffect };
    } else if (activeTab === 'rakit-pc') {
      serviceTypeTitle = 'Form Order Rakit PC Gaming';
      details = { pcBudget, pcPurpose, cpuPref, gpuPref, caseStyle };
    } else if (activeTab === 'instalasi') {
      serviceTypeTitle = 'Form Order Instal OS, Aplikasi & Game';
      details = { osType, selectedSoftwarePacks, customSoftwareReq };
    } else {
      serviceTypeTitle = 'Form Order Service Laptop & MacBook';
      details = { category: 'Laptop Repair' };
    }

    try {
      const res = await fetch('/api/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerName,
          phoneWA,
          serviceType: serviceTypeTitle,
          deviceModel: deviceModel || 'Tidak Disebutkan',
          problemDescription: problemDescription || 'Perbaikan sesuai spesifikasi formulir',
          paymentProofUrl,
          detailsJson: details,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setBookingSuccess(data.data);
      } else {
        setErrorMsg(data.message || 'Gagal memproses pemesanan.');
      }
    } catch (err: any) {
      setErrorMsg('Gagal mengirim formulir. Coba lagi.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      {/* Header Banner */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-blue/20 text-brand-blue text-xs font-bold border border-brand-blue/30">
          <FileText className="w-4 h-4 text-brand-red" />
          <span>Formulir Perbaikan Spesifik mdfkingpc</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          Formulir Pemesanan Perangkat
        </h1>

        <p className="text-gray-300 text-xs sm:text-sm max-w-2xl mx-auto leading-relaxed">
          Pilih kategori formulir di bawah ini (Laptop, Mouse, Keyboard, Gamepad, Rakit PC, atau Instalasi). Data disesuaikan persis dengan formulir resmi mdfkingpc.
        </p>
      </div>

      {/* FORM SELECTION TABS */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 bg-[#18181C] p-2 rounded-2xl border border-white/10">
        <button
          type="button"
          onClick={() => setActiveTab('laptop')}
          className={`flex items-center justify-center gap-2 p-3 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'laptop' ? 'bg-brand-blue text-white shadow-glow-blue' : 'text-gray-400 hover:text-white hover:bg-white/5'
          }`}
        >
          <Laptop className="w-4 h-4 text-brand-red" />
          <span>Laptop</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('mouse')}
          className={`flex items-center justify-center gap-2 p-3 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'mouse' ? 'bg-brand-blue text-white shadow-glow-blue' : 'text-gray-400 hover:text-white hover:bg-white/5'
          }`}
        >
          <MousePointer className="w-4 h-4 text-brand-red" />
          <span>Mouse</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('keyboard')}
          className={`flex items-center justify-center gap-2 p-3 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'keyboard' ? 'bg-brand-blue text-white shadow-glow-blue' : 'text-gray-400 hover:text-white hover:bg-white/5'
          }`}
        >
          <Keyboard className="w-4 h-4 text-brand-red" />
          <span>Keyboard</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('gamepad')}
          className={`flex items-center justify-center gap-2 p-3 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'gamepad' ? 'bg-brand-blue text-white shadow-glow-blue' : 'text-gray-400 hover:text-white hover:bg-white/5'
          }`}
        >
          <Gamepad2 className="w-4 h-4 text-brand-red" />
          <span>Gamepad</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('rakit-pc')}
          className={`flex items-center justify-center gap-2 p-3 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'rakit-pc' ? 'bg-brand-blue text-white shadow-glow-blue' : 'text-gray-400 hover:text-white hover:bg-white/5'
          }`}
        >
          <Cpu className="w-4 h-4 text-brand-red" />
          <span>Rakit PC</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('instalasi')}
          className={`flex items-center justify-center gap-2 p-3 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'instalasi' ? 'bg-brand-blue text-white shadow-glow-blue' : 'text-gray-400 hover:text-white hover:bg-white/5'
          }`}
        >
          <Download className="w-4 h-4 text-brand-red" />
          <span>Instalasi</span>
        </button>
      </div>

      {bookingSuccess ? (
        /* SUCCESS CONFIRMATION RECEIPT */
        <div className="glass-panel p-8 sm:p-10 rounded-3xl border border-emerald-500/40 space-y-6 text-center shadow-2xl animate-fadeIn">
          <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/40">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div className="space-y-2">
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">Order Berhasil Dikirim</span>
            <h2 className="text-2xl font-black text-white">Order ID: #{bookingSuccess.orderId}</h2>
            <p className="text-xs text-gray-300">
              Terima kasih, <strong>{bookingSuccess.customerName}</strong>! Data order Anda telah tersimpan di sistem mdfkingpc.
            </p>
          </div>

          <div className="bg-black/40 p-6 rounded-2xl border border-white/10 text-left space-y-3 text-xs">
            <div className="grid grid-cols-2 gap-2 border-b border-white/10 pb-3">
              <span className="text-gray-400">Jenis Formulir:</span>
              <span className="font-bold text-white text-right">{bookingSuccess.serviceType}</span>
            </div>
            <div className="grid grid-cols-2 gap-2 border-b border-white/10 pb-3">
              <span className="text-gray-400">Perangkat / Model:</span>
              <span className="font-bold text-white text-right">{bookingSuccess.deviceModel || '-'}</span>
            </div>
            <div className="grid grid-cols-2 gap-2 border-b border-white/10 pb-3">
              <span className="text-gray-400">No. WhatsApp:</span>
              <span className="font-bold text-emerald-400 text-right">{bookingSuccess.phoneWA}</span>
            </div>
            <div>
              <span className="text-gray-400 block mb-1">Catatan Detail:</span>
              <p className="text-white italic">&ldquo;{bookingSuccess.problemDescription}&rdquo;</p>
            </div>
            {bookingSuccess.paymentProofUrl && (
              <div className="pt-2">
                <span className="text-gray-400 block mb-1">Link Cloudinary Bukti Bayar/Foto:</span>
                <span className="text-[10px] text-brand-blue font-mono break-all bg-white/5 p-2 rounded block">
                  {bookingSuccess.paymentProofUrl}
                </span>
              </div>
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-2">
            <a
              href={`https://wa.me/${SITE_INFO.whatsapp}?text=Halo%20mdfkingpc,%20saya%20sudah%20mengisi%20form%20${encodeURIComponent(bookingSuccess.serviceType)}%20dengan%20Order%20ID%20%23${bookingSuccess.orderId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl font-bold text-white bg-emerald-600 hover:bg-emerald-500 shadow-lg shadow-emerald-900/40 text-xs"
            >
              <span>Konfirmasi Langsung via WA &rarr;</span>
            </a>
            <button
              onClick={() => {
                setBookingSuccess(null);
                setCustomerName('');
                setPhoneWA('');
                setDeviceModel('');
                setProblemDescription('');
                setPaymentProofUrl('');
                setUploadPreview(null);
              }}
              className="px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 font-bold text-xs text-white"
            >
              Isi Form Lain
            </button>
          </div>
        </div>
      ) : (
        /* DYNAMIC FORM CONTENTS */
        <div className="glass-panel p-8 sm:p-10 rounded-3xl border border-white/10 space-y-6">
          {errorMsg && (
            <div className="p-4 rounded-xl bg-red-500/20 border border-red-500/40 text-red-200 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6 text-xs">
            {/* COMMON FIELDS: NAMA & WA */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pb-4 border-b border-white/10">
              <div className="space-y-2">
                <label className="font-bold text-gray-200 block">Nama Lengkap *</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Budi Santoso"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-brand-blue"
                />
              </div>

              <div className="space-y-2">
                <label className="font-bold text-gray-200 block">Nomor WhatsApp *</label>
                <input
                  type="tel"
                  required
                  placeholder="Contoh: 081234567890"
                  value={phoneWA}
                  onChange={(e) => setPhoneWA(e.target.value)}
                  className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-brand-blue"
                />
              </div>
            </div>

            {/* TAB 1: FORM MOUSE ORDER */}
            {activeTab === 'mouse' && (
              <div className="space-y-6 animate-fadeIn">
                <div className="flex items-center gap-2 text-brand-blue font-bold text-sm">
                  <MousePointer className="w-5 h-5 text-brand-red" />
                  <span>MDFKING Mouse Order Form</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="font-bold text-gray-200 block">Merk & Seri Mouse</label>
                    <input
                      type="text"
                      placeholder="Contoh: Logitech G Pro X Superlight / Razer Viper V2"
                      value={mouseBrand}
                      onChange={(e) => setMouseBrand(e.target.value)}
                      className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-brand-blue"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="font-bold text-gray-200 block">Pilihan Switch Replacement</label>
                    <select
                      value={switchChoice}
                      onChange={(e) => setSwitchChoice(e.target.value)}
                      className="w-full bg-[#18181C] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-blue"
                    >
                      <option value="TTC Gold Dustproof 80M">TTC Gold Dustproof 80M (Tactile & Recommended)</option>
                      <option value="Kailh GM 8.0 Black Mamba">Kailh GM 8.0 Black Mamba 80M</option>
                      <option value="Huano Blue Shell Pink Dot">Huano Blue Shell Pink Dot 80M</option>
                      <option value="Omron 20M / 50M">Omron Japan / Original Standard</option>
                      <option value="Optical Switch Original">Optical Switch Original (Razer/Logitech)</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="font-bold text-gray-200 block">Jenis Kerusakan Mouse (Bisa Pilih Banyak):</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                    {[
                      'Double Click (Tombol Kiri / Kanan)',
                      'Scroll Wheel Macet / Jumping',
                      'Cursor Melompat / Sensor Optik Loss',
                      'Ganti Cable Paracord Flex',
                      'Ganti Mouse Skates / Feet PTFE',
                      'Clean Total PCB / Board Repair',
                    ].map((issue) => (
                      <label key={issue} className="flex items-center gap-2.5 p-3 rounded-xl bg-white/5 border border-white/10 hover:border-brand-blue/50 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={mouseIssues.includes(issue)}
                          onChange={() => handleCheckboxToggle(mouseIssues, setMouseIssues, issue)}
                          className="w-4 h-4 rounded text-brand-blue focus:ring-brand-blue"
                        />
                        <span className="text-gray-300">{issue}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: FORM KEYBOARD ORDER */}
            {activeTab === 'keyboard' && (
              <div className="space-y-6 animate-fadeIn">
                <div className="flex items-center gap-2 text-brand-blue font-bold text-sm">
                  <Keyboard className="w-5 h-5 text-brand-red" />
                  <span>MDFKING Keyboard Order Form</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="font-bold text-gray-200 block">Tipe Keyboard</label>
                    <select
                      value={keyboardType}
                      onChange={(e) => setKeyboardType(e.target.value)}
                      className="w-full bg-[#18181C] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-blue"
                    >
                      <option value="Mechanical Keyboard Custom">Mechanical Keyboard (60%, TKL, Fullsize)</option>
                      <option value="Keyboard Laptop Internal">Keyboard Laptop Internal (Asus/Lenovo/Acer/MacBook)</option>
                      <option value="Keyboard Membrane / Gaming">Keyboard Membrane / Office</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="font-bold text-gray-200 block">Merk & Seri Keyboard / Tuts Bermasalah</label>
                    <input
                      type="text"
                      placeholder="Contoh: Keychron K2 / Tuts W, A, S, D & Spacebar"
                      value={specificFaultyKeys}
                      onChange={(e) => setSpecificFaultyKeys(e.target.value)}
                      className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-brand-blue"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="font-bold text-gray-200 block">Jenis Kerusakan Keyboard (Pilih Banyak):</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                    {[
                      'Tuts Macet / Not Registering',
                      'Key Chatter / Double Typing',
                      'Desolder & Replace Switch Baru',
                      'Full Lube & Modding (Krytox 205g0)',
                      'Ganti Keyboard Laptop Internal Full',
                      'Pembersihan Keycap & PCB Ultrasonic',
                    ].map((issue) => (
                      <label key={issue} className="flex items-center gap-2.5 p-3 rounded-xl bg-white/5 border border-white/10 hover:border-brand-blue/50 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={keyboardIssues.includes(issue)}
                          onChange={() => handleCheckboxToggle(keyboardIssues, setKeyboardIssues, issue)}
                          className="w-4 h-4 rounded text-brand-blue focus:ring-brand-blue"
                        />
                        <span className="text-gray-300">{issue}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: FORM GAMEPAD / CONTROLLER ORDER */}
            {activeTab === 'gamepad' && (
              <div className="space-y-6 animate-fadeIn">
                <div className="flex items-center gap-2 text-brand-blue font-bold text-sm">
                  <Gamepad2 className="w-5 h-5 text-brand-red" />
                  <span>MDFKING Gamepad / Controller Order Form</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="font-bold text-gray-200 block">Tipe Gamepad / Controller</label>
                    <select
                      value={gamepadType}
                      onChange={(e) => setGamepadType(e.target.value)}
                      className="w-full bg-[#18181C] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-blue"
                    >
                      <option value="PlayStation 5 DualSense">PlayStation 5 DualSense</option>
                      <option value="PlayStation 4 DualShock 4">PlayStation 4 DualShock 4</option>
                      <option value="Xbox Series X/S / Xbox One">Xbox Series X/S / Xbox One</option>
                      <option value="Nintendo Switch Joy-Con / Pro">Nintendo Switch Joy-Con / Pro Controller</option>
                      <option value="PC Gamepad (8BitDo/Fantech/Gamesir)">PC Gamepad (8BitDo / Fantech / Gamesir)</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="font-bold text-gray-200 block">Rekomendasi Upgrade</label>
                    <label className="flex items-center gap-2.5 p-3 rounded-xl bg-brand-blue/20 border border-brand-blue/30 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={upgradeHallEffect}
                        onChange={(e) => setUpgradeHallEffect(e.target.checked)}
                        className="w-4 h-4 rounded text-brand-blue focus:ring-brand-blue"
                      />
                      <span className="text-white font-bold">Upgrade Modul Hall Effect Anti-Drift (Magnetik Permanent)</span>
                    </label>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="font-bold text-gray-200 block">Keluhan Gamepad / Controller:</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                    {[
                      'Analog Drift Kiri / Kanan',
                      'Tombol Karet Rubber Pad Aus (L1/R1/Face Buttons)',
                      'Baterai Drop / Tidak Bisa Di-charge',
                      'Bluetooth / Disconnect Rusak',
                      'Flexible Board / Trigger Potentiometer',
                    ].map((issue) => (
                      <label key={issue} className="flex items-center gap-2.5 p-3 rounded-xl bg-white/5 border border-white/10 hover:border-brand-blue/50 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={gamepadIssues.includes(issue)}
                          onChange={() => handleCheckboxToggle(gamepadIssues, setGamepadIssues, issue)}
                          className="w-4 h-4 rounded text-brand-blue focus:ring-brand-blue"
                        />
                        <span className="text-gray-300">{issue}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 4: FORM LAPTOP SERVICE */}
            {activeTab === 'laptop' && (
              <div className="space-y-6 animate-fadeIn">
                <div className="flex items-center gap-2 text-brand-blue font-bold text-sm">
                  <Laptop className="w-5 h-5 text-brand-red" />
                  <span>Form Service Laptop & MacBook</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="font-bold text-gray-200 block">Merk & Seri Laptop / MacBook</label>
                    <input
                      type="text"
                      placeholder="Contoh: MacBook Air M1 / Asus TUF F15 / Lenovo Legion 5"
                      value={deviceModel}
                      onChange={(e) => setDeviceModel(e.target.value)}
                      className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-brand-blue"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="font-bold text-gray-200 block">Kategori Perbaikan Utama</label>
                    <select
                      className="w-full bg-[#18181C] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-blue"
                      defaultValue="Perbaikan Motherboard / Power"
                    >
                      <option value="Ganti Layar LCD / Flexible">Ganti Layar LCD / Flexible Display</option>
                      <option value="Upgrade SSD NVMe & RAM">Upgrade SSD NVMe & RAM</option>
                      <option value="Perbaikan Motherboard / Power">Perbaikan Motherboard / Mati Total / Terkena Air</option>
                      <option value="Ganti Baterai Original">Ganti Baterai Original / Port Charge</option>
                      <option value="Cleaning & Thermal Paste">Cleaning & Thermal Paste Premium (Anti Panas)</option>
                      <option value="Engsel & Body Repair">Perbaikan Engsel Patah & Casing</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 5: FORM RAKIT PC GAMING */}
            {activeTab === 'rakit-pc' && (
              <div className="space-y-6 animate-fadeIn">
                <div className="flex items-center gap-2 text-brand-blue font-bold text-sm">
                  <Cpu className="w-5 h-5 text-brand-red" />
                  <span>Form Spesifikasi Rakit PC Gaming & Workstation</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="font-bold text-gray-200 block">Alokasi Budget Rakit PC</label>
                    <select
                      value={pcBudget}
                      onChange={(e) => setPcBudget(e.target.value)}
                      className="w-full bg-[#18181C] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-blue"
                    >
                      <option value="Rp 5.000.000 - Rp 8.000.000">Rp 5.000.000 - Rp 8.000.000 (Esports Starter)</option>
                      <option value="Rp 8.000.000 - Rp 15.000.000">Rp 8.000.000 - Rp 15.000.000 (Mid Gaming Pro)</option>
                      <option value="Rp 15.000.000 - Rp 25.000.000">Rp 15.000.000 - Rp 25.000.000 (High End Gaming)</option>
                      <option value="> Rp 25.000.000">&gt; Rp 25.000.000 (Ultra 4K & Workstation)</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="font-bold text-gray-200 block">Tujuan Utama PC</label>
                    <select
                      value={pcPurpose}
                      onChange={(e) => setPcPurpose(e.target.value)}
                      className="w-full bg-[#18181C] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-blue"
                    >
                      <option value="Gaming Esports 1080p">Gaming Esports 1080p (Valorant/CS2/Dota)</option>
                      <option value="Gaming AAA Ray Tracing 2K/4K">Gaming AAA Ray Tracing (Cyberpunk/GTA V)</option>
                      <option value="3D Rendering & Editing Video 4K">3D Rendering, Editing Video 4K & Blender</option>
                      <option value="Live Streaming & Content Creation">Live Streaming & Content Creation</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-1.5">
                    <label className="font-bold text-gray-200 block">Processor</label>
                    <select value={cpuPref} onChange={(e) => setCpuPref(e.target.value)} className="w-full bg-[#18181C] border border-white/10 rounded-xl p-2.5 text-white">
                      <option value="Intel Core i3/i5">Intel Core i3 / i5</option>
                      <option value="Intel Core i7/i9">Intel Core i7 / i9</option>
                      <option value="AMD Ryzen 5/7">AMD Ryzen 5 / 7</option>
                      <option value="AMD Ryzen 7 7800X3D">AMD Ryzen 7 7800X3D</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-bold text-gray-200 block">GPU / VGA</label>
                    <select value={gpuPref} onChange={(e) => setGpuPref(e.target.value)} className="w-full bg-[#18181C] border border-white/10 rounded-xl p-2.5 text-white">
                      <option value="NVIDIA GTX 1650 / RTX 3050">NVIDIA GTX 1650 / RTX 3050</option>
                      <option value="NVIDIA RTX 4060 / 4060 Ti">NVIDIA RTX 4060 / 4060 Ti</option>
                      <option value="NVIDIA RTX 4070 / 4080 Super">NVIDIA RTX 4070 / 4080 Super</option>
                      <option value="AMD RX 6600 / 7700 XT">AMD Radeon RX Series</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-bold text-gray-200 block">Estetika Casing</label>
                    <select value={caseStyle} onChange={(e) => setCaseStyle(e.target.value)} className="w-full bg-[#18181C] border border-white/10 rounded-xl p-2.5 text-white">
                      <option value="Aquarium Panoramic RGB">Aquarium Panoramic RGB</option>
                      <option value="AIO Liquid Cooler 240/360mm">AIO Liquid Cooling RGB</option>
                      <option value="Minimalist Clean Tower">Minimalist Black Clean Tower</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 6: FORM INSTAL APLIKASI & GAME */}
            {activeTab === 'instalasi' && (
              <div className="space-y-6 animate-fadeIn">
                <div className="flex items-center gap-2 text-brand-blue font-bold text-sm">
                  <Download className="w-5 h-5 text-brand-red" />
                  <span>Form Order Instal OS, Software & Game PC</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="font-bold text-gray-200 block">Pilihan Sistem Operasi</label>
                    <select
                      value={osType}
                      onChange={(e) => setOsType(e.target.value)}
                      className="w-full bg-[#18181C] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-blue"
                    >
                      <option value="Windows 11 Pro 64-Bit">Windows 11 Pro Original & Driver Complete</option>
                      <option value="Windows 10 Pro 64-Bit">Windows 10 Pro 64-Bit</option>
                      <option value="MacOS Dual Boot / Reinstall">MacOS Dual Boot / Reinstall</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="font-bold text-gray-200 block">Software / Game Khusus Yang Diminta</label>
                    <input
                      type="text"
                      placeholder="Contoh: Adobe Premiere 2026, AutoCAD, Game Cyberpunk 2077"
                      value={customSoftwareReq}
                      onChange={(e) => setCustomSoftwareReq(e.target.value)}
                      className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-brand-blue"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="font-bold text-gray-200 block">Paket Software & Game (Pilih Banyak):</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                    {[
                      'Paket Office & Produktivitas Kuliah (MS Office 2021, PDF, Zoom)',
                      'Paket Design & Editing (Adobe CC 2026, Photoshop, Illustrator, Premiere)',
                      'Paket 3D & Engineering (Autodesk AutoCAD, 3ds Max, Blender, DaVinci)',
                      'Paket Game PC Esports (Valorant, CS2, Dota 2, Genshin Impact)',
                      'Paket Game PC Offline Triple-A (Cyberpunk 2077, GTA V, EA FC 24)',
                      'Tuning Performa Windows Anti-Lag & Antivirus Premium',
                    ].map((pack) => (
                      <label key={pack} className="flex items-center gap-2.5 p-3 rounded-xl bg-white/5 border border-white/10 hover:border-brand-blue/50 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={selectedSoftwarePacks.includes(pack)}
                          onChange={() => handleCheckboxToggle(selectedSoftwarePacks, setSelectedSoftwarePacks, pack)}
                          className="w-4 h-4 rounded text-brand-blue focus:ring-brand-blue"
                        />
                        <span className="text-gray-300">{pack}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* DETAIL GEJALA / CATATAN TAMBAHAN */}
            <div className="space-y-2">
              <label className="font-bold text-gray-200 block">Detail Catatan / Gejala Kerusakan Tambahan</label>
              <textarea
                rows={3}
                placeholder="Tuliskan catatan khusus atau instruksi tambahan untuk teknisi mdfkingpc..."
                value={problemDescription}
                onChange={(e) => setProblemDescription(e.target.value)}
                className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-brand-blue"
              />
            </div>

            {/* CLOUDINARY FILE UPLOAD SECTION */}
            <div className="space-y-3 pt-2 border-t border-white/10">
              <label className="font-bold text-gray-200 block flex items-center justify-between">
                <span>Upload Bukti Bayar / Foto Perangkat (Cloudinary Upload)</span>
                <span className="text-[10px] text-gray-400 font-normal">.jpg, .png, max 5MB</span>
              </label>

              <div className="border-2 border-dashed border-white/15 hover:border-brand-blue rounded-2xl p-6 text-center space-y-3 transition-colors bg-black/30">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  id="cloudinary-upload-input"
                  className="hidden"
                />
                
                {uploading ? (
                  <div className="flex flex-col items-center gap-2 py-4 text-brand-blue">
                    <Loader2 className="w-8 h-8 animate-spin" />
                    <span className="text-xs font-semibold">Mengunggah gambar ke Cloudinary...</span>
                  </div>
                ) : uploadPreview ? (
                  <div className="flex flex-col items-center gap-3">
                    <img
                      src={uploadPreview}
                      alt="Preview Bukti"
                      className="h-32 object-contain rounded-xl border border-white/20 shadow-md"
                    />
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1">
                        <CheckCircle2 className="w-4 h-4" /> Gambar Berhasil Terunggah ke Cloudinary
                      </span>
                      <label
                        htmlFor="cloudinary-upload-input"
                        className="text-xs text-brand-blue underline cursor-pointer font-bold ml-2"
                      >
                        Ganti File
                      </label>
                    </div>
                  </div>
                ) : (
                  <label htmlFor="cloudinary-upload-input" className="cursor-pointer flex flex-col items-center gap-2 py-2">
                    <div className="w-12 h-12 rounded-full bg-brand-blue/20 text-brand-blue flex items-center justify-center border border-brand-blue/30">
                      <Upload className="w-6 h-6 text-brand-red" />
                    </div>
                    <span className="text-xs font-bold text-white">Upload Bukti Bayar / Foto Kerusakan</span>
                    <span className="text-[11px] text-gray-400">File diunggah langsung ke Cloudinary</span>
                  </label>
                )}
              </div>
            </div>

            {/* JAMINAN SERVICE */}
            <div className="flex items-center gap-2 p-3 rounded-xl bg-white/5 border border-white/10 text-xs text-gray-300">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Diagnostik pengecekan gratis & garansi perbaikan 30 hari di mdfkingpc Bandung.</span>
            </div>

            {/* SUBMIT BUTTON */}
            <button
              type="submit"
              disabled={submitting || uploading}
              className="w-full py-4 rounded-xl font-bold text-white bg-brand-blue hover:bg-brand-blue-hover shadow-glow-blue border border-blue-400/30 transition-all flex items-center justify-center gap-2 text-sm disabled:opacity-50"
            >
              {submitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Mengirim Formulir...</span>
                </>
              ) : (
                <>
                  <Wrench className="w-5 h-5 text-brand-red" />
                  <span>Kirim Formulir Pemesanan</span>
                </>
              )}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default function PemesananPage() {
  return (
    <Suspense fallback={
      <div className="min-h-[50vh] flex items-center justify-center text-white text-xs font-bold gap-2">
        <Loader2 className="w-6 h-6 animate-spin text-brand-blue" />
        <span>Memuat Formulir Pemesanan mdfkingpc...</span>
      </div>
    }>
      <PemesananContent />
    </Suspense>
  );
}
