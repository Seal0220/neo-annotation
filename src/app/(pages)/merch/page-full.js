'use client';
import React, { useEffect, useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { useTiltGroup } from '@/app/hooks/useTilt';

import { submitOrder } from '@/app/functions/fetch/submitOrder';
import HoverVideo from '@/app/components/hoverVideo/HoverVideo';


export default function Merch() {
    const symbolHtml1Ref = useRef(null);
    const symbolHashtag1Ref = useRef(null);
    const symbolStar1Ref = useRef(null);
    const symbolVerticalLine1Ref = useRef(null);
    const logotypeH1Ref = useRef(null);

    const tiltContainerRef = useRef(null);
    const tilt1Ref = useRef(null);
    const tilt2Ref = useRef(null);
    const tilt3Ref = useRef(null);
    const tilt4Ref = useRef(null);
    const tilt5Ref = useRef(null);
    const tilt6Ref = useRef(null);
    useTiltGroup(tiltContainerRef, [tilt1Ref, tilt2Ref, tilt3Ref, tilt4Ref, tilt5Ref, tilt6Ref], { maxAngle: 7.5 });


    return (
        <div className='h-[100lvh]'>
            <div className='fixed -z-50'>
                <div className='fixed top-0 left-0 w-full h-full bg-yellow-300 -z-50'></div>
                <div className='fixed box-border w-full h-full p-20 -z-50'>
                    <div className='w-full h-full bg-paper -z-50 flex items-center justify-center overflow-hidden'>
                        <img
                            src='merch/BgCard/bgCard-Text-large.png'
                            className='h-[90%] w-auto object-cover select-none pointer-events-none'
                        />
                        <img
                            src='merch/BgCard/bgCard-Head.png'
                            className='absolute  w-auto object-cover select-none pointer-events-none'
                        />
                    </div>
                </div>

                <div className='fixed top-0 left-0 h-full w-full -z-40'>
                    <img
                        ref={symbolHtml1Ref}
                        src='symbols/symbol-HTML.png'
                        className='absolute -z-40 top-0 left-0 -translate-x-0 -translate-y-0 h-[100lvh] w-auto min-w-[70vw] object-contain select-none pointer-events-none transition-all duration-1000 ease-out'
                    />
                    <img
                        ref={symbolHashtag1Ref}
                        src='symbols/symbol-Hashtag.png'
                        className='absolute -z-40 top-0 right-0 -translate-x-[0] -translate-y-[50vh] -rotate-[0] h-[100lvh] w-auto min-w-[70vw] max-h-none max-w-none object-contain select-none pointer-events-none transition-all duration-1000 ease-out'
                    />
                    <img
                        ref={symbolStar1Ref}
                        src='symbols/symbol-Star.png'
                        className='absolute -z-40 top-0 left-0 -translate-x-[0] translate-y-[0] -rotate-[0] h-[100lvh] w-auto max-h-none object-contain select-none pointer-events-none transition-all duration-1000 ease-out'
                    />
                    <img
                        ref={symbolVerticalLine1Ref}
                        src='symbols/symbol-VerticalLine.png'
                        className='absolute -z-40 top-0 left-0 translate-x-[0] translate-y-[0] rotate-[0] h-[100lvh] w-auto max-h-none object-contain select-none pointer-events-none transition-all duration-1000 ease-out'
                    />
                    {/* <img
                    ref={logotypeH1Ref}
                    src='logotypes/logotype-horizontal.png'
                    className='absolute -z-40 top-0 left-0 translate-x-[0] translate-y-[0] -rotate-[0] h-[60lvh] w-auto max-w-none min-h-[512px] object-contain select-none pointer-events-none transition-all duration-1000 ease-out'
                /> */}
                </div>
            </div>

            <div className='fixed top-0 left-0 h-full w-full z-0'>
                <div className='absolute h-full w-full flex items-center justify-center'>
                    <div ref={tiltContainerRef} className='perspective-container grid grid-cols-3 grid-rows-2 gap-8 drop-shadow-spread text-black-1/2'>


                        <div ref={tilt1Ref} className='perspective-3d transition-all duration-300 ease-out will-change-[all]'>
                            <div className='w-auto max-h-none border-[20px] border-yellow-400 h-[25lvh] transition-all duration-1000 ease-in-out hover:scale-110 cursor-pointer'>
                                <HoverVideo
                                    src='merch/01_Keycap/Mov/Simple_Keycap.webm'
                                    className='h-full w-auto brightness-125 z-0 top-0 left-0 -translate-x-[0] translate-y-[0] -rotate-[0] object-contain select-none transition-all duration-1000 ease-out'
                                />
                            </div>
                        </div>



                        <div ref={tilt2Ref} className='perspective-3d transition-all duration-300 ease-out'>
                            <div className='w-auto max-h-none border-[20px] border-yellow-400 h-[25lvh] transition-all duration-1000 ease-in-out hover:scale-110 cursor-pointer'>
                                <HoverVideo
                                    src='merch/02_LabelPrinter/Mov/Simple_LabelMachine.webm'
                                    className='h-full w-auto brightness-125 z-0 top-0 left-0 -translate-x-[0] translate-y-[0] -rotate-[0] object-contain select-none transition-all duration-1000 ease-out'
                                />
                            </div>
                        </div>
                        <div ref={tilt3Ref} className='perspective-3d transition-all duration-300 ease-out'>
                            <div className='w-auto max-h-none border-[20px] border-yellow-400 h-[25lvh] transition-all duration-1000 ease-in-out hover:scale-110 cursor-pointer'>
                                <HoverVideo
                                    src='merch/03_Lighter/Mov/Simple_Lighter.webm'
                                    className='h-full w-auto brightness-125 z-0 top-0 left-0 -translate-x-[0] translate-y-[0] -rotate-[0] object-contain select-none transition-all duration-1000 ease-out'
                                />
                            </div>
                        </div>
                        <div ref={tilt4Ref} className='perspective-3d transition-all duration-300 ease-out'>
                            <div className='w-auto max-h-none border-[20px] border-yellow-400 h-[25lvh] transition-all duration-1000 ease-in-out hover:scale-110 cursor-pointer'>
                                <HoverVideo
                                    src='merch/04_USB/Mov/Simple_USB.webm'
                                    className='h-full w-auto brightness-125 z-0 top-0 left-0 -translate-x-[0] translate-y-[0] -rotate-[0] object-contain select-none transition-all duration-1000 ease-out'
                                />
                            </div>
                        </div>
                        <div ref={tilt5Ref} className='perspective-3d transition-all duration-300 ease-out'>
                            <div className='w-auto max-h-none border-[20px] border-yellow-400 h-[25lvh] transition-all duration-1000 ease-in-out hover:scale-110 cursor-pointer'>
                                <HoverVideo
                                    src='merch/05_Sticker/Mov/Simple_Sticker.webm'
                                    className='h-full w-auto brightness-125 z-0 top-0 left-0 -translate-x-[0] translate-y-[0] -rotate-[0] object-contain select-none transition-all duration-1000 ease-out'
                                />
                            </div>
                        </div>
                        <div ref={tilt6Ref} className='perspective-3d transition-all duration-300 ease-out'>
                            <div className='w-auto max-h-none border-[20px] border-yellow-400 h-[25lvh] transition-all duration-1000 ease-in-out hover:scale-110 cursor-pointer'>
                                <img
                                    src='merch/06_Poster/poster-1.png'
                                    className='bg-paper-dark h-full w-full brightness-125 z-0 top-0 left-0 -translate-x-[0] translate-y-[0] -rotate-[0] object-contain select-none transition-all duration-1000 ease-out'
                                />
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

function Order() {
    // 1. 8 種商品定義（id 與顯示名稱）
    const initialProducts = [
        { id: "1", label: "商品1" },
        { id: "2", label: "商品2" },
        { id: "3", label: "商品3" },
        { id: "4", label: "商品4" },
        { id: "5", label: "商品5" },
        { id: "6", label: "商品6" },
        { id: "A", label: "商品A" },
        { id: "B", label: "商品B" },
    ];

    const [products, setProducts] = useState(
        initialProducts.map((p) => ({ ...p, qty: 0 }))
    );

    const [shippingMethod, setShippingMethod] = useState(""); // 7-11 or 現場取貨
    const [note, setNote] = useState("");
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [bankLast5, setBankLast5] = useState("");

    const resetForm = () => {
        setProducts(initialProducts.map((p) => ({ ...p, qty: 0 })));
        setShippingMethod("");
        setNote("");
        setName("");
        setPhone("");
        setEmail("");
        setBankLast5("");
    }

    const generateOrderId = () => {
        const now = new Date();
        const yyyy = now.getFullYear();
        const mm = String(now.getMonth() + 1).padStart(2, "0");
        const dd = String(now.getDate()).padStart(2, "0");
        const hh = String(now.getHours()).padStart(2, "0");
        const min = String(now.getMinutes()).padStart(2, "0");
        const ss = String(now.getSeconds()).padStart(2, "0");
        return `${yyyy}${mm}${dd}-${hh}${min}${ss}-${uuidv4()}`;
    };

    const handleQtyChange = (id, newQty) => {
        setProducts((prev) =>
            prev.map((p) => (p.id === id ? { ...p, qty: newQty } : p))
        );
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!shippingMethod) {
            alert("請選擇取貨方式！");
            return;
        }

        const orderId = generateOrderId();
        const payload = {
            orderId,
            shippingMethod,
            note,
            name,
            phone,
            email,
            bankLast5,
            items:
                products
                    .filter((p) => p.qty > 0)
                    .map((p) => ({ id: p.id, qty: p.qty })),
        };

        // 若全部商品數量都是 0，給予提示
        if (payload.items.length === 0) {
            alert("請至少選擇一項商品數量！");
            return;
        }

        await submitOrder({ payload, orderId, shippingMethod, onDone: resetForm });
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
            <div className="bg-white p-6 rounded shadow-md w-full max-w-xl">
                <h1 className="text-2xl font-bold mb-4 text-center">商品訂購</h1>
                <form onSubmit={handleSubmit}>
                    {/* 商品列表 */}
                    <div className="mb-4">
                        <p className="font-semibold mb-2">商品數量：</p>
                        {products.map((p) => (
                            <div key={p.id} className="flex items-center mb-2">
                                <label className="w-24">{p.label}</label>
                                <input
                                    type="number"
                                    min="0"
                                    value={p.qty}
                                    onChange={(e) => handleQtyChange(p.id, Number(e.target.value))}
                                    className="w-20 border border-gray-300 rounded p-1"
                                />
                                <span className="ml-2">個</span>
                            </div>
                        ))}
                    </div>

                    {/* 取貨方式 */}
                    <div className="mb-4">
                        <p className="font-semibold mb-2">取貨方式：</p>
                        <label className="mr-4">
                            <input
                                type="radio"
                                name="shippingMethod"
                                value="7-11"
                                checked={shippingMethod === "7-11"}
                                onChange={(e) => setShippingMethod(e.target.value)}
                            />
                            <span className="ml-2">7-11 賣貨便</span>
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="shippingMethod"
                                value="現場取貨"
                                checked={shippingMethod === "現場取貨"}
                                onChange={(e) => setShippingMethod(e.target.value)}
                            />
                            <span className="ml-2">現場取貨</span>
                        </label>
                    </div>

                    {/* 訂單備註 */}
                    <div className="mb-4">
                        <label className="block font-semibold mb-2">訂單備註：</label>
                        <textarea
                            value={note}
                            onChange={(e) => setNote(e.target.value)}
                            className="w-full border border-gray-300 rounded p-2"
                            rows={2}
                            placeholder="若有其他需求，可在此備註"
                        />
                    </div>

                    {/* 使用者資訊（若只在現場取貨時需要，也可自行控制顯示） */}
                    <div className="mb-4">
                        <label className="block font-semibold mb-1">姓名：</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full border border-gray-300 rounded p-2 mb-2"
                        />

                        <label className="block font-semibold mb-1">電話：</label>
                        <input
                            type="text"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="w-full border border-gray-300 rounded p-2 mb-2"
                        />

                        <label className="block font-semibold mb-1">信箱：</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full border border-gray-300 rounded p-2 mb-2"
                        />

                        <label className="block font-semibold mb-1">轉帳末五碼：</label>
                        <input
                            type="text"
                            value={bankLast5}
                            onChange={(e) => setBankLast5(e.target.value)}
                            className="w-full border border-gray-300 rounded p-2"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full mt-4 bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                    >
                        送出訂單
                    </button>
                </form>
            </div>
        </div>
    );
}