'use client';
import React, { useEffect, useRef, useState, forwardRef } from 'react';
import { useTiltGroup } from '@/app/hooks/useTilt';

import MoreInfoBtn from '@/app/components/btn/moreInfoBtn/MoreInfoBtn';
import Order from './components/order/Order';
import { MerchCardVideo, MerchCardImage } from './components/merchCard/MerchCard';


export default function Merch() {
    const symbolHtml1Ref = useRef(null);
    const symbolHashtag1Ref = useRef(null);
    const symbolStar1Ref = useRef(null);
    const symbolVerticalLine1Ref = useRef(null);
    const logotypeH1Ref = useRef(null);

    const tiltContainerRef = useRef(null);
    const tilt1Ref = useRef(null);
    const tilt2Ref = useRef(null);
    const tilt3Ref = useRef(null);
    const tilt4Ref = useRef(null);
    const tilt5Ref = useRef(null);
    const tilt6Ref = useRef(null);
    const tilt7Ref = useRef(null);
    const tilt8Ref = useRef(null);
    useTiltGroup(tiltContainerRef, [tilt1Ref, tilt2Ref, tilt3Ref, tilt4Ref, tilt5Ref, tilt6Ref, tilt7Ref, tilt8Ref], { maxAngle: 7.5 });


    return (
        <div className='overflow-x-hidden'>
            <div className='min-h-[100lvh] h-fit pt-40'>
                <div className='fixed -z-50'>
                    <div className='fixed top-0 left-0 w-full h-full bg-yellow-300 -z-50'></div>
                    <div className='fixed box-border w-full h-full p-20 -z-50'>
                        <div className='w-full h-full bg-paper -z-50 flex items-center justify-center overflow-hidden'>
                            <img
                                src='merch/BgCard/bgCard-Text-large.png'
                                className='h-[90%] w-auto object-cover select-none pointer-events-none'
                            />
                            <img
                                src='merch/BgCard/bgCard-Head.png'
                                className='absolute  w-auto object-cover select-none pointer-events-none'
                            />
                        </div>
                    </div>

                    <div className='fixed top-0 left-0 h-full w-full -z-40'>
                        <img
                            ref={symbolHtml1Ref}
                            src='symbols/symbol-HTML.png'
                            className='absolute -z-40 top-0 left-0 -translate-x-0 -translate-y-0 h-[100lvh] w-auto min-w-[70vw] object-contain select-none pointer-events-none transition-all duration-1000 ease-out'
                        />
                        <img
                            ref={symbolHashtag1Ref}
                            src='symbols/symbol-Hashtag.png'
                            className='absolute -z-40 top-0 right-0 -translate-x-[0] -translate-y-[50vh] -rotate-[0] h-[100lvh] w-auto min-w-[70vw] max-h-none max-w-none object-contain select-none pointer-events-none transition-all duration-1000 ease-out'
                        />
                        <img
                            ref={symbolStar1Ref}
                            src='symbols/symbol-Star.png'
                            className='absolute -z-40 top-0 left-0 -translate-x-[0] translate-y-[0] -rotate-[0] h-[100lvh] w-auto max-h-none object-contain select-none pointer-events-none transition-all duration-1000 ease-out'
                        />
                        <img
                            ref={symbolVerticalLine1Ref}
                            src='symbols/symbol-VerticalLine.png'
                            className='absolute -z-40 top-0 left-0 translate-x-[0] translate-y-[0] rotate-[0] h-[100lvh] w-auto max-h-none object-contain select-none pointer-events-none transition-all duration-1000 ease-out'
                        />
                        {/* <img
                    ref={logotypeH1Ref}
                    src='logotypes/logotype-horizontal.png'
                    className='absolute -z-40 top-0 left-0 translate-x-[0] translate-y-[0] -rotate-[0] h-[60lvh] w-auto max-w-none min-h-[512px] object-contain select-none pointer-events-none transition-all duration-1000 ease-out'
                /> */}
                    </div>
                </div>

                <div className='relative top-0 left-0 h-full w-full z-0'>
                    <div className='h-full w-full flex flex-col items-center justify-center'>
                        <div className='mb-20 flex flex-col items-center justify-center gap-4'>
                            <img src='logotypes/logotype-horizontal.png' className='w-96' />
                            <img src='merch/BgCard/bgCard-Head.png' className='w-64' />
                        </div>
                        <div ref={tiltContainerRef} className='perspective-container w-80 md:w-auto flex flex-col gap-8 drop-shadow-spread text-black-1/2'>

                            <MerchCardVideo
                                ref={tilt1Ref}
                                videoSrc='merch/01_Keycap/Mov/Simple_Keycap'
                                productName='#/**/鍵帽按鈕'
                                description='清脆段落青軸和閃爍的霓虹燈，是舒壓的好夥伴。不只是吊飾，拔下鍵帽即可裝到自己的鍵盤上，讓輸入成為風格的一部分。'
                                hashtags={['共有「鏡面#」、「黃色/**/」兩種款式']}
                                price={250}
                                priceOri={280}
                                styleInfos={['鍵帽：鍵帽形OEM', '高度R4', '17.3*17.8*10.5 mm']}
                            />

                            {/* 雙頭隨身碟 */}
                            <MerchCardVideo
                                ref={tilt2Ref}
                                videoSrc='merch/04_USB/Mov/Simple_USB'
                                productName='雙頭隨身碟'
                                description='輕鬆穿梭 Mac 和 Windows 的雙頭隨身碟，小巧、快速、64G大容量，採用三星晶片。讓任何筆記、文件、雷切檔案都暢行無阻！'
                                hashtags={[]}
                                price={315}
                                priceOri={350}
                                styleInfos={['64GB', 'USB3.0+Type C', '33*12*6 mm']}
                            />

                            {/* 貼紙鑰匙圈 */}
                            <MerchCardVideo
                                ref={tilt3Ref}
                                videoSrc='merch/05_Sticker/Mov/Simple_Sticker'
                                productName='貼紙鑰匙圈'
                                description='是靜電貼紙、吊飾，也是隨身小鏡子。註解符號的貼紙特別製作成靜電貼，在各種平滑表面都能做註解。撕下貼紙的壓克力吊飾就掛在書包吧！內附鏡子隨時保持完美的狀態！'
                                hashtags={['靜電貼紙*4', '壓克力吊牌*4']}
                                price={135}
                                priceOri={150}
                                styleInfos={['94*41 mm']}
                            />

                            {/* 打火機 */}
                            <MerchCardVideo
                                ref={tilt4Ref}
                                videoSrc='merch/03_Lighter/Mov/Simple_Lighter'
                                productName='打火機'
                                description='復古銀色打火機，點燃你的靈感、新鮮空氣和熱縮套！'
                                hashtags={['防風打火機', '可補充瓦斯']}
                                price={45}
                                priceOri={50}
                                styleInfos={['80*22*9 mm']}
                            />

                            {/* 字母標籤機 */}
                            <MerchCardVideo
                                ref={tilt5Ref}
                                videoSrc='merch/02_LabelPrinter/Mov/Simple_LabelMachine'
                                productName='字母標籤機'
                                description='為你的小物們註記分類吧！'
                                hashtags={['膠帶顏色隨機出貨']}
                                price={270}
                                priceOri={300}
                                styleInfos={['機身：112*55 mm', '膠帶：9 mm']}
                            />

                            {/* 海報 */}
                            <MerchCardVideo
                                ref={tilt6Ref}
                                videoSrc='merch/06_Poster/Mov/poster-Mov'
                                productName='海報'
                                description='註解的註解的註解，有什麼小秘密在字裡行間呢？手工打凹的海報，限量發行！'
                                hashtags={['共五色', '僅供展場自取']}
                                price={70}
                                priceOri={80}
                                styleInfos={['A3（297 x 420 mm）']}
                            />

                            {/* 小禮包 */}
                            <MerchCardImage
                                ref={tilt7Ref}
                                imageSrc='merch/A-small/small.png'
                                productName='小禮包'
                                description={(
                                    <ul className='ml-2 list-disc list-inside text-black text-base leading-relaxed'>
                                        <li>#/**/鍵帽按鈕 × 1</li>
                                        <li>雙頭隨身碟 × 1</li>
                                        <li>貼紙鑰匙圈 × 1</li>
                                    </ul>
                                )}
                                hashtags={['早鳥限定',]}
                                price={660}
                                priceOri={780}
                            />

                            {/* 大禮包 */}
                            <MerchCardImage
                                ref={tilt8Ref}
                                imageSrc='merch/B-big/big.png'
                                productName='大禮包'
                                description={(
                                    <ul className='ml-2 list-disc list-inside text-black text-base leading-relaxed'>
                                    <li>#/**/鍵帽按鈕 × 1</li>
                                    <li>雙頭隨身碟 × 1</li>
                                    <li>貼紙鑰匙圈 × 1</li>
                                    <li>打火機 × 1</li>
                                    <li>字母標籤機 × 1</li>
                                </ul>
                                )}
                                hashtags={['早鳥限定',]}
                                price={960}
                                priceOri={1015}
                            />

                        </div>
                    </div>
                </div>
            </div>

            <div className='h-fit py-20'>
                <Order />
            </div>
        </div>
    );
}

