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

        <footer className='bottom-0 flex gap-6 flex-wrap items-center justify-center bg-yellow-500'>
          FOOTER
        </footer>
      </body>
    </html>
  );
}
