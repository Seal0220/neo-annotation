'use client';
import React, { useState, useRef, useEffect } from 'react';
import { useTiltGroup } from '@/app/hooks/useTilt';
import Typewriter from '@/app/components/typewriter/Typewriter';
import MoreInfoBtn from '@/app/components/btn/moreInfoBtn/MoreInfoBtn';
import { workFetch } from '@/app/functions/fetch/workFetch';


export default function Work({ params }) {
  const { index } = params;
  const [isLoaded, setIsLoaded] = useState(false);
  const [work, setWork] = useState({});
  const [images, setImages] = useState([]);

  useEffect(() => {
    (async () => {
      workFetch({
        id: index,
        successFn: ({ response, result }) => {
          setWork(result);
          setIsLoaded(true);
        },
        failureFn: ({ response, result }) => {
          console.warn('Fetch failed with status:', response.status);
          setIsLoaded(true);
        },
        errorFn: (error) => {
          console.error('Error fetching work:', error);
          setIsLoaded(true);
        }
      });
    })();

    (async () => {
      workFetch({
        id: index,
        onlyImage: true,
        successFn: ({ response, result }) => {
          setImages(result);
          setIsLoaded(true);
        },
        failureFn: ({ response, result }) => {
          console.warn('Fetch failed with status:', response.status);
          setIsLoaded(true);
        },
        errorFn: (error) => {
          console.error('Error fetching work:', error);
        }
      });
    })();
  }, [index]);

  return (
    <div className='overflow-x-hidden'>
      <div className='min-h-[100lvh] h-fit pt-40'>

        <div className={`fixed top-0 left-0 w-lvw h-[60lvh] overflow-hidden flex items-center justify-center -z-20`}>
          <div className={`absolute z-10 w-lvw h-lvh transition-all ease-in-out duration-500 ${images.length ? 'opacity-0' : 'animate-cycleColor opacity-100'}`} />
          <img
            src={images[0]}
            className={`relative z-[9] h-full w-full object-cover select-none pointer-events-none transition-all ease-in-out duration-500 delay-500 ${images.length ? 'opacity-100' : 'opacity-0'}`}
          />
        </div>

        <div className={`relative mt-[60lvh] bg-black min-h-full left-0 h-fit w-full z-0 flex flex-col justify-center ${isLoaded ? '' : 'pt-[50lvh]'}`}>
          <div className='absolute pl-4 lg:pl-0 -top-32 xl:-top-52 lg:left-[15vw] z-20'>
            <Typewriter
              content={work.title}
              speed={250}
              start={isLoaded}
              className='max-w-[90vw] overflow-visible break-words lg:max-w-[70vw] leading-none font-bold text-main-yellow-400 text-[10lvh] lg:text-[12lvh] xl:text-[16lvh] 2xl:text-[20lvh] will-change-contents drop-shadow-spread'
            />
          </div>

          <div className='max-w-[90vw] break-words lg:max-w-[70vw] leading-none font-bold text-main-yellow-400 text-[10lvh] lg:text-[12lvh] xl:text-[16lvh] 2xl:text-[20lvh] invisible pointer-events-none select-none'>{work.title}</div>

          <div className='relative bg-main-yellow-400 h-32 shadow-[inset_0_0_20px]'>
            <div className='absolute top-24 lg:top-[12rem] left-[20vw] h-full flex items-center justify-center'>
              <div className='text-[12rem] lg:text-[24rem] font-bold drop-shadow-spread-sm -translate-x-1/2 -translate-y-1/2 select-none pointer-events-none'>
                @
              </div>
            </div>

            <Typewriter
              content={work.name}
              speed={50}
              start={isLoaded}
              className='absolute text-xl lg:text-2xl font-bold ml-12 top-1/3 left-[32vw]'
            />

            <Typewriter
              content={`# ${work.medium}`}
              speed={50}
              start={isLoaded}
              className='absolute text-base lg:text-xl font-bold ml-12 top-[70%] right-[22vw] text-main-yellow-900'
            />
          </div>



          <div className='min-h-[50lvh] w-full bg-black' >
            <div className='place-self-center w-full lg:w-[70vw] max-w-[95vw] left-64 top-32 lg:top-40 p-8 pt-32'>
              <Typewriter
                content={work.description}
                speed={10}
                start={isLoaded}
                className='font-bold text-white text-base whitespace-break-spaces'
              />
            </div>

            {
              index === 'A2' && (
                <div className="lg:pl-16 grid grid-cols-1 md:grid-cols-2 gap-32 lg:gap-4 place-items-center py-32">
                  {['/works/A2/1.png', '/works/A2/2.png'].map((src, idx) => (
                    <div key={idx} className="w-fit h-[70lvh] overflow-hidden rounded-lg">
                      <img src={src} alt={`Image ${idx + 1}`} className="w-auto h-full object-contain" />
                    </div>
                  ))}
                </div>
              )
            }
          </div>
        </div>
      </div>
    </div>
  );
}
