'use client';
import { useEffect, useState } from 'react';

export default function PagesRoot({ children }) {
    return (
        <div className='h-auto w-dvw'>
            <div className='fixed w-16 h-lvh bg-black'>123</div>
            {children}
        </div>
    );
}
