import Image from 'next/image'
import Link from 'next/link'
import { client } from '@/lib/sanity/client'
import { urlFor } from '@/lib/sanity/image'
import AnimatedSection from '@/components/ui/AnimatedSection'
import Button from '@/components/ui/Button'
import Card, { CardTitle, CardDescription } from '@/components/ui/Card'
import * as LucideIcons from 'lucide-react'
import { ComponentType } from 'react'
import type { LucideProps } from 'lucide-react'
import type { Metadata } from 'next'
import { groq } from 'next-sanity'

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

interface CareersData {
    heroHeadline?: string
    heroSubheadline?: string
    heroImage?: { asset: { _ref: string } }
    heroCta?: { label: string; href: string }
    whyUsHeadline?: string
    whyUsBody?: string
    whyUsPoints?: Array<{ _key: string; title: string; description: string }>
    cultureHeadline?: string
    cultureValues?: Array<{ _key: string; icon: string; title: string; description: string }>
    perksHeadline?: string
    perks?: Array<{ _key: string; icon: string; title: string; description: string }>
    positionsHeadline?: string
    positions?: Array<{ _key: string; title: string; type: string; location: string; department: string; description: string; applyLink: string; isOpen: boolean }>
    emptyStateText?: string
    footerCta?: { headline: string; body: string; buttonLabel: string; buttonHref: string }
    seo?: { metaTitle: string; metaDescription: string }
}

const careersQuery = groq`*[_type == "careers"][0]{
  heroHeadline,
  heroSubheadline,
  heroImage,
  heroCta,
  whyUsHeadline,
  whyUsBody,
  whyUsPoints,
  cultureHeadline,
  cultureValues,
  perksHeadline,
  perks,
  positionsHeadline,
  positions,
  emptyStateText,
  footerCta,
  seo
}`

// Default content (fallback)
const defaultContent: CareersData = {
    heroHeadline: 'Shape the Future of Edge Intelligence',
    heroSubheadline: "We don't just write code; we bridge the gap between physical signals and digital insights. Join the team building the nervous system of smart cities and industries.",
    heroCta: { label: 'View Open Roles', href: '#positions' },
    whyUsHeadline: 'Why Signalton?',
    whyUsBody: 'At Signalton, we tackle the hardest problems in IoT: Latency, Bandwidth, and Privacy. We are a playground for the curious—where Digital Signal Processing meets Modern Web Tech, and where a line of code translates into real-world action.',
    whyUsPoints: [
        { _key: 'p1', title: 'No Silos', description: 'Hardware engineers talk to Frontend devs. We believe innovation happens at the intersection.' },
        { _key: 'p2', title: 'Tangible Impact', description: "Your work won't be buried in a server. It will manage traffic, secure facilities, and optimize industries." },
    ],
    cultureHeadline: 'Our Culture & Values',
    cultureValues: [
        { _key: 'c1', icon: 'lightbulb', title: 'Relentless Curiosity', description: "We love 'impossible' challenges. We experiment, we fail fast, and we learn faster. R&D is in our DNA." },
        { _key: 'c2', icon: 'cpu', title: 'Engineering Excellence', description: "Whether it's a PCB layout or a React component, we obsess over quality, performance, and clean architecture." },
        { _key: 'c3', icon: 'globe', title: 'Global Vision', description: 'Based in Turkey, building for the world. We adhere to global standards in everything we do.' },
    ],
    perksHeadline: 'Fuel for Your Best Work',
    perks: [
        { _key: 'pk1', icon: 'monitor', title: 'The Best Tools', description: 'High-end workstations, latest prototyping gear, and access to our hardware labs.' },
        { _key: 'pk2', icon: 'graduation-cap', title: 'Continuous Learning', description: 'Budget for courses, conferences, and certifications.' },
        { _key: 'pk3', icon: 'clock', title: 'Flexible Culture', description: 'We value output over hours. Hybrid working options available.' },
        { _key: 'pk4', icon: 'users', title: 'Collaborative Environment', description: 'Regular tech talks, hackathons, and team retreats.' },
    ],
    positionsHeadline: 'Open Positions',
    positions: [
        { _key: 'j1', title: 'Senior Embedded Software Engineer', type: 'Full-time', location: 'Istanbul / Remote', department: 'Engineering', description: 'C/C++ expertise for embedded systems development.', applyLink: 'mailto:careers@signalton.com.tr', isOpen: true },
        { _key: 'j2', title: 'Full Stack Developer', type: 'Full-time', location: 'Istanbul / Remote', department: 'Engineering', description: 'Next.js / Node.js expertise for our cloud platforms.', applyLink: 'mailto:careers@signalton.com.tr', isOpen: true },
        { _key: 'j3', title: 'Hardware Design Engineer', type: 'Full-time', location: 'Istanbul', department: 'Hardware', description: 'PCB/Altium expertise for IoT device design.', applyLink: 'mailto:careers@signalton.com.tr', isOpen: true },
    ],
    emptyStateText: "Don't see your role? We are always looking for exceptional talent.",
    footerCta: {
        headline: 'Create Your Own Role',
        body: "Think you can make a difference but don't fit the boxes above? Send us your portfolio and tell us how you can contribute to the Signalton vision.",
        buttonLabel: 'Pitch Us',
        buttonHref: 'mailto:careers@signalton.com.tr',
    },
}

