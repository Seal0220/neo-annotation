'use client';
import React, { useEffect, useRef, useState } from 'react';

export default function FlipBoard() {
    const containerRef = useRef(null);
    const [isClient, setIsClient] = useState(false);
  
    useEffect(() => {
      setIsClient(true); // 確保這段程式碼只在客戶端執行
    }, []);
  
    useEffect(() => {
      if (!isClient || !containerRef.current) return;
  
      const handleScroll = () => {
        const sections = containerRef.current?.querySelectorAll('.scroll-section');
        const scrollY = window.scrollY;
        const transitionRange = document.documentElement.clientHeight / 2;
        const scale = -0.25;
  
        sections.forEach((section, index) => {
          const sectionTop = index * document.documentElement.clientHeight;
          const offset = scrollY - sectionTop;
          const progress = (scrollY - (sectionTop + document.documentElement.clientHeight)) / transitionRange * -100;
  
          if (index === 0) {
            if (scrollY < sectionTop + document.documentElement.clientHeight) {
              section.style.transform = `translateY(0)`;
            } else if (scrollY < sectionTop + document.documentElement.clientHeight + transitionRange) {
              const zPosition = progress;
              section.style.transform = `translateZ(${zPosition}px)`;
            } else {
              const zPosition = progress + (scrollY - (sectionTop + document.documentElement.clientHeight + transitionRange)) * scale;
              section.style.transform = `translateZ(${zPosition}px)`;
            }
          } else {
            if (offset >= 0 && offset <= document.documentElement.clientHeight) {
              const zPosition = offset * scale;
              section.style.transform = `translateZ(${zPosition}px)`;
            } else if (offset < 0) {
              section.style.transform = `translateZ(0px)`;
            } else {
              const zPosition = document.documentElement.clientHeight * scale;
              section.style.transform = `translateZ(${zPosition}px)`;
            }
          }
        });
      };
  
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }, [isClient]);
  
    if (!isClient) return null; // 在伺服器端不渲染
  
    return (
      <div
        ref={containerRef}
        className='bg-black h-[400dvh] w-full relative'
        style={{ perspective: typeof window !== 'undefined' ? document.documentElement.clientHeight * 1 : 1000 }}
      >
        {[1, 2, 3, 4].map((num) => (
          <div
            key={num}
            className='sticky top-0 scroll-section flex items-center justify-center min-h-dvh w-full bg-gray-200 drop-shadow-spread shadow-black text-black rounded-lg'
          >
            <div className='text-black text-5xl font-bold'>{num}</div>
          </div>
        ))}
      </div>
    );
  }