/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://example.com',
  generateRobotsTxt: true,
  exclude: ['/admin/*', '/dashboard/*'],
  generateIndexSitemap: false,
  outDir: 'public',
}

