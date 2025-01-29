'use client';

import React, { useEffect, useRef } from 'react';
import { ScrollBar } from '@/app/components/scrollBar/scrollBar';
import ThreeModel from './components/threeModel';

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
      <ZS />

      {/* 最後一個區塊 */}
      <div className='sticky top-0 flex items-center justify-center min-h-dvh w-full bg-gray-200'>
        <div className='text-black text-5xl font-bold'>5</div>
      </div>
    </div>
  );
}



function ZS() {
  const containerRef = useRef();

  useEffect(() => {
    const handleScroll = () => {
      const sections = containerRef.current.querySelectorAll('.scroll-section');
      const scrollY = window.scrollY;
      const transitionRange = window.innerHeight / 2;
      const scale = -0.25;

      sections.forEach((section, index) => {
        const sectionTop = index * window.innerHeight;
        const offset = scrollY - sectionTop;
        const progress =  (scrollY - (sectionTop + window.innerHeight)) / transitionRange * -100;

        if (index === 0) {
          // 第一個區塊的特殊處理
          if (scrollY < sectionTop + window.innerHeight) {
            // 第一個區塊正常滾動
            section.style.transform = `translateY(0)`;

          } else if (scrollY < sectionTop + window.innerHeight + transitionRange) {
            // 過渡距離內，逐漸進入 z 軸滾動
            const zPosition = progress;
            section.style.transform = `translateZ(${zPosition}px)`;

          } else {
            // 超過過渡距離後，開始正式 z 軸滾動
            const zPosition = progress  + (scrollY - (sectionTop + window.innerHeight + transitionRange)) * scale;
            section.style.transform = `translateZ(${zPosition}px)`;

          }
        } else {
          // 其他區塊的處理
          if (offset >= 0 && offset <= window.innerHeight) {
            // 滾動範圍內，觸發 z 軸移動
            const zPosition = offset * scale;
            section.style.transform = `translateZ(${zPosition}px)`;
          } else if (offset < 0) {
            // 區塊還沒滾到視窗
            section.style.transform = `translateZ(0px)`;
          } else {
            // 區塊已經超出視窗
            const zPosition = window.innerHeight * scale;
            section.style.transform = `translateZ(${zPosition}px)`;
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      ref={containerRef}
      className='bg-black h-[400dvh] w-full relative'
      style={{
        perspective: window.innerHeight * 1, // 設置透視效果
      }}
    >
      <div className='sticky top-0 scroll-section flex items-center justify-center min-h-dvh w-full bg-gray-200 drop-shadow-spread shadow-black text-black rounded-lg'>
        <div className='text-black text-5xl font-bold'>1</div>
      </div>

      <div className='sticky top-0 scroll-section flex items-center justify-center min-h-dvh w-full bg-gray-200 drop-shadow-spread shadow-black text-black rounded-lg'>
        <div className='text-black text-5xl font-bold'>2</div>
      </div>

      <div className='sticky top-0 scroll-section flex items-center justify-center min-h-dvh w-full bg-gray-200 drop-shadow-spread shadow-black text-black rounded-lg'>
        <div className='text-black text-5xl font-bold'>3</div>
      </div>

      <div className='sticky top-0 scroll-section flex items-center justify-center min-h-dvh w-full bg-gray-200 drop-shadow-spread shadow-black text-black rounded-lg'>
        <div className='text-black text-5xl font-bold'>4</div>
      </div>
    </div>
  );
}
