'use client';
import React from 'react';

export default async function WorkPage({ params }) {
    const { index } = params; // 取得 URL 中的 index 參數
    // const work = await getWorkByIndex(Number(index));
  
    return (
      <div className="p-8">
        <h1 className="text-4xl font-bold">{index}</h1>
      </div>
    );
  }