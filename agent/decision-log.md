# Decision Log

| Date | Topic | Decision | Context |
| :--- | :--- | :--- | :--- |
| **2026-01-15** | **Project Setup** | Initialize Agent Memory | Populated `agent/` folder (role, constraints, etc.) based on `package.json` analysis to match proper versions (Next.js 16, Sanity v5). |
| **2026-01-15** | **Documentation** | Update README | Detected version mismatch in `README.md` versus `package.json`. Updated README to reflect reality. |
| **2026-01-21** | **Payload CMS** | Use Webpack instead of Turbopack | Payload CMS 3.x admin panel CSS and rendering issues caused by Turbopack incompatibility. Changed `npm run dev` to use `--webpack` flag. Added `graphql` dependency required by Payload CMS API routes. |