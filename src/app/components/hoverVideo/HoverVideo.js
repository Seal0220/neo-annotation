import { useRef } from 'react';

export default function HoverVideo({ ref, src = '', className = '' }) {
    const videoRef = useRef(null);

    const handleMouseEnter = () => {
        if (videoRef.current) {
            videoRef.current.currentTime = 0.5;
            videoRef.current.play();
        }
    };

    const handleMouseLeave = () => {
        if (videoRef.current) {
            videoRef.current.pause();
            videoRef.current.currentTime = 0;
        }
    };

    return (
        <div
            ref={ref}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className={className}
        >
            <video
                ref={videoRef}
                className='h-full w-full min-h-full min-w-full select-none pointer-events-none object-cover'
                muted
                loop
                playsInline
                preload='metadata'
            >
                <source src={src} />
                Your browser does not support the video tag.
            </video>
        </div>
    );
}
