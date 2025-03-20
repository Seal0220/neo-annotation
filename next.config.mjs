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
        MYSHOP711_LINK: 'https://myship.7-11.com.tw/general/detail/GM2503204781980',
        GOOGLE_SHEET_APP_SCRIPT_LINK: 'https://script.google.com/macros/s/AKfycbybYSis2KmKE8PjM4P4ZkpZW1Qcb0n1MNXAyNxlwQKnf6MFrMinhUwk9DVAtwE0N3dsGA/exec',
        GOOGLE_SHEET_APP_SCRIPT_ID: 'AKfycbybYSis2KmKE8PjM4P4ZkpZW1Qcb0n1MNXAyNxlwQKnf6MFrMinhUwk9DVAtwE0N3dsGA',
        API_HOST: HOSTS.LOCAL,
        LANG: JSON.stringify(['en', 'tw']),
    },
};

export default nextConfig;
