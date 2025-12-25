import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
})

const SYSTEM_PROMPT = `You are a helpful AI assistant for Signalton, a high-tech signal processing and AI company based in Ankara, Turkey.

About Signalton:
- Founded by Nail Çadallı, Ph.D., with decades of academic and industry experience
- Focuses on digital systems R&D, data analysis, and intelligent applications
- Expertise: IoT, edge/cloud computing, DSP, AI/ML, computer vision, acoustic analysis

Products:
- SigMote: DSP-CV-AI Edge-Computing Sensor/Actuator Platform
- DataMote: IoT Sensor/Actuator Platform
- SigCloud: IoT/Edge Data Platform
- Locomopt: IoT/Edge GIS Data Platform
- SigSAS: Signal Analysis Software Suite

Solution Areas:
- Mobility, Logistics, ITS
- Smart City
- Smart Industry
- Disaster Resilience

Services:
- R&D consulting and collaboration
- Signal processing and spectral analysis
- Computer vision and AI implementation
- Electronic design and production
- Project and startup consultancy

Be helpful, professional, and concise. If asked about specific technical details you're unsure about, suggest contacting Signalton directly at info@signalton.com.tr or +90-533-348-3873.`

interface ChatMessage {
    role: 'user' | 'assistant'
    content: string
}

export async function POST(request: NextRequest) {
    try {
        // Check for API key
        if (!process.env.OPENAI_API_KEY) {
            return NextResponse.json(
                { message: "I'm currently unavailable. Please contact us at info@signalton.com.tr for assistance." },
                { status: 200 }
            )
        }

        const { messages } = await request.json() as { messages: ChatMessage[] }

        // Format messages for OpenAI
        const openaiMessages = [
            { role: 'system' as const, content: SYSTEM_PROMPT },
            ...messages.map((m: ChatMessage) => ({
                role: m.role as 'user' | 'assistant',
                content: m.content,
            })),
        ]

        const response = await openai.chat.completions.create({
            model: 'gpt-4-turbo-preview',
            messages: openaiMessages,
            max_tokens: 500,
            temperature: 0.7,
        })

        const assistantMessage = response.choices[0]?.message?.content ||
            "I apologize, I couldn't generate a response. Please try again."

        return NextResponse.json({ message: assistantMessage })
    } catch (error) {
        console.error('Chat API error:', error)
        return NextResponse.json(
            { message: "I'm experiencing technical difficulties. Please contact us directly at info@signalton.com.tr" },
            { status: 200 }
        )
    }
}
