import { PortableText, PortableTextComponents } from '@portabletext/react'
import Image from 'next/image'
import { urlFor } from '@/lib/sanity/image'

// Type for Portable Text blocks
interface PortableTextBlock {
    _type: string
    _key: string
    [key: string]: unknown
}

// Custom components for rendering
const components: PortableTextComponents = {
    block: {
        h2: ({ children }) => (
            <h2 className="text-2xl font-bold text-white mt-8 mb-4">{children}</h2>
        ),
        h3: ({ children }) => (
            <h3 className="text-xl font-semibold text-white mt-6 mb-3">{children}</h3>
        ),
        normal: ({ children }) => (
            <p className="text-slate-400 leading-relaxed mb-4">{children}</p>
        ),
        blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-cyan-500 pl-4 my-6 text-slate-300 italic">
                {children}
            </blockquote>
        ),
    },
    marks: {
        strong: ({ children }) => (
            <strong className="font-semibold text-white">{children}</strong>
        ),
        em: ({ children }) => <em className="italic">{children}</em>,
        underline: ({ children }) => <span className="underline">{children}</span>,
        code: ({ children }) => (
            <code className="bg-slate-800 px-1.5 py-0.5 rounded text-cyan-400 text-sm font-mono">
                {children}
            </code>
        ),
        link: ({ children, value }) => (
            <a
                href={value?.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan-400 hover:text-cyan-300 underline transition-colors"
            >
                {children}
            </a>
        ),
    },
    list: {
        bullet: ({ children }) => (
            <ul className="list-disc list-inside space-y-2 mb-4 text-slate-400">
                {children}
            </ul>
        ),
        number: ({ children }) => (
            <ol className="list-decimal list-inside space-y-2 mb-4 text-slate-400">
                {children}
            </ol>
        ),
    },
    listItem: {
        bullet: ({ children }) => <li className="ml-2">{children}</li>,
        number: ({ children }) => <li className="ml-2">{children}</li>,
    },
    types: {
        image: ({ value }) => {
            if (!value?.asset) return null
            return (
                <figure className="my-8">
                    <div className="relative aspect-video rounded-xl overflow-hidden">
                        <Image
                            src={urlFor(value).width(800).height(450).url()}
                            alt={value.alt || 'Image'}
                            fill
                            className="object-cover"
                        />
                    </div>
                    {value.caption && (
                        <figcaption className="text-center text-slate-500 text-sm mt-2">
                            {value.caption}
                        </figcaption>
                    )}
                </figure>
            )
        },
    },
}

interface RichTextProps {
    value: PortableTextBlock[]
    className?: string
}

export default function RichText({ value, className = '' }: RichTextProps) {
    if (!value || value.length === 0) return null

    return (
        <div className={`prose prose-invert max-w-none ${className}`}>
            <PortableText value={value} components={components} />
        </div>
    )
}
