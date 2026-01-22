import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "../globals.css"
import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"
// import ChatWidget from "@/components/ai/ChatWidget"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: {
      template: `%s | Signalton`,
      default: 'Signalton - Signal Processing & AI Solutions',
    },
    description: 'High-tech signal processing, AI, and digital systems solutions for challenging real-world problems.',
    keywords: ['signal processing', 'AI', 'machine learning', 'IoT', 'edge computing', 'computer vision', 'smart city'],
    authors: [{ name: 'Signalton Teknoloji' }],
    openGraph: {
      type: 'website',
      locale: 'en_US',
      siteName: 'Signalton',
      title: 'Signalton',
      description: 'High-tech signal processing, AI, and digital systems solutions.',
    },
    twitter: {
      card: 'summary_large_image',
    },
    robots: {
      index: true,
      follow: true,
    },
  }
}

export default async function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  // Fetch navigation data
  let navItems: Array<{ _key: string; label: string; href: string; isExternal?: boolean }> = []
  interface SiteSettingsData {
    siteName?: string
    logo?: any // { asset: { _ref: string } }
    footer?: { copyright?: string; socialLinks?: Array<{ platform: string; url: string }> }
  }
  let settings: SiteSettingsData | null = null

  // Use default navigation
  navItems = [
    { _key: '1', label: 'About', href: '/#about' },
    { _key: '2', label: 'Products', href: '/#products' },
    { _key: '3', label: 'Services', href: '/#services' },
    { _key: '4', label: 'Careers', href: '/careers' },
    { _key: '5', label: 'Contact', href: '/#contact' },
  ]
  settings = {
    siteName: 'Signalton'
  }

  return (
    <div className={`${geistSans.variable} ${geistMono.variable} antialiased bg-slate-900 text-slate-100 min-h-screen`}>
      <Navbar items={navItems} siteName={settings?.siteName} logo={settings?.logo} />
      <main>{children}</main>
      <Footer
        siteName={settings?.siteName}
        copyright={settings?.footer?.copyright}
        socialLinks={settings?.footer?.socialLinks}
      />
      {/* <ChatWidget /> */}
    </div>
  )
}
