// Load environment variables FIRST - before any other imports
import dotenv from 'dotenv'
import path from 'path'

dotenv.config({ path: path.resolve(process.cwd(), '.env') })
dotenv.config({ path: path.resolve(process.cwd(), '.env.local'), override: true })

// Now import other modules after env is loaded
import { getPayload } from 'payload'
import { createClient } from '@sanity/client'

// Create Sanity client after env is loaded
const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01',
  useCdn: false,
})

interface SanityProduct {
  _id: string
  title: string
  slug: { current: string }
  tagline?: string
  icon?: string
  category?: string
  order?: number
  heroHeadline?: string
  heroSubheadline?: string
  primaryCta?: { label: string; href: string }
  secondaryCta?: { label: string; href: string }
  description?: any[]
  features?: Array<{
    icon?: string
    title?: string
    description?: string
  }>
  specifications?: Array<{
    label?: string
    value?: string
  }>
  useCases?: Array<{
    icon?: string
    title?: string
    description?: string
  }>
  relatedProducts?: Array<{ _ref: string }>
  footerCta?: {
    headline?: string
    body?: string
    buttonLabel?: string
    buttonHref?: string
  }
  seo?: {
    metaTitle?: string
    metaDescription?: string
  }
}

interface SanityPage {
  _id: string
  title: string
  slug: { current: string }
  seo?: {
    title?: string
    description?: string
  }
  blocks?: any[]
}

const migrateSanityToPayload = async () => {
  try {
    console.log('🚀 Starting Sanity to Payload migration...\n')

    // Verify Sanity config
    console.log('📋 Sanity Configuration:')
    console.log(`   Project ID: ${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}`)
    console.log(`   Dataset: ${process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'}`)
    console.log('')

    if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
      throw new Error('NEXT_PUBLIC_SANITY_PROJECT_ID is not set in environment variables')
    }

    // Initialize Payload
    const config = (await import('../payload.config')).default
    const payload = await getPayload({ config })
    console.log('✅ Payload initialized successfully!')

    // Fetch all products from Sanity
    console.log('\n📦 Fetching products from Sanity...')
    const sanityProducts = await sanityClient.fetch<SanityProduct[]>(`
      *[_type == "product"] | order(order asc) {
        _id,
        title,
        slug,
        tagline,
        icon,
        category,
        order,
        heroHeadline,
        heroSubheadline,
        primaryCta,
        secondaryCta,
        description,
        features,
        specifications,
        useCases,
        relatedProducts,
        footerCta,
        seo
      }
    `)

    console.log(`   Found ${sanityProducts.length} products`)

    // Migrate products to Payload
    console.log('\n🔄 Migrating products to Payload...')
    const productIdMap = new Map<string, string>() // Sanity ID -> Payload ID

    for (const sanityProduct of sanityProducts) {
      try {
        // Convert Sanity portable text to Lexical format (simplified)
        // For now, we'll store as plain text, you can enhance this later
        const descriptionText = sanityProduct.description
          ? JSON.stringify(sanityProduct.description)
          : undefined

        // Prepare SEO data with proper constraints
        const seoData = sanityProduct.seo ? {
          metaTitle: sanityProduct.seo.metaTitle?.substring(0, 60),
          metaDescription: sanityProduct.seo.metaDescription?.substring(0, 160),
          // ogImage is an upload relation, skip for now
        } : undefined

        const payloadProduct = await payload.create({
          collection: 'products',
          data: {
            title: sanityProduct.title,
            slug: sanityProduct.slug.current,
            tagline: sanityProduct.tagline,
            icon: sanityProduct.icon,
            category: sanityProduct.category as any,
            order: sanityProduct.order || 0,
            heroHeadline: sanityProduct.heroHeadline,
            heroSubheadline: sanityProduct.heroSubheadline,
            primaryCta: sanityProduct.primaryCta,
            secondaryCta: sanityProduct.secondaryCta,
            // description: descriptionText, // TODO: Convert to Lexical format
            features: sanityProduct.features || [],
            specifications: sanityProduct.specifications || [],
            useCases: sanityProduct.useCases || [],
            footerCta: sanityProduct.footerCta,
            seo: seoData,
          },
        })

        productIdMap.set(sanityProduct._id, String(payloadProduct.id))
        console.log(`   ✓ Migrated: ${sanityProduct.title}`)
      } catch (error) {
        console.error(`   ✗ Failed to migrate ${sanityProduct.title}:`, error)
      }
    }

    // Fetch home page from Sanity
    console.log('\n📄 Fetching home page from Sanity...')
    const sanityHomePage = await sanityClient.fetch<SanityPage>(`
      *[_type == "page" && slug.current == "home"][0] {
        _id,
        title,
        slug,
        seo,
        blocks
      }
    `)

    if (sanityHomePage) {
      console.log('   Found home page')

      // Migrate home page to Payload
      console.log('\n🔄 Migrating home page to Payload...')

      try {
        await payload.create({
          collection: 'pages',
          data: {
            title: sanityHomePage.title,
            slug: sanityHomePage.slug.current,
            seo: sanityHomePage.seo,
            blocks: sanityHomePage.blocks || [],
          },
        })

        console.log('   ✓ Migrated: Home page')
      } catch (error) {
        console.error('   ✗ Failed to migrate home page:', error)
      }
    }

    console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
    console.log('✅ Migration completed successfully!')
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
    console.log(`\n📊 Summary:`)
    console.log(`   Products migrated: ${productIdMap.size}/${sanityProducts.length}`)
    console.log(`   Pages migrated: ${sanityHomePage ? 1 : 0}`)
    console.log('')
    console.log('🌐 Admin Panel: http://localhost:3000/admin')
    console.log('')

    process.exit(0)
  } catch (error) {
    console.error('\n❌ Migration failed:', error)
    process.exit(1)
  }
}

migrateSanityToPayload()
