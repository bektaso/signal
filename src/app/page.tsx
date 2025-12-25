import { client } from '@/lib/sanity/client'
import { homePageQuery } from '@/lib/sanity/queries'
import BlockRenderer from '@/components/blocks/BlockRenderer'
import HeroWrapper from '@/components/hero/HeroWrapper'
import FeaturesBlock from '@/components/blocks/FeaturesBlock'
import ProductsBlock from '@/components/blocks/ProductsBlock'
import ServicesBlock from '@/components/blocks/ServicesBlock'
import ContactBlock from '@/components/blocks/ContactBlock'

// Default content for demo/fallback
const defaultBlocks = [
  {
    _key: 'hero',
    _type: 'heroBlock',
    headline: 'Invisible Intelligence',
    subheadline: 'Advanced signal processing, AI, and digital systems for challenging real-world problems.',
    ctaPrimary: { label: 'Explore Solutions', href: '#products' },
    ctaSecondary: { label: 'Contact Us', href: '#contact' },
  },
  {
    _key: 'features',
    _type: 'featuresBlock',
    title: 'About Signalton',
    subtitle: 'Bringing together decades of academic and industry expertise in signal processing and AI.',
    features: [
      { _key: 'f1', icon: 'cpu', title: 'IoT & Edge Computing', description: 'Cutting-edge sensor networks and edge processing solutions.' },
      { _key: 'f2', icon: 'brain', title: 'AI & Machine Learning', description: 'Deep learning and pattern recognition for intelligent systems.' },
      { _key: 'f3', icon: 'eye', title: 'Computer Vision', description: 'Image and video analysis for industrial and smart city applications.' },
      { _key: 'f4', icon: 'radio', title: 'Signal Processing', description: 'Advanced DSP, spectral analysis, and acoustic signal processing.' },
      { _key: 'f5', icon: 'database', title: 'Data Fusion', description: 'Intelligent data integration and decision support systems.' },
      { _key: 'f6', icon: 'shield', title: 'Disaster Resilience', description: 'Smart monitoring systems for structural health and safety.' },
    ],
  },
  {
    _key: 'products',
    _type: 'productsBlock',
    title: 'Products & Solutions',
    subtitle: 'Versatile digital systems and end-to-end intelligent solutions.',
    products: [
      { _id: 'p1', title: 'SigMote', slug: { current: 'sigmote' }, tagline: 'DSP-CV-AI Edge Computing Platform', icon: 'cpu', category: 'hardware' },
      { _id: 'p2', title: 'DataMote', slug: { current: 'datamote' }, tagline: 'IoT Sensor/Actuator Platform', icon: 'radio', category: 'hardware' },
      { _id: 'p3', title: 'SigCloud', slug: { current: 'sigcloud' }, tagline: 'IoT/Edge Data Platform', icon: 'cloud', category: 'platform' },
      { _id: 'p4', title: 'Locomopt', slug: { current: 'locomopt' }, tagline: 'IoT/Edge GIS Data Platform', icon: 'map', category: 'platform' },
    ],
  },
  {
    _key: 'services',
    _type: 'servicesBlock',
    title: 'Our Services',
    subtitle: 'Outstanding expert team with exceptional experience.',
    services: [
      { _key: 's1', title: 'R&D Consulting', description: 'Outsourced research, collaboration, or consulting towards scalable joint products.' },
      { _key: 's2', title: 'Signal Processing', description: 'Spectral analysis, acoustic/audio/vibration analysis, array signal processing.' },
      { _key: 's3', title: 'AI Implementation', description: 'Machine learning, deep learning, pattern recognition, classification systems.' },
      { _key: 's4', title: 'Electronic Design', description: 'Hardware design and production management for prototyping and volume production.' },
      { _key: 's5', title: 'Software Development', description: 'Custom software solutions and embedded programming.' },
      { _key: 's6', title: 'Startup Consultancy', description: 'Idea preparation, project development, funding and rapid-growth support.' },
    ],
  },
  {
    _key: 'contact',
    _type: 'contactBlock',
    title: 'Contact Us',
    subtitle: 'Get in touch for any inquiry about our products and services.',
    email: 'info@signalton.com.tr',
    phone: '+90-533-348-3873',
    address: 'Ankara, Turkey',
    linkedIn: 'https://www.linkedin.com/company/signalton',
  },
]

export default async function HomePage() {
  let pageData: { blocks?: Array<{ _key: string; _type: string;[key: string]: unknown }> } | null = null

  try {
    pageData = await client.fetch(homePageQuery)
  } catch (error) {
    console.error('Failed to fetch home page:', error)
  }

  const blocks = pageData?.blocks || defaultBlocks

  return (
    <>
      {blocks.map((block) => (
        <BlockRenderer key={block._key} block={block} />
      ))}
    </>
  )
}
