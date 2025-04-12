'use client';

import React, { useState } from 'react';

export default function ImageCarousel({ images = [] }) {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageClick = (img) => {
    setSelectedImage(img);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  return (
    <div className="w-full">
      {/* 這個容器可以水平捲動 (horizontal scroll) */}
      <div className="flex overflow-x-auto space-x-4">
        {images.map((imgSrc, idx) => (
          <div key={idx} className="flex-none w-48">
            <img
              src={imgSrc}
              alt=""
              className="cursor-pointer w-full h-auto object-cover rounded-md"
              onClick={() => handleImageClick(imgSrc)}
            />
          </div>
        ))}
      </div>

      {/* 如果有被選中的圖片，就顯示「放大彈窗」 */}
      {selectedImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80">
          {/* 關閉按鈕 */}
          <button
            onClick={closeModal}
            className="absolute top-4 right-4 text-white text-2xl"
          >
            &times;
          </button>

          {/* 放大圖片 (max-w-full & max-h-full 確保不超出視窗) */}
          <img
            src={selectedImage}
            alt=""
            className="max-w-full max-h-full object-contain"
          />
        </div>
      )}
    </div>
  );
}
