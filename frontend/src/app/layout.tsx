import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ReactNode } from 'react';
import TopBar from '../components/common/TopBar';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Movies Management',
  description: 'All the movies here!',
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className + " bg-[#111111]"}>
        <main className="container mx-auto p-4 min-h-screen bg-gray-100">
          <TopBar />
          {children}
        </main>
      </body>
    </html>
  );
}