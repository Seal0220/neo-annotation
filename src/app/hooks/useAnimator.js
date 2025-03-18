'use client';
import { useState, useRef, useEffect } from 'react';
import useElementMetrics, { getElementMetrics } from './useElementMetrics';

export default function useAnimator(animatorRef) {
    const metrics = useElementMetrics(animatorRef);
    const animations = useRef([]);
    const lastScrollY = useRef(0);
    const lastUpdateTime = useRef(0);
    const isDebug = useRef(false);
    const [isStart, setIsStart] = useState(false);
    const [updateInterval, setUpdateInterval] = useState(200);

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
            this.ele = {};
        }
        setVar(key, value) {
            this.vars[key] = value;
            return this;
        }
        setVars(vars = {}) {
            this.vars = {...this.vars, ...vars}
            return this;
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
        // 將 progress 傳入，執行各個回調，且不主動儲存 metrics
        apply(progress) {
            if (!this.ref.current) return;
            this.ele = this.ref.current;
            // 如果尚未定義 metrics 屬性，定義一個 getter，只有當外部讀取時才計算
            if (!this.ele.hasOwnProperty('metrics')) {
                Object.defineProperty(this.ele, 'metrics', {
                    get() {
                        return getElementMetrics(this);
                    },
                    configurable: true,
                });
            }

            this.actions.forEach(({ type, on, to, action }) => {
                if (type === 'before' && progress < on) {
                    const innerProgress = (on - progress) / on;
                    action(this.ele, this.vars, { progress, innerProgress });
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
        // if (window.scrollY !== lastScrollY.current) {
        const now = Date.now();
        if (now - lastUpdateTime.current >= updateInterval) {
            if (isDebug.current) {
                console.log(`animation scroll: ${progress.toFixed(2)}`);
            }
            lastScrollY.current = window.scrollY;
            lastUpdateTime.current = now;
            animations.current.forEach((anim) => anim.apply(progress));
        }
        // }
        animationFrameId = requestAnimationFrame(updateScroll);
    };

    const run = () => {
        if (!animationFrameId) {
            updateScroll();
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

    return { useAnimation, setUpdateInterval, start, stop, debug, metrics };
}
