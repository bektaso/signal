import { defineField, defineType } from 'sanity'

export const featuresBlock = defineType({
    name: 'featuresBlock',
    title: 'Features Block',
    type: 'object',
    fields: [
        defineField({
            name: 'title',
            title: 'Section Title',
            type: 'string',
        }),
        defineField({
            name: 'subtitle',
            title: 'Section Subtitle',
            type: 'text',
            rows: 2,
        }),
        defineField({
            name: 'features',
            title: 'Features',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        defineField({
                            name: 'icon',
                            title: 'Icon Name',
                            type: 'string',
                            description: 'Lucide icon name',
                        }),
                        defineField({
                            name: 'title',
                            title: 'Title',
                            type: 'string',
                        }),
                        defineField({
                            name: 'description',
                            title: 'Description',
                            type: 'text',
                            rows: 2,
                        }),
                    ],
                    preview: {
                        select: {
                            title: 'title',
                        },
                    },
                },
            ],
        }),
    ],
    preview: {
        select: {
            title: 'title',
        },
        prepare({ title }) {
            return {
                title: title || 'Features Block',
                subtitle: 'Features',
            }
        },
    },
})
