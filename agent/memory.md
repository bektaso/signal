# Project Memory: Signalton

**Signalton** is a cutting-edge corporate website and unified content management platform designed for a high-tech R&D company specializing in Digital Signal Processing (DSP), Edge AI, and IoT solutions.

## Core Architecture
- **Type:** Server-Side Rendered (SSR) Web App with Static Generation (SSG) capabilities.
- **Frontend:** Next.js 16 (App Router), React 19.
- **Data Layer:** Payload CMS 3.x (Self-hosted, TypeScript-native) - migrated from Sanity v5.
- **Database:** SQLite (development) / PostgreSQL/MongoDB (production).
- **Styling:** Tailwind CSS v4, Framer Motion.
- **3D Graphics:** Three.js + React Three Fiber.
- **AI:** OpenAI GPT-4 integration for the "Signalton" chat assistant.

## Key Features
- **Unified Content Management:** Self-hosted Payload CMS with powerful admin panel at `/admin`.
- **Block-Based Content:** Flexible page builder with 6 content block types:
  - Hero Block
  - Features Block
  - Products Block
  - Services Block
  - CTA Block
  - Contact Block
- **Interactive UI/UX:** Smooth animations with Framer Motion, glassmorphism effects, responsive dark-mode design.
- **Product Showcase:** Detailed product pages with rich text, technical specs, galleries, and related products.
- **Media Management:** Built-in image upload with automatic optimization and responsive sizing.
- **SEO Optimized:** Automatic metadata generation, sitemap, and Open Graph support.

## Key Directories
- `src/app`: Routes (App Router structure)
  - `(main)/`: Main public website (layout with Navbar, Footer, ChatWidget)
  - `(main)/products/[slug]/`: Dynamic product pages
  - `(payload)/admin/`: Payload CMS admin panel UI
  - `(payload)/api/`: REST/GraphQL API endpoints
  - `api/chat/`: OpenAI chatbot endpoint
  - `api/contact/`: Contact form endpoint
  - `careers/`: Careers page
  - `studio/`: Legacy Sanity Studio (can be removed after full migration)
- `src/components`: React components
  - `ai/`: ChatWidget component
  - `blocks/`: CMS content block renderers (BlockRenderer, HeroBlock, FeaturesBlock, ProductsBlock, ServicesBlock, CTABlock, ContactBlock)
  - `layout/`: Navbar, Footer
  - `ui/`: Reusable UI components (Button, Card, RichText, AnimatedSection)
- `src/payload/collections/`: Payload CMS collection schemas
  - `Users.ts`: User management
  - `Pages.ts`: Page content management
  - `Products.ts`: Product catalog
  - `Media.ts`: Media library
- `src/lib/payload/`: Payload CMS client configuration
- `src/lib/sanity/`: Sanity client (legacy fallback during migration)
- `src/sanity/`: Sanity schemas (legacy, being phased out)
- `scripts/`: Utility scripts
  - `create-admin.ts`: Admin user creation (`npm run payload:init`)
  - `migrate-sanity-to-payload.ts`: Migration script from Sanity to Payload (`npm run payload:migrate`)

## Environment Variables
Required `.env` file variables:
- `DATABASE_URI=./signal.db` (SQLite database path)
- `PAYLOAD_SECRET=your-secret-key-here` (Payload CMS secret)
- `NEXT_PUBLIC_SERVER_URL=http://localhost:3000` (Server URL)
- `OPENAI_API_KEY=your_openai_api_key` (OpenAI API key)
- `NEXT_PUBLIC_SANITY_PROJECT_ID=3i2rg51e` (Legacy - optional during migration)
- `NEXT_PUBLIC_SANITY_DATASET=production` (Legacy)
- `NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01` (Legacy)

## Available Scripts
- `npm run dev`: Start development server (Webpack - recommended for Payload CMS)
- `npm run dev:turbo`: Start development server (Turbopack - faster but may have Payload issues)
- `npm run build`: Build for production
- `npm run start`: Start production server
- `npm run payload:init`: Create first admin user (default: admin@signalton.com / admin123456)
- `npm run payload:migrate`: Migrate data from Sanity to Payload CMS

## Important: Turbopack vs Webpack
**Payload CMS 3.x is not fully compatible with Next.js 16's default Turbopack bundler.**
- Use `npm run dev` (Webpack) for stable admin panel functionality
- Use `npm run dev:turbo` (Turbopack) only when not working with admin panel
- Known issues with Turbopack: CSS rendering, HMR problems, import map errors

## Admin Access
- **Admin Panel:** http://localhost:3000/admin
- **Default Admin Credentials (first time):**
  - Email: `admin@signalton.com`
  - Password: `admin123456` (⚠️ Change immediately after first login!)

## Current State
- **Status:** Active Development
- **Last Updated:** 2026-01-21
- **Recent Updates:** 
  - Migrated from Sanity v5 to Payload CMS 3.x
  - Fixed Turbopack compatibility issues (using Webpack for dev)
  - Added missing `graphql` dependency for Payload API routes
  - Configured route groups: `(main)` for public site, `(payload)` for admin
- **Migration Status:** Sanity schemas still exist as legacy fallback, migration script available
- **Dependencies:** Using `--legacy-peer-deps` flag due to Next.js 16 / Payload CMS 3.x peer dependency mismatch
- **Focus:** Unified content management with Payload CMS, maintaining backward compatibility during transition

## Known Issues & Solutions
| Issue | Solution |
|-------|----------|
| Admin CSS broken with Turbopack | Use `npm run dev` (Webpack mode) |
| Nested `<html>` hydration errors | Route groups separate Payload and main layouts |
| `graphql` module not found | Added `graphql` package to dependencies |
| SQLite URL format error | Use `file:` protocol in DATABASE_URI |
| `serverFunction` prop missing | Added server action wrapper in Payload layout |

## Products
The platform showcases the following products:
- SigMote
- DataMote
- SigCloud
- Locomopt
- SigSAS

## README Source
All information above is extracted from the main README.md file in the project root, last updated after Payload CMS migration.
