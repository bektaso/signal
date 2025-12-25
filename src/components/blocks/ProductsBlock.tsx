import Link from 'next/link'
import AnimatedSection from '@/components/ui/AnimatedSection'
import Card, { CardTitle, CardDescription } from '@/components/ui/Card'
import * as LucideIcons from 'lucide-react'
import { Box, ArrowRight, type LucideProps } from 'lucide-react'
import { ComponentType } from 'react'

interface Product {
    _id: string
    title: string
    slug: { current: string }
    tagline: string
    icon: string
    category: string
}

interface ProductsBlockProps {
    title?: string
    subtitle?: string
    products?: Product[]
}

function getIcon(iconName: string): ComponentType<LucideProps> {
    const icons = LucideIcons as unknown as Record<string, ComponentType<LucideProps>>
    const pascalCase = iconName
        .split(/[-_]/)
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join('')

    return icons[pascalCase] || Box
}

const categoryColors: Record<string, string> = {
    hardware: 'bg-amber-500/10 text-amber-400',
    platform: 'bg-blue-500/10 text-blue-400',
    software: 'bg-cyan-500/10 text-cyan-400',
    solution: 'bg-emerald-500/10 text-emerald-400',
}

export default function ProductsBlock({ title, subtitle, products = [] }: ProductsBlockProps) {
    return (
        <section id="products" className="py-24 relative bg-slate-900/50">
            <div className="container mx-auto px-6">
                <AnimatedSection className="text-center mb-16">
                    {title && (
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                            {title}
                        </h2>
                    )}
                    {subtitle && (
                        <p className="text-slate-400 max-w-2xl mx-auto">
                            {subtitle}
                        </p>
                    )}
                </AnimatedSection>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {products.map((product, index) => {
                        const Icon = getIcon(product.icon || 'box')
                        return (
                            <AnimatedSection key={product._id} delay={index * 0.1}>
                                <Link href={`/products/${product.slug.current}`}>
                                    <Card className="h-full group cursor-pointer">
                                        <div className="flex items-start justify-between mb-4">
                                            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center">
                                                <Icon className="w-6 h-6 text-cyan-400" />
                                            </div>
                                            {product.category && (
                                                <span className={`text-xs px-2 py-1 rounded-full ${categoryColors[product.category] || 'bg-slate-700 text-slate-300'}`}>
                                                    {product.category}
                                                </span>
                                            )}
                                        </div>

                                        <CardTitle className="group-hover:text-cyan-400 transition-colors">
                                            {product.title}
                                        </CardTitle>
                                        <CardDescription>{product.tagline}</CardDescription>

                                        <div className="mt-4 flex items-center text-cyan-400 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                                            Learn more <ArrowRight className="w-4 h-4 ml-1" />
                                        </div>
                                    </Card>
                                </Link>
                            </AnimatedSection>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}
