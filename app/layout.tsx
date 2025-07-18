import type { Metadata } from 'next';
import { Inter, Poppins } from 'next/font/google';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import DynamicNavbarWrapper from '@/components/layout/DynamicNavbarWrapper';
import { generateMetadata } from '@/components/seo/MetaTags';
import { CartProvider } from '@/contexts/CartContext';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
});

const poppins = Poppins({ 
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-poppins',
});

export const metadata: Metadata = generateMetadata({
  title: 'Curtains and Covers - Premium Custom Made Curtains & Covers',
  description: 'Custom made curtains, covers, and fabric solutions. Premium quality materials, perfect fit guaranteed. Order online or via WhatsApp.',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
      <body className="font-sans antialiased">
        <CartProvider>
          <div className="min-h-screen flex flex-col">
            <Header />
            <DynamicNavbarWrapper />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </div>
        </CartProvider>
      </body>
    </html>
  );
} 