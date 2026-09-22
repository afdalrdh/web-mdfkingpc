import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { SERVICES_LIST, REPAIR_PRICING_TABLES, SITE_INFO } from '@/data/mockData';
import { Wrench, ShieldCheck, Clock, Award, CheckCircle2, ArrowRight, MessageSquare, AlertCircle } from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

export function generateStaticParams() {
  return SERVICES_LIST.map((service) => ({
    slug: service.slug,
  }));
}

export default function ServiceDetailPage({ params }: { params: { slug: string } }) {
  const service = SERVICES_LIST.find((s) => s.slug === params.slug);

  if (!service) {
    notFound();
  }

  const repairTable = REPAIR_PRICING_TABLES[service.slug] || [];

  return (
    <div className="min-h-screen bg-brand-dark text-slate-100 flex flex-col font-sans">
      <Navbar />

      <main className="flex-1">
        {/* Service Hero Banner */}
        <section className="relative py-16 lg:py-24 bg-gradient-to-b from-brand-dark via-slate-900 to-brand-dark overflow-hidden border-b border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs font-bold uppercase tracking-wider">
                  <Wrench className="w-3.5 h-3.5 text-brand-red" />
                  <span>{service.category}</span>
                </div>

                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
                  {service.title}
                </h1>

                <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
                  {service.fullDesc}
                </p>

                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <div className="bg-slate-800/80 border border-slate-700/60 rounded-2xl px-5 py-3">
                    <span className="text-xs text-slate-400 block uppercase font-medium">Estimasi Mulai Dari</span>
                    <span className="text-2xl font-black text-emerald-400">{service.priceStarting}</span>
                  </div>

                  <Link
                    href={`/pemesanan?service=${encodeURIComponent(service.title)}`}
                    className="inline-flex items-center justify-center px-6 py-4 rounded-2xl bg-brand-blue hover:bg-brand-blue-hover text-white font-bold text-sm shadow-lg shadow-sky-500/20 transition-all hover:scale-[1.02]"
                  >
                    <span>Pesan Layanan Ini</span>
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>

                  <a
                    href={`https://wa.me/${SITE_INFO.whatsapp}?text=Halo%20mdfkingpc,%20saya%20ingin%20tanya%20layanan%20${encodeURIComponent(service.title)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center px-6 py-4 rounded-2xl bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-400 border border-emerald-500/30 font-bold text-sm transition-all"
                  >
                    <MessageSquare className="w-4 h-4 mr-2" />
                    <span>Konsultasi WA</span>
                  </a>
                </div>
              </div>

              {/* Service Visual */}
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-sky-500 to-rose-500 rounded-3xl opacity-20 blur-xl"></div>
                <div className="relative rounded-3xl overflow-hidden border border-slate-700/80 shadow-2xl aspect-[4/3]">
                  <Image
                    src={service.imageUrl}
                    alt={service.title}
                    fill
                    className="object-cover"
                    priority
                  />
                  {service.badge && (
                    <div className="absolute top-4 right-4 bg-brand-red text-white text-xs font-black uppercase tracking-wider px-3.5 py-1.5 rounded-full shadow-lg">
                      {service.badge}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing & Repair Table Section */}
        <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-center max-w-3xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-3">
              Rincian Perbaikan & Estimasi Biaya
            </h2>
            <p className="text-slate-400 text-sm">
              Tabel kisaran harga perbaikan transparan, estimasi durasi pengerjaan, dan jaminan garansi resmi di mdfkingpc.
            </p>
          </div>

          {repairTable.length > 0 ? (
            <div className="overflow-x-auto rounded-3xl border border-slate-800 bg-slate-900/60 shadow-xl backdrop-blur-md">
              <table className="w-full text-left text-sm text-slate-300">
                <thead className="bg-slate-800/80 text-xs uppercase font-bold text-slate-200 tracking-wider border-b border-slate-700">
                  <tr>
                    <th className="px-6 py-4">Jenis Perbaikan / Problem</th>
                    <th className="px-6 py-4">Deskripsi Layanan</th>
                    <th className="px-6 py-4">Kisaran Harga (Rp)</th>
                    <th className="px-6 py-4">Estimasi Waktu</th>
                    <th className="px-6 py-4">Garansi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {repairTable.map((item, idx) => (
                    <tr key={idx} className="hover:bg-slate-800/40 transition-colors">
                      <td className="px-6 py-4 font-bold text-white whitespace-nowrap flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                        <span>{item.problemName}</span>
                      </td>
                      <td className="px-6 py-4 text-slate-400 max-w-xs">{item.description}</td>
                      <td className="px-6 py-4 font-extrabold text-emerald-400 whitespace-nowrap">{item.priceRange}</td>
                      <td className="px-6 py-4 text-slate-300 whitespace-nowrap flex items-center gap-1.5 mt-2">
                        <Clock className="w-3.5 h-3.5 text-sky-400" />
                        <span>{item.estimatedTime}</span>
                      </td>
                      <td className="px-6 py-4 text-slate-200 font-semibold whitespace-nowrap">
                        <span className="inline-block px-2.5 py-1 rounded-md bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs">
                          {item.warranty}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-12 bg-slate-900/40 rounded-3xl border border-slate-800 text-slate-400">
              <AlertCircle className="w-10 h-10 mx-auto text-sky-400 mb-2" />
              <p>Hubungi teknisi mdfkingpc via WA 085158916661 untuk konsultasi spesifik.</p>
            </div>
          )}
        </section>

        {/* Keuntungan Servis di mdfkingpc */}
        <section className="py-16 bg-slate-900/40 border-t border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-white text-center mb-12">
              Keuntungan Servis Layanan Ini di <span className="text-sky-400">mdfkingpc</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-slate-800/60 border border-slate-700/50 rounded-2xl p-6 hover:border-sky-500/40 transition-all">
                <div className="w-12 h-12 rounded-xl bg-sky-500/10 text-sky-400 flex items-center justify-center font-bold text-xl mb-4">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Diagnostik Gratis</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Pemeriksaan awal kerusakan perangkat tanpa dipungut biaya sedikitpun. Anda berhak membatalkan jika tidak cocok.
                </p>
              </div>

              <div className="bg-slate-800/60 border border-slate-700/50 rounded-2xl p-6 hover:border-sky-500/40 transition-all">
                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold text-xl mb-4">
                  <Award className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Garansi 30 Hari</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Jaminan penuh selama 30 hari untuk setiap perbaikan & pergantian part yang kami kerjakan.
                </p>
              </div>

              <div className="bg-slate-800/60 border border-slate-700/50 rounded-2xl p-6 hover:border-sky-500/40 transition-all">
                <div className="w-12 h-12 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center font-bold text-xl mb-4">
                  <Clock className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Pengerjaan Cepat</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Sebagian besar perbaikan ringan seperti LCD, baterai, & switch peripheral selesai dalam 1-3 jam.
                </p>
              </div>

              <div className="bg-slate-800/60 border border-slate-700/50 rounded-2xl p-6 hover:border-sky-500/40 transition-all">
                <div className="w-12 h-12 rounded-xl bg-rose-500/10 text-rose-400 flex items-center justify-center font-bold text-xl mb-4">
                  <Wrench className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Teknisi Profesional</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Ditangani langsung oleh tim teknisi berpengalaman 8+ tahun di Bandung dengan suku cadang original.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
