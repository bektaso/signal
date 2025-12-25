import AnimatedSection from '@/components/ui/AnimatedSection'
import Button from '@/components/ui/Button'

interface CTABlockProps {
    headline?: string
    subheadline?: string
    cta?: {
        label: string
        href: string
    }
}

export default function CTABlock({ headline, subheadline, cta }: CTABlockProps) {
    return (
        <section className="py-24 relative">
            <div className="container mx-auto px-6">
                <AnimatedSection>
                    <div className="relative rounded-2xl overflow-hidden">
                        {/* Background gradient */}
                        <div className="absolute inset-0 bg-gradient-to-r from-cyan-600/20 via-blue-600/20 to-cyan-600/20" />

                        {/* Glass overlay */}
                        <div className="relative z-10 glass p-12 md:p-16 text-center">
                            {headline && (
                                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                                    {headline}
                                </h2>
                            )}

                            {subheadline && (
                                <p className="text-slate-300 max-w-2xl mx-auto mb-8">
                                    {subheadline}
                                </p>
                            )}

                            {cta && (
                                <Button as="a" href={cta.href} size="lg">
                                    {cta.label}
                                </Button>
                            )}
                        </div>
                    </div>
                </AnimatedSection>
            </div>
        </section>
    )
}