export async function generateMetadata(): Promise<Metadata> {
    try {
        const data = await client.fetch(careersQuery) as CareersData | null
        return {
            title: data?.seo?.metaTitle || 'Careers | Signalton',
            description: data?.seo?.metaDescription || 'Join the team building the future of Edge AI and IoT',
        }
    } catch {
        return { title: 'Careers | Signalton' }
    }
}

export default async function CareersPage() {
    let data: CareersData = defaultContent

    try {
        const fetched = await client.fetch(careersQuery)
        if (fetched) {
            data = { ...defaultContent, ...fetched }
        }
    } catch (error) {
        console.error('Failed to fetch careers data:', error)
    }

    const openPositions = data.positions?.filter(p => p.isOpen) || []

    return (
        <div className="pt-24 pb-16">
            {/* Hero Section */}
            <section className="container mx-auto px-6 mb-20">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <AnimatedSection>
                        <div>
                            <span className="inline-block px-3 py-1 text-sm rounded-full bg-purple-500/10 text-purple-400 mb-4 uppercase tracking-wider">
                                Careers
                            </span>
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                                {data.heroHeadline}
                            </h1>
                            <p className="text-xl text-slate-300 mb-8 leading-relaxed">
                                {data.heroSubheadline}
                            </p>
                            {data.heroCta?.label && (
                                <Button as="a" href={data.heroCta.href || '#positions'} size="lg">
                                    {data.heroCta.label}
                                </Button>
                            )}
                        </div>
                    </AnimatedSection>

                    {data.heroImage?.asset && (
                        <AnimatedSection delay={0.2}>
                            <div className="relative aspect-video rounded-2xl overflow-hidden glass">
                                <Image
                                    src={urlFor(data.heroImage).width(800).height(450).url()}
                                    alt="Team at Signalton"
                                    fill
                                    className="object-cover"
                                    priority
                                />
                            </div>
                        </AnimatedSection>
                    )}
                </div>
            </section>

            {/* Why Us Section */}
            <section className="container mx-auto px-6 mb-20">
                <AnimatedSection>
                    <div className="max-w-3xl mx-auto text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                            {data.whyUsHeadline}
                        </h2>
                        <p className="text-lg text-slate-400 leading-relaxed">
                            {data.whyUsBody}
                        </p>
                    </div>
                </AnimatedSection>

                {data.whyUsPoints && data.whyUsPoints.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                        {data.whyUsPoints.map((point, index) => (
                            <AnimatedSection key={point._key} delay={index * 0.1}>
                                <div className="flex items-start gap-4 p-6 rounded-xl glass h-full">
                                    <div className="w-10 h-10 rounded-lg bg-cyan-500/20 flex items-center justify-center flex-shrink-0">
                                        <LucideIcons.CheckCircle className="w-5 h-5 text-cyan-400" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold text-white mb-2">{point.title}</h3>
                                        <p className="text-slate-400">{point.description}</p>
                                    </div>
                                </div>
                            </AnimatedSection>
                        ))}
                    </div>
                )}
            </section>

            {/* Culture & Values */}
            {data.cultureValues && data.cultureValues.length > 0 && (
                <section className="container mx-auto px-6 mb-20 py-16 bg-slate-800/30 rounded-3xl">
                    <AnimatedSection>
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 text-center">
                            {data.cultureHeadline}
                        </h2>
                    </AnimatedSection>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {data.cultureValues.map((value, index) => {
                            const Icon = getIcon(value.icon)
                            return (
                                <AnimatedSection key={value._key} delay={index * 0.1}>
                                    <Card className="h-full text-center">
                                        <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center mx-auto mb-4">
                                            <Icon className="w-7 h-7 text-purple-400" />
                                        </div>
                                        <CardTitle className="text-xl mb-3">{value.title}</CardTitle>
                                        <CardDescription>{value.description}</CardDescription>
                                    </Card>
                                </AnimatedSection>
                            )
                        })}
                    </div>
                </section>
            )}

            {/* Perks */}
            {data.perks && data.perks.length > 0 && (
                <section className="container mx-auto px-6 mb-20">
                    <AnimatedSection>
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 text-center">
                            {data.perksHeadline}
                        </h2>
                    </AnimatedSection>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {data.perks.map((perk, index) => {
                            const Icon = getIcon(perk.icon)
                            return (
                                <AnimatedSection key={perk._key} delay={index * 0.1}>
                                    <div className="p-6 rounded-xl glass text-center">
                                        <div className="w-12 h-12 rounded-lg bg-amber-500/20 flex items-center justify-center mx-auto mb-4">
                                            <Icon className="w-6 h-6 text-amber-400" />
                                        </div>
                                        <h3 className="text-lg font-semibold text-white mb-2">{perk.title}</h3>
                                        <p className="text-slate-400 text-sm">{perk.description}</p>
                                    </div>
                                </AnimatedSection>
                            )
                        })}
                    </div>
                </section>
            )}

            {/* Open Positions */}
            <section id="positions" className="container mx-auto px-6 mb-20">
                <AnimatedSection>
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 text-center">
                        {data.positionsHeadline}
                    </h2>
                </AnimatedSection>

                {openPositions.length > 0 ? (
                    <div className="max-w-3xl mx-auto space-y-4">
                        {openPositions.map((job, index) => (
                            <AnimatedSection key={job._key} delay={index * 0.1}>
                                <div className="p-6 rounded-xl glass hover:border-cyan-500/50 border border-transparent transition-colors">
                                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                        <div>
                                            <h3 className="text-xl font-semibold text-white mb-2">{job.title}</h3>
                                            <div className="flex flex-wrap gap-3 text-sm">
                                                <span className="px-2 py-1 rounded bg-cyan-500/10 text-cyan-400">
                                                    {job.type}
                                                </span>
                                                <span className="px-2 py-1 rounded bg-slate-700 text-slate-300">
                                                    {job.location}
                                                </span>
                                                {job.department && (
                                                    <span className="px-2 py-1 rounded bg-slate-700 text-slate-300">
                                                        {job.department}
                                                    </span>
                                                )}
                                            </div>
                                            {job.description && (
                                                <p className="text-slate-400 mt-3">{job.description}</p>
                                            )}
                                        </div>
                                        <Button as="a" href={job.applyLink || 'mailto:careers@signalton.com.tr'} variant="secondary">
                                            Apply
                                        </Button>
                                    </div>
                                </div>
                            </AnimatedSection>
                        ))}
                    </div>
                ) : (
                    <AnimatedSection>
                        <div className="text-center py-12">
                            <LucideIcons.Briefcase className="w-12 h-12 text-slate-600 mx-auto mb-4" />
                            <p className="text-slate-400">{data.emptyStateText}</p>
                        </div>
                    </AnimatedSection>
                )}
            </section>

            {/* Footer CTA */}
            <section className="container mx-auto px-6">
                <AnimatedSection>
                    <div className="text-center rounded-3xl p-12 bg-gradient-to-r from-purple-600/20 via-pink-600/20 to-cyan-600/20 border border-slate-700">
                        <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                            {data.footerCta?.headline}
                        </h2>
                        <p className="text-slate-300 mb-8 max-w-2xl mx-auto">
                            {data.footerCta?.body}
                        </p>
                        <Button as="a" href={data.footerCta?.buttonHref || 'mailto:careers@signalton.com.tr'} size="lg">
                            {data.footerCta?.buttonLabel || 'Contact Us'}
                        </Button>
                    </div>
                </AnimatedSection>
            </section>
        </div>
    )
}
