import { useState, useRef, useEffect } from 'react';
import useElementMetrics, { getElementMetrics } from './useElementMetrics';

export default function useAnimator(animatorRef) {
  const metrics = useElementMetrics(animatorRef);
  const animations = useRef([]);
  const lastScrollY = useRef(0);
  const [isStart, setIsStart] = useState(false);
  const isDebug = useRef(false);

  let animationFrameId = null;

  useEffect(() => {
    if (metrics.isDone && isStart) {
      run();
    }
  }, [metrics, isStart]);

  class Animation {
    constructor(ref) {
      this.ref = ref;
      this.actions = [];
      this.vars = {};
      this.ele = null;
    }
    // before 回調：在 progress 小於 on 時執行
    before({ on }, action) {
      this.actions.push({ type: 'before', on, action });
      return this;
    }
    // when 回調：在 progress 介於 on 與 to 之間執行
    when({ on, to }, action) {
      this.actions.push({ type: 'when', on, to, action });
      return this;
    }
    // after 回調：在 progress 大於等於 on 時執行
    after({ on }, action) {
      this.actions.push({ type: 'after', on, action });
      return this;
    }
    // always 回調：每一幀都執行
    always(action) {
      this.actions.push({ type: 'always', action });
      return this;
    }
    // 將 progress 傳入，執行各個回調，並把內部變數傳入
    apply(progress) {
      if (!this.ref.current) return;
        
      this.ele = this.ref.current;
      this.ele.metrics = getElementMetrics(this.ele);
      this.actions.forEach(({ type, on, to, action }) => {
        if (type === 'before' && progress < on) {
          action(this.ele, this.vars, { progress });
        } else if (type === 'when' && progress >= on && progress < to) {
          const innerProgress = (progress - on) / (to - on);
          const innerHeight = to - on;
          action(this.ele, this.vars, { progress, innerProgress, innerHeight });
        } else if (type === 'after' && progress >= on) {
          action(this.ele, this.vars, { progress });
        } else if (type === 'always') {
          action(this.ele, this.vars, { progress });
        }
      });
    }
  }

  const useAnimation = (ref) => {
    const animationInstance = new Animation(ref);
    animations.current.push(animationInstance);
    return animationInstance;
  };

  const updateScroll = () => {
    const progress = (window.scrollY - (metrics.top || 0)) / window.outerHeight;
    if (window.scrollY !== lastScrollY.current) {
      if (isDebug.current) {
        console.log(`animation scroll: ${progress}`);
      }
      lastScrollY.current = window.scrollY;
      animations.current.forEach((anim) => anim.apply(progress));
    }
    animationFrameId = requestAnimationFrame(updateScroll);
  };

  const run = () => {
    if (!animationFrameId) {
      animationFrameId = requestAnimationFrame(updateScroll);
    }
  };

  const start = () => {
    setIsStart(true);
  };

  const stop = () => {
    if (animationFrameId) {
      cancelAnimationFrame(animationFrameId);
      animationFrameId = null;
    }
  };

  const debug = () => {
    isDebug.current = true;
  };

  return { useAnimation, start, stop, debug, metrics };
}
