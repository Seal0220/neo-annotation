'use client';
import React from 'react';
import { useRouter } from 'next/navigation';

export default function MoreInfoBtn({ text = '資訊', to = '', width = '', color = 'white' }) {
    const router = useRouter();

    const getColorClasses = () => {
        switch (color) {
            case 'black':
                return 'bg-black text-white fill-white hover:bg-main-yellow-300 hover:text-black hover:fill-black';
            case 'yellow':
                return 'bg-main-yellow-400 text-black fill-black hover:bg-main-yellow-300';
            case 'white':
            default:
                return 'bg-white text-black fill-black hover:bg-main-yellow-300';
        }
    };

    return (
        <div
            className={`${width || 'w-fit'} ${getColorClasses()} px-6 py-3 text-lg font-semibold rounded-full cursor-pointer select-none transition-all duration-300 flex items-center gap-1`}
            onClick={() => {
                if (to) {
                    router.push(to);
                }
            }}
        >
            {/* 文字 */}
            <span className=' font-light'>更多</span>
            <span className=' font-semibold'>{text}</span>
            <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 16 16'
                className='size-3 mt-[3px] ml-2'
            >
                <path d='M14.87,6.95c.11,.21,.16,.53,.16,.95s-.05,.75-.16,.95c-.11,.21-.29,.38-.55,.52L2.12,15.66c-.21,.1-.38,.16-.52,.16-.21,0-.41-.09-.59-.28s-.39-.5-.61-.94c-.27-.54-.41-.97-.41-1.3,0-.35,.19-.63,.56-.83L9.7,7.91,.56,3.34c-.38-.2-.56-.47-.56-.83,0-.32,.14-.75,.41-1.3,.22-.44,.42-.75,.61-.94s.39-.28,.59-.28c.14,0,.31,.05,.52,.16L14.31,6.44c.26,.14,.45,.31,.55,.52Z' />
            </svg>
        </div>
    );
}
