import Link from 'next/link'
import { Linkedin, Mail, Phone, MapPin } from 'lucide-react'

interface FooterProps {
    siteName?: string
    copyright?: string
    socialLinks?: Array<{
        platform: string
        url: string
    }>
}

const platformIcons: Record<string, typeof Linkedin> = {
    linkedin: Linkedin,
}

export default function Footer({
    siteName = 'Signalton',
    copyright = '© 2025 Signalton Teknoloji Ltd. All rights reserved.',
    socialLinks = []
}: FooterProps) {
    return (
        <footer className="border-t border-slate-800 bg-slate-900/50">
            <div className="container mx-auto px-6 py-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    {/* Brand */}
                    <div>
                        <Link href="/" className="text-2xl font-bold gradient-text">
                            {siteName}
                        </Link>
                        <p className="mt-4 text-slate-400 text-sm">
                            Advanced digital systems and intelligent solutions for challenging real-world problems.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link href="#about" className="text-slate-400 hover:text-cyan-400 transition-colors text-sm">
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link href="#products" className="text-slate-400 hover:text-cyan-400 transition-colors text-sm">
                                    Products
                                </Link>
                            </li>
                            <li>
                                <Link href="#services" className="text-slate-400 hover:text-cyan-400 transition-colors text-sm">
                                    Services
                                </Link>
                            </li>
                            <li>
                                <Link href="#contact" className="text-slate-400 hover:text-cyan-400 transition-colors text-sm">
                                    Contact
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-lg font-semibold text-white mb-4">Contact</h3>
                        <ul className="space-y-3">
                            <li className="flex items-center gap-3 text-slate-400 text-sm">
                                <Mail size={16} className="text-cyan-500" />
                                <a href="mailto:info@signalton.com.tr" className="hover:text-cyan-400 transition-colors">
                                    info@signalton.com.tr
                                </a>
                            </li>
                            <li className="flex items-center gap-3 text-slate-400 text-sm">
                                <Phone size={16} className="text-cyan-500" />
                                <a href="tel:+905333483873" className="hover:text-cyan-400 transition-colors">
                                    +90-533-348-3873
                                </a>
                            </li>
                            <li className="flex items-start gap-3 text-slate-400 text-sm">
                                <MapPin size={16} className="text-cyan-500 mt-0.5" />
                                <span>Ankara, Turkey</span>
                            </li>
                        </ul>

                        {/* Social Links */}
                        {socialLinks.length > 0 && (
                            <div className="flex gap-4 mt-6">
                                {socialLinks.map((link, index) => {
                                    const Icon = platformIcons[link.platform] || Linkedin
                                    return (
                                        <a
                                            key={index}
                                            href={link.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="p-2 rounded-lg bg-slate-800 text-slate-400 hover:text-cyan-400 hover:bg-slate-700 transition-all"
                                            aria-label={link.platform}
                                        >
                                            <Icon size={20} />
                                        </a>
                                    )
                                })}
                            </div>
                        )}
                    </div>
                </div>

                {/* Copyright */}
                <div className="mt-12 pt-8 border-t border-slate-800 text-center">
                    <p className="text-slate-500 text-sm">{copyright}</p>
                    <p className="text-slate-600 text-xs mt-2">
                        This website does not collect any activity data or use cookies.
                    </p>
                </div>
            </div>
        </footer>
    )
}
