'use client';
import React, { useEffect, useRef, useState } from 'react';

import { ScrollBar } from '@/app/components/scrollBar/scrollBar';

export default function ScrollBarInfo() {
    const items = [
        (
            <div className='flex items-center font-bold text-gray-400 group-hover/scroll:text-gray-200 transition-all duration-500'>
                <span className='text-4xl mb-2 mr-2'>@</span>
                <span className='mt-[2px]'>臺灣當代文化實驗場 C-LAB</span>
            </div>
        ),
        (
            <div className='flex items-center font-bold text-gray-400 group-hover/scroll:text-gray-200 transition-all duration-500'>
                2025/4/18 - 26
            </div>
        ),
        (
            <div className='flex items-center font-bold text-gray-400 group-hover/scroll:text-gray-200 transition-all duration-500'>
                <span className='text-4xl mb-0 mr-2'>#</span>
                <span className='mt-[2px]'>新增註解 neo-annotation</span>
            </div>
        ),
    ];

    return (
        <ScrollBar
            items={items}
            time={'5s'}
            easeType='ease-in-out'
            itemClassName='!px-8 !py-0'
        />
    )
}