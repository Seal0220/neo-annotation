/**
 * 從 min 到 max 取一隨機值
 * @param {*} min 
 * @param {*} max 
 */
export function randomRange(min, max) {
    return min + Math.random() * (max - min);
}