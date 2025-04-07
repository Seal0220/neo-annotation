'use client';
import React, { useState, useRef, useEffect } from 'react';
import { useTiltGroup } from '@/app/hooks/useTilt';
import Typewriter from '@/app/components/typewriter/Typewriter';
import MoreInfoBtn from '@/app/components/btn/moreInfoBtn/MoreInfoBtn';

export default function About() {
    const [isLoaded, setIsLoaded] = useState(false);

    const groupUsContainerRef = useRef(null);
    const groupUs1Ref = useRef(null);
    const groupUs2Ref = useRef(null);
    const groupUs3Ref = useRef(null);
    const groupUs4Ref = useRef(null);
    const groupUs5Ref = useRef(null);
    const groupUs6Ref = useRef(null);
    const groupUs7Ref = useRef(null);
    const groupUs8Ref = useRef(null);
    const groupUs9Ref = useRef(null);
    const groupOrganizerRef = useRef(null);
    const groupSponsorRef = useRef(null);

    useTiltGroup(
        groupUsContainerRef,
        [groupUs1Ref, groupUs2Ref, groupUs3Ref, groupUs4Ref, groupUs5Ref, groupUs6Ref, groupUs7Ref, groupUs8Ref, groupUs9Ref, groupOrganizerRef, groupSponsorRef],
        { maxAngle: 5 }
    );

    useEffect(() => {
        setIsLoaded(true);
    }, []);

    return (
        <div className="overflow-x-hidden">
            <div className="min-h-[100lvh] h-fit py-40">
                <div className="fixed -z-50">
                    <div className="fixed top-0 left-0 w-full h-full bg-yellow-300 -z-50"></div>
                    <div className="fixed box-border w-full h-full p-20 -z-50">
                        <div className="w-full h-full bg-paper -z-50 flex items-center justify-center overflow-hidden">
                            <img
                                src="merch/BgCard/bgCard-Text-large.png"
                                className="h-[90%] w-auto object-cover select-none pointer-events-none"
                                alt="背景文字"
                            />
                            <img
                                src="merch/BgCard/bgCard-Head.png"
                                className="absolute w-auto object-cover select-none pointer-events-none"
                                alt="背景圖"
                            />
                        </div>
                    </div>
                    <div className="fixed top-0 left-0 h-full w-full -z-40">
                        <img
                            src="symbols/symbol-HTML.png"
                            className="absolute -z-40 top-0 left-0 h-[100lvh] w-auto min-w-[70vw] object-contain select-none pointer-events-none transition-all duration-1000 ease-out"
                            alt="HTML"
                        />
                        <img
                            src="symbols/symbol-Hashtag.png"
                            className="absolute -z-40 top-0 right-0 -translate-y-[50vh] h-[100lvh] w-auto min-w-[70vw] object-contain select-none pointer-events-none transition-all duration-1000 ease-out"
                            alt="Hashtag"
                        />
                        <img
                            src="symbols/symbol-Star.png"
                            className="absolute -z-40 top-0 left-0 h-[100lvh] w-auto object-contain select-none pointer-events-none transition-all duration-1000 ease-out"
                            alt="Star"
                        />
                        <img
                            src="symbols/symbol-VerticalLine.png"
                            className="absolute -z-40 top-0 left-0 h-[100lvh] w-auto object-contain select-none pointer-events-none transition-all duration-1000 ease-out"
                            alt="Vertical Line"
                        />
                    </div>
                </div>

                <div className='fixed -top-[5%] -left-28 lg:left-[15vw]'>
                    <Typewriter
                        content={'關於我們'}
                        speed={250}
                        start={isLoaded}
                        className='font-bold text-[20lvh] lg:text-[25lvh] vertical-text will-change-contents'
                    />
                </div>

                <div className="relative top-0 left-0 h-full w-full z-0">
                    <div className="h-full w-full flex flex-col items-center justify-center">
                        <div className="mb-20 flex flex-col items-center justify-center gap-4">

                        </div>

                        <div className='relative min-h-[50lvh] w-full'>
                            <div className='fixed w-[180lvh] top-32 left-1/2 '>
                                <img
                                    src="logotypes/logotype-horizontal.png"
                                    className="-translate-x-1/2 -translate-y-1/2 pointer-events-none select-none"
                                    alt="Logo"
                                />
                            </div>
                            <div className='fixed w-[30rem] right-[40vw] lg:right-[30vw] top-[25lvh]'>
                                <div className='absolute w-[1000px] pointer-events-none'>
                                    <img src='pops/pop-01.svg' className='w-full h-auto object-cover pointer-events-none select-none' />
                                </div>
                                <div className="absolute w-[30rem] max-w-[95vw] left-64 top-32 lg:top-40 p-8">
                                    <Typewriter
                                        content={'國立臺北藝術大學新媒體藝術學系為一跨越人文藝術領域與尖端科技結合的未來學門。它作為推動數位科技與藝術整合的重要推手，以培育前瞻性的「新媒體科技」、「新媒體影像」與「新媒體跨域」等全方位未來藝術創意人才。'}
                                        speed={20}
                                        start={isLoaded}
                                        className='font-bold text-white text-base'
                                    />
                                </div>
                                <MoreInfoBtn
                                    to='https://nma.tnua.edu.tw/'
                                    text='北藝新媒'
                                    className='absolute translate-x-96 translate-y-[22rem]'
                                />
                            </div>
                        </div>

                        <div ref={groupUsContainerRef} className="w-full max-w-4xl p-4 flex flex-col gap-8">
                            <Section
                                ref={groupOrganizerRef}
                                title='主辦單位 / Organizer'
                            >
                                <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                                    <div
                                        className='cursor-pointer'
                                        onClick={() => window.open('https://nma.tnua.edu.tw/', '_blank')}
                                    >
                                        <img
                                            src='organizers/tnuanma.png'
                                            className='h-20 lg:h-20 object-contain select-none pointer-events-none'
                                        />
                                    </div>
                                    <div
                                        className='cursor-pointer'
                                        onClick={() => window.open('https://w3.tnua.edu.tw/', '_blank')}
                                    >
                                        <img
                                            src='organizers/tnua.gif'
                                            className='h-20 lg:h-20 object-contain select-none pointer-events-none'
                                        />
                                    </div>
                                </div>
                            </Section>

                            <div className='h-20' />

                            <Group
                                ref={groupUs1Ref}
                                title="總召 / Coordinator"
                                members={[{ tw: "高行萱", en: "Kao Hsin Syuan" }]}
                            />
                            <Group
                                ref={groupUs2Ref}
                                title="副召 / Vice Coordinator"
                                members={[{ tw: "粘雅文", en: "Nien Ya Wen" }]}
                            />
                            <Group
                                ref={groupUs3Ref}
                                title="事務組 / Administration Department"
                                members={[
                                    { tw: "張禹婕", en: "Chang Yu Chieh" },
                                    { tw: "劉怡辰", en: "Liu Yi Chen" },
                                    { tw: "黃語箴", en: "Huang Yu Jhen" },
                                ]}
                            />
                            <Group
                                ref={groupUs4Ref}
                                title="視覺組 / Design Department"
                                members={[
                                    { tw: "阮姿霓", en: "Juan Tzu Ni" },
                                    { tw: "陳婕希", en: "Chen Chieh Hsi" },
                                    { tw: "李晴喆", en: "Lee Qing Zhe" },
                                    { tw: "許巧嬡", en: "Hsu Chiao Ai" },
                                    { tw: "張祐勳", en: "Chang You Syun" },
                                    { tw: "陳俋錫", en: "Chen I Hsi" },
                                    { tw: "廖炫棠", en: "Liao Xuan Tang" },
                                ]}
                            />
                            <Group
                                ref={groupUs5Ref}
                                title="公關組 / Public Relations"
                                members={[
                                    { tw: "劉庭安", en: "Liu Ting An" },
                                    { tw: "陳采廷", en: "Chen Cai Ting" },
                                    { tw: "王晨曦", en: "Wang Chen Xi" },
                                    { tw: "李宇恆", en: "Li Yu Heng" },
                                ]}
                            />
                            <Group
                                ref={groupUs6Ref}
                                title="網頁組 / Web Design"
                                members={[
                                    { tw: "陳奕銓", en: "Chen Yi Quan" },
                                    { tw: "胡乃云", en: "Hu Nai Yun" },
                                ]}
                            />
                            <Group
                                ref={groupUs7Ref}
                                title="紀錄組 / Photography Department"
                                members={[
                                    { tw: "游士萱", en: "Yu Shih Hsuan" },
                                    { tw: "何雨柔", en: "Ho Yu Jou" },
                                    { tw: "張文珈", en: "Chang Wen Chia" },
                                    { tw: "徐暐涵", en: "Hsu Wei Han" },
                                    { tw: "樊卓鏗", en: "Fan Cheuk Hang" },
                                ]}
                            />
                            <Group
                                ref={groupUs8Ref}
                                title="活動組 / Event Planning Department"
                                members={[
                                    { tw: "洪伊又", en: "Hung Yi Yu" },
                                    { tw: "陳韻至", en: "Chen Yun Zhi" },
                                    { tw: "張媛淇", en: "Chang Yuan Chi" },
                                ]}
                            />
                            <Group
                                ref={groupUs9Ref}
                                title="技術統籌組 / Technical Director Department"
                                members={[
                                    { tw: "黃冠勛", en: "Huang Kuan Hsun" },
                                    { tw: "黃冠睿", en: "Huang Kuan Jui" },
                                    { tw: "韓承諭", en: "Han Cheng Yu" },
                                    { tw: "李雯諭", en: "Lee Wen Yu" },
                                ]}
                            />

                            <div className='h-20' />
                            <Section
                                ref={groupSponsorRef}
                                title='贊助單位 / Sponsor'
                            >

                                <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                                    <img src="sponsors/giloo.png" className="h-10 lg:h-12 object-contain select-none pointer-events-none" />
                                    <img src="sponsors/kirin.png" className="h-10 lg:h-12 object-contain select-none pointer-events-none" />
                                    <img src="sponsors/bar.png" className="h-16 lg:h-20 object-contain select-none pointer-events-none" />
                                    <img src="sponsors/sponya.png" className="h-16 lg:h-20 object-contain select-none pointer-events-none" />
                                    <img src="sponsors/聯華食品.png" className="h-12 lg:h-16 object-contain select-none pointer-events-none" />
                                    <span className="font-bold text-5xl px-4 text-black select-none pointer-events-none">miuk</span>
                                </div>

                            </Section>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

const Section = React.forwardRef(function Section({ title, children }, ref) {
    return (
        <div
            ref={ref}
            className='perspective-3d drop-shadow-spread text-black-1/2 transition-transform duration-500 ease-out'
        >
            <div className='bg-paper p-12 lg:hover:scale-110 transition-all duration-1000 ease-in-out'>
                <h3 className="text-2xl font-semibold mb-2 text-black">{title}</h3>
                {children}
            </div>

        </div>
    );
});


const Group = React.forwardRef(function Group({ title, members = [] }, ref) {
    return (
        <div
            ref={ref}
            className='perspective-3d drop-shadow-spread text-black-1/2 transition-transform duration-500 ease-out'
        >
            <div className='bg-paper p-12 lg:hover:scale-110 transition-all duration-1000 ease-in-out'>
                <h3 className="text-2xl font-semibold mb-2 text-black">{title}</h3>
                <ul className="ml-4 list-disc text-black">
                    {members.map((member, index) => (
                        <li key={index}>
                            {member.tw} <span className="italic text-gray-500">({member.en})</span>
                        </li>
                    ))}
                </ul>
            </div>

        </div>
    );
});
