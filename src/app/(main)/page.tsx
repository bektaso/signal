import { notFound } from 'next/navigation'

// Force dynamic to avoid conflicts with admin operations
export const dynamic = 'force-dynamic'

// Payload CMS (primary)
import { getHomePage, getAllProducts } from '@/lib/payload/client'

// Sanity CMS (fallback during migration)
import { client } from '@/lib/sanity/client'
import { homePageQuery } from '@/lib/sanity/queries'

import BlockRenderer from '@/components/blocks/BlockRenderer'

interface Block {
  _key?: string
  id?: string
  blockType?: string
  _type?: string
  [key: string]: unknown
}

interface PageData {
  blocks?: Block[]
}

export default async function HomePage() {
  let pageData: PageData | null = null
  let products: unknown[] = []

  // Try Payload first (primary CMS)
  try {
    const payloadPage = await getHomePage()
    if (payloadPage?.blocks) {
      pageData = {
        blocks: payloadPage.blocks.map((block: Block) => ({
          ...block,
          _key: block.id || block._key || String(Math.random()),
          _type: block.blockType || block._type,
        }))
      }
      console.log('✅ Loaded home page from Payload CMS')
    }

    // Also fetch products for the products block
    const payloadProducts = await getAllProducts()
    if (payloadProducts?.length) {
      products = payloadProducts.map((p: { id?: string; _id?: string; slug?: string; [key: string]: unknown }) => ({
        ...p,
        _id: p.id || p._id,
        slug: { current: p.slug },
      }))
    }
  } catch (error) {
    console.log('⚠️  Payload not available, trying Sanity fallback...', error)
  }

  // Fallback to Sanity if Payload fails
  if (!pageData) {
    try {
      pageData = await client.fetch(homePageQuery)
      if (pageData) {
        console.log('✅ Loaded home page from Sanity CMS (fallback)')
      }
    } catch (error) {
      console.error('❌ Failed to fetch from both Payload and Sanity:', error)
    }
  }

  // If no data from any CMS, show error
  if (!pageData?.blocks || pageData.blocks.length === 0) {
    console.error('❌ No home page content found. Please run: npm run payload:seed')
    notFound()
  }

  // Inject products into productsBlock if fetched from Payload
  const blocks = pageData.blocks.map((block) => {
    if ((block._type === 'productsBlock' || block.blockType === 'productsBlock') && products.length > 0) {
      return {
        ...block,
        products: products,
      }
    }
    return block
  })

  return (
    <>
      {blocks.map((block, index) => (
        <BlockRenderer key={block._key || block.id || index} block={block} />
      ))}
    </>
  )
}
