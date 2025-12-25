import { ButtonHTMLAttributes, AnchorHTMLAttributes, ReactNode } from 'react'

type ButtonVariant = 'primary' | 'secondary' | 'ghost'
type ButtonSize = 'sm' | 'md' | 'lg'

interface BaseButtonProps {
    variant?: ButtonVariant
    size?: ButtonSize
    children: ReactNode
}

type ButtonAsButton = BaseButtonProps &
    ButtonHTMLAttributes<HTMLButtonElement> & { as?: 'button' }

type ButtonAsAnchor = BaseButtonProps &
    AnchorHTMLAttributes<HTMLAnchorElement> & { as: 'a' }

type ButtonProps = ButtonAsButton | ButtonAsAnchor

const variantClasses: Record<ButtonVariant, string> = {
    primary: 'bg-cyan-500 text-slate-900 hover:bg-cyan-400 glow-cyan',
    secondary: 'border border-slate-600 text-slate-300 hover:border-cyan-500 hover:text-cyan-400',
    ghost: 'text-slate-300 hover:text-cyan-400 hover:bg-slate-800/50',
}

const sizeClasses: Record<ButtonSize, string> = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3',
    lg: 'px-8 py-4 text-lg',
}

export default function Button(props: ButtonProps) {
    const {
        variant = 'primary',
        size = 'md',
        children,
        className = '',
        ...rest
    } = props

    const classes = `inline-flex items-center justify-center rounded-lg font-semibold transition-all duration-300 ${variantClasses[variant]} ${sizeClasses[size]} ${className}`

    if ('as' in props && props.as === 'a') {
        const { as, ...anchorProps } = rest as ButtonAsAnchor
        return (
            <a className={classes} {...anchorProps}>
                {children}
            </a>
        )
    }

    return (
        <button className={classes} {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}>
            {children}
        </button>
    )
}
