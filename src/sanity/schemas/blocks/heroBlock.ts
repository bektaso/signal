import { defineField, defineType } from 'sanity'

export const heroBlock = defineType({
    name: 'heroBlock',
    title: 'Hero Block',
    type: 'object',
    fields: [
        defineField({
            name: 'headline',
            title: 'Headline',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'subheadline',
            title: 'Subheadline',
            type: 'text',
            rows: 2,
        }),
        defineField({
            name: 'ctaPrimary',
            title: 'Primary CTA',
            type: 'object',
            fields: [
                defineField({
                    name: 'label',
                    title: 'Label',
                    type: 'string',
                }),
                defineField({
                    name: 'href',
                    title: 'Link',
                    type: 'string',
                }),
            ],
        }),
        defineField({
            name: 'ctaSecondary',
            title: 'Secondary CTA',
            type: 'object',
            fields: [
                defineField({
                    name: 'label',
                    title: 'Label',
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
                title: title || 'Hero Block',
                subtitle: 'Hero',
            }
        },
    },
})
