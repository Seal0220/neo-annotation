'use client';
import React, { forwardRef } from 'react';
import HoverVideo from '@/app/components/hoverVideo/HoverVideo';

export const MerchCardVideo = forwardRef(function MerchCardVideo(
    {
        videoSrc = '',
        productName = '',
        description = '',
        hashtags = [],
        price = 0,
        priceOri = 0,
        styleInfos = [''],
    },
    ref
) {
    return (
        <div
            ref={ref}
            className='perspective-3d transition-all duration-300 ease-out will-change-[all]'
        >
            {/* 使用 flex-col（在 md 以下）與 flex-row（md 以上）的排版 */}
            <div className='flex flex-col md:flex-row hover:scale-110 transition-all duration-1000 ease-in-out'>
                <div className='!size-80 md:!size-[25lvh] md:w-auto max-h-none border-[20px] border-main-yellow-500 transition-all duration-1000 ease-in-out cursor-pointer'>
                    <HoverVideo
                        src={videoSrc}
                        className='h-full w-auto brightness-125 z-0 top-0 left-0 -translate-x-[0] translate-y-[0] -rotate-[0] object-contain select-none transition-all duration-1000 ease-out'
                    />
                </div>
                <div className='h-auto w-full md:w-[28rem] bg-paper box-border p-5 flex flex-col gap-4 relative'>
                    <div className='w-fit text-black text-lg bg-main-yellow-500 px-2 font-bold'>
                        {productName}
                    </div>

                    <div className='text-black text-base leading-tight'>
                        {description}
                    </div>

                    <div className='absolute text-black font-black right-0 bottom-0 p-5 flex flex-row items-end'>
                        <span className='text-base'>售價：</span>
                        <div className='flex flex-col items-center'>
                            {/* <span className='text-xl text-neutral-600 '>
                                <del className='decoration-black-1/2 decoration-[3px]'>
                                    {priceOri}
                                </del>
                            </span> */}
                            <span className='text-3xl bg-main-yellow-500 px-2'>{priceOri}</span>
                        </div>
                    </div>

                    <div className='mt-auto flex flex-col gap-2'>
                        <div className='text-sm text-neutral-700 font-bold flex flex-col'>
                            {hashtags.map((hashtag, index) => (
                                <span key={index} className='mr-2'>
                                    ＃{hashtag}
                                </span>
                            ))}
                        </div>

                        <div className='text-sm text-neutral-500 whitespace-pre-line flex flex-col'>
                            {styleInfos.map((styleInfo, index) => (
                                <span key={index} className='mr-2'>
                                    {styleInfo}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
});


export const MerchCardImage = forwardRef(function MerchCardImage(
    {
        imageSrc = '',
        productName = '',
        description = '',
        hashtags = [],
        price = 0,
        priceOri = 0,
        styleInfos = [],
    },
    ref
) {
    return (
        <div
            ref={ref}
            className='perspective-3d transition-all duration-300 ease-out will-change-[all]'
        >
            {/* 使用 flex-col（在 md 以下）與 flex-row（md 以上）的排版 */}
            <div className='flex flex-col md:flex-row hover:scale-110 transition-all duration-1000 ease-in-out'>
                <div className='!size-80 md:!size-[25lvh] md:w-auto max-h-none border-[20px] border-main-yellow-500 transition-all duration-1000 ease-in-out cursor-pointer'>
                    <img
                        src={imageSrc}
                        className='h-full w-auto brightness-125 z-0 top-0 left-0 -translate-x-[0] translate-y-[0] -rotate-[0] object-contain select-none transition-all duration-1000 ease-out'
                    />
                </div>
                <div className='h-auto w-full md:w-[28rem] bg-paper box-border p-5 flex flex-col gap-4 relative'>
                    <div className='w-fit text-black text-lg bg-main-yellow-500 px-2 font-bold'>
                        {productName}
                    </div>

                    <div className='text-black text-base leading-tight'>
                        {description}
                    </div>

                    <div className='absolute text-black font-black right-0 bottom-0 p-5 flex flex-row items-end'>
                        <span className='text-base'>早鳥價：</span>
                        <div className='flex flex-col items-center'>
                            <span className='text-xl text-neutral-600 '>
                                <del className='decoration-black-1/2 decoration-[3px]'>
                                    {priceOri}
                                </del>
                            </span>
                            <span className='text-3xl bg-main-yellow-500 px-2'>{price}</span>
                        </div>
                    </div>

                    <div className='mt-auto flex flex-col gap-2'>
                        <div className='text-sm text-neutral-700 font-bold flex flex-col'>
                            {hashtags.map((hashtag, index) => (
                                <span key={index} className='mr-2'>
                                    ＃{hashtag}
                                </span>
                            ))}
                        </div>

                        <div className='text-sm text-neutral-500 whitespace-pre-line flex flex-col'>
                            {styleInfos.map((styleInfo, index) => (
                                <span key={index} className='mr-2'>
                                    {styleInfo}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
});