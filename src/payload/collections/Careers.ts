import type { CollectionConfig } from 'payload'

/**
 * Careers Collection
 * Singleton collection for managing the careers/jobs page
 * Only one document should exist (the careers page)
 */
export const Careers: CollectionConfig = {
  slug: 'careers',
  admin: {
    useAsTitle: 'heroHeadline',
    group: 'Content',
    description: 'Kariyer sayfası içeriğini yönetin',
  },
  access: {
    read: () => true,
  },
  fields: [
    // ==================== HERO SECTION ====================
    {
      name: 'heroHeadline',
      type: 'text',
      required: true,
      label: 'Hero Başlık',
      defaultValue: 'Shape the Future of Edge Intelligence',
    },
    {
      name: 'heroSubheadline',
      type: 'textarea',
      label: 'Hero Alt Başlık',
    },
    {
      name: 'heroImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Hero Görsel',
    },
    {
      name: 'heroCta',
      type: 'group',
      label: 'Hero CTA Butonu',
      fields: [
        { name: 'label', type: 'text', label: 'Buton Metni' },
        { name: 'href', type: 'text', label: 'Link' },
      ],
    },

    // ==================== WHY US SECTION ====================
    {
      name: 'whyUsHeadline',
      type: 'text',
      label: 'Neden Biz - Başlık',
      defaultValue: 'Why Signalton?',
    },
    {
      name: 'whyUsBody',
      type: 'textarea',
      label: 'Neden Biz - Açıklama',
    },
    {
      name: 'whyUsPoints',
      type: 'array',
      label: 'Neden Biz - Maddeler',
      fields: [
        { name: 'title', type: 'text', label: 'Başlık', required: true },
        { name: 'description', type: 'textarea', label: 'Açıklama' },
      ],
    },

    // ==================== CULTURE SECTION ====================
    {
      name: 'cultureHeadline',
      type: 'text',
      label: 'Kültür - Başlık',
      defaultValue: 'Our Culture & Values',
    },
    {
      name: 'cultureValues',
      type: 'array',
      label: 'Kültür Değerleri',
      fields: [
        { 
          name: 'icon', 
          type: 'text', 
          label: 'İkon',
          admin: { description: 'Lucide icon adı (örn: lightbulb, cpu, globe)' }
        },
        { name: 'title', type: 'text', label: 'Başlık', required: true },
        { name: 'description', type: 'textarea', label: 'Açıklama' },
      ],
    },

    // ==================== PERKS SECTION ====================
    {
      name: 'perksHeadline',
      type: 'text',
      label: 'Yan Haklar - Başlık',
      defaultValue: 'Fuel for Your Best Work',
    },
    {
      name: 'perks',
      type: 'array',
      label: 'Yan Haklar',
      fields: [
        { 
          name: 'icon', 
          type: 'text', 
          label: 'İkon',
          admin: { description: 'Lucide icon adı' }
        },
        { name: 'title', type: 'text', label: 'Başlık', required: true },
        { name: 'description', type: 'textarea', label: 'Açıklama' },
      ],
    },

    // ==================== POSITIONS SECTION ====================
    {
      name: 'positionsHeadline',
      type: 'text',
      label: 'Açık Pozisyonlar - Başlık',
      defaultValue: 'Open Positions',
    },
    {
      name: 'positions',
      type: 'array',
      label: 'Açık Pozisyonlar',
      fields: [
        { name: 'title', type: 'text', label: 'Pozisyon Adı', required: true },
        { 
          name: 'type', 
          type: 'select', 
          label: 'Çalışma Tipi',
          options: [
            { label: 'Full-time', value: 'Full-time' },
            { label: 'Part-time', value: 'Part-time' },
            { label: 'Contract', value: 'Contract' },
            { label: 'Intern', value: 'Intern' },
          ],
          defaultValue: 'Full-time',
        },
        { name: 'location', type: 'text', label: 'Lokasyon' },
        { name: 'department', type: 'text', label: 'Departman' },
        { name: 'description', type: 'textarea', label: 'Açıklama' },
        { name: 'applyLink', type: 'text', label: 'Başvuru Linki' },
        { 
          name: 'isOpen', 
          type: 'checkbox', 
          label: 'Aktif mi?',
          defaultValue: true,
        },
      ],
    },
    {
      name: 'emptyStateText',
      type: 'text',
      label: 'Pozisyon Yokken Gösterilecek Metin',
      defaultValue: "Don't see your role? We are always looking for exceptional talent.",
    },

    // ==================== FOOTER CTA ====================
    {
      name: 'footerCta',
      type: 'group',
      label: 'Sayfa Sonu CTA',
      fields: [
        { name: 'headline', type: 'text', label: 'Başlık' },
        { name: 'body', type: 'textarea', label: 'Açıklama' },
        { name: 'buttonLabel', type: 'text', label: 'Buton Metni' },
        { name: 'buttonHref', type: 'text', label: 'Buton Linki' },
      ],
    },

    // ==================== SEO ====================
    {
      name: 'seo',
      type: 'group',
      label: 'SEO Ayarları',
      fields: [
        { name: 'metaTitle', type: 'text', label: 'Meta Title' },
        { name: 'metaDescription', type: 'textarea', label: 'Meta Description' },
      ],
    },
  ],
}
