import { defineField, defineType } from 'sanity'

export const contactBlock = defineType({
    name: 'contactBlock',
    title: 'Contact Block',
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
            name: 'email',
            title: 'Email',
            type: 'string',
        }),
        defineField({
            name: 'phone',
            title: 'Phone',
            type: 'string',
        }),
        defineField({
            name: 'address',
            title: 'Address',
            type: 'text',
            rows: 2,
        }),
        defineField({
            name: 'linkedIn',
            title: 'LinkedIn URL',
            type: 'url',
        }),
    ],
    preview: {
        prepare() {
            return {
                title: 'Contact Block',
                subtitle: 'Contact Information',
            }
        },
    },
})
