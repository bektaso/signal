import { getPayload } from 'payload'
import config from '../payload.config'
import { client } from '../src/lib/sanity/client'
import dotenv from 'dotenv'

// Load environment variables
dotenv.config()

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

    // Initialize Payload
    const payload = await getPayload({ config })
    console.log('✅ Payload initialized successfully!')

    // Fetch all products from Sanity
    console.log('\n📦 Fetching products from Sanity...')
    const sanityProducts = await client.fetch<SanityProduct[]>(`
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
            seo: sanityProduct.seo,
          },
        })

        productIdMap.set(sanityProduct._id, payloadProduct.id)
        console.log(`   ✓ Migrated: ${sanityProduct.title}`)
      } catch (error) {
        console.error(`   ✗ Failed to migrate ${sanityProduct.title}:`, error)
      }
    }

    // Fetch home page from Sanity
    console.log('\n📄 Fetching home page from Sanity...')
    const sanityHomePage = await client.fetch<SanityPage>(`
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
