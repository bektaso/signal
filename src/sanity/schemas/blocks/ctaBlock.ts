import { defineField, defineType } from 'sanity'

export const ctaBlock = defineType({
    name: 'ctaBlock',
    title: 'CTA Block',
    type: 'object',
    fields: [
        defineField({
            name: 'headline',
            title: 'Headline',
            type: 'string',
        }),
        defineField({
            name: 'subheadline',
            title: 'Subheadline',
            type: 'text',
            rows: 2,
        }),
        defineField({
            name: 'cta',
            title: 'Call to Action',
            type: 'object',
            fields: [
                defineField({
                    name: 'label',
                    title: 'Button Label',
                    type: 'string',
                }),
                defineField({
                    name: 'href',
                    title: 'Link',
                    type: 'string',
                }),
            ],
        }),
    ],
    preview: {
        select: {
            title: 'headline',
        },
        prepare({ title }) {
            return {
                title: title || 'CTA Block',
                subtitle: 'Call to Action',
            }
        },
    },
})
