import React, { useRef, useState, useEffect } from 'react';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import 'react-photo-view/dist/react-photo-view.css';

export default function ImageGallery({ images = [], scrollLength = 300 }) {
  const containerRef = useRef(null); // 滾動容器的引用
  const [isScrollable, setIsScrollable] = useState(false); // 控制按鈕顯示

  // 檢查內容是否需要水平滾動
  useEffect(() => {
    const checkScrollable = () => {
      if (containerRef.current) {
        setIsScrollable(
          containerRef.current.scrollWidth > containerRef.current.clientWidth
        );
      }
    };

    checkScrollable(); // 初始檢查
    window.addEventListener('resize', checkScrollable); // 窗口大小變化時重新檢查
    return () => window.removeEventListener('resize', checkScrollable);
  }, [images]);

  const scrollLeft = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({
        left: -scrollLength,
        behavior: 'smooth',
      });
    }
  };

  const scrollRight = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({
        left: scrollLength,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className='relative w-fit'>
      {/* 左按鈕 */}
      {isScrollable && (
        <button
          onClick={scrollLeft}
          className='absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black bg-opacity-50 text-white p-2 rounded-r hover:bg-opacity-70 transition'
        >
          &#9664;
        </button>
      )}

      {/* 圖片容器 */}
      <div
        ref={containerRef}
        className='flex w-fit space-x-4 overflow-x-auto scrollbar-hide'
        style={{ scrollBehavior: 'smooth' }}
      >
        <PhotoProvider>
          {images.map((src, index) => (
            <PhotoView key={index} src={src}>
              <img
                src={src}
                alt={`Image ${index}`}
                className='w-32 h-32 object-cover cursor-pointer rounded-md'
              />
            </PhotoView>
          ))}
        </PhotoProvider>
      </div>

      {/* 右按鈕 */}
      {isScrollable && (
        <button
          onClick={scrollRight}
          className='absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black bg-opacity-50 text-white p-2 rounded-l hover:bg-opacity-70 transition'
        >
          &#9654;
        </button>
      )}
    </div>
  );
}
