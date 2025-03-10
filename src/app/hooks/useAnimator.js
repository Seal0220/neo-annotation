import { useState, useRef, useEffect } from 'react';
import useElementMetrics from './useElementMetrics';

export default function useAnimator(animatorRef) {
    const animatorMetrics = useElementMetrics(animatorRef);
    const animations = useRef([]);
    const lastScrollY = useRef(0);
    const [isStart, setIsStart] = useState(false);

    let animationFrameId = null;

    useEffect(() => {
        if (animatorMetrics.isDone && isStart) {
            run();
        }
    }, [animatorMetrics, isStart]);


    const useAnimation = (ref) => {
        const animation = {
            ref,
            actions: [],
            before({ on }, action = { progress, animatorMetrics }) {
                this.actions.push({ type: "before", on, action });
                return this;
            },
            when({ on, to }, action = { progress, animatorMetrics, innerProgress, innerHeight }) {
                this.actions.push({ type: "when", on, to, action });
                return this;
            },
            after({ on }, action = { progress, animatorMetrics }) {
                this.actions.push({ type: "after", on, action });
                return this;
            },
            apply(progress) {
                if (!this.ref.current) return;
                this.actions.forEach(({ type, on, to, action }) => {
                    if (type === "before" && progress < on) {
                        action(this.ref.current, { progress, animatorMetrics });
                    } else if (type === "when" && progress >= on && progress < to) {
                        const innerProgress = (progress - on) / (to - on);
                        const innerHeight = to - on;
                        action(this.ref.current, { progress, animatorMetrics, innerProgress, innerHeight });
                    } else if (type === "after" && progress >= on) {
                        action(this.ref.current, { progress, animatorMetrics });
                    }
                });
            }
        };

        animations.current.push(animation);
        return animation;
    };

    const updateScroll = () => {
        const progress = (window.scrollY - (animatorMetrics.top || 0)) / window.outerHeight;

        if (window.scrollY !== lastScrollY.current) {
            lastScrollY.current = window.scrollY;
            animations.current.forEach(anim => anim.apply(progress));
        }

        animationFrameId = requestAnimationFrame(updateScroll);
    };

    const run = () => {
        if (!animationFrameId) {
            animationFrameId = requestAnimationFrame(updateScroll);
        }
    }

    const start = () => {
        setIsStart(true);
    };

    const stop = () => {
        if (animationFrameId) {
            cancelAnimationFrame(animationFrameId);
            animationFrameId = null;
        }
    };

    return { useAnimation, start, stop };
}
