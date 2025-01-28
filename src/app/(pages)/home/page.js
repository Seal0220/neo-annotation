'use client';

import { ScrollBar } from '@/app/components/scrollBar/scrollBar';
import { useEffect, useRef, useState } from 'react';

export default function Home() {

  const items = [
    (
      <div className='flex items-center font-bold text-gray-400 group-hover/scroll:text-gray-200 transition-all duration-500'>
        <span className='text-4xl mb-2 mr-2'>@</span>
        <span className='mt-[2px]'>臺灣當代文化實驗場 C-LAB</span>
      </div>
    ),
    (
      <div className='flex items-center font-bold text-gray-400 group-hover/scroll:text-gray-200 transition-all duration-500'>
        114/4/18 - 26
      </div>
    )
  ];


  return (
    <div className="items-center justify-items-center min-h-screen bg-neutral-500">

      <ScrollBar
        items={items}
        time={'5s'}
        // easeType='ease-in-out'
        itemClassName='!px-8 !py-0'
      />

      <footer className="flex gap-6 flex-wrap items-center justify-center bg-yellow-500">
        FOOTER
      </footer>
    </div>
  );
}
