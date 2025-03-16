'use client';
import React, { useEffect, useRef, useState } from 'react';

export default function ScrollHorizontal() {
  const containerRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  const metrics = useElementMetrics(containerRef);

  useEffect(() => {
    if (metrics) {
      if (metrics) {
        const handleScroll = () => {
          if (!containerRef.current) return;
          const scrollTop = window.scrollY;
          const maxScroll = document.documentElement.clientHeight * 2; // 最大滾動範圍 (因為頁面是 3 屏高)
          const progress = Math.min(scrollTop / maxScroll, 1); // 0 到 1 之間
          setScrollProgress(progress);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
      }
    }
  }, [metrics]);

  useEffect(() => { console.log(metrics) }, [metrics]);

  return (
    <div className='h-[300vh] bg-gray-100'>
      {/* 固定滾動區域 */}
      <div className='sticky top-0 h-screen flex items-center justify-center overflow-hidden'>
        <div
          ref={containerRef}
          className='flex space-x-10 w-[300vw] '
          style={{
            transform: `translateX(-${scrollProgress * 100}vw)`, // 控制水平移動
          }}
        >
          {/* 內容區塊 */}
          <div className='w-screen h-96 bg-blue-500 flex items-center justify-center text-white text-5xl font-bold rounded-lg shadow-lg'>
            內容 1
          </div>
          <div className='w-screen h-96 bg-red-500 flex items-center justify-center text-white text-5xl font-bold rounded-lg shadow-lg'>
            內容 2
          </div>
          <div className='w-screen h-96 bg-green-500 flex items-center justify-center text-white text-5xl font-bold rounded-lg shadow-lg'>
            內容 3
          </div>
        </div>
      </div>
    </div>
  );
}