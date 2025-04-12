'use client';
import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { useTiltGroup } from '@/app/hooks/useTilt';
import Typewriter from '@/app/components/typewriter/Typewriter';


export default function Works() {
  const router = useRouter();
  const works = process.env.WORKS;
  const [isLoaded, setIsLoaded] = useState(false);

  const containerRef = useRef(null);
  const groupRefs = useRef(works.map(() => React.createRef()));

  useTiltGroup(containerRef, groupRefs.current, { maxAngle: 5 });

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className='overflow-x-hidden'>
      <div className='min-h-[100lvh] h-fit py-40'>
        <div className='fixed -z-50'>
          <div className='fixed top-0 left-0 w-full h-full bg-yellow-300 -z-50'></div>
          <div className='fixed box-border w-full h-full p-20 -z-50'>
            <div className='w-full h-full bg-paper -z-50 flex items-center justify-center overflow-hidden'>
              <img
                src='/merch/BgCard/bgCard-Text-large.png'
                className='h-[90%] w-auto object-cover select-none pointer-events-none'
                alt='背景文字'
              />
              <img
                src='/merch/BgCard/bgCard-Head.png'
                className='absolute w-auto object-cover select-none pointer-events-none'
                alt='背景圖'
              />
            </div>
          </div>
          <div className='fixed top-0 left-0 h-full w-full -z-40'>
            <img
              src='/symbols/symbol-HTML.png'
              className='absolute -z-40 top-0 left-0 h-[100lvh] w-auto min-w-[70vw] object-contain select-none pointer-events-none transition-all duration-1000 ease-out'
              alt='HTML'
            />
            <img
              src='/symbols/symbol-Hashtag.png'
              className='absolute -z-40 top-0 right-0 -translate-y-[50vh] h-[100lvh] w-auto min-w-[70vw] object-contain select-none pointer-events-none transition-all duration-1000 ease-out'
              alt='Hashtag'
            />
            <img
              src='/symbols/symbol-Star.png'
              className='absolute -z-40 top-0 left-0 h-[100lvh] w-auto object-contain select-none pointer-events-none transition-all duration-1000 ease-out'
              alt='Star'
            />
            <img
              src='/symbols/symbol-VerticalLine.png'
              className='absolute -z-40 top-0 left-0 h-[100lvh] w-auto object-contain select-none pointer-events-none transition-all duration-1000 ease-out'
              alt='Vertical Line'
            />
            <div className='fixed w-[180lvh] top-80 left-1/2 '>
              <img
                src='/logotypes/logotype-horizontal.png'
                className='-translate-x-1/2 -translate-y-1/2 pointer-events-none select-none'
                alt='Logo'
              />
            </div>
          </div>
        </div>

        <div className='fixed -top-[5%] -left-8 lg:left-[15vw]'>
          <Typewriter
            content={'作品活動'}
            speed={250}
            start={isLoaded}
            className='font-bold text-[20lvh] lg:text-[25lvh] will-change-contents'
          />
        </div>

        <div className='relative top-0 left-0 h-full w-full z-0 pt-[30lvh]'>
          <div
            ref={containerRef}
            className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 md:max-w-4xl max-w-6xl mx-auto p-8'
          >
            {works?.map((work, index) => (
              <div
                key={work.id}
                ref={groupRefs.current[index]}
                className=' place-self-center w-fit h-fit transition-transform duration-500 ease-out pointer-events-auto cursor-pointer'
                onClick={() => { router.push(`/works/${work.id}`) }}
              >
                <div className='bg-black  drop-shadow-spread text-black-1/2 transition-transform duration-500 ease-in-out hover:scale-110'>
                  <img src={`/works/${work.id}.webp`} className='' />
                  <div className="absolute top-0 left-0 w-full h-96">
                    <div className='absolute bottom-0 px-4 w-fit max-w-[90%] bg-main-yellow-400 text-black text-2xl font-bold flex flex-col-reverse whitespace-break-spaces select-none'>
                      {work.title}
                    </div>
                  </div>

                  <div className='text-white p-6'>
                    <div className='absolute w-32 h-16 left-0 -translate-y-6 overflow-hidden'>
                      <div className='absolute flex items-center justify-center -translate-y-20 -translate-x-6'>
                      <span className='font-bold text-[7rem]'>@</span>
                      </div>
                    </div>
                    <div className='text-xl font-semibold mb-4 ml-16'>{work.name}</div>
                    <div className='text-base place-self-end'># {work.medium}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
