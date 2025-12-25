import { defineField, defineType } from 'sanity'

export const servicesBlock = defineType({
    name: 'servicesBlock',
    title: 'Services Block',
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
            name: 'services',
            title: 'Services',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        defineField({
                            name: 'title',
                            title: 'Service Title',
                            type: 'string',
                        }),
                        defineField({
                            name: 'description',
                            title: 'Description',
                            type: 'text',
                            rows: 3,
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
                title: title || 'Services Block',
                subtitle: 'Services',
            }
        },
    },
})
