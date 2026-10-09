import type { Metadata } from 'next';
import './globals.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: 'LŪMEN - Essentials for Intentional Living',
  description: 'Thoughtfully crafted products that elevate everyday moments. Sustainably made, timeless design.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}