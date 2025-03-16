'use client';
import React, { useEffect } from 'react';

export default function useTilt(tiltContainerRef, tiltRef, { isBackward = false } = {}) {
    useEffect(() => {
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