import { defineField, defineType } from 'sanity'

export const navigation = defineType({
    name: 'navigation',
    title: 'Navigation',
    type: 'document',
    fields: [
        defineField({
            name: 'items',
            title: 'Navigation Items',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        defineField({
                            name: 'label',
                            title: 'Label',
                            type: 'string',
                            validation: (Rule) => Rule.required(),
                        }),
                        defineField({
                            name: 'href',
                            title: 'Link',
                            type: 'string',
                            validation: (Rule) => Rule.required(),
                        }),
                        defineField({
                            name: 'isExternal',
                            title: 'Open in New Tab',
                            type: 'boolean',
                            initialValue: false,
                        }),
                    ],
                    preview: {
                        select: {
                            title: 'label',
                            subtitle: 'href',
                        },
                    },
                },
            ],
        }),
    ],
    preview: {
        prepare() {
            return {
                title: 'Navigation',
            }
        },
    },
})
