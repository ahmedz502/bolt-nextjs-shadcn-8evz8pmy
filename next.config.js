const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    SITE_URL: process.env.SITE_URL || 'https://example.com', // Keep only custom environment variables here
  },
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.plugins.push({
        apply: (compiler) => {
          compiler.hooks.afterEmit.tapAsync('GenerateSitemap', async (compilation, callback) => {
            try {
              const generateSitemap = require('next-sitemap').generateSitemap;
              await generateSitemap({
                siteUrl: process.env.SITE_URL || 'https://example.com',
                generateRobotsTxt: true,
                exclude: ['/admin/*', '/dashboard/*'],
                generateIndexSitemap: false,
                outDir: path.join(__dirname, 'public'),
              });
              console.log('Sitemap generated successfully!');
            } catch (error) {
              console.error('Error generating sitemap:', error);
            }
            callback();
          });
        },
      });
    }
    return config;
  },
};

module.exports = nextConfig;
