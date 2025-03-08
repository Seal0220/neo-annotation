'use client';

import React, { useEffect, useRef, useState } from 'react';
import { ScrollBar } from '@/app/components/scrollBar/scrollBar';
import ThreeModel from './components/threeModel';
import FlipBoard from '@/app/components/flipBoard/FlipBoard';
import useElementMetrics from '@/app/hooks/useElementMetrics';

export default function Home() {
  const items = [
    (
      <div className='flex items-center font-bold text-gray-400 group-hover/scroll:text-gray-200 transition-all duration-500'>
        <span className='text-4xl mb-2 mr-2'>@</span>
        <span className='mt-[2px]'>臺灣當代文化實驗場 C-LAB</span>
      </div>
    ),
    (
      <div className='flex items-center font-bold text-gray-400 group-hover/scroll:text-gray-200 transition-all duration-500'>
        2025/4/18 - 26
      </div>
    ),
    (
      <div className='flex items-center font-bold text-gray-400 group-hover/scroll:text-gray-200 transition-all duration-500'>
        <span className='text-4xl mb-0 mr-2'>#</span>
        <span className='mt-[2px]'>新增註解 neo-annotation</span>
      </div>
    ),
  ];

  return (
    <div className='min-h-dvh bg-white'>
      {/* 3D 模型 */}
      <ThreeModel />

      {/* 頂部滾動條 (sticky) */}
      <div className='sticky top-0 z-10 bg-white'>
        <ScrollBar
          items={items}
          time={'5s'}
          easeType='ease-in-out'
          itemClassName='!px-8 !py-0'
        />
      </div>



      {/* 滾動區域 */}
      {/* <FlipBoard /> */}
      <ScrollHorizontal />

      {/* 最後一個區塊 */}
      <div className='sticky top-0 flex items-center justify-center min-h-dvh w-full bg-gray-200'>
        <div className='text-black text-5xl font-bold'>5</div>
      </div>
    </div>
  );
}



function ScrollHorizontal() {
  const containerRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  const metircs = useElementMetrics(containerRef);

  useEffect(() => {
    if (metircs) {
      if (metircs) {
        const handleScroll = () => {
          if (!containerRef.current) return;
          const scrollTop = window.scrollY;
          const maxScroll = window.innerHeight * 2; // 最大滾動範圍 (因為頁面是 3 屏高)
          const progress = Math.min(scrollTop / maxScroll, 1); // 0 到 1 之間
          setScrollProgress(progress);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
      }
    }
  }, [metircs]);

  useEffect(() => { console.log(metircs) }, [metircs]);

  return (
    <div className="h-[300vh] bg-gray-100">
      {/* 固定滾動區域 */}
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        <div
          ref={containerRef}
          className="flex space-x-10 w-[300vw] "
          style={{
            transform: `translateX(-${scrollProgress * 100}vw)`, // 控制水平移動
          }}
        >
          {/* 內容區塊 */}
          <div className="w-screen h-96 bg-blue-500 flex items-center justify-center text-white text-5xl font-bold rounded-lg shadow-lg">
            內容 1
          </div>
          <div className="w-screen h-96 bg-red-500 flex items-center justify-center text-white text-5xl font-bold rounded-lg shadow-lg">
            內容 2
          </div>
          <div className="w-screen h-96 bg-green-500 flex items-center justify-center text-white text-5xl font-bold rounded-lg shadow-lg">
            內容 3
          </div>
        </div>
      </div>
    </div>
  );
}