import type { CollectionConfig } from 'payload'

export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'updatedAt'],
    group: 'Content',
  },
  access: {
    read: () => true, // Public read access
  },
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
        description: 'URL path for this page (e.g., "about", "contact")',
      },
    },
    {
      name: 'seo',
      type: 'group',
      label: 'SEO',
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'SEO Title',
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'Meta Description',
        },
        {
          name: 'ogImage',
          type: 'upload',
          relationTo: 'media',
          label: 'Open Graph Image',
        },
      ],
    },
    {
      name: 'blocks',
      type: 'blocks',
      label: 'Content Blocks',
      blocks: [
        // Hero Block
        {
          slug: 'heroBlock',
          labels: {
            singular: 'Hero Block',
            plural: 'Hero Blocks',
          },
          fields: [
            {
              name: 'headline',
              type: 'text',
              required: true,
              label: 'Headline',
            },
            {
              name: 'subheadline',
              type: 'textarea',
              label: 'Subheadline',
            },
            {
              name: 'ctaPrimary',
              type: 'group',
              label: 'Primary CTA',
              fields: [
                {
                  name: 'label',
                  type: 'text',
                  label: 'Label',
                },
                {
                  name: 'href',
                  type: 'text',
                  label: 'Link',
                },
              ],
            },
            {
              name: 'ctaSecondary',
              type: 'group',
              label: 'Secondary CTA',
              fields: [
                {
                  name: 'label',
                  type: 'text',
                  label: 'Label',
                },
                {
                  name: 'href',
                  type: 'text',
                  label: 'Link',
                },
              ],
            },
          ],
        },

        // Features Block
        {
          slug: 'featuresBlock',
          labels: {
            singular: 'Features Block',
            plural: 'Features Blocks',
          },
          fields: [
            {
              name: 'title',
              type: 'text',
              label: 'Section Title',
            },
            {
              name: 'subtitle',
              type: 'textarea',
              label: 'Section Subtitle',
            },
            {
              name: 'features',
              type: 'array',
              label: 'Features',
              fields: [
                {
                  name: 'icon',
                  type: 'text',
                  label: 'Icon Name',
                  admin: {
                    description: 'Lucide icon name',
                  },
                },
                {
                  name: 'title',
                  type: 'text',
                  label: 'Title',
                },
                {
                  name: 'description',
                  type: 'textarea',
                  label: 'Description',
                },
              ],
            },
          ],
        },

        // Products Block
        {
          slug: 'productsBlock',
          labels: {
            singular: 'Products Block',
            plural: 'Products Blocks',
          },
          fields: [
            {
              name: 'title',
              type: 'text',
              label: 'Section Title',
            },
            {
              name: 'subtitle',
              type: 'textarea',
              label: 'Section Subtitle',
            },
            // Products will be automatically fetched from the Products collection
          ],
        },

        // Services Block
        {
          slug: 'servicesBlock',
          labels: {
            singular: 'Services Block',
            plural: 'Services Blocks',
          },
          fields: [
            {
              name: 'title',
              type: 'text',
              label: 'Section Title',
            },
            {
              name: 'subtitle',
              type: 'textarea',
              label: 'Section Subtitle',
            },
            {
              name: 'services',
              type: 'array',
              label: 'Services',
              fields: [
                {
                  name: 'title',
                  type: 'text',
                  label: 'Title',
                },
                {
                  name: 'description',
                  type: 'textarea',
                  label: 'Description',
                },
              ],
            },
          ],
        },

        // CTA Block
        {
          slug: 'ctaBlock',
          labels: {
            singular: 'CTA Block',
            plural: 'CTA Blocks',
          },
          fields: [
            {
              name: 'headline',
              type: 'text',
              label: 'Headline',
            },
            {
              name: 'subheadline',
              type: 'textarea',
              label: 'Subheadline',
            },
            {
              name: 'cta',
              type: 'group',
              label: 'CTA Button',
              fields: [
                {
                  name: 'label',
                  type: 'text',
                  label: 'Label',
                },
                {
                  name: 'href',
                  type: 'text',
                  label: 'Link',
                },
              ],
            },
          ],
        },

        // Contact Block
        {
          slug: 'contactBlock',
          labels: {
            singular: 'Contact Block',
            plural: 'Contact Blocks',
          },
          fields: [
            {
              name: 'title',
              type: 'text',
              label: 'Section Title',
            },
            {
              name: 'subtitle',
              type: 'textarea',
              label: 'Section Subtitle',
            },
            {
              name: 'email',
              type: 'email',
              label: 'Email',
            },
            {
              name: 'phone',
              type: 'text',
              label: 'Phone',
            },
            {
              name: 'address',
              type: 'textarea',
              label: 'Address',
            },
            {
              name: 'linkedIn',
              type: 'text',
              label: 'LinkedIn URL',
            },
          ],
        },
      ],
    },
  ],
}
