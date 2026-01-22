/**
 * Payload CMS Client
 * Server-side client for fetching data from Payload CMS
 * Uses dynamic import to avoid conflicts with admin operations
 */

import type { Payload } from 'payload'

let cachedPayload: Payload | null = null

/**
 * Get Payload instance using dynamic import
 * This approach avoids config resolution issues during admin operations
 */
export async function getPayloadClient(): Promise<Payload | null> {
  // Return cached instance if available
  if (cachedPayload) {
    return cachedPayload
  }

  try {
    // Dynamic import to avoid issues during certain build phases
    const { getPayload } = await import('payload')
    const configModule = await import('../../../payload.config')
    const config = configModule.default

    if (!config) {
      return null
    }

    cachedPayload = await getPayload({ config })
    return cachedPayload
  } catch (error) {
    // Return null silently - expected during admin operations
    return null
  }
}

/**
 * Safe wrapper for Payload operations
 * Returns null/empty array instead of throwing errors
 */
async function safePayloadOperation<T>(
  operation: (payload: Payload) => Promise<T>,
  fallback: T
): Promise<T> {
  try {
    const payload = await getPayloadClient()
    if (!payload) return fallback
    return await operation(payload)
  } catch {
    return fallback
  }
}

/**
 * Fetch all products
 */
export async function getAllProducts() {
  return safePayloadOperation(
    async (payload) => {
      const { docs } = await payload.find({
        collection: 'products',
        sort: 'order',
        limit: 100,
      })
      return docs
    },
    []
  )
}

/**
 * Fetch product by slug
 */
export async function getProductBySlug(slug: string) {
  return safePayloadOperation(
    async (payload) => {
      const { docs } = await payload.find({
        collection: 'products',
        where: { slug: { equals: slug } },
        limit: 1,
      })
      return docs[0] || null
    },
    null
  )
}

/**
 * Fetch page by slug
 */
export async function getPageBySlug(slug: string) {
  return safePayloadOperation(
    async (payload) => {
      const { docs } = await payload.find({
        collection: 'pages',
        where: { slug: { equals: slug } },
        limit: 1,
      })
      return docs[0] || null
    },
    null
  )
}

/**
 * Fetch home page
 */
export async function getHomePage() {
  return getPageBySlug('home')
}

/**
 * Fetch all pages (for static generation)
 */
export async function getAllPages() {
  return safePayloadOperation(
    async (payload) => {
      const { docs } = await payload.find({
        collection: 'pages',
        limit: 100,
      })
      return docs
    },
    []
  )
}

/**
 * Fetch careers page content
 */
export async function getCareersPage() {
  return safePayloadOperation(
    async (payload) => {
      const { docs } = await payload.find({
        collection: 'careers',
        limit: 1,
      })
      return docs[0] || null
    },
    null
  )
}
