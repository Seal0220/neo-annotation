'use client';
import React, { useEffect, useRef, useState } from 'react';
import ThreeModel from './components/threeModel';

import useElementMetrics from '@/app/hooks/useElementMetrics';
import useAnimator from '@/app/hooks/useAnimator';

import { ScrollBar } from '@/app/components/scrollBar/scrollBar';
import FlipBoard from '@/app/components/flipBoard/FlipBoard';
import useTitleText from '@/app/components/titleText/TitleText';


export default function Home() {
  const { textConfig, updateConfig, TitleTextComponent } = useTitleText();
  

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
      <div className='h-[200dvh]'>

        <TitleTextComponent />

        <div className="mt-4 flex items-center gap-3">
          <label htmlFor="stability-slider" className="text-sm font-medium text-gray-700">value:</label>
          <input
            id="stability-slider"
            type="range"
            min="0"
            max="50"
            step="0.1"
            value={textConfig.driftFactor}
            onChange={(e) => updateConfig('driftFactor', parseFloat(e.target.value))}
            className="w-52 h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer accent-blue-500"
          />
          <span className="text-sm font-semibold text-gray-900">{textConfig.driftFactor.toFixed(1)}</span>
        </div>
      </div>

      {/* 頂部滾動條 (sticky) */}
      <div className='sticky top-0 z-10 bg-white'>
        <ScrollBar
          items={items}
          time={'5s'}
          easeType='ease-in-out'
          itemClassName='!px-8 !py-0'
        />
      </div>

      <ScrollAnimationContent />

      {/* 滾動區域 */}
      {/* <FlipBoard /> */}
      {/* <ScrollHorizontal /> */}

      {/* 最後一個區塊 */}
      <div className='sticky top-0 flex items-center justify-center min-h-dvh w-full bg-gray-200'>
        <div className='text-black text-5xl font-bold'>5</div>
      </div>
    </div>
  );
}

function ScrollAnimationContent({ height = 500, isPaddingBottom = true }) {
  const animatorRef = useRef(null);
  const element1Ref = useRef(null);
  const element2Ref = useRef(null);
  const element3Ref = useRef(null);

  const animator = useAnimator(animatorRef);

  animator.useAnimation(element1Ref)
    .before({ on: 0 }, (ele) => {
      ele.style.transform = 'translateX(0)';
    })
    .when({ on: 0, to: 1.5 }, (ele, { progress, innerProgress, innerHeight }) => {
      // ele.textContent = `progress: ${progress}`;
      ele.style.transform = `translateX(${innerHeight * 100}px)`;
    })
    .after({ on: 1.5 }, (ele) => {
      ele.style.transform = 'translateX(50px)';
    });

  animator.useAnimation(element2Ref)
    .before({ on: 1.5 }, (ele) => {
      ele.style.transform = 'translateX(0)';
    })
    .when({ on: 1.5, to: 3 }, (ele, { progress, innerProgress, innerHeight }) => {
      ele.style.transform = 'translateX(-100px)';
    })
    .after({ on: 3 }, (ele) => {
      ele.style.transform = 'translateX(50px)';
    });

  animator.useAnimation(element3Ref)
    .before({ on: 3 }, (ele) => {
      ele.style.transform = 'scale(0)';
    })
    .when({ on: 3, to: 4 }, (ele, { progress, animatorMetrics, innerProgress, innerHeight }) => {
      ele.textContent = `高度: ${animatorMetrics.height}px`;
      ele.style.transform = `scale(1)`;
    });


  useEffect(() => {
    animator.start();
    return () => animator.stop();
  }, []);

  return (
    <div
      ref={animatorRef}
      style={{ height: `${height + (isPaddingBottom && 100)}dvh` }}
      className={`relative`}
    >
      <div className='sticky top-0 h-screen flex flex-col items-center justify-center bg-black text-white text-5xl font-bold'>
        <div ref={element1Ref} className='transition-all ease-out duration-500'>展覽介紹</div>
        <div ref={element2Ref} className='transition-all ease-out duration-500'>關於我們</div>
        <div ref={element3Ref} className='transition-all ease-out duration-500'>變化中的內容 3</div>
      </div>
    </div>
  );
}

