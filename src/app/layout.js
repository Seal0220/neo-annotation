import './globals.css';
import './fonts.css';

export const metadata = {
  title: 'NEO-ANNOTATION',
  description: 'TNUA NMA 110',
};

export default function RootLayout({ children }) {
  return (
    <html lang=''>
      <body
        className={`antialiased`}
      >
        <main className='min-h-dvh'>
          {children}
        </main>

        <footer className='bottom-0 flex gap-6 h-16 text-neutral-400 text-xs font-bold flex-wrap items-center justify-center bg-black'>
          北藝新媒110級畢業展 neo-annotation
        </footer>
      </body>
    </html>
  );
}
