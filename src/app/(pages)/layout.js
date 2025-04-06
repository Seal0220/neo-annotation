'use client';
import { useEffect, useState } from 'react';
import Menu from '@/app/components/menu/Menu';

export default function PagesRoot({ children }) {
    return (
        <>
            <Menu/>

            <div className='h-auto w-dvw'>

                {children}
            </div>
        </>
    );
}
