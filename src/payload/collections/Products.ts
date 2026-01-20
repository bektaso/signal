import type { CollectionConfig } from 'payload'

export const Products: CollectionConfig = {
  slug: 'products',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'order', 'updatedAt'],
    group: 'Content',
  },
  access: {
    read: () => true, // Public read access for frontend
  },
  fields: [
    // ===== GENERAL GROUP =====
    {
      type: 'tabs',
      tabs: [
        {
          label: 'General',
          fields: [
            {
              name: 'title',
              type: 'text',
              required: true,
              label: 'Title',
            },
            {
              name: 'slug',
              type: 'text',
              required: true,
              unique: true,
              label: 'Slug',
              admin: {
                description: 'URL-friendly version of the title',
              },
            },
            {
              name: 'tagline',
              type: 'text',
              label: 'Tagline',
              admin: {
                description: 'Short description for product cards (e.g., "Edge AI & Signal Processing Platform")',
              },
            },
            {
              name: 'icon',
              type: 'text',
              label: 'Icon Name',
              admin: {
                description: 'Lucide icon name (e.g., cpu, radio, cloud, map)',
              },
            },
            {
              name: 'category',
              type: 'select',
              label: 'Category',
              options: [
                { label: 'Hardware', value: 'hardware' },
                { label: 'Platform', value: 'platform' },
                { label: 'Software', value: 'software' },
                { label: 'Solution', value: 'solution' },
              ],
            },
            {
              name: 'order',
              type: 'number',
              label: 'Display Order',
              defaultValue: 0,
              admin: {
                description: 'Order in which products appear (lower numbers appear first)',
              },
            },
          ],
        },

        // ===== HERO SECTION =====
        {
          label: 'Hero Section',
          fields: [
            {
              name: 'heroHeadline',
              type: 'text',
              label: 'Hero Headline',
              admin: {
                description: 'Main headline (e.g., "Intelligence at the Edge")',
              },
            },
            {
              name: 'heroSubheadline',
              type: 'textarea',
              label: 'Hero Sub-headline',
              admin: {
                description: 'Supporting text under the headline',
              },
            },
            {
              name: 'heroImage',
              type: 'upload',
              relationTo: 'media',
              label: 'Hero Image',
            },
            {
              name: 'primaryCta',
              type: 'group',
              label: 'Primary CTA Button',
              fields: [
                {
                  name: 'label',
                  type: 'text',
                  label: 'Button Label',
                },
                {
                  name: 'href',
                  type: 'text',
                  label: 'Button Link',
                },
              ],
            },
            {
              name: 'secondaryCta',
              type: 'group',
              label: 'Secondary CTA Button',
              fields: [
                {
                  name: 'label',
                  type: 'text',
                  label: 'Button Label',
                },
                {
                  name: 'href',
                  type: 'text',
                  label: 'Button Link',
                },
              ],
            },
          ],
        },

        // ===== CONTENT =====
        {
          label: 'Content',
          fields: [
            {
              name: 'description',
              type: 'richText',
              label: 'Full Description',
            },
            {
              name: 'features',
              type: 'array',
              label: 'Key Features',
              fields: [
                {
                  name: 'icon',
                  type: 'text',
                  label: 'Icon Name',
                  admin: {
                    description: 'Lucide icon (e.g., zap, shield, database)',
                  },
                },
                {
                  name: 'title',
                  type: 'text',
                  label: 'Feature Title',
                },
                {
                  name: 'description',
                  type: 'textarea',
                  label: 'Feature Description',
                },
              ],
            },
            {
              name: 'specifications',
              type: 'array',
              label: 'Technical Specifications',
              fields: [
                {
                  name: 'label',
                  type: 'text',
                  label: 'Label',
                },
                {
                  name: 'value',
                  type: 'text',
                  label: 'Value',
                },
              ],
            },
            {
              name: 'useCases',
              type: 'array',
              label: 'Use Cases / Applications',
              fields: [
                {
                  name: 'icon',
                  type: 'text',
                  label: 'Icon Name',
                },
                {
                  name: 'title',
                  type: 'text',
                  label: 'Use Case Title',
                },
                {
                  name: 'description',
                  type: 'textarea',
                  label: 'Description',
                },
              ],
            },
            {
              name: 'gallery',
              type: 'array',
              label: 'Gallery',
              fields: [
                {
                  name: 'image',
                  type: 'upload',
                  relationTo: 'media',
                  required: true,
                },
              ],
            },
            {
              name: 'relatedProducts',
              type: 'relationship',
              relationTo: 'products',
              hasMany: true,
              label: 'Related Products',
            },
            {
              name: 'footerCta',
              type: 'group',
              label: 'Footer CTA Section',
              fields: [
                {
                  name: 'headline',
                  type: 'text',
                  label: 'Headline',
                },
                {
                  name: 'body',
                  type: 'textarea',
                  label: 'Body Text',
                },
                {
                  name: 'buttonLabel',
                  type: 'text',
                  label: 'Button Label',
                },
                {
                  name: 'buttonHref',
                  type: 'text',
                  label: 'Button Link',
                },
              ],
            },
          ],
        },

        // ===== SEO =====
        {
          label: 'SEO',
          fields: [
            {
              name: 'seo',
              type: 'group',
              label: 'SEO Settings',
              fields: [
                {
                  name: 'metaTitle',
                  type: 'text',
                  label: 'Meta Title',
                  admin: {
                    description: 'Title for search engines (max 60 chars)',
                  },
                  maxLength: 60,
                },
                {
                  name: 'metaDescription',
                  type: 'textarea',
                  label: 'Meta Description',
                  admin: {
                    description: 'Description for search engines (max 160 chars)',
                  },
                  maxLength: 160,
                },
                {
                  name: 'ogImage',
                  type: 'upload',
                  relationTo: 'media',
                  label: 'Open Graph Image',
                  admin: {
                    description: 'Image for social media sharing',
                  },
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}
