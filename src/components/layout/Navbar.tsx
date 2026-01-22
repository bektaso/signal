'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ChevronDown, Cpu, Radio, Cloud, Map, Layers, Code } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
// import { urlFor } from '@/lib/sanity/image'

interface NavItem {
    _key: string
    label: string
    href: string
    isExternal?: boolean
    children?: NavItem[]
}

interface NavbarProps {
    items?: NavItem[]
    siteName?: string
    logo?: any // { asset: { _ref: string } }
}

// Default navigation items
const defaultNavItems: NavItem[] = [
    { _key: 'about', label: 'About', href: '/#about' },
    {
        _key: 'products',
        label: 'Products',
        href: '#',
        children: [
            { _key: 'sigmote', label: 'SigMote', href: '/products/sigmote' },
            { _key: 'datamote', label: 'DataMote', href: '/products/datamote' },
            { _key: 'sigcloud', label: 'SigCloud', href: '/products/sigcloud' },
            { _key: 'locomopt', label: 'Locomopt', href: '/products/locomopt' },
            { _key: 'sigsas', label: 'SigSAS', href: '/products/sigsas' },
        ]
    },
    { _key: 'services', label: 'Services', href: '/#services' },
    { _key: 'careers', label: 'Careers', href: '/careers' },
    { _key: 'contact', label: 'Contact', href: '/#contact' },
]

const productIcons: Record<string, typeof Cpu> = {
    sigmote: Cpu,
    datamote: Radio,
    sigcloud: Cloud,
    locomopt: Map,
    sigsas: Code,
}

export default function Navbar({ items, siteName = 'Signalton', logo }: NavbarProps) {
    const [isOpen, setIsOpen] = useState(false)
    const [isScrolled, setIsScrolled] = useState(false)
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null)

    const navItems = items && items.length > 0 ? items : defaultNavItems

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50)
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    // Close mobile menu on route change
    useEffect(() => {
        setIsOpen(false)
    }, [])

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
                ? 'py-3 shadow-lg shadow-black/20 bg-slate-900/95 backdrop-blur-xl border-b border-slate-800/50'
                : 'py-5 bg-gradient-to-b from-slate-900/80 to-transparent'
                }`}
        >
            <nav className="container mx-auto px-6 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2 group">
                    {logo?.url ? (
                        <div className="relative w-32 h-10">
                            <Image
                                src={logo.url}
                                alt={siteName}
                                fill
                                className="object-contain object-left"
                                priority
                            />
                        </div>
                    ) : (
                        <>
                            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
                                <Layers className="w-5 h-5 text-white" />
                            </div>
                            <span className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors">
                                {siteName}
                            </span>
                        </>
                    )}
                </Link>

                {/* Desktop Navigation */}
                <ul className="hidden lg:flex items-center gap-1">
                    {navItems.map((item) => (
                        <li
                            key={item._key}
                            className="relative"
                            onMouseEnter={() => item.children && setActiveDropdown(item._key)}
                            onMouseLeave={() => setActiveDropdown(null)}
                        >
                            {item.children ? (
                                <>
                                    <button
                                        className="flex items-center gap-1 px-4 py-2 text-slate-300 hover:text-cyan-400 transition-colors duration-200 rounded-lg hover:bg-white/5"
                                        aria-expanded={activeDropdown === item._key}
                                    >
                                        {item.label}
                                        <ChevronDown
                                            size={16}
                                            className={`transition-transform duration-200 ${activeDropdown === item._key ? 'rotate-180' : ''}`}
                                        />
                                    </button>
                                    <AnimatePresence>
                                        {activeDropdown === item._key && (
                                            <motion.div
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: 10 }}
                                                transition={{ duration: 0.2 }}
                                                className="absolute top-full left-0 mt-2 w-64 bg-slate-900/98 border border-slate-700 rounded-xl shadow-2xl p-2 z-50 glass"
                                            >
                                                {item.children.map((child) => {
                                                    // Icon resolution logic
                                                    let ChildIcon = Layers
                                                    if (child._key in productIcons) {
                                                        ChildIcon = productIcons[child._key]
                                                    }

                                                    return (
                                                        <Link
                                                            key={child._key}
                                                            href={child.href}
                                                            className="flex items-start gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors group"
                                                        >
                                                            <div className="mt-1 w-8 h-8 rounded-md bg-slate-800 flex items-center justify-center group-hover:bg-cyan-500/20 group-hover:text-cyan-400 transition-colors">
                                                                <ChildIcon size={16} />
                                                            </div>
                                                            <div>
                                                                <div className="text-sm font-medium text-slate-200 group-hover:text-white">
                                                                    {child.label}
                                                                </div>
                                                                <div className="text-xs text-slate-500 group-hover:text-slate-400">
                                                                    {child.label === 'SigMote' ? 'Edge AI Platform' :
                                                                        child.label === 'DataMote' ? 'IoT Gateway' :
                                                                            child.label === 'SigCloud' ? 'Management' :
                                                                                child.label === 'Locomopt' ? 'Fleet GIS' :
                                                                                    child.label === 'SigSAS' ? 'Signal Analysis' : 'Product'}
                                                                </div>
                                                            </div>
                                                        </Link>
                                                    )
                                                })}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </>
                            ) : (
                                <Link
                                    href={item.href}
                                    className="px-4 py-2 text-slate-300 hover:text-cyan-400 transition-colors duration-200 rounded-lg hover:bg-white/5"
                                >
                                    {item.label}
                                </Link>
                            )}
                        </li>
                    ))}
                </ul>

                {/* Mobile Menu Button */}
                <button
                    className="lg:hidden p-2 text-slate-300 hover:text-white"
                    onClick={() => setIsOpen(!isOpen)}
                    aria-label="Toggle menu"
                >
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </nav>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: '100vh' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="lg:hidden absolute top-full left-0 right-0 bg-slate-900 border-t border-slate-800 overflow-y-auto"
                    >
                        <div className="container mx-auto px-6 py-8 flex flex-col gap-6">
                            {navItems.map((item) => (
                                <div key={item._key}>
                                    {item.children ? (
                                        <div className="space-y-4">
                                            <div className="text-sm font-semibold text-slate-500 uppercase tracking-wider">
                                                {item.label}
                                            </div>
                                            <div className="grid grid-cols-1 gap-4 pl-4 border-l border-slate-800">
                                                {item.children.map((child) => (
                                                    <Link
                                                        key={child._key}
                                                        href={child.href}
                                                        className="text-lg text-slate-300 hover:text-cyan-400"
                                                        onClick={() => setIsOpen(false)}
                                                    >
                                                        {child.label}
                                                    </Link>
                                                ))}
                                            </div>
                                        </div>
                                    ) : (
                                        <Link
                                            href={item.href}
                                            className="text-2xl font-medium text-white hover:text-cyan-400"
                                            onClick={() => setIsOpen(false)}
                                        >
                                            {item.label}
                                        </Link>
                                    )}
                                </div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    )
}
