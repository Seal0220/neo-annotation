'use client';
import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useRouter } from 'next/navigation';

import { submitOrder } from '@/app/functions/fetch/submitOrder';
import ArrowBtn from '@/app/components/btn/arrowBtn/ArrowBtn';

// 原本的清單，不動
const initialGroupedProducts = [
  {
    groupName: '海報',
    items: [
      { id: 'poster-white', label: '淡藍紫', price: 80, qty: 0 },
      { id: 'poster-blue', label: '深藍', price: 80, qty: 0 },
      { id: 'poster-brown', label: '深灰', price: 80, qty: 0 },
      { id: 'poster-orange', label: '黃', price: 80, qty: 0 },
      { id: 'poster-gray', label: '淺灰', price: 80, qty: 0 },
    ],
  },
  {
    groupName: '鍵帽按鈕',
    items: [
      { id: 'keycap-mirror', label: '鏡面#', price: 280, qty: 0 },
      { id: 'keycap-yellow', label: '黃色/**/', price: 280, qty: 0 },
    ],
  },
  {
    groupName: '雙頭隨身碟',
    items: [
      { id: 'usb-dual', label: '雙頭隨身碟', price: 350, qty: 0 },
    ],
  },
  {
    groupName: '貼紙鑰匙圈',
    items: [
      { id: 'keyring-sticker', label: '貼紙鑰匙圈', price: 150, qty: 0 },
    ],
  },
  {
    groupName: '打火機',
    items: [
      { id: 'lighter', label: '打火機', price: 50, qty: 0 },
    ],
  },
  {
    groupName: '字母標籤機',
    items: [
      { id: 'label-machine', label: '字母標籤機', price: 300, qty: 0 },
    ],
  },
];

