/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: 'https://www.neo-annotation.art', // ✅ 改成你的正式網址
    generateRobotsTxt: true, // ✅ 同時生成 robots.txt
    sitemapSize: 5000,
    exclude: ['/secret', '/admin'], // 可選：不想被爬的路由
  };
  