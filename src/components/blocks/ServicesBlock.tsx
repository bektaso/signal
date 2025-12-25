import AnimatedSection from '@/components/ui/AnimatedSection'
import { CheckCircle } from 'lucide-react'

interface Service {
    _key: string
    title: string
    description: string
}

interface ServicesBlockProps {
    title?: string
    subtitle?: string
    services?: Service[]
}

export default function ServicesBlock({ title, subtitle, services = [] }: ServicesBlockProps) {
    return (
        <section id="services" className="py-24 relative">
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

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                    {services.map((service, index) => (
                        <AnimatedSection key={service._key} delay={index * 0.1}>
                            <div className="flex items-start gap-4 p-6 rounded-xl glass hover:border-cyan-500/50 transition-all duration-300">
                                <div className="flex-shrink-0">
                                    <CheckCircle className="w-6 h-6 text-cyan-400 mt-0.5" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-white mb-2">
                                        {service.title}
                                    </h3>
                                    <p className="text-slate-400 text-sm leading-relaxed">
                                        {service.description}
                                    </p>
                                </div>
                            </div>
                        </AnimatedSection>
                    ))}
                </div>
            </div>
        </section>
    )
}
