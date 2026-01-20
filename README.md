# Signalton - Next-Gen Signal Processing & AI Platform

![Signalton Banner](https://via.placeholder.com/1200x630.png?text=Signalton+AI+Platform)

**Signalton** is a cutting-edge corporate website and unified content management platform designed for a high-tech R&D company specializing in Digital Signal Processing (DSP), Edge AI, and IoT solutions.

This project is built with **Next.js 16**, **Payload CMS**, **Tailwind CSS**, and **Framer Motion**, featuring a modern, responsive design, 3D visualizations, and an integrated AI assistant.

---

## 🚀 Key Features

*   **Unified Content Management:** Self-hosted **Payload CMS** with powerful admin panel at `/admin` - no external dependencies.
*   **Block-Based Content:** Flexible page builder with 6 content block types (Hero, Features, Products, Services, CTA, Contact).
*   **Next.js 16 App Router:** Latest React Server Components, server-side rendering, and static generation for optimal performance.
*   **Interactive UI/UX:** Smooth animations with **Framer Motion**, glassmorphism effects, and responsive dark-mode design.
*   **AI Assistant:** Built-in AI Chat Agent (powered by OpenAI GPT-4) trained on Signalton's products and services.
*   **Product Showcase:** Detailed product pages with rich text, technical specs, galleries, and related products.
*   **Media Management:** Built-in image upload with automatic optimization and responsive sizing.
*   **SEO Optimized:** Automatic metadata generation, sitemap, and Open Graph support.
*   **TypeScript-First:** Full type safety across CMS schema, API, and frontend.

---

## 🛠 Tech Stack

*   **Framework:** [Next.js 16](https://nextjs.org/) (React 19)
*   **Language:** [TypeScript](https://www.typescriptlang.org/)
*   **CMS:** [Payload CMS 3.x](https://payloadcms.com/) - Self-hosted, TypeScript-native
*   **Database:** SQLite (development) / PostgreSQL/MongoDB (production)
*   **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
*   **Animations:** [Framer Motion](https://www.framer.com/motion/)
*   **3D Graphics:** [Three.js](https://threejs.org/) + React Three Fiber
*   **AI Integration:** [OpenAI API](https://openai.com/) (GPT-4)
*   **Icons:** [Lucide React](https://lucide.dev/)
*   **Deployment:** Vercel / Netlify / Self-hosted

---

## 🏁 Getting Started

### Prerequisites

*   Node.js 18.17 or later
*   npm, pnpm, or yarn

### Installation

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/bektaso/signal.git
    cd signal
    ```

2.  **Install dependencies:**

    ```bash
    npm install --legacy-peer-deps
    ```

3.  **Environment Setup:**

    Create a `.env` file in the root directory and add the following variables:

    ```env
    # Payload CMS
    DATABASE_URI=./signal.db
    PAYLOAD_SECRET=your-secret-key-here
    NEXT_PUBLIC_SERVER_URL=http://localhost:3000

    # OpenAI API
    OPENAI_API_KEY=your_openai_api_key

    # Sanity (legacy - optional during migration)
    NEXT_PUBLIC_SANITY_PROJECT_ID=3i2rg51e
    NEXT_PUBLIC_SANITY_DATASET=production
    NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
    ```

4.  **Run Development Server:**

    ```bash
    npm run dev
    ```

    - **Website:** [http://localhost:3000](http://localhost:3000)
    - **Admin Panel:** [http://localhost:3000/admin](http://localhost:3000/admin)
    - **API:** [http://localhost:3000/api](http://localhost:3000/api)

5.  **Create First Admin User:**

    On your first visit to `/admin`, you'll be prompted to create an admin account. Alternatively, use:

    ```bash
    npm run payload:init
    ```

    This creates a default admin user:
    - Email: `admin@signalton.com`
    - Password: `admin123456` (⚠️ Change immediately after first login!)

---

## 📦 Content Management

### Payload CMS Admin Panel

Access the admin panel at [http://localhost:3000/admin](http://localhost:3000/admin) to:

- ✏️ Create and edit Pages
- 📦 Manage Products (SigMote, DataMote, SigCloud, Locomopt, SigSAS)
- 🖼️ Upload and organize Media
- 👥 Manage Users and Roles

### Migration from Sanity (Optional)

If you have existing data in Sanity, migrate it to Payload:

```bash
npm run payload:migrate
```

This will:
- Fetch all products and pages from Sanity
- Import them into Payload CMS
- Map relationships and references

### Available Scripts

```bash
npm run dev              # Start development server
npm run build            # Build for production
npm run start            # Start production server
npm run payload:init     # Create first admin user
npm run payload:migrate  # Migrate data from Sanity to Payload
```

---

## 📂 Project Structure

```
signal/
├── src/
│   ├── app/                      # Next.js App Router
│   │   ├── (payload)/            # Payload CMS routes
│   │   │   ├── admin/            # Admin panel UI
│   │   │   └── api/              # REST/GraphQL API
│   │   ├── api/                  # Custom API routes
│   │   │   ├── chat/             # OpenAI chatbot
│   │   │   └── contact/          # Contact form
│   │   ├── careers/              # Careers page
│   │   ├── products/[slug]/      # Dynamic product pages
│   │   ├── layout.tsx            # Root layout
│   │   └── page.tsx              # Home page
│   ├── components/               # React components
│   │   ├── ai/                   # ChatWidget
│   │   ├── blocks/               # CMS content blocks
│   │   │   ├── BlockRenderer.tsx
│   │   │   ├── HeroBlock.tsx
│   │   │   ├── FeaturesBlock.tsx
│   │   │   ├── ProductsBlock.tsx
│   │   │   ├── ServicesBlock.tsx
│   │   │   ├── CTABlock.tsx
│   │   │   └── ContactBlock.tsx
│   │   ├── layout/               # Navbar, Footer
│   │   └── ui/                   # Reusable UI (Button, Card, etc.)
│   ├── lib/
│   │   ├── payload/              # Payload CMS client
│   │   └── sanity/               # Sanity client (legacy fallback)
│   ├── payload/                  # Payload CMS configuration
│   │   ├── collections/          # Collection schemas
│   │   │   ├── Users.ts
│   │   │   ├── Pages.ts
│   │   │   ├── Products.ts
│   │   │   └── Media.ts
│   │   └── blocks/               # Block definitions
│   └── sanity/                   # Sanity schemas (legacy)
├── payload.config.ts             # Payload CMS config
├── scripts/                      # Utility scripts
│   ├── create-admin.ts           # Admin user creation
│   └── migrate-sanity-to-payload.ts  # Migration script
├── public/
│   └── media/                    # Uploaded media files
└── signal.db                     # SQLite database (gitignored)
```

---

## 🤝 Contributing

1.  Fork the project
2.  Create your feature branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

**Signalton** — *Innovate. Integrate. Inspire.*