export default function Order() {
  const router = useRouter();

  // ❶ 動態庫存 state
  const [stock, setStock] = useState(null);

  // ❷ 商品列表 state（含 qty + 後續加 max）
  const [groupedProducts, setGroupedProducts] = useState(
    initialGroupedProducts
  );

  const [shippingMethod, setShippingMethod] = useState(''); // '7-11' or '自取'
  const [note, setNote] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [ig, setIg] = useState('');
  const [bankLast5, setBankLast5] = useState('');
  const [isPickUp, setIsPickUp] = useState(false);
  const [isSending, setIsSending] = useState(false);

  // ❸ 讀取 /api/stock 並把庫存塞到每個 item.max
  useEffect(() => {
    async function fetchStock() {
      const res = await fetch('/api/stock');
      const data = await res.json();
      setStock(data);

      // id → data 欄位對應
      const map = {
        'poster-white': 'posterWhite',
        'poster-blue': 'posterBlue',
        'poster-brown': 'posterBrown',
        'poster-orange': 'posterYellow',
        'poster-gray': 'posterLightGrey',
        'keycap-mirror': 'keycap',
        'keycap-yellow': 'keycap',
        'keyring-sticker': 'stickerKeychain',
        'usb-dual': 'usbDrive',
        'lighter': 'lighter',
        'label-machine': 'labelPrinter'
      };

      setGroupedProducts(prev =>
        prev.map(group => ({
          ...group,
          items: group.items.map(item => ({
            ...item,
            max: data[map[item.id]] ?? 0
          }))
        }))
      );
    }
    fetchStock();
  }, []);

  // 更新 qty
  const handleQtyChange = (id, v) => {
    setGroupedProducts(prev =>
      prev.map(group => ({
        ...group,
        items: group.items.map(item =>
          item.id === id
            ? { ...item, qty: Math.max(0, Math.min(item.max, v)) }
            : item
        )
      }))
    );
  };

  // 訂單編號
  const generateOrderId = () => {
    const now = new Date();
    const Y = now.getFullYear();
    const M = String(now.getMonth() + 1).padStart(2, '0');
    const D = String(now.getDate()).padStart(2, '0');
    const h = String(now.getHours()).padStart(2, '0');
    const m = String(now.getMinutes()).padStart(2, '0');
    const s = String(now.getSeconds()).padStart(2, '0');
    return `${Y}${M}${D}-${h}${m}${s}-${uuidv4()}`;
  };

  // 總價
  const totalPrice = groupedProducts.reduce(
    (sum, g) => sum + g.items.reduce((sub, it) => sub + it.qty * it.price, 0),
    0
  );

  // 下單
  const handleSubmit = async e => {
    e.preventDefault();
    if (!shippingMethod) {
      alert('請選擇取貨方式！');
      return;
    }
    const items = groupedProducts
      .flatMap(g => g.items)
      .filter(it => it.qty > 0)
      .map(it => ({ id: it.id, qty: it.qty }));
    if (items.length === 0) {
      alert('請至少選擇一項商品數量！');
      return;
    }
    if (!bankLast5.trim() || !ig.trim()) {
      alert('請填寫匯款後末五碼與 IG 帳號！');
      return;
    }

    const payload = {
      orderId: generateOrderId(),
      shippingMethod,
      note,
      name,
      phone,
      email,
      ig,
      bankLast5,
      items
    };

    if (!isSending) {
      setIsSending(true);
      // 1) 送出訂單
      await submitOrder({
        payload,
        onDone: async () => {
          const res2 = await fetch('/api/stock');
          const latest = await res2.json();
          setStock(latest);
          setGroupedProducts(prev =>
            prev.map(group => ({
              ...group,
              items: group.items.map(item => ({
                ...item,
                qty: 0,
                max: latest[Object.keys(latest).find(k => k.toLowerCase().includes(item.id.split('-')[0]))] ?? 0
              }))
            }))
          );

          // 3) 重置表單
          setNote(''); 
          setName(''); 
          setPhone(''); 
          setEmail(''); 
          setIg(''); 
          setBankLast5('');
          setIsSending(false);
        }
      });


    }

  };

  if (!stock) return null;

  return (
    <div className="h-fit min-w-[25lvh] flex items-center justify-center p-4 drop-shadow-spread text-black-1/2">
      <div className="bg-white p-4 box-border py-8 md:p-20 md:box-content w-full max-w-xl text-black">
        <h1 className="text-2xl font-bold mb-4 text-center">
          <span className="bg-main-yellow-400 px-2 w-fit">商品訂購</span>
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
          {/* 取貨方式 */}
          <div className="mb-4">
            <div className="mb-6">
              <p className="font-semibold mb-2 bg-main-yellow-400 px-2 w-fit">
                取貨方式：
              </p>
              <div className="flex flex-row items-center gap-4">
                <label className={`flex items-center p-2 rounded-md cursor-pointer border md:hover:bg-yellow-100 transition-colors duration-200 ${shippingMethod === '7-11'
                  ? 'border-main-yellow-500 bg-yellow-200'
                  : 'border-gray-300'
                  }`}>
                  <input
                    type="radio"
                    name="shippingMethod"
                    value="7-11"
                    checked={shippingMethod === '7-11'}
                    onChange={e => { setShippingMethod(e.target.value); setIsPickUp(false); }}
                    className="form-radio text-main-yellow-400 h-5 w-5 accent-main-yellow-400"
                  />
                  <span className="ml-2">7-11 賣貨便</span>
                </label>
                <label className={`flex items-center p-2 rounded-md cursor-pointer border hover:bg-yellow-100 transition-colors duration-200 ${shippingMethod === '自取'
                  ? 'border-main-yellow-500 bg-yellow-200'
                  : 'border-gray-300'
                  }`}>
                  <input
                    type="radio"
                    name="shippingMethod"
                    value="自取"
                    checked={shippingMethod === '自取'}
                    onChange={e => { setShippingMethod(e.target.value); setIsPickUp(true); }}
                    className="form-radio text-main-yellow-400 h-5 w-5 accent-main-yellow-400"
                  />
                  <span className="ml-2">自取</span>
                </label>
              </div>
            </div>
            <div className="place-self-center text-sm mt-8 mb-6">
              <div>
                <div className="font-bold mb-2">꒰ 7-11賣貨便 ꒱˚</div>
                <div className="ml-2">
                  使用7-11賣貨便下單，出貨時間如下：<br />
                  <ul className="list-disc list-inside">
                    <li>3/31前下單→4/11前出貨</li>
                    <li>4/26前下單→5/9前出貨</li>
                  </ul>
                </div>
              </div>
              <div className="mt-8">
                <div className="font-bold mb-2">꒰ 自取 ꒱˚</div>
                <div className="ml-2">
                  選取喜歡的周邊商品，輸入資料後，請先完成轉帳匯款，並填上您的帳號末五碼，我們會在5個工作天之內寄送 email 給您確認，
                  即購買成功ㄛ！<br />
                  購買成功後，於展覽期間至展場取貨即可☆.
                </div>
              </div>
              <div className="place-self-center h-px w-full bg-neutral-400 mt-6 mb-2" />
              <div className="text-neutral-600">
                ⊹因運送過程中可能導致壓折，手工打凹厚紙海報僅提供展覽自取<br />
                ⊹周邊商品僅限官網購買取得，展覽現場將不販售任何周邊<br />
                ⊹圖片僅供參考<br />
                ⊹數量有限售完為止
              </div>
            </div>
          </div>

          {isPickUp ? (
            <>
              {/* 商品列表 */}
              <div className="mb-4">
                <p className="font-semibold mb-2 bg-main-yellow-400 px-2 w-fit">
                  周邊商品數量：
                </p>
                <div className="flex flex-col gap-4">
                  {groupedProducts.map(group => (
                    <div key={group.groupName} className="relative mb-4 flex flex-col md:flex-row md:items-center">
                      <div className="font-semibold w-fit md:w-20">{group.groupName}</div>
                      <ul className="list-inside md:ml-4">
                        {group.items.map(item => {
                          const subTotal = item.qty * item.price;
                          return (
                            <div key={item.id} className="flex items-center justify-between mb-1">
                              <div className="flex flex-row items-center">
                                <div className="w-[4.5rem] md:w-32">
                                  <li className="text-sm md:text-base">{item.label}</li>
                                </div>
                                <div className="text-sm md:text-base flex items-center">
                                  <span className="mx-2">×</span>
                                  {item.max > 0 ? (
                                    <input
                                      type="number"
                                      min="0"
                                      max={item.max}
                                      value={item.qty}
                                      onChange={e => handleQtyChange(item.id, Number(e.target.value))}
                                      className="w-16 border border-gray-300 rounded p-1"
                                    />
                                  ) : (
                                    <span className="px-2 py-1 bg-gray-200 text-gray-500 rounded">售完</span>
                                  )}
                                  <span className="ml-2">
                                    {item.qty}個 ({item.price}元)
                                  </span>
                                </div>
                              </div>
                              <div className="absolute right-0 md:mr-8 flex items-center">
                                <span>= </span>
                                <span className="ml-2 text-base bg-main-yellow-50 px-2">
                                  {subTotal.toLocaleString('zh-TW')}
                                </span>
                              </div>
                            </div>
                          );
                        })}
                      </ul>
                    </div>
                  ))}
                </div>
                <div className="place-self-center h-px w-full bg-neutral-400 my-6" />
                <div className="font-semibold mr-8 place-self-end">
                  <span className="text-sm">總價：</span>
                  <span className="text-3xl bg-main-yellow-300 px-2">
                    {totalPrice.toLocaleString('zh-TW')}
                  </span>
                  <span className="text-sm ml-2">元</span>
                </div>
              </div>

              {/* 使用者資訊 */}
              <div className="mb-4 flex flex-col gap-2">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="w-full md:w-40">
                    <label className="block font-semibold mb-1 bg-main-yellow-400 px-2 w-fit">姓名：</label>
                    <input
                      required
                      type="text"
                      value={name}
                      onChange={e => setName(e.target.value)}
                      className="w-full border border-gray-300 rounded p-2 mb-2"
                    />
                  </div>
                  <div className="w-full md:w-40">
                    <label className="block font-semibold mb-1 bg-main-yellow-400 px-2 w-fit">電話：</label>
                    <input
                      required
                      type="text"
                      value={phone}
                      onChange={e => setPhone(e.target.value)}
                      className="w-full border border-gray-300 rounded p-2 mb-2"
                    />
                  </div>
                </div>
                <div>
                  <label className="block font-semibold mb-1 bg-main-yellow-400 px-2 w-fit">信箱：</label>
                  <input
                    required
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="w-full border border-gray-300 rounded p-2 mb-2"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1 bg-main-yellow-400 px-2 w-fit">IG帳號：</label>
                  <input
                    required
                    type="text"
                    value={ig}
                    onChange={e => setIg(e.target.value)}
                    className="w-64 border border-gray-300 rounded p-2 mb-2"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1 bg-main-yellow-400 px-2 w-fit">轉帳帳號末5碼：</label>
                  <input
                    required
                    type="text"
                    value={bankLast5}
                    maxLength={5}
                    onChange={e => setBankLast5(e.target.value)}
                    className="w-32 border border-gray-300 rounded p-2 mb-2"
                  />
                </div>
              </div>

              {/* 備註 */}
              <div className="mb-4">
                <label className="block font-semibold mb-2 bg-main-yellow-400 px-2 w-fit">備註：</label>
                <textarea
                  value={note}
                  onChange={e => setNote(e.target.value)}
                  className="w-full border border-gray-300 rounded p-2 text-sm"
                  rows={2}
                  placeholder="若有其他需求，可在此備註"
                />
              </div>

              <button type="submit" className="place-self-center rounded-full size-fit">
                <ArrowBtn text="送出預購" color="black" />
              </button>
            </>
          ) : (
            shippingMethod === '7-11' && (
              <ArrowBtn
                text="前往7-11賣貨便"
                to={process.env.MYSHOP711_LINK}
                color="black"
                className="place-self-center"
              />
            )
          )}
        </form>
      </div>
    </div>
  );
}
