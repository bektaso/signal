import { config } from 'dotenv'
config({ path: '.env.local' })
import { createClient } from '@sanity/client'

console.log('Token loaded:', process.env.NEXT_PUBLIC_SANITY_API_WRITE_TOKEN ? '✅ Yes' : '❌ No')

const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '3i2rg51e',
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
    apiVersion: '2024-01-01',
    token: process.env.NEXT_PUBLIC_SANITY_API_WRITE_TOKEN,
    useCdn: false,
})

const sigsas = {
    _type: 'product',
    title: 'SigSAS',
    slug: { _type: 'slug', current: 'sigsas' },
    tagline: 'Advanced Signal Processing & Edge AI Library',
    icon: 'code',
    category: 'software',
    order: 5,
    // Hero Section
    heroHeadline: 'The Algorithmic Core of Edge Intelligence',
    heroSubheadline: 'Turn raw sensor data into actionable physics-based insights. SigSAS is a highly optimized library of DSP, Computer Vision, and ML algorithms designed to run natively on SigMote hardware.',
    primaryCta: { label: 'View Documentation', href: '/docs/sigsas' },
    secondaryCta: { label: 'Supported Models', href: '#features' },
    // Key Features (4-Block Grid)
    features: [
        {
            _key: 'f1',
            icon: 'activity',
            title: 'Spectral Analysis',
            description: 'Real-time Fast Fourier Transform (FFT), digital filtering, and time-frequency analysis. Perfect for extracting features from vibration and acoustic sensors.'
        },
        {
            _key: 'f2',
            icon: 'audio-waveform',
            title: 'Audio Processing',
            description: "Pre-built modules for Beamforming, Direction of Arrival (DoA) estimation, and noise cancellation using SigMote's microphone arrays."
        },
        {
            _key: 'f3',
            icon: 'brain',
            title: 'Edge Inference',
            description: 'Run lightweight Machine Learning and Deep Learning models directly on the device. Detect anomalies or classify objects without sending video/audio to the cloud.'
        },
        {
            _key: 'f4',
            icon: 'eye',
            title: 'Computer Vision',
            description: 'Optimized image processing pipelines for object detection and motion tracking, fully integrated with the on-board video decoders.'
        },
    ],
    // Specifications (The Workflow)
    specifications: [
        { _key: 's1', label: 'Step 1: Configure', value: 'Select your sensors and desired analysis modules (e.g., Vibration FFT + Anomaly Detection)' },
        { _key: 's2', label: 'Step 2: Deploy', value: 'Push the SigSAS firmware configuration to your SigMote fleet via OTA (Over-the-Air)' },
        { _key: 's3', label: 'Step 3: Analyze', value: 'The algorithms execute on the edge (ARM Cortex/DSP), processing data in milliseconds' },
        { _key: 's4', label: 'Step 4: Act', value: 'Only the results (alerts, metadata) are sent to SigCloud, saving bandwidth and ensuring privacy' },
    ],
    // Use Cases (Application Verticals)
    useCases: [
        { _key: 'u1', icon: 'factory', title: 'Smart Industry', description: 'Fault detection in rotating machinery using vibration signatures (Predictive Maintenance).' },
        { _key: 'u2', icon: 'shield', title: 'Security', description: 'Gunshot detection or glass break analysis using acoustic signatures without recording conversations.' },
        { _key: 'u3', icon: 'car', title: 'Traffic', description: 'Vehicle counting and classification using edge video analytics.' },
    ],
    // Footer CTA
    footerCta: {
        headline: 'Empower Your Edge Devices',
        body: 'See the full list of supported algorithms and benchmarks.',
        buttonLabel: 'Developer Hub',
        buttonHref: '/docs/sigsas',
    },
    // SEO
    seo: {
        metaTitle: 'SigSAS | Advanced Signal Processing & Edge AI Library',
        metaDescription: 'A comprehensive suite of real-time DSP, Computer Vision, and AI algorithms optimized for the SigMote platform. Deploy spectral analysis and machine learning models directly to the edge.',
    },
}

async function seedSigSAS() {
    console.log('\n🌱 Seeding SigSAS to Sanity...\n')

    if (!process.env.NEXT_PUBLIC_SANITY_API_WRITE_TOKEN) {
        console.error('❌ Token not found')
        return
    }

    try {
        const result = await client.createOrReplace({
            _id: `product-${sigsas.slug.current}`,
            ...sigsas,
        })
        console.log(`✅ Created: ${result.title}`)
    } catch (error) {
        console.error(`❌ Failed:`, error)
    }

    console.log('\n🎉 Done!')
}

seedSigSAS()
