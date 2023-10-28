/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  env: {
    INFURA_KEY: process.env.INFURA_KEY,
  }
}

module.exports = nextConfig
