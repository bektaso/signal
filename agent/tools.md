# Available Tools & Scripts

## NPM Scripts
| Script | Command | Description |
| :--- | :--- | :--- |
| **Dev Server** | `npm run dev` | Starts the Next.js development server. |
| **Build** | `npm run build` | Builds the application for production. |
| **Start** | `npm run start` | Starts the production server. |
| **Lint** | `npm run lint` | Runs ESLint. |
| **Test (Unit)** | `npm run test` | Runs Vitest for unit testing. |
| **Test (E2E)** | `npm run test:e2e` | Runs Playwright for E2E testing. |
| **Studio** | `npx sanity start` | (Alternative) access to Sanity Studio if not running via Next.js route. |

## Seeding Scripts
Location: `/scripts`
*   **Seed Products:** `npx tsx scripts/seed-products.ts` (Requires `NEXT_PUBLIC_SANITY_API_WRITE_TOKEN`)
*   **Seed SigSAS:** `npx tsx scripts/seed-sigsas.ts`

## External Tools
*   **Sanity Vision:** Available at `/studio/vision` for testing GROQ queries.
*   **OpenAI API:** Used for the AI Assistant feature.
