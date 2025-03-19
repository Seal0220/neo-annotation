'use client';
import React, { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';

import useElementMetrics from '@/app/hooks/useElementMetrics';
import useAnimator from '@/app/hooks/useAnimator';
import { useTilt } from '@/app/hooks/useTilt';

import useTitleText from '@/app/components/titleText/TitleText';
import ThreeModel from './components/threeModel';
import FlipBoard from '@/app/components/flipBoard/FlipBoard';
import ScrollBarInfo from '@/app/components/scrollBarInfo/ScrollBarInfo';
import MoreInfoBtn from '@/app/components/btn/moreInfoBtn/MoreInfoBtn';
import Typewriter, { TypewriterParagraph, TypewriterFormatted } from '@/app/components/typewriter/Typewriter';



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
  const aboutContentRef = useRef(null);
  const symbolHtml1Ref = useRef(null);
  const symbolHashtag1Ref = useRef(null);
  const symbolStar1Ref = useRef(null);
  const symbolVerticalLine1Ref = useRef(null);
  const logotypeH1Ref = useRef(null);
  const aboutTitle1Ref = useRef(null);
  const aboutTitle2Ref = useRef(null);
  const aboutTitle3Ref = useRef(null);
  const aboutTitle4Ref = useRef(null);
  const aboutTypewriter1Ref = useRef(null);
  const aboutTypewriter2Ref = useRef(null);
  const aboutUsBtnRef = useRef(null);
  const [aboutTypewriter1Start, setAboutTypewriter1Start] = useState(false);
  const [aboutTypewriter2Start, setAboutTypewriter2Start] = useState(false);
  const [aboutTypewriter3Start, setAboutTypewriter3Start] = useState(false);

  const whereRef = useRef(null);
  const whereDateDatetimeRef = useRef(null);
  const whereDateTimeRef = useRef(null);
  const whereDateYearRef = useRef(null);
  const whereLocationClabRef = useRef(null);
  const whereLocationAddressRef = useRef(null);
  const whereBtnRef = useRef(null);


  /* TITLE */
  const titleTextAni = animator.useAnimation(titleTextRef);

  /* INFO */
  const infoAni = animator.useAnimation(infoRef)
    .before({ on: 1 }, (ele, vars) => {
      ele.classList.remove('info-visible');
      ele.classList.add('info-hidden');
    })
    .when({ on: 1, to: 2 }, (ele, vars) => {
      setInfoTypewriterStart(true);
      ele.classList.remove('info-hidden');
      ele.classList.add('info-visible');
    })
    .after({ on: 2 }, (ele, vars) => {
      setInfoTypewriterStart(true);
      ele.classList.remove('info-hidden');
      ele.classList.add('info-visible');
    });

  const infoMaskAni = animator.useAnimation(infoMaskRef)
    .always((ele, vars) => {
      vars.isUnderHalf = ele.metrics.width <= document.documentElement.clientWidth / 2;
    })
    .before({ on: 2.5 }, (ele, vars) => {
      ele.classList.remove('infomask-collapse');
      ele.classList.add('infomask-expand');
    })
    .when({ on: 2.5, to: 3 }, (ele, vars) => {
      if (symbolBracesL1Ani.ele.metrics?.rotation === 90) {
        ele.classList.remove('infomask-expand');
        ele.classList.add('infomask-collapse');
        setAboutTypewriter1Start((prev) => (prev ? true : vars.isUnderHalf));
      }
    })
    .after({ on: 3 }, (ele, vars) => {
      ele.classList.remove('infomask-expand');
      ele.classList.add('infomask-collapse');
    });

  const infoContentAni = animator.useAnimation(infoContentRef)
    .before({ on: 2.5 }, (ele, vars) => {
      ele.style.opacity = 1;
      ele.style.userSelect = 'auto';
    })
    .after({ on: 2.5 }, (ele, vars) => {
      ele.style.opacity = 0;
      ele.style.userSelect = 'none';
    });


  const symbolBracesL1Ani = animator.useAnimation(symbolBracesL1Ref)
    .setVars({ step: 0.25 * 30 })
    .before({ on: 1 }, (ele, vars) => {
      ele.style.transform = 'translate(calc(-50% - 100vw), -50%) rotate(-90deg) scale(0.75)';
      ele.style.transition = 'all 0.5s ease-in-out';
    })
    .when({ on: 1, to: 1.25 }, (ele, vars, { progress, innerProgress, innerHeight }) => {
      ele.style.transform = `translate(-25%, calc(-50% - 15lvh)) rotate(21deg) scale(1.1)`;
      ele.style.transition = 'all 0.5s ease-in-out';
    })
    .when({ on: 1.25, to: 2.5 }, (ele, vars, { progress, innerProgress, innerHeight }) => {
      const offset = vars.step * Math.floor(innerProgress * 5);
      const rotation = offset + 21;
      ele.style.transform = `translate(calc(-25% + ${offset}%), calc(-50% - 15lvh - ${offset}lvh)) rotate(${rotation}deg) scale(1.1)`;
      ele.style.transition = 'all 0.5s ease-out';
    })
    .after({ on: 2.5 }, (ele, vars) => {
      ele.style.transform = `translate(calc(-50% + 50vw), calc(-50% + 15lvh)) rotate(90deg) scale(1)`;
      ele.style.transition = 'all 0.5s ease-in-out';
    });

  const symbolBracesR1Ani = animator.useAnimation(symbolBracesR1Ref)
    .setVars({ step: 0.25 * 30 })
    .before({ on: 1 }, (ele, vars) => {
      ele.style.transform = 'translate(calc(-50% + 100vw), -50%) rotate(90deg) scale(1.5)';
      ele.style.transition = 'all 0.5s ease-in-out';
    })
    .when({ on: 1, to: 1.25 }, (ele, vars, { progress, innerProgress, innerHeight }) => {
      ele.style.transform = 'translate(20%, calc(-50% + 10lvh)) rotate(3deg) scale(0.9)';
      ele.style.transition = 'all 0.5s ease-out';
    })
    .when({ on: 1.25, to: 2.5 }, (ele, vars, { progress, innerProgress, innerHeight }) => {
      const offset = vars.step * Math.floor(innerProgress * 5);
      const rotation = 3 - offset;
      ele.style.transform = `translate(calc(20% - ${offset}%), calc(-50% + 10lvh - ${offset * 0.63}lvh)) rotate(${rotation}deg) scale(0.9)`;
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

  const aboutContentAni = animator.useAnimation(aboutContentRef)
    .when({ on: 3, to: 4 }, (ele, vars) => {
      setAboutTypewriter1Start(true);
    })
    .when({ on: 4, to: 5 }, (ele, vars) => {
      setAboutTypewriter2Start(true);
    })
    .when({ on: 5, to: 6 }, (ele, vars) => {
      setAboutTypewriter3Start(true);
    })


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
      ele.style.transform = 'translate(100vw, -50lvh) rotate(60deg)';
    })

  const symbolHashtag1Ani = animator.useAnimation(symbolHashtag1Ref)
    .before({ on: 2.5 }, (ele, vars, { progress }) => {
      ele.style.transform = 'translate(-30vw, 100lvh) rotate(-120deg) scale(1)';
    })
    .when({ on: 2.5, to: 4 }, (ele, vars, { progress }) => {
      if (infoMaskAni.vars.isUnderHalf) {
        ele.style.transform = 'translate(-10vw, 70lvh) rotate(-75deg) scale(1)';
      } else {
        ele.style.transform = 'translate(-30vw, 100lvh) rotate(-120deg) scale(1)';
      }
    })
    .when({ on: 4, to: 5 }, (ele, vars, { progress }) => {
      ele.style.transform = 'translate(10vw, 0) rotate(0deg) scale(0.8)';
    })
    .after({ on: 5 }, (ele, vars, { progress }) => {
      ele.style.transform = 'translate(-20vw, -200lvh) rotate(120deg) scale(1.5)';
    })

  const symbolStar1Ani = animator.useAnimation(symbolStar1Ref)
    .before({ on: 4 }, (ele, vars, { progress }) => {
      ele.style.transform = 'translate(-100vw, 100lvh) rotate(-60deg) scale(1)';
    })
    .when({ on: 4, to: 5 }, (ele, vars, { progress }) => {
      ele.style.transform = 'translate(-45vw, 65lvh) rotate(-30deg) scale(1)';
    })
    .when({ on: 5, to: 6 }, (ele, vars, { progress }) => {
      ele.style.transform = 'translate(-20vw, -65lvh) rotate(60deg) scale(1)';
    })
    .after({ on: 6 }, (ele, vars, { progress }) => {
      ele.style.transform = 'translate(10vw, -150lvh) rotate(180deg) scale(1)';
    })

  const symbolVerticalLine1Ani = animator.useAnimation(symbolVerticalLine1Ref)
    .before({ on: 5 }, (ele, vars, { progress }) => {
      ele.style.transform = 'translate(0vw, 65lvh) rotate(-60deg) scale(0.8)';
    })
    .when({ on: 5, to: 6 }, (ele, vars, { progress }) => {
      ele.style.transform = 'translate(55vw, 24lvh) rotate(25deg) scale(1)';
    })
    .after({ on: 6 }, (ele, vars, { progress }) => {
      if (ele.metrics?.rotation >= 90) {
        ele.style.transform = `translate(calc(-50% + 50vw + 64px), calc(-50% + 50lvh)) rotate(90deg) scale(5)`;
      }
      else {
        ele.style.transform = 'translate(calc(-50% + 50vw + 64px), calc(-50% + 50lvh)) rotate(90deg) scale(1)';
      }
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
      ele.style.transform = 'translate(-70vw, -30lvh) rotate(-30deg) scale(1.2)';
    })
    .when({ on: 5, to: 6 }, (ele, vars, { progress }) => {
      ele.style.transform = 'translate(-50vw, 50lvh) rotate(15deg) scale(0.8)';
    })
    .after({ on: 6 }, (ele, vars, { progress }) => {
      ele.style.transform = 'translate(calc(-50% + 64px), calc(-50% + 50lvh)) rotate(0deg) scale(0.2)';
    })


  const aboutTitle1Ani = animator.useAnimation(aboutTitle1Ref)
    .before({ on: 2.5 }, (ele, vars, { progress }) => {
      ele.style.transform = 'translate(0vw, 0lvh) scale(0.5)';
      ele.style.opacity = 0;
    })
    .when({ on: 2.5, to: 4 }, (ele, vars, { progress }) => {
      ele.style.transform = 'translate(20vw, -3lvh) scale(1)';
      ele.style.opacity = 1;
    })
    .after({ on: 4 }, (ele, vars, { progress }) => {
      ele.style.transform = 'translate(0vw, 50lvh) rotate(90deg) scale(3)';
      ele.style.opacity = 0;
    })

  const aboutTypewriter1Ani = animator.useAnimation(aboutTypewriter1Ref)
    .before({ on: 2.5 }, (ele, vars, { progress }) => {
      ele.style.transform = 'translate(120vw, 10lvh) rotate(-60deg) scale(5)';
      ele.style.opacity = 0;
    })
    .when({ on: 2.5, to: 4 }, (ele, vars, { progress }) => {
      ele.style.transform = 'translate(-15vw, 32lvh) scale(1)';
      ele.style.userSelect = 'auto';
      ele.style.opacity = 1;
    })
    .after({ on: 4 }, (ele, vars, { progress }) => {
      ele.style.transform = 'translate(0vw, 50lvh) rotate(90deg) scale(0.1)';
      ele.style.userSelect = 'none';
      ele.style.opacity = 0;
    })


  const aboutTitle2Ani = animator.useAnimation(aboutTitle2Ref)
    .before({ on: 4 }, (ele, vars, { progress }) => {
      ele.style.transform = 'translate(10vw, 0lvh) scale(5)';
      ele.style.opacity = 0;
    })
    .when({ on: 4, to: 5 }, (ele, vars, { progress }) => {
      ele.style.transform = 'translate(10vw, 45lvh) scale(1)';
      ele.style.opacity = 1;
    })
    .after({ on: 5 }, (ele, vars, { progress }) => {
      ele.style.transform = 'translate(10vw, 100lvh) scale(0.8)';
      ele.style.opacity = 0;
    })

  const aboutUsBtnAni = animator.useAnimation(aboutUsBtnRef)
    .before({ on: 4 }, (ele, vars, { progress }) => {
      ele.style.pointerEvents = 'none';
      ele.style.opacity = 0;
    })
    .when({ on: 4, to: 5 }, (ele, vars, { progress }) => {
      ele.style.pointerEvents = 'auto';
      ele.style.opacity = 1;
    })
    .after({ on: 5 }, (ele, vars, { progress }) => {
      ele.style.pointerEvents = 'none';
      ele.style.opacity = 0;
    })

  const aboutTypewriter2Ani = animator.useAnimation(aboutTypewriter2Ref)
    .before({ on: 4 }, (ele, vars, { progress }) => {
      ele.style.transform = 'translate(-20vw, 45lvh) rotate(-30deg)';
      ele.style.userSelect = 'none';
      ele.style.opacity = 0;
    })
    .when({ on: 4, to: 5 }, (ele, vars, { progress }) => {
      ele.style.transform = 'translate(-12vw, 45lvh) rotate(0)';
      ele.style.userSelect = 'auto';
      ele.style.opacity = 1;
    })
    .after({ on: 5 }, (ele, vars, { progress }) => {
      ele.style.transform = 'translate(-15vw, 32lvh) rotate(15deg)';
      ele.style.userSelect = 'none';
      ele.style.opacity = 0;
    })

  const aboutTitle3Ani = animator.useAnimation(aboutTitle3Ref)
    .before({ on: 5 }, (ele, vars, { progress }) => {
      ele.style.transform = 'translate(10vw, -100lvh) rotate(0deg) scale(0.8)';
      ele.style.opacity = 0;
    })
    .when({ on: 5, to: 6 }, (ele, vars, { progress }) => {
      ele.style.transform = 'translate(10vw, 0) rotate(0deg) scale(1)';
      ele.style.opacity = 1;
    })
    .after({ on: 6 }, (ele, vars, { progress }) => {
      ele.style.transform = 'translate(-50vw, 0lvh) rotate(0deg) scale(3)';
      ele.style.opacity = 0;
    })

  const whereDateDatetimeAni = animator.useAnimation(whereDateDatetimeRef);
  const whereDateTimeAni = animator.useAnimation(whereDateTimeRef);
  const whereDateYearAni = animator.useAnimation(whereDateYearRef);
  const whereLocationClabAni = animator.useAnimation(whereLocationClabRef);
  const whereLocationAddressAni = animator.useAnimation(whereLocationAddressRef);
  const whereAni = animator.useAnimation(whereRef)
    .before({ on: 5 }, (ele, vars, { progress }) => {
      whereDateDatetimeAni.ele.style.transform = 'translate(-50%, -100%)';
      whereDateTimeAni.ele.style.transform = 'translate(-50%, -100%)';
      whereDateYearAni.ele.style.transform = 'translate(-50%, -100%)';
      whereLocationClabAni.ele.style.transform = 'translate(-50%, -100%)';
      whereLocationAddressAni.ele.style.transform = 'translate(-50%, -100%)';
      ele.style.opacity = 0;
    })
    .when({ on: 5, to: 6 }, (ele, vars, { progress }) => {
      whereDateDatetimeAni.ele.style.transform = 'translate(0, 0)';
      whereDateTimeAni.ele.style.transform = 'translate(0, 0)';
      whereDateYearAni.ele.style.transform = 'translate(0, 0)';
      whereLocationClabAni.ele.style.transform = 'translate(0, 0)';
      whereLocationAddressAni.ele.style.transform = 'translate(0, 0)';
      ele.style.opacity = 1;
    })
    .after({ on: 6 }, (ele, vars, { progress }) => {
      whereDateDatetimeAni.ele.style.transform = 'translate(50%, 100%)';
      whereDateTimeAni.ele.style.transform = 'translate(50%, 100%)';
      whereDateYearAni.ele.style.transform = 'translate(50%, 100%)';
      whereLocationClabAni.ele.style.transform = 'translate(50%, 100%)';
      whereLocationAddressAni.ele.style.transform = 'translate(50%, 100%)';
      ele.style.opacity = 0;
    })

  const whereBtnAni = animator.useAnimation(whereBtnRef)
    .before({ on: 5 }, (ele, vars, { progress }) => {
      ele.style.transform = 'translate(-15vw, 52lvh)';
      ele.style.opacity = 0;
    })
    .when({ on: 5, to: 6 }, (ele, vars, { progress }) => {
      ele.style.transform = 'translate(-10vw, 47lvh)';
      ele.style.opacity = 1;
    })
    .after({ on: 6 }, (ele, vars, { progress }) => {
      ele.style.transform = 'translate(-5vw, 42lvh)';
      ele.style.opacity = 0;
    })


  const aboutTitle4Ani = animator.useAnimation(aboutTitle4Ref)
    .before({ on: 6 }, (ele, vars, { progress }) => {
      ele.style.transform = 'translate(calc(-50% + 50vw + 64px), calc(-50% + 50lvh - 16px)) scale(5)';
      ele.style.opacity = 0;
    })
    .after({ on: 6 }, (ele, vars, { progress }) => {
      if (symbolVerticalLine1Ani.ele.metrics.touchesTop || symbolVerticalLine1Ani.ele.metrics.touchesRight) {
        ele.style.transform = 'translate(calc(-50% + 50vw + 64px), calc(-50% + 50lvh - 16px)) scale(1)';
        ele.style.opacity = 1;
      }
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
        <div ref={titleTextRef} className='fixed top-0'>
          <div className='fixed bg-black top-0 left-0 -z-30 w-full h-full'>
            <img
              src='bg/bg-SlashStar-dark.png'
              className='fixed min-h-lvh min-w-full object-cover select-none pointer-events-none'
            />
          </div>
          <div ref={tiltContainerRef} className='group/title perspective-container fixed w-screen h-[100lvh] top-0 left-0 -z-10'>
            <div ref={tiltRef} className='perspective-3d w-[100vw] h-[100lvh] bg-paper top-[0lvh] left-[0vw] overflow-visible flex items-center justify-center shadow-spread text-paper transition-transform duration-500 ease-out'>
              <TitleTextComponent className='group-hover/title:translate-z-40 group-hover/title:drop-shadow-spread text-black-1/2 transition-all duration-1000 ease-in-out ' />
              <img
                src='symbols/symbol-Hashtag.png'
                alt='Hashtag'
                className='absolute h-[60lvh] w-auto object-contain select-none pointer-events-none -z-10 group-hover/title:translate-z-24 group-hover/title:drop-shadow-spread text-black-1/2 transition-all duration-1000 ease-in-out'
              />
            </div>
          </div>
        </div>


        <div ref={infoMaskRef} className='fixed top-0 w-0 h-full  masked-wrapper transition-all duration-1000 ease-out z-20 select-none pointer-events-none will-change-[all]'>
          <div ref={infoRef} className='fixed top-[calc(100lvh-48px)] h-full bg-black transition-transform duration-300 ease-in-out z-20 select-text pointer-events-auto will-change-[all]'>
            <div ref={scrollBarInfoRef}>
              <ScrollBarInfo />
            </div>

            <div className='relative h-screen w-screen flex flex-col items-center justify-center bg-black text-white'>
              {/* 左括號 */}
              <img
                ref={symbolBracesL1Ref}
                src='symbols/symbol-BracesLeft.png'
                className='absolute left-0 top-[50lvh] h-[90lvh] object-contain select-none pointer-events-none will-change-transform'
              />
              {/* 右括號 */}
              <img
                ref={symbolBracesR1Ref}
                src='symbols/symbol-BracesRight.png'
                className='absolute right-0 top-[50lvh] h-[90lvh] object-contain select-none pointer-events-none will-change-transform'
              />

              <div ref={infoContentRef} className='flex flex-col gap-16 -translate-y-12 transition-all duration-500'>
                <div className='flex flex-row gap-32 text-center justify-between -translate-x-16'>
                  {/* 30 位同學 */}
                  <div className='size-52 place-content-center'>
                    <div>
                      <Typewriter
                        content='30'
                        speed={500}
                        start={infoTypewriterStart}
                        className='text-[6rem] font-extrabold'
                      />
                      <Typewriter
                        content='位同學'
                        speed={500}
                        start={infoTypewriterStart}
                        className='text-2xl font-extrabold ml-2'
                      />
                    </div>
                    <div className='text-sm opacity-80'>
                      <Typewriter
                        content='/* 北藝新媒 110級 */'
                        speed={100}
                        start={infoTypewriterStart}
                        className=''
                      />
                    </div>
                  </div>

                  {/* 19 組作品 */}
                  <div className='size-52 place-content-center'>
                    <div>
                      <Typewriter
                        content='19'
                        speed={500}
                        start={infoTypewriterStart}
                        className='text-[6rem] font-extrabold'
                      />
                      <Typewriter
                        content='組作品'
                        speed={500}
                        start={infoTypewriterStart}
                        className='text-2xl font-extrabold ml-2'
                      />
                    </div>
                    <div className='text-sm opacity-80'>
                      <Typewriter
                        content='/* 11 組個人 + 8 組團體 */'
                        speed={100}
                        start={infoTypewriterStart}
                        className=''
                      />
                    </div>
                  </div>
                </div>

                <div className='flex flex-row gap-32 text-center justify-between translate-x-16'>
                  {/* 1 場開幕 */}
                  <div className='size-52 place-content-center'>
                    <div>
                      <Typewriter
                        content='1'
                        speed={500}
                        start={infoTypewriterStart}
                        className='text-[6rem] font-extrabold'
                      />
                      <Typewriter
                        content='場開幕'
                        speed={500}
                        start={infoTypewriterStart}
                        className='text-2xl font-extrabold ml-2'
                      />
                    </div>
                    <div className='text-sm opacity-80'>
                      <Typewriter
                        content='/* 3 組表演者 */'
                        speed={100}
                        start={infoTypewriterStart}
                        className=''
                      />
                    </div>
                  </div>

                  {/* 1 場講座 */}
                  <div className='size-52 place-content-center'>
                    <div>
                      <Typewriter
                        content='1'
                        speed={500}
                        start={infoTypewriterStart}
                        className='text-[6rem] font-extrabold'
                      />
                      <Typewriter
                        content='場講座'
                        speed={500}
                        start={infoTypewriterStart}
                        className='text-2xl font-extrabold ml-2'
                      />
                    </div>
                    <div className='text-sm opacity-80'>
                      <Typewriter
                        content='/* 創作經驗分享 */'
                        speed={100}
                        start={infoTypewriterStart}
                        className=''
                      />
                    </div>
                  </div>
                </div>

                {/* 按鈕：更多策展資訊 */}
                <div className='size-fit place-self-center pt-12 -translate-x-6'>
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
            className='absolute z-[9] top-0 left-0 -translate-x-1/2 -translate-y-full h-[60lvh] w-auto max-w-none object-contain select-none pointer-events-none transition-all duration-1000 ease-out'
          />
          <img
            ref={symbolHashtag1Ref}
            src='symbols/symbol-Hashtag.png'
            className='absolute z-[12] top-0 right-0 -translate-x-[10vw] translate-y-[70lvh] -rotate-[75deg] h-[125lvh] w-auto min-w-[70vw] min-h-[125lvh] max-h-none max-w-none object-contain select-none pointer-events-none transition-all duration-1000 ease-out'
          />
          <img
            ref={symbolStar1Ref}
            src='symbols/symbol-Star.png'
            className='absolute z-[12] top-0 left-0 -translate-x-[45vw] translate-y-[65lvh] -rotate-[30deg] h-[125lvh] w-auto max-h-none object-contain select-none pointer-events-none transition-all duration-1000 ease-out'
          />
          <img
            ref={symbolVerticalLine1Ref}
            src='symbols/symbol-VerticalLine.png'
            className='absolute z-[9] top-0 left-0 translate-x-[47vw] translate-y-[27lvh] rotate-[10deg] h-[110lvh] w-auto max-h-none object-contain select-none pointer-events-none transition-all duration-1000 ease-out'
          />
          <img
            ref={logotypeH1Ref}
            src='logotypes/logotype-horizontal.png'
            className='absolute z-[10] top-0 left-1/2 translate-x-[100vw] translate-y-[50lvh] -rotate-[60deg] h-[60lvh] w-auto max-w-none min-h-[512px] object-contain select-none pointer-events-none transition-all duration-1000 ease-out'
          />

          <div ref={aboutContentRef}>
            {/* 新增註解介紹 */}
            <div>
              <div
                ref={aboutTitle1Ref}
                className='absolute z-[13] top-0 left-0 opacity-0 h-fit max-w-[15rem] translate-x-[0] -translate-y-[0] scale-[0.5] overflow-visible select-none leading-none transition-all duration-1000 ease-in-out'
              >
                <Typewriter
                  content={'新增註解。'}
                  speed={250}
                  start={aboutTypewriter1Start}
                  className='font-bold text-[20lvh] vertical-text will-change-contents'
                />
              </div>
              <div
                ref={aboutTypewriter1Ref}
                className='absolute z-[11] top-0 right-0 opacity-0 -translate-x-[120] translate-y-[10] scale-[5] w-2/5 flex flex-col gap-8 leading-snug text-base font-semibold transition-all duration-1000 ease-in-out'
              >
                <TypewriterParagraph
                  paragraphs={[
                    '本屆北藝大新媒體藝術學系110級畢業展「新增註解 neo-annotation」，以現代生活中線上編輯工具的「註解」功能為靈感，將「註解」延伸為藝術行動，探索多元觀點和言論如何在科技和社群媒介的推動下共存與對話。這場展覽將新媒體藝術視作註解的「媒材」，引領觀眾在作品中，從多角度理解和重新詮釋熟悉的社會現況、意識形態與日常生活。',
                    '本展覽旨在打破固有的觀看框架，透過跨領域的創作激發出新舊觀點的承接和累加。與傳統的文字註解不同，藝術作品成為學生們「註解」世界的方式，以視覺、聲音和互動等方式來對當前現象進行觀察、解構，並重新構築。展覽場域如同一個自由對話的空間，提供學生表達多重視角的機會，同時讓觀者與作品之間產生有機反應，進而激發新的思想連結。',
                    '「新增註解 neo-annotation」是一個思考的實驗場，邀請觀者不僅僅局限於展場中的觀展經驗，而是打破單一視角的限制，以開放的態度看待差異與交流的可能，並將這種多角度觀察、言論自由和積極註解的想法帶回日常。'
                  ]}
                  speed={20}
                  start={aboutTypewriter1Start}
                  className='flex flex-col gap-8'
                />
              </div>
            </div>

            {/* 我們是誰 */}
            <div>
              <div
                ref={aboutTitle2Ref}
                className='absolute z-[13] top-0 left-0 opacity-0 translate-x-[10vw] translate-y-[0lvh] scale-[5] overflow-visible select-none leading-tight transition-all duration-1000 ease-in-out'
              >
                <Typewriter
                  speed={250}
                  start={aboutTypewriter2Start}
                  className='font-bold text-[20lvh]'
                  content='我們<br/>&nbsp;&nbsp;&nbsp;&nbsp;是誰?'
                />
              </div>

              <div
                ref={aboutTypewriter2Ref}
                className='absolute z-[13] top-0 right-0 opacity-0 -translate-x-[12vw] translate-y-[45lvh] w-1/4 leading-snug text-base font-semibold transition-all duration-1000 ease-in-out'
              >
                <Typewriter
                  content={'國立臺北藝術大學新媒體藝術學系為一跨越人文藝術領域與尖端科技結合的未來學門。它作為推動數位科技與藝術整合的重要推手，以培育前瞻性的「新媒體科技」、「新媒體影像」與「新媒體跨域」等全方位未來藝術創意人才。'}
                  speed={20}
                  start={aboutTypewriter2Start}
                  className='flex flex-col gap-8'
                />
              </div>

              <div
                ref={aboutUsBtnRef}
                className='absolute w-fit h-fit z-[13] top-0 right-0 opacity-0 -translate-x-[12vw] translate-y-[65lvh] leading-normal transition-all duration-1000 ease-in-out'
              >
                <MoreInfoBtn text='關於我們' color='black' />
              </div>
            </div>

            {/* 在哪裡 */}
            <div>
              <div
                ref={aboutTitle3Ref}
                className='absolute z-[14] top-0 left-0 opacity-0 translate-x-[10vw] -translate-y-[100lvh] scale-[0.8] overflow-visible select-none transition-all duration-1000 ease-in-out'
              >
                <Typewriter
                  contentKey={'aboutTitle3'}
                  speed={250}
                  start={aboutTypewriter3Start}
                  className='font-bold text-[20lvh]'
                  content={(
                    <div className='place-items-end'>
                      <div className='leading-none text-right'>來這</div>
                      <div className='leading-none vertical-text'>找我們！</div>
                    </div>
                  )}
                />
              </div>

              <div ref={whereRef} className='absolute top-0 right-0 opacity-0 -translate-x-[7vw] translate-y-[15lvh] w-[700px] h-[250px] z-[15] transition-all duration-1000 ease-in-out'>
                <img
                  ref={whereDateDatetimeRef}
                  src='info/info-date_datetime.png'
                  className='absolute top-[25%] left-[5%] h-20 w-auto -translate-x-[50%] -translate-y-[100%] object-contain select-none pointer-events-none transition-all duration-1000 ease-in-out'
                />
                <img
                  ref={whereDateTimeRef}
                  src='info/info-date_time.png'
                  className='absolute top-[25%] left-[50%] h-20 w-auto -translate-x-[50%] -translate-y-[100%] object-contain select-none pointer-events-none transition-all duration-1000 ease-in-out'
                />
                <img
                  ref={whereDateYearRef}
                  src='info/info-date_year.png'
                  className='absolute top-[0%] left-[0%] h-20 w-auto -translate-x-[50%] -translate-y-[100%] object-contain select-none pointer-events-none transition-all duration-1000 ease-in-out'
                />
                <img
                  ref={whereLocationClabRef}
                  src='info/info-location_clab.png'
                  className='absolute top-[55%] left-[3%] h-20 w-auto -translate-x-[50%] -translate-y-[100%] object-contain select-none pointer-events-none transition-all duration-1000 ease-in-out'
                />
                <img
                  ref={whereLocationAddressRef}
                  src='info/info-location_address.png'
                  className='absolute top-[80%] left-[45%] h-16 w-auto -translate-x-[50%] -translate-y-[100%] object-contain select-none pointer-events-none transition-all duration-1000 ease-in-out'
                />
              </div>

              <div
                ref={whereBtnRef}
                className='absolute w-fit h-fit z-[13] top-0 right-0 opacity-0 -translate-x-[15vw] translate-y-[52lvh] leading-normal transition-all duration-1000 ease-in-out'
              >
                <MoreInfoBtn text='場地資訊' color='black' />
              </div>
            </div>



            <div>
              <div
                ref={aboutTitle4Ref}
                className='absolute z-[14] top-0 left-0 opacity-0 overflow-visible select-none transition-all duration-500 ease-in pointer-events-none select-none'
                style={{ transform: 'translate(calc(-50% + 50vw + 64px), calc(-50% + 50lvh - 16px)) scale(5)' }}
              >
                <div className='font-bold text-[15lvh] place-items-center'>
                  <div className='leading-none text-center'>一起</div>
                  <br />
                  <div className='leading-none text-center'>吧！</div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

