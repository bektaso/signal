# Signalton - Next-Gen Signal Processing & AI Platform

![Signalton Banner](https://via.placeholder.com/1200x630.png?text=Signalton+AI+Platform)

**Signalton** is a cutting-edge corporate website and content management platform designed for a high-tech R&D company specializing in Digital Signal Processing (DSP), Edge AI, and IoT solutions.

This project is built with **Next.js 15+**, **Sanity.io v3**, **Tailwind CSS**, and **Framer Motion**, featuring a modern, responsive design, 3D visualizations, and an integrated AI assistant.

---

## 🚀 Key Features

*   **Dynamic Content Management (CMS):** Fully integrated with **Sanity.io** for managing products, services, career openings, and site-wide settings.
*   **Next.js App Router:** Utilizing the latest React Server Components and server-side rendering for optimal performance and SEO.
*   **Interactive UI/UX:** Smooth animations with **Framer Motion**, glassmorphism effects, and responsive layout.
*   **AI Assistant:** Built-in AI Chat Agent (powered by OpenAI GPT-4) trained on Signalton's products and services.
*   **Product Showcase:** Detailed product pages with rich text descriptions, technical specs, and galleries (SigMote, DataMote, SigCloud, Locomopt, SigSAS).
*   **Careers Portal:** Dynamic job listings and company culture showcase.
*   **SEO Optimized:** Automatic metadata generation from Sanity content.

---

## 🛠 Tech Stack

*   **Framework:** [Next.js 15](https://nextjs.org/) (React 19 RC)
*   **Language:** [TypeScript](https://www.typescriptlang.org/)
*   **Styling:** [Tailwind CSS](https://tailwindcss.com/)
*   **CMS:** [Sanity.io](https://www.sanity.io/)
*   **Animations:** [Framer Motion](https://www.framer.com/motion/)
*   **AI Integration:** [OpenAI API](https://openai.com/)
*   **Icons:** [Lucide React](https://lucide.dev/)
*   **Deployment:** Vercel (Recommended)

---

## 🏁 Getting Started

### Prerequisites

*   Node.js 18.17 or later
*   npm or pnpm

### Installation

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/bektaso/signal.git
    cd signal
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Environment Setup:**

    Create a `.env.local` file in the root directory and add the following variables:

    ```env
    NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
    NEXT_PUBLIC_SANITY_DATASET=production
    NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
    NEXT_PUBLIC_SANITY_API_WRITE_TOKEN=your_write_token # For seeding scripts only
    OPENAI_API_KEY=your_openai_api_key
    ```

4.  **Run Development Server:**

    ```bash
    npm run dev
    ```

    Open [http://localhost:3000](http://localhost:3000) to view the site.
    Open [http://localhost:3000/studio](http://localhost:3000/studio) to access the CMS.

---

## 📦 Data Seeding

To populate the CMS with initial product data (SigMote, DataMote, SigCloud, Locomopt, SigSAS):

```bash
# Ensure NEXT_PUBLIC_SANITY_API_WRITE_TOKEN is set in .env.local
npx tsx scripts/seed-products.ts
npx tsx scripts/seed-sigsas.ts
```

---

## 📂 Project Structure

```
signal/
├── src/
│   ├── app/                # Next.js App Router pages
│   │   ├── api/            # API routes (Chat, etc.)
│   │   ├── careers/        # Careers page
│   │   ├── products/       # Product dynamic pages
│   │   └── studio/         # Sanity Studio route
│   ├── components/         # React components
│   │   ├── ai/             # Chat widget
│   │   ├── blocks/         # CMS page blocks (Hero, Features, etc.)
│   │   ├── layout/         # Navbar, Footer
│   │   └── ui/             # Reusable UI elements (Button, Card, etc.)
│   ├── lib/
│   │   └── sanity/         # Sanity client, queries, image builder
│   └── sanity/
│       └── schemas/        # Content types (Product, Page, SiteSettings...)
├── scripts/                # Utility scripts (Seeding, migration)
└── public/                 # Static assets
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
