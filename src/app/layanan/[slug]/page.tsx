import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { SERVICES_LIST, REPAIR_PRICING_TABLES, SITE_INFO } from '@/data/mockData';
import { prisma } from '@/lib/prisma';
import { getStoredServices } from '@/lib/storage';
import { Wrench, ShieldCheck, Clock, Award, CheckCircle2, ArrowRight, MessageSquare, AlertCircle } from 'lucide-react';
import RakitPcSimulator from '@/components/RakitPcSimulator';

export const dynamic = 'force-dynamic';

export async function generateStaticParams() {
  return SERVICES_LIST.map((service) => ({
    slug: service.slug,
  }));
}

export default async function ServiceDetailPage({ params }: { params: { slug: string } }) {
  let service: any = null;

  try {
    if (process.env.DATABASE_URL) {
      const dbS = await prisma.service.findFirst({
        where: { slug: params.slug },
      });
      if (dbS) {
        service = {
          id: dbS.id,
          slug: dbS.slug,
          title: dbS.title,
          category: dbS.category,
          shortDesc: dbS.shortDesc || '',
          fullDesc: dbS.description,
          priceStarting: dbS.priceStarting,
          price: dbS.price,
          imageUrl: dbS.imageUrl,
          badge: dbS.badge || undefined,
          features: dbS.features,
        };
      }
    }
  } catch (e) {
    console.error('Error fetching service from DB in ServiceDetailPage:', e);
  }

  if (!service) {
    const jsonServices = getStoredServices();
    service = jsonServices.find((s) => s.slug === params.slug);
  }

  if (!service) {
    service = SERVICES_LIST.find((s) => s.slug === params.slug);
  }

  if (!service) {
    notFound();
  }

  const repairTable = REPAIR_PRICING_TABLES[service.slug] || [];
  const isRakitPc = service.slug === 'rakit-pc-gaming';

  return (
    <div className="min-h-screen bg-transparent text-slate-100 flex flex-col font-sans">
      <main className="flex-1">
        {/* Service Hero Banner */}
        <section className="relative py-16 lg:py-24 bg-gradient-to-b from-[#0B0E18] via-[#070911] to-transparent overflow-hidden border-b border-white/[0.06]">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/[0.12] rounded-full blur-[140px] pointer-events-none" />
          <div className="absolute bottom-0 right-10 w-80 h-80 bg-cyan-500/[0.09] rounded-full blur-[100px] pointer-events-none" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-cyan-400 text-xs font-bold uppercase tracking-wider">
                  <Wrench className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{service.category}</span>
                </div>

                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white font-display uppercase leading-tight">
                  {service.title}
                </h1>

                <p className="text-base sm:text-lg text-slate-400 leading-relaxed font-sans">
                  {service.fullDesc}
                </p>

                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <div className="bg-white/[0.04] border border-white/10 rounded-2xl px-5 py-3 backdrop-blur-sm">
                    <span className="text-xs text-slate-400 block uppercase font-medium">Estimasi Mulai Dari</span>
                    <span className="text-2xl font-black text-cyan-400 font-display">{service.priceStarting}</span>
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
                    className="btn-hitboox bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs !py-3.5 !px-6 font-bold tracking-wider transition-all duration-300"
                  >
                    <MessageSquare className="w-4 h-4 mr-2" />
                    <span>Konsultasi WA</span>
                  </a>
                </div>
              </div>

              {/* Service Visual */}
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-blue-600/[0.15] to-indigo-600/[0.1] rounded-3xl opacity-70 blur-xl"></div>
                <div className="relative rounded-3xl overflow-hidden border border-white/[0.08] shadow-[0_20px_50px_rgba(0,0,0,0.7)] aspect-[4/3] bg-[#0B0D16]">
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
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-display uppercase mb-3">
                  Rincian Perbaikan & Estimasi Biaya
                </h2>
                <p className="text-slate-400 text-sm">
                  Tabel kisaran harga perbaikan transparan, estimasi durasi pengerjaan, dan jaminan garansi resmi di mdfkingpc.
                </p>
              </div>

              {repairTable.length > 0 ? (
                <div className="overflow-x-auto rounded-3xl border border-white/[0.08] bg-[#0D0F18]/90 shadow-[0_15px_40px_rgba(0,0,0,0.6)]">
                  <table className="w-full text-left text-sm text-slate-300">
                    <thead className="bg-white/[0.03] text-xs uppercase font-bold text-slate-400 tracking-wider border-b border-white/[0.08]">
                      <tr>
                        <th className="px-6 py-4">Jenis Perbaikan / Problem</th>
                        <th className="px-6 py-4">Deskripsi Layanan</th>
                        <th className="px-6 py-4">Kisaran Harga (Rp)</th>
                        <th className="px-6 py-4">Estimasi Waktu</th>
                        <th className="px-6 py-4">Garansi</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/[0.05]">
                      {repairTable.map((item, idx) => (
                        <tr key={idx} className="hover:bg-white/[0.03] transition-colors">
                          <td className="px-6 py-4 font-bold text-white whitespace-nowrap flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                            <span>{item.problemName}</span>
                          </td>
                          <td className="px-6 py-4 text-slate-400 max-w-xs">{item.description}</td>
                          <td className="px-6 py-4 font-extrabold text-cyan-400 whitespace-nowrap">{item.priceRange}</td>
                          <td className="px-6 py-4 text-slate-400 whitespace-nowrap flex items-center gap-1.5 mt-2">
                            <Clock className="w-3.5 h-3.5 text-blue-400" />
                            <span>{item.estimatedTime}</span>
                          </td>
                          <td className="px-6 py-4 text-slate-300 font-semibold whitespace-nowrap">
                            <span className="inline-block px-2.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-cyan-400 text-xs">
                              {item.warranty}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-12 bg-white/[0.03] rounded-3xl border border-white/[0.08] text-slate-400">
                  <AlertCircle className="w-10 h-10 mx-auto text-cyan-400 mb-2" />
                  <p>Hubungi teknisi mdfkingpc via WA 085158916661 untuk konsultasi spesifik.</p>
                </div>
              )}
            </>
          )}
        </section>

        {/* Keuntungan Servis di mdfkingpc */}
        <section className="py-16 bg-gradient-to-b dark:from-transparent dark:to-[#040608] from-slate-100/60 to-slate-200/40 border-t dark:border-white/[0.06] border-slate-200/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl font-bold dark:text-white text-slate-900 font-display uppercase text-center mb-12">
              Keuntungan Servis Layanan Ini di <span className="text-cyan-400">mdfkingpc</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="dark:bg-[#0D0F18] bg-white p-6 rounded-2xl dark:border-white/[0.08] border-slate-200/90 shadow-lg space-y-3 hover:border-cyan-500/30 transition-all duration-300">
                <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mb-4">
                  <ShieldCheck className="w-6 h-6 text-cyan-400" />
                </div>
                <h3 className="text-lg font-bold dark:text-white text-slate-900 font-sans">Garansi Sampai Puas</h3>
                <p className="text-xs dark:text-slate-400 text-slate-600 leading-relaxed">
                  Setiap pengerjaan garansi 30 hari hingga 90 hari. Bebas konsultasi & pengerjaan perbaikan ulang gratis jika kendala berulang.
                </p>
              </div>

              <div className="dark:bg-[#0D0F18] bg-white p-6 rounded-2xl dark:border-white/[0.08] border-slate-200/90 shadow-lg space-y-3 hover:border-cyan-500/30 transition-all duration-300">
                <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mb-4">
                  <Wrench className="w-6 h-6 text-blue-400" />
                </div>
                <h3 className="text-lg font-bold dark:text-white text-slate-900 font-sans">Teknisi Sertifikasi Professional</h3>
                <p className="text-xs dark:text-slate-400 text-slate-600 leading-relaxed">
                  Pengerjaan ditangani spesialis perangkat keras mikro (micro-soldering, BIOS chip reprogram, & modding controller/peripheral).
                </p>
              </div>

              <div className="dark:bg-[#0D0F18] bg-white p-6 rounded-2xl dark:border-white/[0.08] border-slate-200/90 shadow-lg space-y-3 hover:border-cyan-500/30 transition-all duration-300">
                <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mb-4">
                  <Award className="w-6 h-6 text-amber-400" />
                </div>
                <h3 className="text-lg font-bold dark:text-white text-slate-900 font-sans">Sparepart Original Bergaransi</h3>
                <p className="text-xs dark:text-slate-400 text-slate-600 leading-relaxed">
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
