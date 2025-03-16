'use client';
import React, { useEffect, useRef, useState } from 'react';

export default function ScrollStepContent() {
    const containerRef = useRef(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const sections = [
      <div className="flex items-center justify-center h-screen text-5xl font-bold bg-blue-500 text-white">1</div>,
      <div className="flex items-center justify-center h-screen text-5xl font-bold bg-red-500 text-white">2</div>,
      <div className="flex items-center justify-center h-screen text-5xl font-bold bg-green-500 text-white">3</div>,
    ];
  
    // 取得 containerRef 的滾動資訊
    const containerMetrics = useElementMetrics(containerRef);
  
    useEffect(() => {
      const handleScroll = () => {
        const scrollY = window.scrollY;
        const containerTop = containerMetrics.scrollTop;
        const screenHeight = document.documentElement.clientHeight;
  
        if (scrollY >= containerTop) {
          // 計算內部的 activeIndex（相對於 container）
          const progress = Math.min((scrollY - containerTop) / screenHeight, sections.length - 1);
          setActiveIndex(Math.floor(progress)); // 依據滾動進度切換
        }
      };
  
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }, [containerMetrics]);
  
    return (
      <div
        ref={containerRef}
        style={{ height: `${(sections.length + 1) * 100}dvh` }} // 🔥 確保最後一個 Section 也能完整滾動
        className="relative bg-gray-100"
      >
        {/* 固定顯示區塊 */}
        <div className="sticky top-0 h-screen flex items-center justify-center bg-black text-white text-5xl font-bold">
          {sections[activeIndex]}
        </div>
      </div>
    );
  }