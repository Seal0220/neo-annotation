export async function workFetch({
    id = null,
    onlyImage = null,
    successFn = ({ response, result }) => { },
    failureFn = ({ response, result }) => { },
    errorFn = (error) => { }
} = {}) {
    try {
        // 基礎 URL 從環境變數讀取
        let url = process.env.GET_WORKS_LINK;
        const params = [];
        
        // 若有 id 則加入參數，並且做 encode 避免 URL 特殊字元產生問題
        if (id) params.push(`id=${encodeURIComponent(id)}`);
        // 如果 onlyImage 不為 null 才加入條件
        if (onlyImage !== null) params.push(`onlyImage=${onlyImage}`);
        
        // 組合完整 URL
        if (params.length > 0) {
            url += `?${params.join('&')}`;
        }

        // 使用 fetch 發送 GET 請求，並設定 JSON 格式的 header
        const response = await fetch(url, {
            method: 'GET'
        });
        
        const result = await response.json();
        
        // 根據 HTTP 回應狀態調用相對應的回呼函數
        if (response.ok) {
            successFn({ response, result });
        } else {
            failureFn({ response, result });
        }
        
        return { response, result };
    } catch (error) {
        console.error('Error fetching works:', error);
        errorFn(error);
        return { error };
    }
}
