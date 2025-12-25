import HeroWrapper from '@/components/hero/HeroWrapper'
import FeaturesBlock from './FeaturesBlock'
import ProductsBlock from './ProductsBlock'
import ServicesBlock from './ServicesBlock'
import CTABlock from './CTABlock'
import ContactBlock from './ContactBlock'

interface Block {
    _key: string
    _type: string
    [key: string]: unknown
}

interface BlockRendererProps {
    block: Block
}

export default function BlockRenderer({ block }: BlockRendererProps) {
    switch (block._type) {
        case 'heroBlock':
            return (
                <HeroWrapper
                    headline={block.headline as string}
                    subheadline={block.subheadline as string}
                    ctaPrimary={block.ctaPrimary as { label: string; href: string }}
                    ctaSecondary={block.ctaSecondary as { label: string; href: string }}
                />
            )

        case 'featuresBlock':
            return (
                <FeaturesBlock
                    title={block.title as string}
                    subtitle={block.subtitle as string}
                    features={block.features as Array<{ _key: string; icon: string; title: string; description: string }>}
                />
            )

        case 'productsBlock':
            return (
                <ProductsBlock
                    title={block.title as string}
                    subtitle={block.subtitle as string}
                    products={block.products as Array<{ _id: string; title: string; slug: { current: string }; tagline: string; icon: string; category: string }>}
                />
            )

        case 'servicesBlock':
            return (
                <ServicesBlock
                    title={block.title as string}
                    subtitle={block.subtitle as string}
                    services={block.services as Array<{ _key: string; title: string; description: string }>}
                />
            )

        case 'ctaBlock':
            return (
                <CTABlock
                    headline={block.headline as string}
                    subheadline={block.subheadline as string}
                    cta={block.cta as { label: string; href: string }}
                />
            )

        case 'contactBlock':
            return (
                <ContactBlock
                    title={block.title as string}
                    subtitle={block.subtitle as string}
                    email={block.email as string}
                    phone={block.phone as string}
                    address={block.address as string}
                    linkedIn={block.linkedIn as string}
                />
            )

        default:
            console.warn(`Unknown block type: ${block._type}`)
            return null
    }
}
