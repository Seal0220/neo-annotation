/**
 * 從 min 到 max 取一隨機值
 * @param {*} min 
 * @param {*} max 
 */
export function randomRange(min, max) {
    return min + Math.random() * (max - min);
}

/**
 * 取得 rotation 角度，從 computed.transform 中解析
 * @param {*} transform 
 */
export function convertTransformRotation(transform) {
    if (!transform || transform === 'none') return null;

    let rotation = 0;
    // transform 形式通常為 "matrix(a, b, c, d, e, f)"
    const values = transform.split('(')[1].split(')')[0].split(',');
    const a = parseFloat(values[0]);
    const b = parseFloat(values[1]);
    // 以 arctan2(b, a) 計算旋轉角度（弧度轉換成度）
    rotation = Math.atan2(b, a) * (180 / Math.PI);
    // 正規化角度到 0 ~ 360 度
    rotation = (rotation + 360) % 360;
    return rotation;
}