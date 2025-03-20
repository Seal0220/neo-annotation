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
            videoRef.current.load();
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
                className='bg-paper-dark h-full w-full min-h-full min-w-full select-none pointer-events-none object-cover'
                muted
                loop
                playsInline
                preload='metadata'
                poster={`${src}-poster.png`}
            >
                <source src={`${src}.webm`} type="video/webm"/>
                <source src={`${src}.mp4`} type="video/mp4"/>
                Your browser does not support the video tag.
            </video>
        </div>
    );
}
