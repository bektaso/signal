import { defineField, defineType } from 'sanity'

export const siteSettings = defineType({
    name: 'siteSettings',
    title: 'Site Settings',
    type: 'document',
    fields: [
        defineField({
            name: 'siteName',
            title: 'Site Name',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'logo',
            title: 'Logo',
            type: 'image',
            options: {
                hotspot: true,
            },
        }),
        defineField({
            name: 'seo',
            title: 'SEO Settings',
            type: 'object',
            fields: [
                defineField({
                    name: 'defaultTitle',
                    title: 'Default Title',
                    type: 'string',
                }),
                defineField({
                    name: 'defaultDescription',
                    title: 'Default Description',
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
            name: 'footer',
            title: 'Footer',
            type: 'object',
            fields: [
                defineField({
                    name: 'copyright',
                    title: 'Copyright Text',
                    type: 'string',
                }),
                defineField({
                    name: 'socialLinks',
                    title: 'Social Links',
                    type: 'array',
                    of: [
                        {
                            type: 'object',
                            fields: [
                                defineField({
                                    name: 'platform',
                                    title: 'Platform',
                                    type: 'string',
                                    options: {
                                        list: [
                                            { title: 'LinkedIn', value: 'linkedin' },
                                            { title: 'Twitter', value: 'twitter' },
                                            { title: 'GitHub', value: 'github' },
                                            { title: 'YouTube', value: 'youtube' },
                                        ],
                                    },
                                }),
                                defineField({
                                    name: 'url',
                                    title: 'URL',
                                    type: 'url',
                                }),
                            ],
                        },
                    ],
                }),
            ],
        }),
    ],
    preview: {
        select: {
            title: 'siteName',
        },
    },
})
