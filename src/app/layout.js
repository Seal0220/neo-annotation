import { Geist, Geist_Mono, Sen } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const sen = Sen({
  variable: '--font-sen',
  subsets: ['latin'],
});



export const metadata = {
  title: 'NEO-ANNOTATION',
  description: 'TNUA NMA 110',
};

export default function RootLayout({ children }) {
  return (
    <html lang=''>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${sen.variable} antialiased font-[family-name:var(--font-sen)]`}
      >
        {children}
      </body>
    </html>
  );
}
