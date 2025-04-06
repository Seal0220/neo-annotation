'use client';
import SEO from '@/app/SEO';
import { store } from '@/app/store/store';

import { Provider } from 'react-redux';

import './globals.css';
import './fonts.css';


export default function RootLayout({ children }) {
  return (
    <html lang="zh-Hant">
      <head>
        <SEO />
        <title>NEO-ANNOTATION | 北藝新媒110級畢業展</title>

      </head>
      <body className="antialiased">
        <Provider store={store}>
          <main className="min-h-dvh min-w-full">
            {children}
          </main>

          <footer className="bottom-0 flex gap-6 h-16 text-neutral-400 text-xs font-bold flex-wrap items-center justify-center bg-black">
            北藝新媒110級畢業展 neo-annotation
          </footer>
        </Provider>
      </body>
    </html>
  );
}
