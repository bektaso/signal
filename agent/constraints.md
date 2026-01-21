# Project Constraints

## Technology Stack
- **Framework:** Next.js 16 (App Router ONLY - avoid Pages Router)
- **Language:** TypeScript (Strict mode)
- **Styling:** Tailwind CSS v4 (Use utility classes, avoid CSS-in-JS libs like styled-components unless necessary for 3D/Canvas)
- **CMS:** Sanity v5 (Schema changes must be reflected in seeding scripts if critical)
- **Testing:** Vitest (Unit), Playwright (E2E)

## Coding Standards
- **Components:** Use Server Components by default. Add 'use client' only when interactivity is needed.
- **State Management:** Prefer URL state or React Context over global state libraries for simple cases.
- **Formatting:** Prettier (default config).
- **Linting:** ESLint (Next.js defaults).

## Deployment
- **Platform:** Vercel (Recommended)
- **Environment:** Node.js 18+ runtime
