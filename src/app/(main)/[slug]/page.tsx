import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

// Payload CMS
import { getPageBySlug } from '@/lib/payload/client'

// Sanity CMS (fallback)
import { client } from '@/lib/sanity/client'
import { groq } from 'next-sanity'

import BlockRenderer from '@/components/blocks/BlockRenderer'

interface PageProps {
  params: Promise<{
    slug: string
  }>
}

interface Block {
  _key?: string
  id?: string
  blockType?: string
  _type?: string
  [key: string]: unknown
}

interface PageData {
  title?: string
  slug?: string
  blocks?: Block[]
  seo?: {
    title?: string
    description?: string
  }
}

// Reserved slugs that have their own routes
const RESERVED_SLUGS = ['home', 'careers', 'products', 'admin', 'api', 'studio']

// Force dynamic rendering to avoid conflicts with admin operations
export const dynamic = 'force-dynamic'

// Allow dynamic pages not in generateStaticParams
export const dynamicParams = true

// Sanity query for fallback
const pageBySlugQuery = groq`*[_type == "page" && slug.current == $slug][0]{
  title,
  "slug": slug.current,
  blocks[]{
    _key,
    _type,
    ...
  },
  seo
}`

// Note: generateStaticParams removed to prevent conflicts with admin operations
// Pages are rendered on-demand with force-dynamic

// Generate metadata from CMS
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params

  // Skip reserved slugs
  if (RESERVED_SLUGS.includes(slug)) {
    return notFound()
  }

  let pageData: PageData | null = null

  try {
    pageData = await getPageBySlug(slug) as PageData | null
  } catch {
    try {
      pageData = await client.fetch(pageBySlugQuery, { slug })
    } catch { }
  }

  if (!pageData) {
    return { title: 'Page Not Found' }
  }

  return {
    title: pageData.seo?.title || pageData.title || 'Signalton',
    description: pageData.seo?.description,
  }
}

export default async function DynamicPage({ params }: PageProps) {
  const { slug } = await params

  // Skip reserved slugs - they have their own routes
  if (RESERVED_SLUGS.includes(slug)) {
    notFound()
  }

  let pageData: PageData | null = null

  // Try Payload CMS first
  try {
    const payloadPage = await getPageBySlug(slug)
    if (payloadPage) {
      pageData = {
        ...payloadPage,
        blocks: payloadPage.blocks?.map((block: Block) => ({
          ...block,
          _key: block.id || block._key || String(Math.random()),
          _type: block.blockType || block._type,
        }))
      } as PageData
      console.log(`✅ Loaded page "${slug}" from Payload CMS`)
    }
  } catch (error) {
    console.log(`⚠️ Payload not available for page "${slug}", trying Sanity...`)
  }

  // Fallback to Sanity
  if (!pageData) {
    try {
      pageData = await client.fetch(pageBySlugQuery, { slug })
      if (pageData) {
        console.log(`✅ Loaded page "${slug}" from Sanity CMS (fallback)`)
      }
    } catch (error) {
      console.error(`❌ Failed to fetch page "${slug}" from both CMS:`, error)
    }
  }

  // If no page found, show 404
  if (!pageData || !pageData.blocks || pageData.blocks.length === 0) {
    console.error(`❌ Page "${slug}" not found. Create it in Payload CMS admin.`)
    notFound()
  }

  return (
    <div className="pt-24 pb-16">
      {pageData.blocks.map((block, index) => (
        <BlockRenderer key={block._key || block.id || index} block={block} />
      ))}
    </div>
  )
}
