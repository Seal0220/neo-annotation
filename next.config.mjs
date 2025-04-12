/** @type {import('next').NextConfig} */
const HOSTS = {
    LOCAL: 'http://localhost:5000',
    // SERVER: '/api'
}

const nextConfig = {
    reactStrictMode: false,
    eslint: {
        ignoreDuringBuilds: false,
    },
    webpack: (config) => {
        config.ignoreWarnings = [
            {
                message: /Failed to parse source map/, // 示例：忽略特定的警告消息
            },
        ];

        return config;
    },
    env: {
        GET_WORKS_LINK: 'https://script.google.com/macros/s/AKfycbzd8Y1yir3nNblr0Q7L-sY-YJGTOLDXAfV16ld_0laTACTcyl3tgVxFgNq2bMMy824kXg/exec',
        MYSHOP711_LINK: 'https://myship.7-11.com.tw/general/detail/GM2503204781980',
        GOOGLE_SHEET_APP_SCRIPT_LINK: 'https://script.google.com/macros/s/AKfycbybYSis2KmKE8PjM4P4ZkpZW1Qcb0n1MNXAyNxlwQKnf6MFrMinhUwk9DVAtwE0N3dsGA/exec',
        GOOGLE_SHEET_APP_SCRIPT_ID: 'AKfycbybYSis2KmKE8PjM4P4ZkpZW1Qcb0n1MNXAyNxlwQKnf6MFrMinhUwk9DVAtwE0N3dsGA',
        API_HOST: HOSTS.LOCAL,
        LANG: JSON.stringify(['en', 'tw']),
        WORKS: [
            {
              "id": "A1",
              "name": "張禹婕",
              "title": "追憶光織",
              "medium": "單機遊戲"
            },
            {
              "id": "A2",
              "name": "王晨曦",
              "title": "孵光",
              "medium": "動力裝置"
            },
            {
              "id": "A3",
              "name": "黃冠勛",
              "title": "for( int i=0; i\u003Clife; i++ ){bloom(); }",
              "medium": "金屬、步進馬達"
            },
            {
              "id": "A4",
              "name": "游士萱",
              "title": "～。～。～。～",
              "medium": "馬達、鋁材、微控制器、海灘沙"
            },
            {
              "id": "A5",
              "name": "李晴喆",
              "title": "Step 1",
              "medium": "雙頻道錄像"
            },
            {
              "id": "A6",
              "name": "黃語箴",
              "title": "異象音列 \nVision of the Harmonics",
              "medium": "3D列印機、步進馬達"
            },
            {
              "id": "A7",
              "name": "陳婕希",
              "title": "tunnnnnnel",
              "medium": "喇叭、木頭、LED、微控制器"
            },
            {
              "id": "A8",
              "name": "洪伊又",
              "title": "媽祖婆請的愛",
              "medium": "PLA"
            },
            {
              "id": "A9",
              "name": "陳采廷",
              "title": "▵",
              "medium": "能量裝置"
            },
            {
              "id": "A10",
              "name": "樊卓鏗",
              "title": "我喺自強路食芭樂 \nI'm eating guava at self-empowerment road ",
              "medium": "單頻道錄像、現成物"
            },
            {
              "id": "A11",
              "name": "陳俋錫",
              "title": "就讓月光停在這吧",
              "medium": "單頻道錄像"
            },
            {
              "id": "B1",
              "name": "陳韻至、劉怡辰",
              "title": "Memory Coverage_v(   )",
              "medium": "複合媒材、電子零件"
            },
            {
              "id": "B2",
              "name": "陳奕銓、廖炫棠",
              "title": "另一個溢出的__副本 (7)",
              "medium": "數位聲音與影像、馬桶、水管"
            },
            {
              "id": "B3",
              "name": "李雯諭、徐暐涵",
              "title": "失能：捲尺",
              "medium": "動力裝置"
            },
            {
              "id": "B4",
              "name": "許巧嬡、阮姿霓",
              "title": "pia !",
              "medium": "POM塑鋼、泡泡紙"
            },
            {
              "id": "B5",
              "name": "黃冠睿 、何雨柔 、高行萱 、粘雅文 、張祐熏",
              "title": "sWiTcHbOaRd",
              "medium": "單頻道錄像、互動影像裝置"
            },
            {
              "id": "B6",
              "name": "胡乃云、李宇恆",
              "title": "囚 enclosure ",
              "medium": "互動影像"
            },
            {
              "id": "B7",
              "name": "韓承諭、劉庭安",
              "title": "屋裡取鬧",
              "medium": "動力裝置"
            },
            {
              "id": "B8",
              "name": "張文珈、張媛淇",
              "title": "房間裡的人（們）\nPeople in the Room",
              "medium": "現成物、即時影像裝置"
            }
          ],
    },
};

export default nextConfig;
