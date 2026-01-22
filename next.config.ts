import type { NextConfig } from "next";
import { withPayload } from '@payloadcms/next/withPayload'
import path from 'path'

const nextConfig: NextConfig = {
  // Enable React strict mode
  reactStrictMode: true,

  // Experimental features
  experimental: {
    // Enable PPR for faster page loads
    // ppr: true,
  },

  // Disable checks for build stability during migration
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },

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
