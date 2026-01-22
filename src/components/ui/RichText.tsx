import React from 'react'

interface RichTextProps {
    value: any
    className?: string
}

export default function RichText({ value, className = '' }: RichTextProps) {
    if (!value) return null

    // TODO: Implement Payload Lexical renderer or HTML renderer here
    // Currently acting as a placeholder to remove Sanity dependencies
    return (
        <div className={`prose prose-invert max-w-none ${className}`}>
            {/* If value is simple string (HTML), render it, otherwise JSON for debugging */}
            {typeof value === 'string' ? (
                <div dangerouslySetInnerHTML={{ __html: value }} />
            ) : (
                <pre className="whitespace-pre-wrap text-xs text-slate-500">
                    {JSON.stringify(value, null, 2)}
                </pre>
            )}
        </div>
    )
}
