import { notFound } from 'next/navigation'

// Force dynamic to avoid conflicts with admin operations
export const dynamic = 'force-dynamic'

// Payload CMS (primary)
import { getHomePage, getAllProducts } from '@/lib/payload/client'

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
        blocks: (payloadPage.blocks as any[]).map((block: any) => ({
          ...block,
          _key: (block.id || block._key || String(Math.random())) as string,
          _type: (block.blockType || block._type) as string,
        })) as Block[]
      }
      console.log('✅ Loaded home page from Payload CMS')
    }

    // Also fetch products for the products block
    const payloadProducts = await getAllProducts()
    if (payloadProducts?.length) {
      products = (payloadProducts as any[]).map((p: any) => ({
        ...p,
        _id: p.id || p._id,
        slug: { current: p.slug },
      }))
    }
  } catch (error) {
    console.log('⚠️  Payload not available', error)
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
        <BlockRenderer key={block._key || block.id || index} block={block as any} />
      ))}
    </>
  )
}
