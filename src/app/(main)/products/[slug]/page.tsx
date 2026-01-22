import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'

// Force dynamic to avoid conflicts with admin operations
export const dynamic = 'force-dynamic'

// Payload CMS (primary)
import { getProductBySlug } from '@/lib/payload/client'

import AnimatedSection from '@/components/ui/AnimatedSection'
import Button from '@/components/ui/Button'
import Card, { CardTitle, CardDescription } from '@/components/ui/Card'
import RichText from '@/components/ui/RichText'
import { ArrowLeft, CheckCircle } from 'lucide-react'
import * as LucideIcons from 'lucide-react'
import { ComponentType } from 'react'
import type { LucideProps } from 'lucide-react'
import type { Metadata } from 'next'

interface ProductPageProps {
    params: Promise<{
        slug: string
    }>
}

interface GalleryImage {
    id?: string
    _key?: string
    asset: { _ref: string }
    alt?: string
    url?: string
}

interface Feature {
    id?: string
    _key?: string
    icon?: string
    title: string
    description: string
}

interface UseCase {
    id?: string
    _key?: string
    icon?: string
    title: string
    description: string
}

interface Product {
    _id: string
    title: string
    slug: { current: string }
    tagline?: string
    heroHeadline?: string
    heroSubheadline?: string
    heroImage?: { asset: { _ref: string }; url?: string }
    primaryCta?: { label: string; href: string }
    secondaryCta?: { label: string; href: string }
    description?: Array<{ _type: string; _key: string;[key: string]: unknown }>
    icon?: string
    category?: string
    features?: Feature[]
    specifications?: Array<{ id?: string; _key?: string; label: string; value: string }>
    useCases?: UseCase[]
    gallery?: GalleryImage[]
    relatedProducts?: Array<{ _id: string; title: string; slug: { current: string }; tagline?: string }>
    footerCta?: { headline: string; body: string; buttonLabel: string; buttonHref: string }
    seo?: { metaTitle?: string; metaDescription?: string; ogImage?: { asset: { _ref: string } } }
}

// Icon helper
function getIcon(iconName?: string): ComponentType<LucideProps> {
    if (!iconName) return LucideIcons.Zap
    const icons = LucideIcons as unknown as Record<string, ComponentType<LucideProps>>
    const pascalCase = iconName
        .split(/[-_]/)
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join('')
    return icons[pascalCase] || LucideIcons.Zap
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
    const { slug } = await params
    try {
        const payloadProduct = await getProductBySlug(slug)
        if (!payloadProduct) return { title: 'Product Not Found' }
        const product = payloadProduct as unknown as Product

        return {
            title: product.seo?.metaTitle || product.title,
            description: product.seo?.metaDescription || product.tagline,
        }
    } catch {
        return { title: 'Product' }
    }
}

