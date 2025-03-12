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
  // 用來記錄內容是否已生成，避免重複生成導致滾動時重置
  const contentGenerated = useRef(false);

  const generateScrollContent = () => {
    if (!scrollRef.current) return;
    // 如果內容已生成則不再重新生成
    if (contentGenerated.current) return;

    // 清空 scrollRef 中原有的內容
    while (scrollRef.current.firstChild) {
      scrollRef.current.removeChild(scrollRef.current.firstChild);
    }

    // 建立一個隱藏的測量容器來測量整組內容的寬度
    const testContainer = document.createElement('div');
    testContainer.style.visibility = 'hidden';
    testContainer.style.position = 'absolute';
    testContainer.style.display = 'inline-block';
    document.body.appendChild(testContainer);

    // 將 items 渲染成一組 HTML
    const itemsContainer = items.map((item, index) => (
      <div key={index} className={`group/scroll px-4 py-2 cursor-pointer ${itemClassName}`}>
        {item}
      </div>
    ));

    // 將所有 items 轉換成 HTML 字串
    const groupHTML = itemsContainer
      .map((item) => (typeof item === 'string' ? item : ReactDOMServer.renderToString(item)))
      .join('');
    testContainer.innerHTML = groupHTML;

    // 測量整組內容的寬度
    const groupWidth = testContainer.offsetWidth;
    document.body.removeChild(testContainer);

    // 取得視窗寬度並計算需要的組數 (多加幾組以免滾動時出現空隙)
    const pageWidth = window.innerWidth;
    const groupCount = Math.ceil(pageWidth / groupWidth) + 2;

    // 產生多組滾動內容
    const newScrollItems = new Array(groupCount).fill(groupHTML);

    newScrollItems.forEach((scrollGroupHTML) => {
      const groupDiv = document.createElement('div');
      groupDiv.className = `scroll-group flex`;
      groupDiv.innerHTML = scrollGroupHTML;
      scrollRef.current.appendChild(groupDiv);
    });

    // 標記內容已生成
    contentGenerated.current = true;
  };

  useEffect(() => {
    // 初次 mount 時生成內容
    generateScrollContent();

    const handleResize = () => {
      // 當視窗尺寸變化時，重置生成標記並重新生成內容
      contentGenerated.current = false;
      generateScrollContent();
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []); // 此處依賴陣列為空，確保內容不會因父層 re-render 而重置

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
