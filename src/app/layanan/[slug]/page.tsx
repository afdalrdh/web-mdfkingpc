import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { SERVICES_LIST, REPAIR_PRICING_TABLES, SITE_INFO } from '@/data/mockData';
import { Wrench, ShieldCheck, Clock, Award, CheckCircle2, ArrowRight, MessageSquare, AlertCircle } from 'lucide-react';
import RakitPcSimulator from '@/components/RakitPcSimulator';

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
  const isRakitPc = service.slug === 'rakit-pc-gaming';

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col font-sans">
      <main className="flex-1">
        {/* Service Hero Banner */}
        <section className="relative py-16 lg:py-24 bg-gradient-to-b from-blue-50/50 via-slate-50/30 to-white overflow-hidden border-b border-slate-200/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200/80 text-blue-700 text-xs font-bold uppercase tracking-wider">
                  <Wrench className="w-3.5 h-3.5 text-red-500" />
                  <span>{service.category}</span>
                </div>

                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 font-display uppercase leading-tight">
                  {service.title}
                </h1>

                <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-sans">
                  {service.fullDesc}
                </p>

                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <div className="bg-white border border-slate-200 rounded-2xl px-5 py-3 shadow-sm">
                    <span className="text-xs text-slate-500 block uppercase font-medium">Estimasi Mulai Dari</span>
                    <span className="text-2xl font-black text-blue-600 font-display">{service.priceStarting}</span>
                  </div>

                  <Link
                    href={`/pemesanan?service=${encodeURIComponent(service.title)}`}
                    className="btn-hitboox btn-hitboox-primary text-xs !py-3.5 !px-6 font-bold tracking-wider shadow-pill-blue"
                  >
                    <span>Pesan Layanan Ini</span>
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>

                  <a
                    href={`https://wa.me/${SITE_INFO.whatsapp}?text=Halo%20mdfkingpc,%20saya%20ingin%20tanya%20layanan%20${encodeURIComponent(service.title)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-hitboox bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 text-xs !py-3.5 !px-6 font-bold tracking-wider"
                  >
                    <MessageSquare className="w-4 h-4 mr-2" />
                    <span>Konsultasi WA</span>
                  </a>
                </div>
              </div>

              {/* Service Visual */}
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-3xl opacity-70 blur-xl"></div>
                <div className="relative rounded-3xl overflow-hidden border border-slate-200 shadow-xl aspect-[4/3] bg-white">
                  <Image
                    src={service.imageUrl}
                    alt={service.title}
                    fill
                    className="object-cover"
                    priority
                  />
                  {service.badge && (
                    <div className="absolute top-4 right-4 bg-red-500 text-white text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full shadow-md">
                      {service.badge}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing & Repair / Simulator Section */}
        <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {isRakitPc ? (
            <RakitPcSimulator />
          ) : (
            <>
              <div className="mb-10 text-center max-w-3xl mx-auto">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display uppercase mb-3">
                  Rincian Perbaikan & Estimasi Biaya
                </h2>
                <p className="text-slate-600 text-sm">
                  Tabel kisaran harga perbaikan transparan, estimasi durasi pengerjaan, dan jaminan garansi resmi di mdfkingpc.
                </p>
              </div>

              {repairTable.length > 0 ? (
                <div className="overflow-x-auto rounded-3xl border border-slate-200 bg-white shadow-sm">
                  <table className="w-full text-left text-sm text-slate-700">
                    <thead className="bg-slate-50 text-xs uppercase font-bold text-slate-700 tracking-wider border-b border-slate-200">
                      <tr>
                        <th className="px-6 py-4">Jenis Perbaikan / Problem</th>
                        <th className="px-6 py-4">Deskripsi Layanan</th>
                        <th className="px-6 py-4">Kisaran Harga (Rp)</th>
                        <th className="px-6 py-4">Estimasi Waktu</th>
                        <th className="px-6 py-4">Garansi</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {repairTable.map((item, idx) => (
                        <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                          <td className="px-6 py-4 font-bold text-slate-900 whitespace-nowrap flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                            <span>{item.problemName}</span>
                          </td>
                          <td className="px-6 py-4 text-slate-600 max-w-xs">{item.description}</td>
                          <td className="px-6 py-4 font-extrabold text-blue-600 whitespace-nowrap">{item.priceRange}</td>
                          <td className="px-6 py-4 text-slate-600 whitespace-nowrap flex items-center gap-1.5 mt-2">
                            <Clock className="w-3.5 h-3.5 text-blue-600" />
                            <span>{item.estimatedTime}</span>
                          </td>
                          <td className="px-6 py-4 text-slate-700 font-semibold whitespace-nowrap">
                            <span className="inline-block px-2.5 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-xs">
                              {item.warranty}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-12 bg-slate-50 rounded-3xl border border-slate-200 text-slate-600">
                  <AlertCircle className="w-10 h-10 mx-auto text-blue-600 mb-2" />
                  <p>Hubungi teknisi mdfkingpc via WA 085158916661 untuk konsultasi spesifik.</p>
                </div>
              )}
            </>
          )}
        </section>

        {/* Keuntungan Servis di mdfkingpc */}
        <section className="py-16 bg-slate-50/70 border-t border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 font-display uppercase text-center mb-12">
              Keuntungan Servis Layanan Ini di <span className="text-blue-600">mdfkingpc</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-3">
                <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 mb-4 border border-blue-100">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 font-sans">Garansi Sampai Puas</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Setiap pengerjaan garansi 30 hari hingga 90 hari. Bebas konsultasi & pengerjaan perbaikan ulang gratis jika kendala berulang.
                </p>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-3">
                <div className="w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center text-red-600 mb-4 border border-red-100">
                  <Wrench className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 font-sans">Teknisi Sertifikasi Professional</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Pengerjaan ditangani spesialis perangkat keras mikro (micro-soldering, BIOS chip reprogram, & modding controller/peripheral).
                </p>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-3">
                <div className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600 mb-4 border border-amber-100">
                  <Award className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 font-sans">Sparepart Original Bergaransi</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Seluruh sparepart (switch mouse, modul joystick Hall Effect, layar laptop, SSD, PSU) original dan bergaransi distributor resmi.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
