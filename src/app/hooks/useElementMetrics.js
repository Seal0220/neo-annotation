'use client';
import { useState, useEffect, useRef } from 'react';
import { throttle } from 'lodash';
import { convertTransformRotation } from '../functions/utils';

const _metrics = {
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  scrollTop: 0,
  scrollBottom: 0,
  scrollLeft: 0,
  scrollRight: 0,
  height: 0,
  width: 0,
  rotation: 0,
  zIndex: 0,
  isDone: false,
  isInViewport: false,
  touchesTop: false,
  touchesBottom: false,
  touchesLeft: false,
  touchesRight: false,
};

export function getElementMetrics(element) {
  if (!element) return _metrics;
  const rect = element.getBoundingClientRect();
  const computed = window.getComputedStyle(element)

  // 是否在 viewport 內：若元素至少有一部分顯示在 viewport 內則為 true
  const isInViewport =
    rect.bottom > 0 &&
    rect.right > 0 &&
    rect.top < document.documentElement.clientHeight &&
    rect.left < document.documentElement.clientWidth;

  // 檢查四個方向是否碰邊或超過視窗
  const touchesTop = rect.top <= 0;
  const touchesLeft = rect.left <= 0;
  const touchesRight = rect.right >= document.documentElement.clientWidth;
  const touchesBottom = rect.bottom >= document.documentElement.clientHeight;

  return {
    top: rect.top + window.scrollY,
    bottom: rect.bottom + window.scrollY,
    left: rect.left + window.scrollX,
    right: rect.right + window.scrollX,
    scrollTop: rect.top,
    scrollBottom: rect.bottom,
    scrollLeft: rect.left,
    scrollRight: rect.right,
    height: rect.height,
    width: rect.width,
    rotation: convertTransformRotation(computed.transform) || 0,
    zIndex: parseInt(computed.zIndex, 10) || 0,
    isDone: true,
    isInViewport,
    touchesTop,
    touchesBottom,
    touchesLeft,
    touchesRight,
  };
}


export default function useElementMetrics(ref) {
  const [metrics, setMetrics] = useState(_metrics);

  useEffect(() => {
    if (!ref.current) return;

    const updateMetrics = () => {
      if (!ref.current) return;
      const newMetrics = getElementMetrics(ref.current);
      if (newMetrics) {
        setMetrics(newMetrics);
      }
    };

    const throttledUpdateMetrics = throttle(updateMetrics, 500);

    // 初始先更新一次
    updateMetrics();

    window.addEventListener('scroll', throttledUpdateMetrics);
    window.addEventListener('resize', throttledUpdateMetrics);

    return () => {
      window.removeEventListener('scroll', throttledUpdateMetrics);
      window.removeEventListener('resize', throttledUpdateMetrics);
      throttledUpdateMetrics.cancel();
    };
  }, [ref]);

  return metrics;
}