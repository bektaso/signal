'use client'

import { useState } from 'react'
import AnimatedSection from '@/components/ui/AnimatedSection'
import Button from '@/components/ui/Button'
import { Mail, Phone, MapPin, Linkedin, Send } from 'lucide-react'

interface ContactBlockProps {
    title?: string
    subtitle?: string
    email?: string
    phone?: string
    address?: string
    linkedIn?: string
}

export default function ContactBlock({
    title,
    subtitle,
    email,
    phone,
    address,
    linkedIn,
}: ContactBlockProps) {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    })
    const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setStatus('sending')

        // TODO: Implement actual form submission
        try {
            await new Promise(resolve => setTimeout(resolve, 1000))
            setStatus('sent')
            setFormData({ name: '', email: '', message: '' })
        } catch {
            setStatus('error')
        }
    }

    return (
        <section id="contact" className="py-24 relative bg-slate-900/50">
            <div className="container mx-auto px-6">
                <AnimatedSection className="text-center mb-16">
                    {title && (
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                            {title}
                        </h2>
                    )}
                    {subtitle && (
                        <p className="text-slate-400 max-w-2xl mx-auto">
                            {subtitle}
                        </p>
                    )}
                </AnimatedSection>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
                    {/* Contact Info */}
                    <AnimatedSection delay={0.1}>
                        <div className="space-y-6">
                            <h3 className="text-xl font-semibold text-white mb-6">
                                Get in Touch
                            </h3>

                            {email && (
                                <a
                                    href={`mailto:${email}`}
                                    className="flex items-center gap-4 p-4 rounded-xl glass hover:border-cyan-500/50 transition-all group"
                                >
                                    <div className="w-12 h-12 rounded-lg bg-cyan-500/10 flex items-center justify-center">
                                        <Mail className="w-5 h-5 text-cyan-400" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-slate-400">Email</p>
                                        <p className="text-white group-hover:text-cyan-400 transition-colors">
                                            {email}
                                        </p>
                                    </div>
                                </a>
                            )}

                            {phone && (
                                <a
                                    href={`tel:${phone.replace(/[^+\d]/g, '')}`}
                                    className="flex items-center gap-4 p-4 rounded-xl glass hover:border-cyan-500/50 transition-all group"
                                >
                                    <div className="w-12 h-12 rounded-lg bg-cyan-500/10 flex items-center justify-center">
                                        <Phone className="w-5 h-5 text-cyan-400" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-slate-400">Phone</p>
                                        <p className="text-white group-hover:text-cyan-400 transition-colors">
                                            {phone}
                                        </p>
                                    </div>
                                </a>
                            )}

                            {address && (
                                <div className="flex items-center gap-4 p-4 rounded-xl glass">
                                    <div className="w-12 h-12 rounded-lg bg-cyan-500/10 flex items-center justify-center">
                                        <MapPin className="w-5 h-5 text-cyan-400" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-slate-400">Location</p>
                                        <p className="text-white">{address}</p>
                                    </div>
                                </div>
                            )}

                            {linkedIn && (
                                <a
                                    href={linkedIn}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-4 p-4 rounded-xl glass hover:border-cyan-500/50 transition-all group"
                                >
                                    <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center">
                                        <Linkedin className="w-5 h-5 text-blue-400" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-slate-400">LinkedIn</p>
                                        <p className="text-white group-hover:text-blue-400 transition-colors">
                                            Follow us
                                        </p>
                                    </div>
                                </a>
                            )}
                        </div>
                    </AnimatedSection>

                    {/* Contact Form */}
                    <AnimatedSection delay={0.2}>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-2">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    value={formData.name}
                                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                                    required
                                    className="w-full px-4 py-3 rounded-lg bg-slate-800/50 border border-slate-700 text-white placeholder-slate-500 focus:border-cyan-500 focus:outline-none transition-colors"
                                    placeholder="Your name"
                                />
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    value={formData.email}
                                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                                    required
                                    className="w-full px-4 py-3 rounded-lg bg-slate-800/50 border border-slate-700 text-white placeholder-slate-500 focus:border-cyan-500 focus:outline-none transition-colors"
                                    placeholder="your@email.com"
                                />
                            </div>

                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-slate-300 mb-2">
                                    Message
                                </label>
                                <textarea
                                    id="message"
                                    value={formData.message}
                                    onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                                    required
                                    rows={5}
                                    className="w-full px-4 py-3 rounded-lg bg-slate-800/50 border border-slate-700 text-white placeholder-slate-500 focus:border-cyan-500 focus:outline-none transition-colors resize-none"
                                    placeholder="Your message..."
                                />
                            </div>

                            <Button
                                type="submit"
                                disabled={status === 'sending'}
                                className="w-full"
                            >
                                {status === 'sending' ? (
                                    'Sending...'
                                ) : status === 'sent' ? (
                                    'Message Sent!'
                                ) : (
                                    <>
                                        Send Message <Send className="w-4 h-4 ml-2" />
                                    </>
                                )}
                            </Button>

                            {status === 'error' && (
                                <p className="text-red-400 text-sm text-center">
                                    Failed to send message. Please try again.
                                </p>
                            )}
                        </form>
                    </AnimatedSection>
                </div>
            </div>
        </section>
    )
}
