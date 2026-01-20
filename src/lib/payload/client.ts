/**
 * Payload CMS Client
 * Server-side client for fetching data from Payload CMS
 */

import { getPayload } from 'payload'
import config from '../../../payload.config'

let cachedPayload: any = null

/**
 * Get Payload instance (cached for performance)
 */
export async function getPayloadClient() {
  if (cachedPayload) {
    return cachedPayload
  }

  cachedPayload = await getPayload({ config })
  return cachedPayload
}

/**
 * Fetch all products
 */
export async function getAllProducts() {
  const payload = await getPayloadClient()

  const { docs } = await payload.find({
    collection: 'products',
    sort: 'order',
    limit: 100,
  })

  return docs
}

/**
 * Fetch product by slug
 */
export async function getProductBySlug(slug: string) {
  const payload = await getPayloadClient()

  const { docs } = await payload.find({
    collection: 'products',
    where: {
      slug: {
        equals: slug,
      },
    },
    limit: 1,
  })

  return docs[0] || null
}

/**
 * Fetch page by slug
 */
export async function getPageBySlug(slug: string) {
  const payload = await getPayloadClient()

  const { docs } = await payload.find({
    collection: 'pages',
    where: {
      slug: {
        equals: slug,
      },
    },
    limit: 1,
  })

  return docs[0] || null
}

/**
 * Fetch home page
 */
export async function getHomePage() {
  return getPageBySlug('home')
}
