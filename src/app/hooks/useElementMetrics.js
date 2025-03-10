import { useState, useEffect, useRef } from 'react';

export default function useElementMetrics(ref) {
  const [metrics, setMetrics] = useState({
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
    zIndex: 0,
    isDone: false,
  });

  useEffect(() => {
    if (!ref.current) return;

    const updateMetrics = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const zIndex = window.getComputedStyle(ref.current).zIndex || '0';

      setMetrics({
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
        zIndex: parseInt(zIndex, 10) || 0,
        isDone: true,
      });
    };

    updateMetrics();

    window.addEventListener('scroll', updateMetrics);
    window.addEventListener('resize', updateMetrics);

    return () => {
      window.removeEventListener('scroll', updateMetrics);
      window.removeEventListener('resize', updateMetrics);
    };
  }, [ref]);

  return metrics;
}
