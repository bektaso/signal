import { defineField, defineType } from 'sanity'

export const page = defineType({
    name: 'page',
    title: 'Page',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'title',
                maxLength: 96,
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'seo',
            title: 'SEO',
            type: 'object',
            fields: [
                defineField({
                    name: 'title',
                    title: 'SEO Title',
                    type: 'string',
                }),
                defineField({
                    name: 'description',
                    title: 'Meta Description',
                    type: 'text',
                    rows: 3,
                }),
                defineField({
                    name: 'ogImage',
                    title: 'Open Graph Image',
                    type: 'image',
                }),
            ],
        }),
        defineField({
            name: 'blocks',
            title: 'Content Blocks',
            type: 'array',
            of: [
                { type: 'heroBlock' },
                { type: 'featuresBlock' },
                { type: 'productsBlock' },
                { type: 'servicesBlock' },
                { type: 'ctaBlock' },
                { type: 'contactBlock' },
            ],
        }),
    ],
    preview: {
        select: {
            title: 'title',
            slug: 'slug.current',
        },
        prepare({ title, slug }) {
            return {
                title,
                subtitle: `/${slug}`,
            }
        },
    },
})
