'use client';

import { useEffect, useRef } from 'react';
import ReactDOMServer from 'react-dom/server';

import './scrollBar.css';

export function ScrollBar({
    items = [],
    time = '20s',
    easeType = 'linear',
    isMasked = false,
    className = '',
    itemClassName = '',
}) {
    const scrollRef = useRef(null);

    const generateScrollContent = () => {
        if (!scrollRef.current) return;

        // 清空已有的滾動內容
        while (scrollRef.current.firstChild) {
            scrollRef.current.removeChild(scrollRef.current.firstChild);
        }

        // 建立一個隱藏的測量容器來測量整組的寬度
        const testContainer = document.createElement('div');
        testContainer.style.visibility = 'hidden';
        testContainer.style.position = 'absolute';
        testContainer.style.display = 'inline-block';
        document.body.appendChild(testContainer);

        const itemsContainer = items.map((item, index) => (
            <div key={index} className={`group/scroll px-4 py-2 cursor-pointer ${itemClassName}`}>{item}</div>
        ));

        // 將所有 `items` 渲染為一組
        const groupHTML = itemsContainer.map((item) => typeof item === 'string' ? item : ReactDOMServer.renderToString(item)).join('');
        testContainer.innerHTML = groupHTML;

        // 測量整組的寬度
        const groupWidth = testContainer.offsetWidth;
        document.body.removeChild(testContainer);

        // 獲取視窗寬度並計算需要的組數
        const pageWidth = window.innerWidth;
        const groupCount = Math.ceil(pageWidth / groupWidth) + 2;

        // 動態生成滾動內容
        const newScrollItems = new Array(groupCount).fill(groupHTML);

        // 添加內容到 DOM
        newScrollItems.forEach((scrollGroupHTML) => {
            const groupDiv = document.createElement('div');
            groupDiv.className = `scroll-group flex`;
            groupDiv.innerHTML = scrollGroupHTML;
            scrollRef.current.appendChild(groupDiv);
        });
    };

    useEffect(() => {
        generateScrollContent();

        const handleResize = () => {
            generateScrollContent();
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [items]);

    return (
        <div
            ref={scrollRef}
            className={`scroll bg-black ${className}`}
            style={{
                '--time': time,
                '--ease': easeType,
            }}
            data-mask={isMasked}
        ></div>
    );
}
