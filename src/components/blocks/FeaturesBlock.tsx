import AnimatedSection from '@/components/ui/AnimatedSection'
import Card, { CardTitle, CardDescription } from '@/components/ui/Card'
import * as LucideIcons from 'lucide-react'
import { Zap, type LucideProps } from 'lucide-react'
import { ComponentType } from 'react'

interface Feature {
    _key: string
    icon: string
    title: string
    description: string
}

interface FeaturesBlockProps {
    title?: string
    subtitle?: string
    features?: Feature[]
}

function getIcon(iconName: string): ComponentType<LucideProps> {
    const icons = LucideIcons as unknown as Record<string, ComponentType<LucideProps>>
    // Convert kebab-case or lowercase to PascalCase
    const pascalCase = iconName
        .split(/[-_]/)
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join('')

    return icons[pascalCase] || Zap
}

export default function FeaturesBlock({ title, subtitle, features = [] }: FeaturesBlockProps) {
    return (
        <section id="about" className="py-24 relative">
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

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => {
                        const Icon = getIcon(feature.icon)
                        return (
                            <AnimatedSection key={feature._key} delay={index * 0.1}>
                                <Card className="h-full">
                                    <div className="w-12 h-12 rounded-lg bg-cyan-500/10 flex items-center justify-center mb-4">
                                        <Icon className="w-6 h-6 text-cyan-400" />
                                    </div>
                                    <CardTitle>{feature.title}</CardTitle>
                                    <CardDescription>{feature.description}</CardDescription>
                                </Card>
                            </AnimatedSection>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}
