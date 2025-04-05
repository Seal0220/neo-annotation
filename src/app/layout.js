import Head from 'next/head';
import SEO from './SEO';

import './globals.css';
import './fonts.css';

export default function RootLayout({ children }) {
  return (
    <html lang="zh-Hant">
      <head>
        <SEO />
        <title>NEO-ANNOTATION | 北藝新媒110級畢業展</title>
        <meta
          name="description"
          content="本屆北藝大新媒體藝術學系110級畢業展『新增註解 neo-annotation』以線上編輯工具的註解功能為靈感，延伸成藝術行動，探索多元觀點在科技與社群媒介下的對話。"
        />
        <meta name="keywords" content="新增註解, neo-annotation, 北藝新媒, 畢業展, 新媒體藝術" />
        <meta name="robots" content="index,follow" />
        <link rel="canonical" href="https://www.neo-annotation.art/" />
        <meta property="og:title" content="新增註解 neo-annotation | 北藝新媒110級畢業展" />
        <meta
          property="og:description"
          content="本屆北藝大新媒體藝術學系110級畢業展『新增註解 neo-annotation』以線上編輯工具的註解功能為靈感，延伸成藝術行動，探索多元觀點在科技與社群媒介下的對話。"
        />
        <meta property="og:url" content="https://www.neo-annotation.art/" />
        <meta property="og:site_name" content="NEO-ANNOTATION" />
        <meta property="og:locale" content="zh_TW" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://www.neo-annotation.art/og-image.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="新增註解 neo-annotation | 北藝新媒110級畢業展" />
        <meta
          name="twitter:description"
          content="本屆北藝大新媒體藝術學系110級畢業展『新增註解 neo-annotation』以線上編輯工具的註解功能為靈感，延伸成藝術行動，探索多元觀點在科技與社群媒介下的對話。"
        />
        <meta name="twitter:image" content="https://www.neo-annotation.art/og-image.png" />
      </head>
      <body className="antialiased">
        <main className="min-h-dvh">
          {children}
        </main>

        <footer className="bottom-0 flex gap-6 h-16 text-neutral-400 text-xs font-bold flex-wrap items-center justify-center bg-black">
          北藝新媒110級畢業展 neo-annotation
        </footer>
      </body>
    </html>
  );
}
