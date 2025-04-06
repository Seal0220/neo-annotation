'use client';
import React, { useState, useEffect } from 'react';

const symbols = [
    'symbols/symbol-Hashtag.png',
    'symbols/symbol-Slash.png',
    'symbols/symbol-Star.png'
];

export default function List({ title = '', onClick = () => { } }) {
    const [currentSymbol, setCurrentSymbol] = useState(symbols[0]);

    useEffect(() => {
        let timeoutId;

        const changeSymbol = () => {
            const randomIndex = Math.floor(Math.random() * symbols.length);
            setCurrentSymbol(symbols[randomIndex]);

            const randomDelay = 300 + Math.floor(Math.random() * 500);
            timeoutId = setTimeout(changeSymbol, randomDelay);
        };

        const initialDelay = 300 + Math.floor(Math.random() * 500);
        timeoutId = setTimeout(changeSymbol, initialDelay);

        return () => clearTimeout(timeoutId);
    }, []);

    return (
        <div className='group/list flex flex-row items-center w-64 cursor-pointer' onClick={onClick}>
            <img src={currentSymbol} className='size-8 object-contain pointer-events-none select-none' alt="Symbol" />
            <div className='ml-8 mt-4 select-none text-neutral-300 group-hover/list:text-white transition-all duration-150'>{title}</div>
        </div>
    );
}
