// Document schemas
export { siteSettings } from './documents/siteSettings'
export { navigation } from './documents/navigation'
export { page } from './documents/page'
export { product } from './documents/product'
export { careers } from './documents/careers'

// Block schemas
export { heroBlock } from './blocks/heroBlock'
export { featuresBlock } from './blocks/featuresBlock'
export { productsBlock } from './blocks/productsBlock'
export { servicesBlock } from './blocks/servicesBlock'
export { ctaBlock } from './blocks/ctaBlock'
export { contactBlock } from './blocks/contactBlock'

// Import types for schema array
import { siteSettings } from './documents/siteSettings'
import { navigation } from './documents/navigation'
import { page } from './documents/page'
import { product } from './documents/product'
import { careers } from './documents/careers'
import { heroBlock } from './blocks/heroBlock'
import { featuresBlock } from './blocks/featuresBlock'
import { productsBlock } from './blocks/productsBlock'
import { servicesBlock } from './blocks/servicesBlock'
import { ctaBlock } from './blocks/ctaBlock'
import { contactBlock } from './blocks/contactBlock'

export const schemaTypes = [
    // Documents
    siteSettings,
    navigation,
    page,
    product,
    careers,
    // Blocks
    heroBlock,
    featuresBlock,
    productsBlock,
    servicesBlock,
    ctaBlock,
    contactBlock,
]
