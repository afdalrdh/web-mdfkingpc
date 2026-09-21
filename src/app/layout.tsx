import type { Metadata } from 'next';
import './globals.css';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { WhatsAppButton } from '@/components/WhatsAppButton';
import { SITE_INFO } from '@/data/mockData';

export const metadata: Metadata = {
  title: `${SITE_INFO.name} - ${SITE_INFO.slogan}`,
  description: `${SITE_INFO.subSlogan} ${SITE_INFO.story}`,
  keywords: [
    'service laptop bandung',
    'service macbook bandung',
    'rakit pc gaming bandung',
    'service keyboard mechanical',
    'service joystick ps5 bandung',
    'mdfkingpc',
    'made for king pc',
    'solusi IT bandung'
  ],
  icons: {
    icon: '/logo.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className="dark scroll-smooth">
      <body className="bg-[#141414] text-gray-100 min-h-screen flex flex-col antialiased">
        <Navbar />
        <main className="flex-grow">
          {children}
        </main>
        <WhatsAppButton />
        <Footer />
      </body>
    </html>
  );
}
