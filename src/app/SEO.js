export default function SEO() {
    const jsonLd = {
        "@context": "https://schema.org",
        "@graph": [
            // 主展覽活動
            {
                "@type": "Event",
                "name": "新增註解 neo-annotation | 北藝新媒110級畢業展",
                "description": "本屆北藝大新媒體藝術學系110級畢業展「新增註解 neo-annotation」以現代線上編輯工具的「註解」功能為靈感，延伸成為藝術行動，探索多元觀點與言論如何在科技與社群媒介的推動下共存與對話。展覽旨在打破傳統觀看框架，激發新舊觀點的累積，邀請觀眾從多角度重新詮釋社會現況與日常生活。",
                "startDate": "2025-04-18",
                "endDate": "2025-04-26",
                "url": "https://www.neo-annotation.art/",
                "image": "https://www.neo-annotation.art/og-image.png",
                "location": {
                    "@type": "Place",
                    "name": "臺灣當代文化實驗場 C-LAB 圖書館展演空間",
                    "address": {
                        "@type": "PostalAddress",
                        "addressLocality": "臺北市",
                        "addressCountry": "TW"
                    }
                },
                "organizer": {
                    "@type": "Organization",
                    "name": "國立臺北藝術大學新媒體藝術學系",
                    "url": "https://nma.tnua.edu.tw/"
                },
                "offers": {
                    "@type": "Offer",
                    "availability": "https://schema.org/InStock",
                    "price": "0",
                    "priceCurrency": "TWD"
                },
                "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
                "subEvent": [
                    // 第一個子活動：創作經驗分享
                    {
                        "@type": "Event",
                        "name": "多重視角的空間語言：《戰鬥之城》創作經驗分享",
                        "startDate": "2025-03-21T16:30:00+08:00",
                        "endDate": "2025-03-21T17:30:00+08:00",
                        "location": {
                            "@type": "Place",
                            "name": "北藝大研究大樓 R211",
                            "address": {
                                "@type": "PostalAddress",
                                "addressLocality": "臺北市",
                                "addressCountry": "TW"
                            }
                        },
                        "performer": {
                            "@type": "Person",
                            "name": "張立人"
                        }
                    },
                    // 第二個子活動：開幕活動及子節目
                    {
                        "@type": "Event",
                        "name": "開幕活動",
                        "startDate": "2025-04-18T17:30:00+08:00",
                        "endDate": "2025-04-18T20:00:00+08:00",
                        "location": {
                            "@type": "Place",
                            "name": "臺灣當代文化實驗場 C-LAB 圖書館展演空間",
                            "address": {
                                "@type": "PostalAddress",
                                "addressLocality": "臺北市",
                                "addressCountry": "TW"
                            }
                        },
                        "subEvent": [
                            {
                                "@type": "Event",
                                "name": "@PARA(*_)",
                                "startDate": "2025-04-18T18:00:00+08:00",
                                "endDate": "2025-04-18T18:15:00+08:00"
                            },
                            {
                                "@type": "Event",
                                "name": "張欣語",
                                "startDate": "2025-04-18T18:30:00+08:00",
                                "endDate": "2025-04-18T18:45:00+08:00"
                            },
                            {
                                "@type": "Event",
                                "name": "Xtrux",
                                "startDate": "2025-04-18T19:00:00+08:00",
                                "endDate": "2025-04-18T19:15:00+08:00"
                            }
                        ]
                    }
                ],
                "additionalProperty": {
                    "@type": "PropertyValue",
                    "name": "Transportation",
                    "value": "一、捷運：捷運忠孝新生站3號出口，沿忠孝東路步行至建國南路及濟南路口約10分鐘；二、開車：周邊停車場如建國高架橋下、嘟嘟房仁愛帝寶站、北科停車場等。"
                }
            },
            // 表演者簡介
            {
                "@type": "Person",
                "name": "張欣語",
                "alternateName": "Chang Hsin Yu",
                "description": "互動、聲音、裝置創作者，專注於實驗聲響，探討聲音空間性與發聲機制，並以程式創作展現可能性。"
            },
            {
                "@type": "Person",
                "name": "XTRUX",
                "description": "XTRUX 關注數位身份與科技引導影像邊界的擴展，擅長運用遊戲引擎、動態捕捉與互動裝置，創造虛擬與沉浸式展演形式。"
            },
            {
                "@type": "Person",
                "name": "陳奕銓 / 廖炫棠",
                "description": "團隊作品圍繞人類、科技與自我意識，探討數位媒介中的『記憶』、『夢境』與『語言』，以非線性敘事呈現跨領域實驗。"
            },
            // 行政團隊全部成員
            {
                "@type": "Organization",
                "name": "NEO-ANNOTATION Administrative Team",
                "member": [
                    // 總召
                    {
                        "@type": "Person",
                        "name": "高行萱",
                        "alternateName": "Kao Hsin Syuan",
                        "jobTitle": "Coordinator"
                    },
                    // 副召
                    {
                        "@type": "Person",
                        "name": "粘雅文",
                        "alternateName": "Nien Ya Wen",
                        "jobTitle": "Vice Coordinator"
                    },
                    // 事務組
                    {
                        "@type": "Person",
                        "name": "張禹婕",
                        "alternateName": "Chang Yu Chieh",
                        "jobTitle": "Administration Department"
                    },
                    {
                        "@type": "Person",
                        "name": "劉怡辰",
                        "alternateName": "Liu Yi Chen",
                        "jobTitle": "Administration Department"
                    },
                    {
                        "@type": "Person",
                        "name": "黃語箴",
                        "alternateName": "Huang Yu Jhen",
                        "jobTitle": "Administration Department"
                    },
                    // 視覺組
                    {
                        "@type": "Person",
                        "name": "阮姿霓",
                        "alternateName": "Juan Tzu Ni",
                        "jobTitle": "Design Department"
                    },
                    {
                        "@type": "Person",
                        "name": "陳婕希",
                        "alternateName": "Chen Chieh Hsi",
                        "jobTitle": "Design Department"
                    },
                    {
                        "@type": "Person",
                        "name": "李晴喆",
                        "alternateName": "Lee Qing Zhe",
                        "jobTitle": "Design Department"
                    },
                    {
                        "@type": "Person",
                        "name": "許巧嬡",
                        "alternateName": "Hsu Chiao Ai",
                        "jobTitle": "Design Department"
                    },
                    {
                        "@type": "Person",
                        "name": "張祐勳",
                        "alternateName": "Chang You Syun",
                        "jobTitle": "Design Department"
                    },
                    {
                        "@type": "Person",
                        "name": "陳俋錫",
                        "alternateName": "Chen I Hsi",
                        "jobTitle": "Design Department"
                    },
                    {
                        "@type": "Person",
                        "name": "廖炫棠",
                        "alternateName": "Liao Xuan Tang",
                        "jobTitle": "Design Department"
                    },
                    // 公關組
                    {
                        "@type": "Person",
                        "name": "劉庭安",
                        "alternateName": "Liu Ting An",
                        "jobTitle": "Public Relations Department"
                    },
                    {
                        "@type": "Person",
                        "name": "陳采廷",
                        "alternateName": "Chen Cai Ting",
                        "jobTitle": "Public Relations Department"
                    },
                    {
                        "@type": "Person",
                        "name": "王晨曦",
                        "alternateName": "Wang Chen Xi",
                        "jobTitle": "Public Relations Department"
                    },
                    {
                        "@type": "Person",
                        "name": "李宇恆",
                        "alternateName": "Li Yu Heng",
                        "jobTitle": "Public Relations Department"
                    },
                    // 網頁組
                    {
                        "@type": "Person",
                        "name": "陳奕銓",
                        "alternateName": "Chen Yi Quan",
                        "jobTitle": "Web Design"
                    },
                    {
                        "@type": "Person",
                        "name": "胡乃云",
                        "alternateName": "Hu Nai Yun",
                        "jobTitle": "Web Design"
                    },
                    // 紀錄組
                    {
                        "@type": "Person",
                        "name": "游士萱",
                        "alternateName": "Yu Shih Hsuan",
                        "jobTitle": "Photography Department"
                    },
                    {
                        "@type": "Person",
                        "name": "何雨柔",
                        "alternateName": "Ho Yu Jou",
                        "jobTitle": "Photography Department"
                    },
                    {
                        "@type": "Person",
                        "name": "張文珈",
                        "alternateName": "Chang Wen Chia",
                        "jobTitle": "Photography Department"
                    },
                    {
                        "@type": "Person",
                        "name": "徐暐涵",
                        "alternateName": "Hsu Wei Han",
                        "jobTitle": "Photography Department"
                    },
                    {
                        "@type": "Person",
                        "name": "樊卓鏗",
                        "alternateName": "Fan Cheuk Hang",
                        "jobTitle": "Photography Department"
                    },
                    // 活動組
                    {
                        "@type": "Person",
                        "name": "洪伊又",
                        "alternateName": "Hung Yi Yu",
                        "jobTitle": "Event Planning Department"
                    },
                    {
                        "@type": "Person",
                        "name": "陳韻至",
                        "alternateName": "Chen Yun Zhi",
                        "jobTitle": "Event Planning Department"
                    },
                    {
                        "@type": "Person",
                        "name": "張媛淇",
                        "alternateName": "Chang Yuan Chi",
                        "jobTitle": "Event Planning Department"
                    },
                    // 技術統籌組
                    {
                        "@type": "Person",
                        "name": "黃冠勛",
                        "alternateName": "Huang Kuan Hsun",
                        "jobTitle": "Technical Director Department"
                    },
                    {
                        "@type": "Person",
                        "name": "黃冠睿",
                        "alternateName": "Huang Kuan Jui",
                        "jobTitle": "Technical Director Department"
                    },
                    {
                        "@type": "Person",
                        "name": "韓承諭",
                        "alternateName": "Han Cheng Yu",
                        "jobTitle": "Technical Director Department"
                    },
                    {
                        "@type": "Person",
                        "name": "李雯諭",
                        "alternateName": "Lee Wen Yu",
                        "jobTitle": "Technical Director Department"
                    }
                ]
            },
            // 周邊商品
            {
                "@type": "Product",
                "name": "#/**/鍵帽按鈕",
                "sku": "001",
                "description": "清脆段落青軸與閃爍的霓虹燈，既可作為吊飾也可拔下裝入鍵盤。提供『鏡面#』與『黃色/**/』兩種款式。",
                "offers": {
                    "@type": "Offer",
                    "priceCurrency": "TWD",
                    "price": "280"
                },
                "additionalProperty": {
                    "@type": "PropertyValue",
                    "name": "尺寸",
                    "value": "鍵帽形OEM，高度R4，17.3 x 17.8 x 10.5 mm"
                }
            },
            {
                "@type": "Product",
                "name": "雙頭隨身碟",
                "sku": "002",
                "description": "支援 Mac 與 Windows 的雙頭隨身碟，小巧快速，容量 64GB，採用三星晶片。",
                "offers": {
                    "@type": "Offer",
                    "priceCurrency": "TWD",
                    "price": "350"
                },
                "additionalProperty": {
                    "@type": "PropertyValue",
                    "name": "尺寸",
                    "value": "33 x 12 x 6 mm"
                }
            },
            {
                "@type": "Product",
                "name": "貼紙鑰匙圈",
                "sku": "003",
                "description": "靜電貼紙與壓克力吊牌組合，既可作貼紙亦可作鑰匙圈，附有隨身小鏡子。",
                "offers": {
                    "@type": "Offer",
                    "priceCurrency": "TWD",
                    "price": "150"
                },
                "additionalProperty": {
                    "@type": "PropertyValue",
                    "name": "尺寸",
                    "value": "94 x 41 mm"
                }
            },
            {
                "@type": "Product",
                "name": "打火機",
                "sku": "004",
                "description": "復古銀色防風打火機，可補充瓦斯。",
                "offers": {
                    "@type": "Offer",
                    "priceCurrency": "TWD",
                    "price": "50"
                },
                "additionalProperty": {
                    "@type": "PropertyValue",
                    "name": "尺寸",
                    "value": "80 x 22 x 9 mm"
                }
            },
            {
                "@type": "Product",
                "name": "字母標籤機",
                "sku": "005",
                "description": "用於標籤小物的字母標籤機，膠帶顏色隨機。",
                "offers": {
                    "@type": "Offer",
                    "priceCurrency": "TWD",
                    "price": "300"
                },
                "additionalProperty": {
                    "@type": "PropertyValue",
                    "name": "尺寸",
                    "value": "機身112 x 55 mm；膠帶：9 mm"
                }
            },
            {
                "@type": "Product",
                "name": "海報",
                "sku": "006",
                "description": "手工打凹限量海報，僅供展場自取。",
                "offers": {
                    "@type": "Offer",
                    "priceCurrency": "TWD",
                    "price": "80"
                },
                "additionalProperty": {
                    "@type": "PropertyValue",
                    "name": "尺寸",
                    "value": "A3 (297 x 420 mm)"
                }
            },
            {
                "@type": "Product",
                "name": "小禮包",
                "sku": "B_01+02+03",
                "description": "#/**/鍵帽按鈕、雙頭隨身碟、貼紙鑰匙圈組合，早鳥價660。",
                "offers": {
                    "@type": "Offer",
                    "priceCurrency": "TWD",
                    "price": "660"
                }
            },
            {
                "@type": "Product",
                "name": "大禮包",
                "sku": "A_01+02+03+04+05",
                "description": "#/**/鍵帽按鈕、雙頭隨身碟、貼紙鑰匙圈、打火機、字母標籤機組合，早鳥價960。",
                "offers": {
                    "@type": "Offer",
                    "priceCurrency": "TWD",
                    "price": "960"
                }
            }
        ]
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <meta
                name="description"
                content="本屆北藝大新媒體藝術學系110級畢業展『新增註解 neo-annotation』以線上編輯工具的註解功能為靈感，延伸成藝術行動，探索多元觀點在科技與社群媒介下的對話。"
            />
            <meta name="keywords" content="新增註解, neo-annotation, 北藝新媒, 畢業展, 新媒體藝術" />
            <meta name="robots" content="index,follow" />
            <link rel="canonical" href="https://www.neo-annotation.art/" />
            <meta property="og:title" content="新增註解 neo-annotation | 北藝新媒110級畢業展" />
            <meta
                property="og:description"
                content="本屆北藝大新媒體藝術學系110級畢業展『新增註解 neo-annotation』以線上編輯工具的註解功能為靈感，延伸成藝術行動，探索多元觀點在科技與社群媒介下的對話。"
            />
            <meta property="og:url" content="https://www.neo-annotation.art/" />
            <meta property="og:site_name" content="NEO-ANNOTATION" />
            <meta property="og:locale" content="zh_TW" />
            <meta property="og:type" content="website" />
            <meta property="og:image" content="https://www.neo-annotation.art/og-image.png" />
            <meta property="og:image:width" content="1200" />
            <meta property="og:image:height" content="630" />
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content="新增註解 neo-annotation | 北藝新媒110級畢業展" />
            <meta
                name="twitter:description"
                content="本屆北藝大新媒體藝術學系110級畢業展『新增註解 neo-annotation』以線上編輯工具的註解功能為靈感，延伸成藝術行動，探索多元觀點在科技與社群媒介下的對話。"
            />
            <meta name="twitter:image" content="https://www.neo-annotation.art/og-image.png" />
        </>
    );
}
