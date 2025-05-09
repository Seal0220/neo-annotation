'use client';
import React from 'react';
import ArrowBtn from '../arrowBtn/ArrowBtn';

export default function MoreInfoBtn({ text = '資訊', to = '', _blank = false, width = '', color = 'white', className = '' }) {
    return (
        <ArrowBtn
            text={(
                <>
                    <span className='font-light'>更多</span>
                    <span className='ml-2 font-semibold'>{text}</span>
                </>
            )}
            to={to}
            _blank={_blank}
            width={width}
            color={color}
            className={className}
        />
    );
}
