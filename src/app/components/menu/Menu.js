'use client';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';

import ScrollBarInfo from '../scrollBarInfo/ScrollBarInfo';
import List from './components/List';

export default function Menu() {
    const router = useRouter();
    const { isVisible, isScrollBarInfo } = useSelector((state) => state.menu);
    const [isNearby, setIsNearby] = useState(false);
    const [isInMenu, setIsInMenu] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <div className="top-0 left-0 fixed z-[999]">
            {/* 手機版：左上角漢堡按鈕，僅在小於 lg 時顯示 */}
            <button
                onClick={() => setIsMobileMenuOpen((prev) => !prev)}
                className="absolute lg:hidden p-2 m-4 bg-main-yellow-400 rounded drop-shadow-spread text-yellow-600 z-[1100] transition-all duration-300"
            >
                <div className="relative w-8 h-8">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 72 72"
                        className={`absolute top-0 left-0 w-full h-full transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-0' : 'opacity-100'}`}
                    >
                        <path d="M56 48c2.209 0 4 1.791 4 4 0 2.209-1.791 4-4 4-1.202 0-38.798 0-40 0-2.209 0-4-1.791-4-4 0-2.209 1.791-4 4-4C17.202 48 54.798 48 56 48zM56 32c2.209 0 4 1.791 4 4 0 2.209-1.791 4-4 4-1.202 0-38.798 0-40 0-2.209 0-4-1.791-4-4 0-2.209 1.791-4 4-4C17.202 32 54.798 32 56 32zM56 16c2.209 0 4 1.791 4 4 0 2.209-1.791 4-4 4-1.202 0-38.798 0-40 0-2.209 0-4-1.791-4-4 0-2.209 1.791-4 4-4C17.202 16 54.798 16 56 16z" />
                    </svg>

                    <svg
                        xmlns="http://www.w3.org/2000/svg" viewBox="0 0 72 72"
                        className={`absolute top-0 left-0 w-full h-full transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-100' : 'opacity-0'}`}

                    >
                        <path d="M 19 15 C 17.977 15 16.951875 15.390875 16.171875 16.171875 C 14.609875 17.733875 14.609875 20.266125 16.171875 21.828125 L 30.34375 36 L 16.171875 50.171875 C 14.609875 51.733875 14.609875 54.266125 16.171875 55.828125 C 16.951875 56.608125 17.977 57 19 57 C 20.023 57 21.048125 56.609125 21.828125 55.828125 L 36 41.65625 L 50.171875 55.828125 C 51.731875 57.390125 54.267125 57.390125 55.828125 55.828125 C 57.391125 54.265125 57.391125 51.734875 55.828125 50.171875 L 41.65625 36 L 55.828125 21.828125 C 57.390125 20.266125 57.390125 17.733875 55.828125 16.171875 C 54.268125 14.610875 51.731875 14.609875 50.171875 16.171875 L 36 30.34375 L 21.828125 16.171875 C 21.048125 15.391875 20.023 15 19 15 z"></path>
                    </svg>
                </div>
            </button>


            {/* 桌機版 Hover 觸發區（僅在 lg 以上） */}
            <div
                className={`peer/nearby top-0 left-0 fixed z-[1001] h-dvh ${isVisible ? 'w-0 lg:w-64 select-auto' : 'w-0 select-none'
                    }`}
                onMouseEnter={() => setIsNearby(true)}
                onMouseLeave={() => setIsNearby(false)}
            ></div>

            {/* Menu 主體容器 */}
            <div
                className={`
                    peer/menu top-0 left-0 fixed z-[1010] h-dvh bg-black drop-shadow-[0px_0px_5px] fill-black overflow-hidden
                    transition-all duration-300 ease-in-out
                    ${isMobileMenuOpen ? 'w-96' : 'w-0'}
                    ${isVisible ? ' lg:w-16 lg:select-auto lg:peer-hover/nearby:w-24 lg:hover:w-96' : ' lg:w-0 lg:select-none'}
                `}
                onMouseEnter={() => {
                    if (window.innerWidth >= 1024) setIsInMenu(true);
                }}
                onMouseLeave={() => {
                    if (window.innerWidth >= 1024) setIsInMenu(false);
                }}
            >
                <div
                    className={`transition-all duration-300 ease-in-out ${isScrollBarInfo ? 'w-full' : 'w-0'
                        }`}
                >
                    <ScrollBarInfo />
                </div>

                <div
                    className={`
            absolute w-96 h-[80%] top-[20%] text-white flex flex-col items-start p-4 gap-8 font-genwanmin font-bold
            transition-all duration-300 ease-in-out
            ${isNearby ? 'pl-8' : ''}
            ${isInMenu || isMobileMenuOpen ? 'pl-16' : ''}
          `}
                >
                    <List
                        title="主頁"
                        onClick={() => {
                            setIsMobileMenuOpen(false);
                            router.push('/home');
                        }}
                    />
                    <List
                        title="關於我們"
                        onClick={() => {
                            setIsMobileMenuOpen(false);
                            router.push('/about');
                        }}
                    />
                    <List title="作品與活動" />
                    <List title="地點與交通資訊" />
                    <List
                        title="周邊商品"
                        onClick={() => {
                            setIsMobileMenuOpen(false);
                            router.push('/merch');
                        }}
                    />

                    <div
                        className="h-8 w-24 mt-auto ml-16 mb-16 flex items-center opacity-80 hover:opacity-100 cursor-pointer transition-all duration-150"
                        onClick={() => {
                            setIsMobileMenuOpen(false);
                            window.open('https://www.instagram.com/neo_annotation/', '_blank');
                        }}
                    >
                        <img
                            src="logos/Instagram.svg"
                            className="select-none pointer-events-none"
                            alt="Instagram"
                        />
                    </div>
                </div>
            </div>

            {/* 背景裝飾層 */}
            <div
                className={`
          top-0 left-0 fixed z-[1000] h-dvh bg-main-yellow-400 drop-shadow-[0px_0px_0px] text-main-yellow-500
          transition-all duration-300 ease-in-out
          ${isMobileMenuOpen ? 'drop-shadow-[0px_0px_30px] w-[26rem]' : 'w-0'}
          ${isVisible ? ' lg:w-16 lg:select-auto' : ' lg:w-0 lg:select-none'}
          ${!isMobileMenuOpen && isVisible ? ' lg:peer-hover/nearby:drop-shadow-[0px_0px_20px] lg:peer-hover/nearby:w-28 lg:peer-hover/menu:drop-shadow-[0px_0px_30px] lg:peer-hover/menu:w-[26rem]' : ''}
        `}
            ></div>
        </div>
    );
}
