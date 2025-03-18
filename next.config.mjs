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
        API_HOST: HOSTS.LOCAL,
        LANG: JSON.stringify(['en', 'tw']),
    },
};

export default nextConfig;
