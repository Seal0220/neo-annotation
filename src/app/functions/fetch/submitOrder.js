// utils/submitOrder.js

/**
 * 提交訂單的封裝函式
 * @param {Object} params - 需要的參數集合
 * @param {Object} params.payload - 要送往 Apps Script 的資料物件
 * @param {string} params.orderId - 訂單編號
 * @param {string} params.shippingMethod - 取貨方式 ('7-11' or 'pickup')
 * @param {Array}  params.initialProducts - 商品初始陣列，用於重置數量
 * @param {Function} params.setProducts - 設定商品狀態的 Hook
 * @param {Function} params.setShippingMethod - 設定取貨方式的 Hook
 * @param {Function} params.setNote - 設定備註的 Hook
 * @param {Function} params.setName - 設定姓名的 Hook
 * @param {Function} params.setPhone - 設定電話的 Hook
 * @param {Function} params.setEmail - 設定信箱的 Hook
 * @param {Function} params.setBankLast5 - 設定轉帳末五碼的 Hook
 */
export async function submitOrder({
    payload,
    orderId,
    shippingMethod,
    onDone = () => { },
}) {
    try {
        console.log("提交的資料 payload：", payload);

        const res = await fetch(process.env.GOOGLE_SHEET_APP_SCRIPT_LINK, {
            method: "POST",
            body: JSON.stringify(payload),
        });

        const data = await res.json();

        if (data.status === "success") {
            alert(`訂單已成功送出！\n訂單編號：${orderId}`);
            onDone();
        } else {
            console.error("訂單送出失敗：", data.message);
        }
    } catch (err) {
        alert(`訂單已成功送出！\n訂單編號：${orderId}`);
        onDone();
        // console.error("提交訂單時發生錯誤：", err);
    }
}
