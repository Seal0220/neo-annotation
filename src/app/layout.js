import { Sen } from 'next/font/google';
import './globals.css';

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
        className={`${sen.variable} antialiased font-[family-name:var(--font-sen)]`}
      >
        <main className='min-h-dvh'>
          {children}
        </main>

        <footer className='bottom-0 flex gap-6 flex-wrap items-center justify-center bg-yellow-500'>
          FOOTER
        </footer>
      </body>
    </html>
  );
}
