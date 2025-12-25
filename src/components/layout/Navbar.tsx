'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ChevronDown, Cpu, Radio, Cloud, Map, Layers, Code } from 'lucide-react'
import Link from 'next/link'

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
}

// Default navigation items
const defaultNavItems: NavItem[] = [
    { _key: 'about', label: 'About', href: '/#about' },
    {
        _key: 'products',
        label: 'Products',
        href: '/#products',
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

export default function Navbar({ items, siteName = 'Signalton' }: NavbarProps) {
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
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
                        <Layers className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors">
                        {siteName}
                    </span>
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
                                    >
                                        {item.label}
                                        <ChevronDown
                                            size={16}
                                            className={`transition-transform duration-200 ${activeDropdown === item._key ? 'rotate-180' : ''}`}
                                        />
                                    </button>

                                    {/* Dropdown */}
                                    <AnimatePresence>
                                        {activeDropdown === item._key && (
                                            <motion.div
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: 10 }}
                                                transition={{ duration: 0.2 }}
                                                className="absolute top-full left-0 mt-2 w-56 rounded-xl border border-slate-700 shadow-2xl overflow-hidden bg-slate-900/98 backdrop-blur-xl"
                                            >
                                                <ul className="py-2">
                                                    {item.children.map((child) => {
                                                        const Icon = productIcons[child._key] || Cpu
                                                        return (
                                                            <li key={child._key}>
                                                                <Link
                                                                    href={child.href}
                                                                    className="flex items-center gap-3 px-4 py-3 text-slate-300 hover:text-cyan-400 hover:bg-white/5 transition-all"
                                                                >
                                                                    <Icon size={18} className="text-cyan-500" />
                                                                    {child.label}
                                                                </Link>
                                                            </li>
                                                        )
                                                    })}
                                                </ul>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </>
                            ) : (
                                <Link
                                    href={item.href}
                                    target={item.isExternal ? '_blank' : undefined}
                                    rel={item.isExternal ? 'noopener noreferrer' : undefined}
                                    className="px-4 py-2 text-slate-300 hover:text-cyan-400 transition-colors duration-200 rounded-lg hover:bg-white/5"
                                >
                                    {item.label}
                                </Link>
                            )}
                        </li>
                    ))}
                </ul>

                {/* CTA Button - Desktop */}
                <div className="hidden lg:flex items-center gap-4">
                    <Link
                        href="#contact"
                        className="px-5 py-2.5 rounded-lg bg-cyan-500 text-slate-900 font-semibold hover:bg-cyan-400 transition-all duration-300 glow-cyan"
                    >
                        Get in Touch
                    </Link>
                </div>

                {/* Mobile Menu Button */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="lg:hidden p-2 text-slate-300 hover:text-cyan-400 rounded-lg hover:bg-white/5 transition-colors"
                    aria-label="Toggle menu"
                >
                    <motion.div
                        animate={{ rotate: isOpen ? 90 : 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        {isOpen ? <X size={24} /> : <Menu size={24} />}
                    </motion.div>
                </button>
            </nav>

            {/* Mobile Navigation */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="lg:hidden overflow-hidden"
                    >
                        <div className="glass border-t border-slate-700">
                            <ul className="container mx-auto px-6 py-6 flex flex-col gap-2">
                                {navItems.map((item, index) => (
                                    <motion.li
                                        key={item._key}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.05 }}
                                    >
                                        {item.children ? (
                                            <div className="space-y-2">
                                                <span className="block py-3 text-slate-400 text-sm font-medium uppercase tracking-wider">
                                                    {item.label}
                                                </span>
                                                <ul className="pl-4 space-y-1 border-l border-slate-700">
                                                    {item.children.map((child) => {
                                                        const Icon = productIcons[child._key] || Cpu
                                                        return (
                                                            <li key={child._key}>
                                                                <Link
                                                                    href={child.href}
                                                                    className="flex items-center gap-3 py-2 text-slate-300 hover:text-cyan-400 transition-colors"
                                                                    onClick={() => setIsOpen(false)}
                                                                >
                                                                    <Icon size={16} className="text-cyan-500" />
                                                                    {child.label}
                                                                </Link>
                                                            </li>
                                                        )
                                                    })}
                                                </ul>
                                            </div>
                                        ) : (
                                            <Link
                                                href={item.href}
                                                target={item.isExternal ? '_blank' : undefined}
                                                className="block py-3 text-lg text-slate-200 hover:text-cyan-400 transition-colors font-medium"
                                                onClick={() => setIsOpen(false)}
                                            >
                                                {item.label}
                                            </Link>
                                        )}
                                    </motion.li>
                                ))}

                                {/* Mobile CTA */}
                                <motion.li
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: navItems.length * 0.05 }}
                                    className="pt-4 mt-2 border-t border-slate-700"
                                >
                                    <Link
                                        href="#contact"
                                        className="block w-full py-3 text-center rounded-lg bg-cyan-500 text-slate-900 font-semibold hover:bg-cyan-400 transition-all"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        Get in Touch
                                    </Link>
                                </motion.li>
                            </ul>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    )
}
