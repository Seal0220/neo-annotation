// utils/submitOrder.js
/**
 * 提交訂單並同步更新本地庫存
 * @param {Object}   params
 * @param {Object}   params.payload          要送往 Apps Script 的資料物件（內含 items）
 * @param {string}   params.orderId          訂單編號
 * @param {string}   params.shippingMethod   '7-11' | 'pickup'
 * @param {Function} params.onDone           成功後呼叫（用來重置前端表單）
 */
export async function submitOrder({
    payload,
    orderId,
    shippingMethod,
    onDone = () => {},
  }) {
    try {
      console.log('提交的資料 payload：', payload);
  
      /* ---------- 1. 送出到 Google Apps Script ---------- */
      const res = await fetch(process.env.GOOGLE_SHEET_APP_SCRIPT_LINK, {
        method: 'POST',
        body : JSON.stringify(payload),
      });
      const data = await res.json();
  
      if (data.status !== 'success') {
        console.error('訂單送出失敗：', data.message);
        return;
      }
  
      /* ---------- 2. 讀取現有庫存 ---------- */
      const stockRes = await fetch('/api/stock');
      const stock    = await stockRes.json();
  
      /* ---------- 3. 扣掉本次 items ---------- */
      // id → stock.json key 對照
      const keyMap = {
        'poster-white' : 'posterWhite',
        'poster-blue'  : 'posterBlue',
        'poster-brown' : 'posterBrown',
        'poster-orange': 'posterYellow',
        'poster-gray'  : 'posterLightGrey',
        'keycap-mirror': 'keycap',
        'keycap-yellow': 'keycap',
        'sticker-keychain': 'stickerKeychain',
        'usb-dual': 'usbDrive',
        'lighter' : 'lighter',
        'label-machine': 'labelPrinter',
      };
  
      const newStock = { ...stock };
      (payload.items || []).forEach(({ id, qty }) => {
        const key = keyMap[id];
        if (key && newStock[key] !== undefined) {
          newStock[key] = Math.max(0, newStock[key] - qty);
        }
      });
  
      /* ---------- 4. 寫回 /api/stock ---------- */
      await fetch('/api/stock', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body   : JSON.stringify({ newStock }),
      });
  
      /* ---------- 5. 通知使用者 & 重置 ---------- */
      alert(`訂單已成功送出！`);
      onDone();
    } catch (err) {
      // 若 Google Apps Script 拋錯，但還是想讓使用者拿到編號
      alert(`訂單已成功送出！`);
      onDone();
      console.error('提交訂單或更新庫存時發生錯誤：', err);
    }
  }
  