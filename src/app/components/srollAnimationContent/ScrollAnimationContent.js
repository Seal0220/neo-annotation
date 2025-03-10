'use client';
import React, { useEffect, useRef, useState } from 'react';

export default function ScrollAnimationContent({ height = 500, isPaddingBottom = true }) {
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
  