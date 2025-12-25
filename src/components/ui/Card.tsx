import { ReactNode } from 'react'

interface CardProps {
    children: ReactNode
    className?: string
    hover?: boolean
}

export default function Card({ children, className = '', hover = true }: CardProps) {
    return (
        <div
            className={`
        p-6 rounded-xl glass
        ${hover ? 'hover:border-cyan-500/50 transition-all duration-300' : ''}
        ${className}
      `}
        >
            {children}
        </div>
    )
}

export function CardTitle({ children, className = '' }: { children: ReactNode; className?: string }) {
    return (
        <h3 className={`text-xl font-semibold text-white mb-2 ${className}`}>
            {children}
        </h3>
    )
}

export function CardDescription({ children, className = '' }: { children: ReactNode; className?: string }) {
    return (
        <p className={`text-slate-400 ${className}`}>
            {children}
        </p>
    )
}
