/** @type {import('next').NextConfig} */
const path = require("path");

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["images.punkapi.com"],
  },
  sassOptions: {
    includePaths: [path.join(__dirname, "src/styles")],
  },
  env: {
    SITE_URL: process.env.SITE_URL,
  },
};

module.exports = nextConfig;
