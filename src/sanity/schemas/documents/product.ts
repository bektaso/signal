import { defineField, defineType } from 'sanity'

export const product = defineType({
    name: 'product',
    title: 'Product',
    type: 'document',
    groups: [
        { name: 'general', title: 'General', default: true },
        { name: 'hero', title: 'Hero Section' },
        { name: 'content', title: 'Content' },
        { name: 'seo', title: 'SEO' },
    ],
    fields: [
        // ===== GENERAL =====
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
            group: 'general',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            group: 'general',
            options: {
                source: 'title',
                maxLength: 96,
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'tagline',
            title: 'Tagline',
            type: 'string',
            group: 'general',
            description: 'Short description for product cards (e.g., "Edge AI & Signal Processing Platform")',
        }),
        defineField({
            name: 'icon',
            title: 'Icon Name',
            type: 'string',
            group: 'general',
            description: 'Lucide icon name (e.g., cpu, radio, cloud, map)',
        }),
        defineField({
            name: 'category',
            title: 'Category',
            type: 'string',
            group: 'general',
            options: {
                list: [
                    { title: 'Hardware', value: 'hardware' },
                    { title: 'Platform', value: 'platform' },
                    { title: 'Software', value: 'software' },
                    { title: 'Solution', value: 'solution' },
                ],
            },
        }),
        defineField({
            name: 'order',
            title: 'Display Order',
            type: 'number',
            group: 'general',
            initialValue: 0,
        }),

        // ===== HERO SECTION =====
        defineField({
            name: 'heroHeadline',
            title: 'Hero Headline',
            type: 'string',
            group: 'hero',
            description: 'Main headline (e.g., "Intelligence at the Edge")',
        }),
        defineField({
            name: 'heroSubheadline',
            title: 'Hero Sub-headline',
            type: 'text',
            group: 'hero',
            rows: 3,
            description: 'Supporting text under the headline',
        }),
        defineField({
            name: 'heroImage',
            title: 'Hero Image',
            type: 'image',
            group: 'hero',
            options: {
                hotspot: true,
            },
        }),
        defineField({
            name: 'primaryCta',
            title: 'Primary CTA Button',
            type: 'object',
            group: 'hero',
            fields: [
                { name: 'label', title: 'Button Label', type: 'string' },
                { name: 'href', title: 'Button Link', type: 'string' },
            ],
        }),
        defineField({
            name: 'secondaryCta',
            title: 'Secondary CTA Button',
            type: 'object',
            group: 'hero',
            fields: [
                { name: 'label', title: 'Button Label', type: 'string' },
                { name: 'href', title: 'Button Link', type: 'string' },
            ],
        }),

        // ===== CONTENT =====
        defineField({
            name: 'description',
            title: 'Full Description',
            type: 'array',
            group: 'content',
            of: [
                {
                    type: 'block',
                    styles: [
                        { title: 'Normal', value: 'normal' },
                        { title: 'H2', value: 'h2' },
                        { title: 'H3', value: 'h3' },
                        { title: 'Quote', value: 'blockquote' },
                    ],
                    marks: {
                        decorators: [
                            { title: 'Bold', value: 'strong' },
                            { title: 'Italic', value: 'em' },
                            { title: 'Underline', value: 'underline' },
                            { title: 'Code', value: 'code' },
                        ],
                        annotations: [
                            {
                                name: 'link',
                                type: 'object',
                                title: 'Link',
                                fields: [
                                    {
                                        name: 'href',
                                        type: 'url',
                                        title: 'URL',
                                    },
                                ],
                            },
                        ],
                    },
                    lists: [
                        { title: 'Bullet', value: 'bullet' },
                        { title: 'Numbered', value: 'number' },
                    ],
                },
                {
                    type: 'image',
                    options: { hotspot: true },
                    fields: [
                        { name: 'alt', type: 'string', title: 'Alt Text' },
                        { name: 'caption', type: 'string', title: 'Caption' },
                    ],
                },
            ],
        }),
        defineField({
            name: 'features',
            title: 'Key Features',
            type: 'array',
            group: 'content',
            of: [
                {
                    type: 'object',
                    preview: {
                        select: {
                            title: 'title',
                            subtitle: 'description',
                        },
                    },
                    fields: [
                        defineField({
                            name: 'icon',
                            title: 'Icon Name',
                            type: 'string',
                            description: 'Lucide icon (e.g., zap, shield, database)',
                        }),
                        defineField({
                            name: 'title',
                            title: 'Feature Title',
                            type: 'string',
                        }),
                        defineField({
                            name: 'description',
                            title: 'Feature Description',
                            type: 'text',
                            rows: 2,
                        }),
                    ],
                },
            ],
        }),
        defineField({
            name: 'specifications',
            title: 'Technical Specifications',
            type: 'array',
            group: 'content',
            of: [
                {
                    type: 'object',
                    fields: [
                        defineField({
                            name: 'label',
                            title: 'Label',
                            type: 'string',
                        }),
                        defineField({
                            name: 'value',
                            title: 'Value',
                            type: 'string',
                        }),
                    ],
                },
            ],
        }),
        defineField({
            name: 'useCases',
            title: 'Use Cases / Applications',
            type: 'array',
            group: 'content',
            of: [
                {
                    type: 'object',
                    preview: {
                        select: {
                            title: 'title',
                            subtitle: 'description',
                        },
                    },
                    fields: [
                        defineField({
                            name: 'icon',
                            title: 'Icon Name',
                            type: 'string',
                        }),
                        defineField({
                            name: 'title',
                            title: 'Use Case Title',
                            type: 'string',
                        }),
                        defineField({
                            name: 'description',
                            title: 'Description',
                            type: 'text',
                            rows: 2,
                        }),
                    ],
                },
            ],
        }),
        defineField({
            name: 'gallery',
            title: 'Gallery',
            type: 'array',
            group: 'content',
            of: [
                {
                    type: 'image',
                    options: {
                        hotspot: true,
                    },
                    fields: [
                        defineField({
                            name: 'alt',
                            title: 'Alt Text',
                            type: 'string',
                        }),
                    ],
                },
            ],
        }),
        defineField({
            name: 'relatedProducts',
            title: 'Related Products',
            type: 'array',
            group: 'content',
            of: [
                {
                    type: 'reference',
                    to: [{ type: 'product' }],
                },
            ],
        }),

        // ===== FOOTER CTA =====
        defineField({
            name: 'footerCta',
            title: 'Footer CTA Section',
            type: 'object',
            group: 'content',
            fields: [
                { name: 'headline', title: 'Headline', type: 'string' },
                { name: 'body', title: 'Body Text', type: 'text', rows: 2 },
                { name: 'buttonLabel', title: 'Button Label', type: 'string' },
                { name: 'buttonHref', title: 'Button Link', type: 'string' },
            ],
        }),

        // ===== SEO =====
        defineField({
            name: 'seo',
            title: 'SEO Settings',
            type: 'object',
            group: 'seo',
            fields: [
                {
                    name: 'metaTitle',
                    title: 'Meta Title',
                    type: 'string',
                    description: 'Title for search engines (max 60 chars)',
                    validation: (Rule) => Rule.max(60),
                },
                {
                    name: 'metaDescription',
                    title: 'Meta Description',
                    type: 'text',
                    rows: 3,
                    description: 'Description for search engines (max 160 chars)',
                    validation: (Rule) => Rule.max(160),
                },
                {
                    name: 'ogImage',
                    title: 'Open Graph Image',
                    type: 'image',
                    description: 'Image for social media sharing',
                },
            ],
        }),
    ],
    preview: {
        select: {
            title: 'title',
            subtitle: 'category',
            media: 'heroImage',
        },
    },
})
