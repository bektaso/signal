'use client'

import dynamic from 'next/dynamic'
import { useGPUTier } from '@/hooks/useGPUTier'
import FallbackGradient from './FallbackGradient'

const Scene3D = dynamic(() => import('./Scene3D'), {
    ssr: false,
    loading: () => <FallbackGradient />
})

interface HeroWrapperProps {
    headline: string
    subheadline?: string
    ctaPrimary?: {
        label: string
        href: string
    }
    ctaSecondary?: {
        label: string
        href: string
    }
}

export default function HeroWrapper({
    headline,
    subheadline,
    ctaPrimary,
    ctaSecondary,
}: HeroWrapperProps) {
    const tier = useGPUTier()

    return (
        <section className="relative h-screen w-full overflow-hidden">
            {/* Background */}
            {tier === 'high' || tier === 'medium' ? (
                <div className="absolute inset-0">
                    <Scene3D />
                </div>
            ) : (
                <FallbackGradient />
            )}

            {/* Content Overlay */}
            <div className="absolute inset-0 z-10 flex items-center justify-center">
                <div className="container mx-auto px-6 text-center">
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 gradient-text">
                        {headline}
                    </h1>

                    {subheadline && (
                        <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto mb-10">
                            {subheadline}
                        </p>
                    )}

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        {ctaPrimary && (
                            <a
                                href={ctaPrimary.href}
                                className="inline-flex items-center justify-center px-8 py-4 rounded-lg bg-cyan-500 text-slate-900 font-semibold hover:bg-cyan-400 transition-all duration-300 glow-cyan"
                            >
                                {ctaPrimary.label}
                            </a>
                        )}

                        {ctaSecondary && (
                            <a
                                href={ctaSecondary.href}
                                className="inline-flex items-center justify-center px-8 py-4 rounded-lg border border-slate-600 text-slate-300 font-semibold hover:border-cyan-500 hover:text-cyan-400 transition-all duration-300"
                            >
                                {ctaSecondary.label}
                            </a>
                        )}
                    </div>
                </div>
            </div>

            {/* Scroll indicator */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
                <div className="w-6 h-10 rounded-full border-2 border-slate-600 flex justify-center py-2">
                    <div className="w-1 h-3 bg-cyan-500 rounded-full animate-bounce" />
                </div>
            </div>
        </section>
    )
}
