import { NextRequest, NextResponse } from 'next/server'

interface ContactFormData {
    name: string
    email: string
    message: string
}

export async function POST(request: NextRequest) {
    try {
        const data = await request.json() as ContactFormData

        // Validate required fields
        if (!data.name || !data.email || !data.message) {
            return NextResponse.json(
                { error: 'All fields are required' },
                { status: 400 }
            )
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(data.email)) {
            return NextResponse.json(
                { error: 'Invalid email format' },
                { status: 400 }
            )
        }

        // TODO: Implement actual email sending
        // Options: SendGrid, Resend, or direct SMTP
        // For now, we log the message
        console.log('Contact form submission:', data)

        // In production, you would send an email here:
        // await sendEmail({
        //   to: 'info@signalton.com.tr',
        //   subject: `New Contact from ${data.name}`,
        //   body: data.message,
        //   replyTo: data.email,
        // })

        return NextResponse.json({ success: true })
    } catch (error) {
        console.error('Contact form error:', error)
        return NextResponse.json(
            { error: 'Failed to submit form' },
            { status: 500 }
        )
    }
}
