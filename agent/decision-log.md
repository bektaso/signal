# Decision Log

| Date | Topic | Decision | Context |
| :--- | :--- | :--- | :--- |
| **2026-01-15** | **Project Setup** | Initialize Agent Memory | Populated `agent/` folder (role, constraints, etc.) based on `package.json` analysis to match proper versions (Next.js 16, Sanity v5). |
| **2026-01-15** | **Documentation** | Update README | Detected version mismatch in `README.md` versus `package.json`. Updated README to reflect reality. |
| **2026-01-21** | **Payload CMS** | Use Webpack instead of Turbopack | Payload CMS 3.x admin panel CSS and rendering issues caused by Turbopack incompatibility. Changed `npm run dev` to use `--webpack` flag. Added `graphql` dependency required by Payload CMS API routes. |
| **2026-01-21** | **Next.js 16 Compatibility** | Temporary workaround for server functions | Payload CMS 3.72.0 + Next.js 16.1.1: Server function config import errors. Using dynamic import workaround until official support (PR #14456). Turbopack HMR fixed but we use Webpack. |