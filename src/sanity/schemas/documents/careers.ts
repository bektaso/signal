import { defineField, defineType } from 'sanity'

export const careers = defineType({
    name: 'careers',
    title: 'Careers Page',
    type: 'document',
    groups: [
        { name: 'hero', title: 'Hero Section', default: true },
        { name: 'content', title: 'Content' },
        { name: 'positions', title: 'Open Positions' },
        { name: 'seo', title: 'SEO' },
    ],
    fields: [
        // ===== HERO =====
        defineField({
            name: 'heroHeadline',
            title: 'Hero Headline',
            type: 'string',
            group: 'hero',
            initialValue: 'Shape the Future of Edge Intelligence',
        }),
        defineField({
            name: 'heroSubheadline',
            title: 'Hero Sub-headline',
            type: 'text',
            group: 'hero',
            rows: 3,
        }),
        defineField({
            name: 'heroImage',
            title: 'Hero Image',
            type: 'image',
            group: 'hero',
            options: { hotspot: true },
        }),
        defineField({
            name: 'heroCta',
            title: 'Hero CTA Button',
            type: 'object',
            group: 'hero',
            fields: [
                { name: 'label', title: 'Button Label', type: 'string' },
                { name: 'href', title: 'Button Link', type: 'string' },
            ],
        }),

        // ===== WHY US =====
        defineField({
            name: 'whyUsHeadline',
            title: 'Why Us Headline',
            type: 'string',
            group: 'content',
            initialValue: 'Why Signalton?',
        }),
        defineField({
            name: 'whyUsBody',
            title: 'Why Us Body',
            type: 'text',
            group: 'content',
            rows: 4,
        }),
        defineField({
            name: 'whyUsPoints',
            title: 'Why Us Key Points',
            type: 'array',
            group: 'content',
            of: [
                {
                    type: 'object',
                    fields: [
                        { name: 'title', title: 'Title', type: 'string' },
                        { name: 'description', title: 'Description', type: 'text', rows: 2 },
                    ],
                },
            ],
        }),

        // ===== CULTURE =====
        defineField({
            name: 'cultureHeadline',
            title: 'Culture Section Title',
            type: 'string',
            group: 'content',
            initialValue: 'Our Culture',
        }),
        defineField({
            name: 'cultureValues',
            title: 'Culture & Values',
            type: 'array',
            group: 'content',
            of: [
                {
                    type: 'object',
                    fields: [
                        { name: 'icon', title: 'Icon Name', type: 'string' },
                        { name: 'title', title: 'Value Title', type: 'string' },
                        { name: 'description', title: 'Description', type: 'text', rows: 2 },
                    ],
                },
            ],
        }),

        // ===== PERKS =====
        defineField({
            name: 'perksHeadline',
            title: 'Perks Section Title',
            type: 'string',
            group: 'content',
            initialValue: 'Fuel for Your Best Work',
        }),
        defineField({
            name: 'perks',
            title: 'Perks List',
            type: 'array',
            group: 'content',
            of: [
                {
                    type: 'object',
                    fields: [
                        { name: 'icon', title: 'Icon Name', type: 'string' },
                        { name: 'title', title: 'Perk Title', type: 'string' },
                        { name: 'description', title: 'Description', type: 'text', rows: 2 },
                    ],
                },
            ],
        }),

        // ===== OPEN POSITIONS =====
        defineField({
            name: 'positionsHeadline',
            title: 'Open Positions Title',
            type: 'string',
            group: 'positions',
            initialValue: 'Open Positions',
        }),
        defineField({
            name: 'positions',
            title: 'Job Positions',
            type: 'array',
            group: 'positions',
            of: [
                {
                    type: 'object',
                    fields: [
                        { name: 'title', title: 'Job Title', type: 'string' },
                        { name: 'type', title: 'Job Type', type: 'string', options: { list: ['Full-time', 'Part-time', 'Contract', 'Internship'] } },
                        { name: 'location', title: 'Location', type: 'string' },
                        { name: 'department', title: 'Department', type: 'string' },
                        { name: 'description', title: 'Description', type: 'text', rows: 3 },
                        { name: 'applyLink', title: 'Apply Link', type: 'string' },
                        { name: 'isOpen', title: 'Is Open?', type: 'boolean', initialValue: true },
                    ],
                },
            ],
        }),
        defineField({
            name: 'emptyStateText',
            title: 'No Positions Text',
            type: 'string',
            group: 'positions',
            initialValue: "Don't see your role? We are always looking for exceptional talent.",
        }),

        // ===== FOOTER CTA =====
        defineField({
            name: 'footerCta',
            title: 'Footer CTA',
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
                { name: 'metaTitle', title: 'Meta Title', type: 'string' },
                { name: 'metaDescription', title: 'Meta Description', type: 'text', rows: 3 },
            ],
        }),
    ],
    preview: {
        prepare() {
            return { title: 'Careers Page' }
        },
    },
})
