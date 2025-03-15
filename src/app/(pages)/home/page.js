'use client';
import React, { use, useEffect, useRef, useState } from 'react';
import ThreeModel from './components/threeModel';

import useElementMetrics from '@/app/hooks/useElementMetrics';
import useAnimator from '@/app/hooks/useAnimator';

import FlipBoard from '@/app/components/flipBoard/FlipBoard';
import useTitleText from '@/app/components/titleText/TitleText';
import ScrollBarInfo from '@/app/components/scrollBarInfo/ScrollBarInfo';
import MoreInfoBtn from '@/app/components/btn/moreInfoBtn/MoreInfoBtn';


export default function Home() {

  return (
    <div className='min-h-dvh bg-white'>
      {/* <div className='h-[200dvh]'>

        <TitleTextComponent />

        <div className='mt-4 flex items-center gap-3'>
          <label htmlFor='stability-slider' className='text-sm font-medium text-gray-700'>value:</label>
          <input
            id='stability-slider'
            type='range'
            min='0'
            max='50'
            step='0.1'
            value={textConfig.scatterFactor}
            onChange={(e) => updateConfig('scatterFactor', parseFloat(e.target.value))}
            className='w-52 h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer accent-blue-500'
          />
          <span className='text-sm font-semibold text-gray-900'>{textConfig.scatterFactor.toFixed(1)}</span>
        </div>
      </div> */}


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


function ScrollAnimationContent({ height = 1000, isPaddingBottom = true }) {
  const { textConfig, updateConfig, TitleTextComponent } = useTitleText();

  const animatorRef = useRef(null);

  const titleTextRef = useRef(null);
  const infoRef = useRef(null);
  const infoMaskRef = useRef(null);
  const scrollBarInfoRef = useRef(null);
  const symbolBracesL1Ref = useRef(null);
  const symbolBracesR1Ref = useRef(null);
  const infoContentRef = useRef(null);
  const aboutRef = useRef(null);

  const element1Ref = useRef(null);
  const element2Ref = useRef(null);
  const element3Ref = useRef(null);

  const animator = useAnimator(animatorRef);
  // animator.debug();

  const infoAni = animator.useAnimation(infoRef)
    .before({ on: 1 }, (ele, vars) => {
      ele.style.transform = 'translateY(0)';
    })
    .when({ on: 1, to: 2 }, (ele, vars, { progress }) => {
      ele.style.transform = `translateY(calc(-100dvh + 48px))`;
    })
    .after({ on: 2 }, (ele, vars) => {
      ele.style.transform = `translateY(calc(-100dvh + 48px))`;
    });

  const infoMaskAni = animator.useAnimation(infoMaskRef)
    .before({ on: 2.5 }, (ele, vars) => {
      ele.style.width = `100%`;
    })
    .after({ on: 2.5 }, (ele, vars) => {
      if (symbolBracesL1Ani.ele.metrics?.rotation === 90) {
        ele.style.width = `64px`;
      }
    });

  const infoContentAni = animator.useAnimation(infoContentRef)
    .before({ on: 2.5 }, (ele, vars) => {
      ele.style.opacity = 1;
    })
    .after({ on: 2.5 }, (ele, vars) => {
        ele.style.opacity = 0;
    });


  const symbolBracesL1Ani = animator.useAnimation(symbolBracesL1Ref)
    .before({ on: 1 }, (ele, vars) => {
      ele.style.transform = 'translate(calc(-50% - 100vw), -50%) rotate(-90deg) scale(0.75)';
      ele.style.transition = 'all 0.5s ease-in-out';
    })
    .when({ on: 1, to: 1.25 }, (ele, vars, { progress, innerProgress, innerHeight }) => {
      ele.style.transform = `translate(-25%, calc(-50% - 15dvh)) rotate(21deg) scale(1.1)`;
      ele.style.transition = 'all 0.5s ease-in-out';
    })
    .when({ on: 1.25, to: 2.5 }, (ele, vars, { progress, innerProgress, innerHeight }) => {
      ele.style.transform = `translate(calc(-25% + ${innerProgress * 30}%), calc(-50% - 15dvh - ${innerProgress * 30}dvh)) rotate(${21 + innerProgress * 30}deg) scale(1.1)`;
      ele.style.transition = 'all 0.5s ease-out';
    })
    .after({ on: 2.5 }, (ele, vars) => {
      ele.style.transform = `translate(calc(-50% + 50vw), calc(-50% + 15dvh)) rotate(90deg) scale(1)`;
      ele.style.transition = 'all 0.5s ease-in-out';
    });

  const symbolBracesR1Ani = animator.useAnimation(symbolBracesR1Ref)
    .before({ on: 1 }, (ele, vars) => {
      ele.style.transform = 'translate(calc(-50% + 100vw), -50%) rotate(90deg) scale(1.5)';
      ele.style.transition = 'all 0.5s ease-in-out';
    })
    .when({ on: 1, to: 1.25 }, (ele, vars, { progress, innerProgress, innerHeight }) => {
      ele.style.transform = 'translate(20%, calc(-50% + 10dvh)) rotate(3deg) scale(0.9)';
      ele.style.transition = 'all 0.5s ease-out';
    })
    .when({ on: 1.25, to: 2.5 }, (ele, vars, { progress, innerProgress, innerHeight }) => {
      ele.style.transform = `translate(calc(20% - ${innerProgress * 30}%), calc(-50% + 10dvh - ${innerProgress * 20}dvh)) rotate(${3 - innerProgress * 30}deg) scale(0.9)`;
      ele.style.transition = 'all 0.5s ease-out';
    })
    .after({ on: 2.5 }, (ele, vars) => {
      ele.style.transform = `translate(calc(50% - 50vw), calc(-50% - 25dvh)) rotate(-90deg) scale(1)`;
      ele.style.transition = 'all 0.5s ease-in-out';
    });

  const aboutAni = animator.useAnimation(aboutRef)
    .before({ on: 3 }, (ele, vars) => {
      ele.style.position = 'fixed';
      ele.style.top = '0';
      ele.style.display = infoAni.ele.metrics.touchesTop ? 'flex' : 'none';
    })
    .when({ on: 3, to: 8 }, (ele, vars, { progress, innerProgress, innerHeight }) => {
      ele.style.position = 'fixed';
      ele.style.top = '0';
      ele.style.display = 'flex';
    })
    .after({ on: 8 }, (ele, vars) => {
      // 當滾動進度超過 4，切換成相對定位，讓粉塊跟著內容一起滾動
      ele.style.position = 'absolute';
      // 計算粉塊新的 top 值：固定 350dvh 加上額外下移的 100dvh
      // ele.style.top = 'calc(350dvh + 100dvh)';
      // ele.style.transform = 'translateY(0)';
      // ele.style.transition = 'none';
    });

  useEffect(() => {
    animator.start();
    return () => animator.stop();
  }, []);

  return (
    <div
      ref={animatorRef}
      style={{ height: `${height + (isPaddingBottom && 100)}dvh` }}
      className="relative"
    >
      <div className="relative top-0 h-[1050dvh] flex flex-col bg-background">
        <div ref={titleTextRef} className="fixed top-0">
          <TitleTextComponent />
          <img
            src="symbol-Hashtag.png"
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 h-[60dvh] object-contain select-none pointer-events-none"
          />
        </div>

        <div ref={infoMaskRef} className="masked-wrapper absolute w-full h-full transition-all duration-1000 ease-out z-20">
          <div ref={infoRef} className="fixed top-[calc(100dvh-48px)] h-full bg-black transition-transform duration-300 ease-in-out z-20">
            <div ref={scrollBarInfoRef}>
              <ScrollBarInfo />
            </div>

            <div className="relative h-screen w-screen flex flex-col items-center justify-center bg-black text-white">
              {/* 左括號 */}
              <img
                ref={symbolBracesL1Ref}
                src="symbol-BracesLeft.png"
                alt="Braces Left"
                className="absolute left-0 top-1/2 h-[90dvh] object-contain"
              />
              {/* 右括號 */}
              <img
                ref={symbolBracesR1Ref}
                src="symbol-BracesRight.png"
                alt="Braces Right"
                className="absolute right-0 top-1/2 h-[90dvh] object-contain"
              />

              <div ref={infoContentRef} className="flex flex-col gap-16 -translate-y-12 transition-all duration-500">
                <div className="flex flex-row gap-32 text-center justify-between -translate-x-16">
                  {/* 30 位同學 */}
                  <div className="size-52 place-content-center">
                    <div>
                      <span className="text-[6rem] font-extrabold">30</span>
                      <span className="text-2xl font-extrabold ml-2">位同學</span>
                    </div>
                    <div className="text-sm opacity-80">/* 北藝新媒 110級 */</div>
                  </div>

                  {/* 19 組作品 */}
                  <div className="size-52 place-content-center">
                    <div>
                      <span className="text-[6rem] font-extrabold">19</span>
                      <span className="text-2xl font-extrabold ml-2">組作品</span>
                    </div>
                    <div className="text-sm opacity-80">/* 11 組個人 + 8 組團體 */</div>
                  </div>
                </div>

                <div className="flex flex-row gap-32 text-center justify-between translate-x-16">
                  {/* 1 場開幕 */}
                  <div className="size-52 place-content-center">
                    <div>
                      <span className="text-[6rem] font-extrabold">1</span>
                      <span className="text-2xl font-extrabold ml-2">場開幕</span>
                    </div>
                    <div className="text-sm opacity-80">/* 3 組表演者 */</div>
                  </div>

                  {/* 1 場講座 */}
                  <div className="size-52 place-content-center">
                    <div>
                      <span className="text-[6rem] font-extrabold">1</span>
                      <span className="text-2xl font-extrabold ml-2">場講座</span>
                    </div>
                    <div className="text-sm opacity-80">/* 創作經驗分享 */</div>
                  </div>
                </div>

                {/* 按鈕：更多策展資訊 */}
                <div className="size-fit place-self-center pt-12 -translate-x-6">
                  <MoreInfoBtn text={'作品與活動資訊'} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 關於資訊 */}
        <div ref={aboutRef} className="left-0 w-full h-dvh items-center bg-paper z-10 hidden">
        <img
            src="symbol-HTML.png"
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 h-[60dvh] object-contain select-none pointer-events-none"
          />
        </div>
      </div>

      <div className="sticky top-0 h-dvh flex flex-col items-center justify-center bg-green-400 text-white text-5xl font-bold">
        <div ref={element1Ref} className="transition-all ease-out duration-500">展覽介紹</div>
        <div ref={element2Ref} className="transition-all ease-out duration-500">關於我們</div>
        <div ref={element3Ref} className="transition-all ease-out duration-500">變化中的內容 3</div>
      </div>
    </div>
  );
}

