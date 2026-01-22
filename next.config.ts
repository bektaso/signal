import type { NextConfig } from "next";
import { withPayload } from '@payloadcms/next/withPayload'
import path from 'path'

const nextConfig: NextConfig = {
  // Enable React strict mode
  reactStrictMode: true,

  // Image optimization for Sanity images (keeping for migration period)
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        pathname: '/images/**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3000',
        pathname: '/media/**',
      },
    ],
  },

  // Experimental features
  experimental: {
    // Enable PPR for faster page loads
    // ppr: true,
  },

  // Transpile packages (Sanity + Payload)
  transpilePackages: ['sanity', '@sanity/vision'],

  // Webpack configuration for Payload config alias
  webpack: (config, { isServer }) => {
    // Merge with existing webpack config from withPayload
    if (isServer) {
      config.resolve.alias = {
        ...config.resolve.alias,
        '@payload-config': path.resolve(__dirname, './payload.config.ts'),
      }
    }
    return config
  },

  // Environment variables exposed to client
  env: {
    NEXT_PUBLIC_SANITY_PROJECT_ID: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    NEXT_PUBLIC_SANITY_DATASET: process.env.NEXT_PUBLIC_SANITY_DATASET,
    NEXT_PUBLIC_SANITY_API_VERSION: process.env.NEXT_PUBLIC_SANITY_API_VERSION,
    NEXT_PUBLIC_SERVER_URL: process.env.NEXT_PUBLIC_SERVER_URL,
  },
};

// Apply Payload wrapper and ensure webpack config is preserved
const payloadConfig = withPayload(nextConfig)

// Ensure webpack alias is preserved after withPayload
if (payloadConfig.webpack) {
  const originalWebpack = payloadConfig.webpack
  payloadConfig.webpack = (config, options) => {
    const result = originalWebpack(config, options)
    if (options.isServer) {
      result.resolve.alias = {
        ...result.resolve.alias,
        '@payload-config': path.resolve(__dirname, './payload.config.ts'),
      }
    }
    return result
  }
}

export default payloadConfig
