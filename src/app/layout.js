'use client';
import SEO from '@/app/SEO';
import { store } from '@/app/store/store';

import { Provider } from 'react-redux';

import './globals.css';
import './fonts.css';


export default function RootLayout({ children }) {
  return (
    <html lang='zh-Hant'>
      <head>
        <SEO />
        <title>NEO-ANNOTATION | 北藝新媒110級畢業展</title>

      </head>
      <body className='antialiased bg-black'>
        <Provider store={store}>
          <main className='min-h-dvh min-w-full'>
            {children}
          </main>

          <footer className='bottom-0 w-lvw flex gap-6 h-32 text-neutral-400 text-sm font-bold flex-wrap items-center justify-center leading-tight bg-black z-30'>
            <div className='flex flex-col justify-center items-center'>
              <span>北藝新媒110級畢業展 neo-annotation</span>
              <br />
              <div className='text-xs text-neutral-600 text-center'>This website was developed by 陳奕銓 (@SEAL) <br/>and co-designed with 胡乃云.</div>
            </div>
          </footer>
        </Provider>
      </body>
    </html>
  );
}
