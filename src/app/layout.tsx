import type { Metadata } from 'next';
import './globals.css';
import { ConditionalLayout } from '@/components/ConditionalLayout';
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
    <html lang="id" className="light scroll-smooth">
      <body className="bg-white text-slate-900 font-sans min-h-screen flex flex-col antialiased selection:bg-blue-100 selection:text-blue-900">
        <ConditionalLayout>{children}</ConditionalLayout>
      </body>
    </html>
  );
}