export default async function ProductPage({ params }: ProductPageProps) {
    const { slug } = await params
    let product: Product | null = null

    // Try Payload first
    try {
        const payloadProduct = await getProductBySlug(slug)
        if (payloadProduct) {
            // Transform Payload format to expected Product format
            product = {
                ...payloadProduct,
                slug: { current: payloadProduct.slug },
            } as unknown as Product
            console.log('✅ Loaded product from Payload CMS')
        }
    } catch (error) {
        console.log('⚠️  Payload not available', error)
    }

    if (!product) {
        notFound()
    }

    return (
        <div className="pt-24 pb-16">
            {/* Back Button */}
            <div className="container mx-auto px-6 mb-8">
                <Link
                    href="/#products"
                    className="inline-flex items-center gap-2 text-slate-400 hover:text-cyan-400 transition-colors"
                >
                    <ArrowLeft size={20} />
                    Back to Products
                </Link>
            </div>

            {/* Hero Section */}
            <section className="container mx-auto px-6 mb-20">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <AnimatedSection>
                        <div>
                            {product.category && (
                                <span className="inline-block px-3 py-1 text-sm rounded-full bg-cyan-500/10 text-cyan-400 mb-4 uppercase tracking-wider">
                                    {product.category}
                                </span>
                            )}
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
                                {product.heroHeadline || product.title}
                            </h1>
                            {(product.heroSubheadline || product.tagline) && (
                                <p className="text-xl text-slate-300 mb-8 leading-relaxed">
                                    {product.heroSubheadline || product.tagline}
                                </p>
                            )}

                            {/* CTA Buttons */}
                            <div className="flex flex-wrap gap-4">
                                {product.primaryCta?.label && (
                                    <Button as="a" href={product.primaryCta.href || '#contact'} size="lg">
                                        {product.primaryCta.label}
                                    </Button>
                                )}
                                {product.secondaryCta?.label && (
                                    <Button as="a" href={product.secondaryCta.href || '#contact'} variant="secondary" size="lg">
                                        {product.secondaryCta.label}
                                    </Button>
                                )}
                            </div>
                        </div>
                    </AnimatedSection>

                    {/* Hero Image */}
                    {product.heroImage?.url && (
                        <AnimatedSection delay={0.2}>
                            <div className="relative aspect-video rounded-2xl overflow-hidden glass">
                                <Image
                                    src={product.heroImage.url}
                                    alt={product.title}
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                    priority
                                />
                            </div>
                        </AnimatedSection>
                    )}
                </div>
            </section>

            {/* Key Features */}
            {product.features && product.features.length > 0 && (
                <section className="container mx-auto px-6 mb-20">
                    <AnimatedSection>
                        <h2 className="text-2xl md:text-3xl font-bold text-white mb-12 text-center">
                            Key Features
                        </h2>
                    </AnimatedSection>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {product.features.map((feature, index) => {
                            const Icon = getIcon(feature.icon)
                            return (
                                <AnimatedSection key={feature.id || feature._key || index} delay={index * 0.1}>
                                    <Card className="h-full text-center">
                                        <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center mx-auto mb-4">
                                            <Icon className="w-7 h-7 text-cyan-400" />
                                        </div>
                                        <CardTitle className="text-xl mb-3">{feature.title}</CardTitle>
                                        <CardDescription>{feature.description}</CardDescription>
                                    </Card>
                                </AnimatedSection>
                            )
                        })}
                    </div>
                </section>
            )}

            {/* Description (Rich Text) */}
            {product.description && product.description.length > 0 && (
                <section className="container mx-auto px-6 mb-20">
                    <AnimatedSection>
                        <div className="max-w-3xl mx-auto">
                            <RichText value={product.description} />
                        </div>
                    </AnimatedSection>
                </section>
            )}

            {/* Technical Specifications */}
            {product.specifications && product.specifications.length > 0 && (
                <section className="container mx-auto px-6 mb-20">
                    <AnimatedSection>
                        <h2 className="text-2xl md:text-3xl font-bold text-white mb-8">
                            Technical Specifications
                        </h2>
                        <div className="glass rounded-xl overflow-hidden">
                            <table className="w-full">
                                <tbody>
                                    {product.specifications.map((spec, index) => (
                                        <tr
                                            key={spec.id || spec._key || index}
                                            className={index % 2 === 0 ? 'bg-slate-800/30' : ''}
                                        >
                                            <td className="px-6 py-4 text-slate-400 font-medium w-1/3">
                                                {spec.label}
                                            </td>
                                            <td className="px-6 py-4 text-white">
                                                {spec.value}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </AnimatedSection>
                </section>
            )}

            {/* Use Cases */}
            {product.useCases && product.useCases.length > 0 && (
                <section className="container mx-auto px-6 mb-20 py-16 bg-slate-800/30 rounded-3xl">
                    <AnimatedSection>
                        <h2 className="text-2xl md:text-3xl font-bold text-white mb-12 text-center">
                            Use Cases & Applications
                        </h2>
                    </AnimatedSection>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {product.useCases.map((useCase, index) => {
                            const Icon = getIcon(useCase.icon)
                            return (
                                <AnimatedSection key={useCase.id || useCase._key || index} delay={index * 0.1}>
                                    <div className="flex items-start gap-4 p-6 rounded-xl glass">
                                        <div className="w-10 h-10 rounded-lg bg-amber-500/20 flex items-center justify-center flex-shrink-0">
                                            <Icon className="w-5 h-5 text-amber-400" />
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-semibold text-white mb-2">
                                                {useCase.title}
                                            </h3>
                                            <p className="text-slate-400 text-sm">
                                                {useCase.description}
                                            </p>
                                        </div>
                                    </div>
                                </AnimatedSection>
                            )
                        })}
                    </div>
                </section>
            )}

            {/* Gallery */}
            {product.gallery && product.gallery.length > 0 && (
                <section className="container mx-auto px-6 mb-20">
                    <AnimatedSection>
                        <h2 className="text-2xl md:text-3xl font-bold text-white mb-8">Gallery</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {product.gallery.map((image, index) => (
                                <AnimatedSection key={image.id || image._key || index} delay={index * 0.1}>
                                    {image.url && (
                                        <div className="relative aspect-video rounded-xl overflow-hidden glass group">
                                            <Image
                                                src={image.url}
                                                alt={image.alt || `${product?.title || 'Product'} image ${index + 1}`}
                                                fill
                                                className="object-cover transition-transform duration-300 group-hover:scale-105"
                                                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                            />
                                        </div>
                                    )}
                                </AnimatedSection>
                            ))}
                        </div>
                    </AnimatedSection>
                </section>
            )}

            {/* Related Products */}
            {product.relatedProducts && product.relatedProducts.length > 0 && (
                <section className="container mx-auto px-6 mb-20">
                    <AnimatedSection>
                        <h2 className="text-2xl md:text-3xl font-bold text-white mb-8">Related Products</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {product.relatedProducts.map((related) => (
                                <Link key={related._id} href={`/products/${related.slug.current}`}>
                                    <Card className="h-full">
                                        <CardTitle>{related.title}</CardTitle>
                                        <CardDescription>{related.tagline}</CardDescription>
                                    </Card>
                                </Link>
                            ))}
                        </div>
                    </AnimatedSection>
                </section>
            )}

            {/* Footer CTA */}
            <section className="container mx-auto px-6">
                <AnimatedSection>
                    <div className="text-center rounded-3xl p-12 bg-gradient-to-r from-cyan-600/20 via-blue-600/20 to-purple-600/20 border border-slate-700">
                        <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                            {product.footerCta?.headline || `Ready to Deploy ${product.title}?`}
                        </h2>
                        <p className="text-slate-300 mb-8 max-w-2xl mx-auto">
                            {product.footerCta?.body || 'Contact our engineering team for technical documentation and custom integration support.'}
                        </p>
                        <Button as="a" href={product.footerCta?.buttonHref || '/#contact'} size="lg">
                            {product.footerCta?.buttonLabel || 'Get in Touch'}
                        </Button>
                    </div>
                </AnimatedSection>
            </section>
        </div>
    )
}
