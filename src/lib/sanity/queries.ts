import { groq } from 'next-sanity'

// Site Settings
export const siteSettingsQuery = groq`*[_type == "siteSettings"][0]{
  siteName,
  logo,
  seo {
    defaultTitle,
    defaultDescription,
    ogImage
  },
  footer {
    copyright,
    socialLinks[] {
      platform,
      url
    }
  }
}`

// Navigation
export const navigationQuery = groq`*[_type == "navigation"][0]{
  items[] {
    _key,
    label,
    href,
    isExternal
  }
}`

// Home Page
export const homePageQuery = groq`*[_type == "page" && slug.current == "home"][0]{
  title,
  seo {
    title,
    description,
    ogImage
  },
  blocks[] {
    _key,
    _type,
    _type == "heroBlock" => {
      headline,
      subheadline,
      ctaPrimary {
        label,
        href
      },
      ctaSecondary {
        label,
        href
      }
    },
    _type == "featuresBlock" => {
      title,
      subtitle,
      features[] {
        _key,
        icon,
        title,
        description
      }
    },
    _type == "productsBlock" => {
      title,
      subtitle,
      "products": *[_type == "product"] | order(order asc) {
        _id,
        title,
        slug,
        tagline,
        icon,
        category
      }
    },
    _type == "servicesBlock" => {
      title,
      subtitle,
      services[] {
        _key,
        title,
        description
      }
    },
    _type == "ctaBlock" => {
      headline,
      subheadline,
      cta {
        label,
        href
      }
    },
    _type == "contactBlock" => {
      title,
      subtitle,
      email,
      phone,
      address,
      linkedIn
    }
  }
}`

// Product by Slug
export const productBySlugQuery = groq`*[_type == "product" && slug.current == $slug][0]{
  _id,
  title,
  slug,
  tagline,
  icon,
  category,
  // Hero Section
  heroHeadline,
  heroSubheadline,
  heroImage,
  primaryCta { label, href },
  secondaryCta { label, href },
  // Content
  description,
  features[] {
    _key,
    icon,
    title,
    description
  },
  specifications[] {
    _key,
    label,
    value
  },
  useCases[] {
    _key,
    icon,
    title,
    description
  },
  gallery[] {
    _key,
    asset,
    alt
  },
  relatedProducts[]-> {
    _id,
    title,
    slug,
    tagline,
    icon
  },
  // Footer CTA
  footerCta {
    headline,
    body,
    buttonLabel,
    buttonHref
  },
  // SEO
  seo {
    metaTitle,
    metaDescription,
    ogImage
  }
}`

// All Products
export const allProductsQuery = groq`*[_type == "product"] | order(order asc) {
  _id,
  title,
  slug,
  tagline,
  icon,
  category
}`

// Careers Page
export const careersPageQuery = groq`*[_type == "careersPage"][0]{
  title,
  subtitle,
  positions[] {
    _key,
    title,
    type,
    location,
    description,
    requirements[],
    isOpen
  },
  spinoffSection {
    title,
    description
  }
}`
