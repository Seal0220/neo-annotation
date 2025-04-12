'use client';
import React, { useEffect, useRef, useState } from 'react';

import { ScrollBar } from '@/app/components/scrollBar/scrollBar';

export default function ScrollBarInfo() {
    const items = [
        (
            <div className='flex h-full items-center font-bold opacity-70 group-hover/scroll:opacity-100 select-none transition-all duration-500 '>
                <img
                    src='/info/info-location_clab-w.png'
                    className='h-12'
                />
            </div>
        ),
        (
            <div className='flex h-full items-center font-bold opacity-70 group-hover/scroll:opacity-100 select-none transition-all duration-500 '>
                <img
                    src='/info/info-date_year-w.png'
                    className='h-8'
                />
                <img
                    src='/info/info-date_datetime-w.png'
                    className='h-8'
                />
            </div>
        ),
        (
            <div className='flex h-full items-center font-bold text-white opacity-70 group-hover/scroll:opacity-100 select-none transition-all duration-500 '>
                <span className='text-2xl mr-2'>#</span>
                <span className='mt-[4px] font-genwanmin mr-1'>新增註解</span>
                <span className='mt-[4px] font-genwanmin'>neo-annotation</span>
            </div>
        ),
    ];

    return (
        <ScrollBar
            items={items}
            time={'5s'}
            easeType='ease-in-out'
            itemClassName='!px-8 !py-0 h-12'
        />
    )
}

