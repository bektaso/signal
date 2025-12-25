import { defineField, defineType } from 'sanity'

export const productsBlock = defineType({
    name: 'productsBlock',
    title: 'Products Block',
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
    ],
    preview: {
        prepare() {
            return {
                title: 'Products Block',
                subtitle: 'Displays all products',
            }
        },
    },
})
