'use client';
import React, { useEffect, useRef, useState } from 'react';
import ThreeModel from './components/threeModel';

import useElementMetrics from '@/app/hooks/useElementMetrics';
import useAnimator from '@/app/hooks/useAnimator';
import useTilt from '@/app/hooks/useTilt';

import FlipBoard from '@/app/components/flipBoard/FlipBoard';
import useTitleText from '@/app/components/titleText/TitleText';
import ScrollBarInfo from '@/app/components/scrollBarInfo/ScrollBarInfo';
import MoreInfoBtn from '@/app/components/btn/moreInfoBtn/MoreInfoBtn';
import Typewriter, { TypewriterText } from '@/app/components/typewriter/Typewriter';



export default function Home() {

  return (
    <div className='min-h-dvh bg-white'>
      {/* <div className='h-[200lvh]'>

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
  const animator = useAnimator(animatorRef);
  animator.debug();

  const titleTextRef = useRef(null);
  const tiltRef = useRef(null);
  const tiltContainerRef = useRef(null);
  useTilt(tiltContainerRef, tiltRef, { isBackward: true });

  const infoRef = useRef(null);
  const infoMaskRef = useRef(null);
  const scrollBarInfoRef = useRef(null);
  const symbolBracesL1Ref = useRef(null);
  const symbolBracesR1Ref = useRef(null);
  const infoContentRef = useRef(null);
  const [infoTypewriterStart, setInfoTypewriterStart] = useState(false);

  const aboutRef = useRef(null);
  const symbolHtml1Ref = useRef(null);
  const symbolHashtag1Ref = useRef(null);
  const logotypeH1Ref = useRef(null);
  const aboutTypewriter1Ref = useRef(null);
  const [aboutTypewriter1Start, setAboutTypewriter1Start] = useState(false);


  const titleTextAni = animator.useAnimation(titleTextRef);

  /* INFO */
  const infoAni = animator.useAnimation(infoRef)
    .before({ on: 1 }, (ele, vars) => {
      ele.style.transform = 'translateY(0)';
    })
    .when({ on: 1, to: 2 }, (ele, vars) => {
      setInfoTypewriterStart(true);
      ele.style.transform = `translateY(calc(-100lvh + 48px))`;
    })
    .after({ on: 2 }, (ele, vars) => {
      ele.style.transform = `translateY(calc(-100lvh + 48px))`;
    });

  const infoMaskAni = animator.useAnimation(infoMaskRef)
    .always((ele, vars) => {
      vars.isUnderHalf = ele.metrics.width <= document.documentElement.clientWidth / 2;
    })
    .before({ on: 2.5 }, (ele, vars) => {
      ele.style.width = `100%`;
    })
    .when({ on: 2.5, to: 3 }, (ele, vars) => {
      if (symbolBracesL1Ani.ele.metrics?.rotation === 90) {
        ele.style.width = `64px`;
        setAboutTypewriter1Start((prev) => (prev ? true : vars.isUnderHalf));
      }
    })
    .after({ on: 3 }, (ele, vars) => {
      ele.style.width = `64px`;
      setAboutTypewriter1Start((prev) => (prev ? true : vars.isUnderHalf));
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
      ele.style.transform = `translate(-25%, calc(-50% - 15lvh)) rotate(21deg) scale(1.1)`;
      ele.style.transition = 'all 0.5s ease-in-out';
    })
    .when({ on: 1.25, to: 2.5 }, (ele, vars, { progress, innerProgress, innerHeight }) => {
      ele.style.transform = `translate(calc(-25% + ${innerProgress * 30}%), calc(-50% - 15lvh - ${innerProgress * 30}lvh)) rotate(${21 + innerProgress * 30}deg) scale(1.1)`;
      ele.style.transition = 'all 0.5s ease-out';
    })
    .after({ on: 2.5 }, (ele, vars) => {
      ele.style.transform = `translate(calc(-50% + 50vw), calc(-50% + 15lvh)) rotate(90deg) scale(1)`;
      ele.style.transition = 'all 0.5s ease-in-out';
    });

  const symbolBracesR1Ani = animator.useAnimation(symbolBracesR1Ref)
    .before({ on: 1 }, (ele, vars) => {
      ele.style.transform = 'translate(calc(-50% + 100vw), -50%) rotate(90deg) scale(1.5)';
      ele.style.transition = 'all 0.5s ease-in-out';
    })
    .when({ on: 1, to: 1.25 }, (ele, vars, { progress, innerProgress, innerHeight }) => {
      ele.style.transform = 'translate(20%, calc(-50% + 10lvh)) rotate(3deg) scale(0.9)';
      ele.style.transition = 'all 0.5s ease-out';
    })
    .when({ on: 1.25, to: 2.5 }, (ele, vars, { progress, innerProgress, innerHeight }) => {
      ele.style.transform = `translate(calc(20% - ${innerProgress * 30}%), calc(-50% + 10lvh - ${innerProgress * 20}lvh)) rotate(${3 - innerProgress * 30}deg) scale(0.9)`;
      ele.style.transition = 'all 0.5s ease-out';
    })
    .after({ on: 2.5 }, (ele, vars) => {
      ele.style.transform = `translate(calc(50% - 50vw), calc(-50% - 25lvh)) rotate(-90deg) scale(1)`;
      ele.style.transition = 'all 0.5s ease-in-out';
    });


  /* ABOUT */
  const aboutAni = animator.useAnimation(aboutRef)
    .before({ on: 1 }, (ele, vars, { progress }) => {
      titleTextAni.ele.style.display = 'flex';
      ele.style.transform = 'translateY(100lvh)';
    })
    .when({ on: 1, to: 2.5 }, (ele, vars, { progress }) => {
      const isShow = infoAni.ele.metrics.touchesTop && (infoMaskAni.ele.metrics.touchesRight || progress >= 1.5);
      titleTextAni.ele.style.display = isShow ? 'none' : 'flex';
      ele.style.transform = isShow ? 'translateY(0)' : 'translateY(100lvh)';
    })
    .when({ on: 2.5, to: 3 }, (ele, vars, { progress }) => {
      titleTextAni.ele.style.display = 'none';
      ele.style.display = 'flex';
      ele.style.transform = `translateY(0px)`;
    })
    .after({ on: 3 }, (ele, vars, { progress }) => {
      titleTextAni.ele.style.display = 'none';
      ele.style.transform = `translateY(0px)`;
      ele.style.display = 'flex';
    });

  const symbolHtml1Ani = animator.useAnimation(symbolHtml1Ref)
    .before({ on: 2.5 }, (ele, vars, { progress }) => {
      ele.style.transform = 'translate(-50vw, -100lvh) rotate(-60deg) ';
    })
    .when({ on: 2.5, to: 4 }, (ele, vars, { progress }) => {
      if (infoMaskAni.vars.isUnderHalf) {
        ele.style.transform = 'translate(-10vw, -10lvh) rotate(0deg)';
      } else {
        ele.style.transform = 'translate(-50vw, -100lvh) rotate(-60deg)';
      }
    })
    .after({ on: 4 }, (ele, vars, { progress }) => {
      ele.style.transform = 'translate(-10vw, -10lvh) rotate(0deg)';
    })

  const symbolHashtag1Ani = animator.useAnimation(symbolHashtag1Ref)
    .before({ on: 2.5 }, (ele, vars, { progress }) => {
      ele.style.transform = 'translate(-30vw, 100lvh) rotate(-120deg) ';
    })
    .when({ on: 2.5, to: 4 }, (ele, vars, { progress }) => {
      if (infoMaskAni.vars.isUnderHalf) {
        ele.style.transform = 'translate(-10vw, 70lvh) rotate(-75deg) ';
      } else {
        ele.style.transform = 'translate(-30vw, 100lvh) rotate(-120deg) ';
      }
    })
    .after({ on: 4 }, (ele, vars, { progress }) => {
      ele.style.transform = 'translate(-10vw, 70lvh) rotate(-75deg) ';
    })

  const logotypeH1Ani = animator.useAnimation(logotypeH1Ref)
    .before({ on: 2.5 }, (ele, vars, { progress }) => {
      ele.style.transform = 'translate(100vw, 50lvh) rotate(-60deg) scale(1)';
    })
    .when({ on: 2.5, to: 4 }, (ele, vars, { progress }) => {
      if (infoMaskAni.vars.isUnderHalf) {
        ele.style.transform = 'translate(-30vw, -33.33lvh) rotate(0deg) scale(1)';
      } else {
        ele.style.transform = 'translate(100vw, 50lvh) rotate(-60deg) scale(1)';
      }
    })
    .when({ on: 4, to: 5 }, (ele, vars, { progress }) => {
      ele.style.transform = 'translate(-70vw, -20lvh) rotate(-30deg) scale(1.2)';
    })
    .after({ on: 5 }, (ele, vars, { progress }) => {
      ele.style.transform = 'translate(-30vw, -33.33lvh) rotate(0deg)';
    })


  useEffect(() => {
    animator.start();
    return () => animator.stop();
  }, []);

  return (
    <div
      ref={animatorRef}
      style={{ height: `${height + (isPaddingBottom && 100)}lvh` }}
      className='relative'
    >
      <div className='relative top-0 h-[1050lvh] flex flex-col bg-background'>
        <div ref={titleTextRef} className="fixed top-0">
          <div className='fixed bg-black top-0 left-0 -z-30 w-full h-full'>
            <img
              src='bg/bg-SlashStar-dark.png'
              className='min-h-full min-w-full object-contain select-none pointer-events-none'
            />
          </div>
          <div ref={tiltContainerRef} className="group/title perspective-container fixed w-screen h-[100lvh] top-0 left-0 -z-10">
            <div ref={tiltRef} className='perspective-3d w-[100vw] h-[100lvh] bg-paper top-[0lvh] left-[0vw] overflow-visible flex items-center justify-center shadow-spread text-paper transition-transform duration-500 ease-out'>
              <TitleTextComponent className='group-hover/title:translate-z-40 group-hover/title:drop-shadow-spread text-black-1/2 transition-all duration-1000 ease-in-out ' />
              <img
                src="symbols/symbol-Hashtag.png"
                alt="Hashtag"
                className="absolute h-[60lvh] w-auto object-contain select-none pointer-events-none -z-10 group-hover/title:translate-z-24 group-hover/title:drop-shadow-spread text-black-1/2 transition-all duration-1000 ease-in-out"
              />
            </div>
          </div>
        </div>


        <div ref={infoMaskRef} className='masked-wrapper absolute w-0 h-full transition-all duration-1000 ease-out z-20 select-none pointer-events-none'>
          <div ref={infoRef} className='fixed top-[calc(100lvh-48px)] h-full bg-black transition-transform duration-300 ease-in-out z-20'>
            <div ref={scrollBarInfoRef}>
              <ScrollBarInfo />
            </div>

            <div className='relative h-screen w-screen flex flex-col items-center justify-center bg-black text-white'>
              {/* 左括號 */}
              <img
                ref={symbolBracesL1Ref}
                src='symbols/symbol-BracesLeft.png'
                className='absolute left-0 top-[50lvh] h-[90lvh] object-contain select-none pointer-events-none'
              />
              {/* 右括號 */}
              <img
                ref={symbolBracesR1Ref}
                src='symbols/symbol-BracesRight.png'
                className='absolute right-0 top-[50lvh] h-[90lvh] object-contain select-none pointer-events-none'
              />

              <div ref={infoContentRef} className="flex flex-col gap-16 -translate-y-12 transition-all duration-500">
                <div className="flex flex-row gap-32 text-center justify-between -translate-x-16">
                  {/* 30 位同學 */}
                  <div className="size-52 place-content-center">
                    <div>
                      <TypewriterText
                        text="30"
                        speed={500}
                        start={infoTypewriterStart}
                        className="text-[6rem] font-extrabold"
                      />
                      <TypewriterText
                        text="位同學"
                        speed={500}
                        start={infoTypewriterStart}
                        className="text-2xl font-extrabold ml-2"
                      />
                    </div>
                    <div className="text-sm opacity-80">
                      <TypewriterText
                        text="/* 北藝新媒 110級 */"
                        speed={100}
                        start={infoTypewriterStart}
                        className=""
                      />
                    </div>
                  </div>

                  {/* 19 組作品 */}
                  <div className="size-52 place-content-center">
                    <div>
                      <TypewriterText
                        text="19"
                        speed={500}
                        start={infoTypewriterStart}
                        className="text-[6rem] font-extrabold"
                      />
                      <TypewriterText
                        text="組作品"
                        speed={500}
                        start={infoTypewriterStart}
                        className="text-2xl font-extrabold ml-2"
                      />
                    </div>
                    <div className="text-sm opacity-80">
                      <TypewriterText
                        text="/* 11 組個人 + 8 組團體 */"
                        speed={100}
                        start={infoTypewriterStart}
                        className=""
                      />
                    </div>
                  </div>
                </div>

                <div className="flex flex-row gap-32 text-center justify-between translate-x-16">
                  {/* 1 場開幕 */}
                  <div className="size-52 place-content-center">
                    <div>
                      <TypewriterText
                        text="1"
                        speed={500}
                        start={infoTypewriterStart}
                        className="text-[6rem] font-extrabold"
                      />
                      <TypewriterText
                        text="場開幕"
                        speed={500}
                        start={infoTypewriterStart}
                        className="text-2xl font-extrabold ml-2"
                      />
                    </div>
                    <div className="text-sm opacity-80">
                      <TypewriterText
                        text="/* 3 組表演者 */"
                        speed={100}
                        start={infoTypewriterStart}
                        className=""
                      />
                    </div>
                  </div>

                  {/* 1 場講座 */}
                  <div className="size-52 place-content-center">
                    <div>
                      <TypewriterText
                        text="1"
                        speed={500}
                        start={infoTypewriterStart}
                        className="text-[6rem] font-extrabold"
                      />
                      <TypewriterText
                        text="場講座"
                        speed={500}
                        start={infoTypewriterStart}
                        className="text-2xl font-extrabold ml-2"
                      />
                    </div>
                    <div className="text-sm opacity-80">
                      <TypewriterText
                        text="/* 創作經驗分享 */"
                        speed={100}
                        start={infoTypewriterStart}
                        className=""
                      />
                    </div>
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
        <div ref={aboutRef} className='fixed top-0 left-0 w-screen h-[600lvh] bg-paper z-10 translate-y-[100lvh] overflow-hidden transition-transform duration-150 ease-out'>

          <img
            ref={symbolHtml1Ref}
            src='symbols/symbol-HTML.png'
            className='absolute top-0 left-0 -translate-x-1/2 -translate-y-full h-[60lvh] w-auto max-w-none object-contain select-none pointer-events-none transition-all duration-1000 ease-out'
          />
          <img
            ref={logotypeH1Ref}
            src='logotypes/logotype-horizontal.png'
            className='absolute top-0 left-1/2 translate-x-[100vw] translate-y-[50lvh] -rotate-[60deg] h-[60lvh] w-auto max-w-none object-contain select-none pointer-events-none transition-all duration-1000 ease-out'
          />
          <img
            ref={symbolHashtag1Ref}
            src='symbols/symbol-hashtag.png'
            className='absolute top-0 right-0 -translate-x-[10vw] translate-y-[70lvh] -rotate-[75deg] h-auto w-[70vw] max-h-none object-contain select-none pointer-events-none transition-all duration-1000 ease-out'
          />

          <div
            ref={aboutTypewriter1Ref}
            className='absolute top-0 right-1/4 translate-y-[37lvh] w-1/3 flex flex-col gap-8 leading-tight text-sm font-semibold'
          >
            <Typewriter
              paragraphs={[
                "本屆北藝大新媒體藝術學系110級畢業展「新增註解 neo-annotation」，以現代生活中線上編輯工具的「註解」功能為靈感，將「註解」延伸為藝術行動，探索多元觀點和言論如何在科技和社群媒介的推動下共存與對話。這場展覽將新媒體藝術視作註解的「媒材」，引領觀眾在作品中，從多角度理解和重新詮釋熟悉的社會現況、意識形態與日常生活。",
                "本展覽旨在打破固有的觀看框架，透過跨領域的創作激發出新舊觀點的承接和累加。與傳統的文字註解不同，藝術作品成為學生們「註解」世界的方式，以視覺、聲音和互動等方式來對當前現象進行觀察、解構，並重新構築。展覽場域如同一個自由對話的空間，提供學生表達多重視角的機會，同時讓觀者與作品之間產生有機反應，進而激發新的思想連結。",
                "「新增註解 neo-annotation」是一個思考的實驗場，邀請觀者不僅僅局限於展場中的觀展經驗，而是打破單一視角的限制，以開放的態度看待差異與交流的可能，並將這種多角度觀察、言論自由和積極註解的想法帶回日常。"
              ]}
              speed={20}
              start={aboutTypewriter1Start}
              className='flex flex-col gap-8'
            />
          </div>
        </div>
      </div>
    </div>
  );
}

