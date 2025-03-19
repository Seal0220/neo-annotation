'use client';
import React, { useEffect } from 'react';

export function useTilt(tiltContainerRef, tiltRef, { isBackward = false } = {}) {
  useEffect(() => {
    if (typeof window !== 'undefined' && window.innerWidth < 768) return;
    
    const tiltContainer = tiltContainerRef.current;
    const tilt = tiltRef.current;
    if (!tiltContainer || !tilt) return;

    const handleMouseMove = (e) => {
      const rect = tiltContainer.getBoundingClientRect();
      // 計算滑鼠在 tiltContainer 內的位置
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      // tiltContainer 中心點
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      // 計算相對偏移比例
      const offsetX = (x - centerX) / rect.width;
      const offsetY = (y - centerY) / rect.height;
      // 設定旋轉角度，乘上 30° 可依需求調整
      const rotateX = -offsetY * 30;
      const rotateY = offsetX * 30;
      tilt.style.transform = `${isBackward ? 'translateZ(-10rem)' : ''} rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    };

    const handleMouseLeave = () => {
      tilt.style.transform = 'rotateX(0deg) rotateY(0deg)';
    };

    tiltContainer.addEventListener('mousemove', handleMouseMove, { passive: true });
    tiltContainer.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      tiltContainer.removeEventListener('mousemove', handleMouseMove);
      tiltContainer.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [tiltContainerRef, tiltRef]);
}


/**
 * 讓 tiltRefs 裡的每個元素，都獨立以「自己的中心點」面向滑鼠位置。
 * @param {React.RefObject} containerRef - 包住這些元素的容器
 * @param {Array<React.RefObject>} tiltRefs - 包含多個要傾斜的元素 refs
 * @param {Object} options - 其他設定，如 { maxAngle = 30 } 表示最大旋轉角度
 */
export function useTiltGroup(containerRef, tiltRefs, { maxAngle = 30 } = {}) {
  useEffect(() => {
    if (typeof window !== 'undefined' && window.innerWidth < 768) return;

    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e) => {
      tiltRefs.forEach((ref) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const itemCenterX = rect.left + rect.width / 2;
        const itemCenterY = rect.top + rect.height / 2;

        const dx = e.clientX - itemCenterX;
        const dy = e.clientY - itemCenterY;

        const percentX = dx / rect.width;
        const percentY = dy / rect.height;
        const rotateX = -percentY * maxAngle;
        const rotateY = percentX * maxAngle;

        ref.current.style.transform = `perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        ref.current.style.transformOrigin = 'center center';
      });
    };

    const handleMouseLeave = () => {
      tiltRefs.forEach((ref) => {
        if (ref.current) {
          ref.current.style.transform = 'perspective(600px) rotateX(0deg) rotateY(0deg)';
        }
      });
    };

    container.addEventListener('mousemove', handleMouseMove, { passive: true });
    container.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [containerRef, tiltRefs, maxAngle]);
}