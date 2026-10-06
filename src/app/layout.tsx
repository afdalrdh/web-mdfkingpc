import type { Metadata } from 'next';
import './globals.css';
import { ConditionalLayout } from '@/components/ConditionalLayout';
import { ThemeProvider } from '@/components/ThemeProvider';
import { SITE_INFO } from '@/data/mockData';

export const metadata: Metadata = {
  title: `${SITE_INFO.name} - ${SITE_INFO.slogan}`,
  description: `${SITE_INFO.subSlogan} ${SITE_INFO.story}`,
  keywords: [
    'service laptop bandung',
    'service laptop cimahi',
    'service macbook bandung',
    'service macbook cimahi',
    'rakit pc gaming bandung',
    'rakit pc gaming cimahi',
    'service keyboard mechanical',
    'service joystick ps5 bandung',
    'service joystick ps5 cimahi',
    'mdfkingpc',
    'made for king pc',
    'solusi IT bandung',
    'solusi IT cimahi'
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
    <html lang="id" className="dark scroll-smooth" suppressHydrationWarning>
      <body className="font-sans min-h-screen flex flex-col antialiased selection:bg-blue-600 selection:text-white relative overflow-x-hidden">
        <ThemeProvider>
          {/* Ambient Studio Atmosphere Glows */}
          <div className="fixed -top-40 -left-40 w-[650px] h-[650px] rounded-full blur-[160px] pointer-events-none -z-10 dark:bg-blue-600/[0.07] bg-blue-500/[0.04]" />
          <div className="fixed top-1/3 -right-40 w-[550px] h-[550px] rounded-full blur-[160px] pointer-events-none -z-10 dark:bg-cyan-500/[0.05] bg-cyan-500/[0.03]" />
          <div className="fixed -bottom-40 left-1/3 w-[600px] h-[600px] rounded-full blur-[160px] pointer-events-none -z-10 dark:bg-indigo-600/[0.06] bg-indigo-500/[0.03]" />
          <ConditionalLayout>{children}</ConditionalLayout>
        </ThemeProvider>
      </body>
    </html>
  );
}
