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

const products = [
    // ==================== SIGMOTE ====================
    {
        _type: 'product',
        title: 'SigMote',
        slug: { _type: 'slug', current: 'sigmote' },
        tagline: 'Edge AI & Signal Processing Platform',
        icon: 'cpu',
        category: 'hardware',
        order: 1,
        // Hero Section
        heroHeadline: 'Intelligence at the Edge',
        heroSubheadline: 'Process audio, vibration, and video data in real-time. SigMote is the all-in-one hardware platform for Edge AI and advanced Digital Signal Processing.',
        primaryCta: { label: 'Download Datasheet', href: '/downloads/sigmote-datasheet.pdf' },
        secondaryCta: { label: 'Request Demo', href: '/#contact' },
        // Key Features
        features: [
            { _key: 'f1', icon: 'zap', title: 'Zero Latency', description: "Don't wait for the cloud. SigMote processes critical sensor data locally, enabling millisecond-level decision-making for industrial automation." },
            { _key: 'f2', icon: 'shield', title: 'Privacy First', description: 'Analyze sensitive audio and video on-device. Only metadata and insights are transmitted, ensuring full GDPR/KVKK compliance.' },
            { _key: 'f3', icon: 'database', title: 'Bandwidth Efficient', description: 'Reduce data transmission costs by up to 90%. Transform gigabytes of raw sensor data into kilobytes of actionable insights before transmission.' },
        ],
        // Specifications
        specifications: [
            { _key: 's1', label: 'Acoustic Array', value: '2x Analog & 2x Digital MEMS Microphones for beamforming and source localization' },
            { _key: 's2', label: 'Vibration Sensing', value: 'Integrated 3-axis MEMS Accelerometer for structural health monitoring' },
            { _key: 's3', label: 'Visual Processing', value: 'On-board Video Decoder for composite/component inputs, ready for Computer Vision' },
            { _key: 's4', label: 'Connectivity', value: 'Ethernet, USB, and expansion slots for cellular integration' },
        ],
        // Use Cases
        useCases: [
            { _key: 'u1', icon: 'factory', title: 'Industrial Predictive Maintenance', description: 'Motor fault detection via vibration analysis and acoustic monitoring.' },
            { _key: 'u2', icon: 'shield-alert', title: 'Acoustic Event Detection', description: 'Gunshot, glass break, or cry detection for security applications.' },
            { _key: 'u3', icon: 'building', title: 'Smart City Monitoring', description: 'Noise pollution analysis and traffic counting.' },
        ],
        // Footer CTA
        footerCta: {
            headline: 'Ready to Deploy Edge AI?',
            body: 'Contact our engineering team for technical documentation and bulk pricing.',
            buttonLabel: 'Contact Us',
            buttonHref: '/#contact',
        },
        // SEO
        seo: {
            metaTitle: 'SigMote | Edge AI & Signal Processing Platform',
            metaDescription: 'An advanced edge computing platform featuring integrated MEMS microphones and accelerometers. Designed for real-time DSP, AI inference, and industrial acoustic analysis.',
        },
    },

    // ==================== DATAMOTE ====================
    {
        _type: 'product',
        title: 'DataMote',
        slug: { _type: 'slug', current: 'datamote' },
        tagline: 'Industrial IoT Gateway & Telemetry Unit',
        icon: 'radio',
        category: 'hardware',
        order: 2,
        // Hero Section
        heroHeadline: 'Connect Your Physical World to the Cloud',
        heroSubheadline: 'An industrial-grade IoT telemetry module designed for reliable data collection, precise geopositioning, and secure cellular transmission. The backbone of your digital twin.',
        primaryCta: { label: 'Download Datasheet', href: '/downloads/datamote-datasheet.pdf' },
        secondaryCta: { label: 'Contact Sales', href: '/#contact' },
        // Key Features
        features: [
            { _key: 'f1', icon: 'signal', title: 'Always Connected', description: 'Built-in 4G/LTE and GSM/GPRS fallback ensure your data reaches the cloud from anywhere. Supports MQTT/S and HTTP/S protocols for seamless integration with AWS, Azure, or custom backends.' },
            { _key: 'f2', icon: 'map-pin', title: 'Precision Tracking', description: 'Integrated GNSS receiver (GPS, GLONASS, BeiDou) provides location accuracy under 2 meters. Perfect for tracking mobile assets, vehicle fleets, or micromobility solutions.' },
            { _key: 'f3', icon: 'database', title: 'Blackbox Logging', description: 'With 1Gb of onboard Flash memory, DataMote acts as a reliable data logger. Even if the network fails, your data is stored locally and synced when connectivity is restored.' },
        ],
        // Specifications
        specifications: [
            { _key: 's1', label: 'Core Power', value: 'ARM Cortex-M4F Processor (80 MHz) optimized for low-power operation' },
            { _key: 's2', label: 'Industrial Interfaces', value: 'Native support for CAN 2.0 A/B, USB 2.0, I2C, SPI, and UART' },
            { _key: 's3', label: 'Wireless Versatility', value: 'Beyond cellular, features Bluetooth 5.0 and BLE for communicating with nearby sensors' },
            { _key: 's4', label: 'Motion Sensing', value: 'On-board 3-axis accelerometer for detecting impacts, vibration, or movement initiation' },
            { _key: 's5', label: 'Operating System', value: 'Runs on TI-RTOS with POSIX support, ensuring real-time responsiveness' },
        ],
        // Use Cases
        useCases: [
            { _key: 'u1', icon: 'truck', title: 'Fleet Management & Telematics', description: 'Monitor vehicle health, fuel consumption, and driver behavior in real-time via CAN Bus and GPS integration.' },
            { _key: 'u2', icon: 'bike', title: 'Smart Micromobility (Locomopt)', description: 'The core unit for scooter and bike-sharing platforms, providing location tracking, locking mechanisms, and usage analytics.' },
            { _key: 'u3', icon: 'cloud-sun', title: 'Remote Environmental Monitoring', description: 'Deploy in remote locations to log weather or structural data and transmit periodically via LTE, independent of local Wi-Fi.' },
        ],
        // Footer CTA
        footerCta: {
            headline: 'Start Collecting Data Today',
            body: 'Need a custom integration? Our team can help configure DataMote for your specific sensor protocols.',
            buttonLabel: 'Get a Quote',
            buttonHref: '/#contact',
        },
        // SEO
        seo: {
            metaTitle: 'DataMote | Industrial IoT Gateway & Telemetry Unit',
            metaDescription: 'A ruggedized IoT data collector featuring 4G/LTE, GNSS positioning, and CAN Bus connectivity. Designed for fleet management, asset tracking, and remote telemetry.',
        },
    },

    // ==================== SIGCLOUD ====================
    {
        _type: 'product',
        title: 'SigCloud',
        slug: { _type: 'slug', current: 'sigcloud' },
        tagline: 'Scalable IoT Management & Analytics Platform',
        icon: 'cloud',
        category: 'platform',
        order: 3,
        // Hero Section
        heroHeadline: 'The Command Center for Your Digital Reality',
        heroSubheadline: 'Securely ingest, analyze, and visualize data from thousands of SigMote and DataMote devices. Turn massive sensor streams into actionable intelligence.',
        primaryCta: { label: 'Platform Features', href: '#features' },
        secondaryCta: { label: 'Login', href: '/login' },
        // Key Features
        features: [
            { _key: 'f1', icon: 'settings', title: 'Total Device Management', description: 'Monitor the health, battery status, and connectivity of your entire fleet. Push Over-the-Air (OTA) firmware updates to SigMote and DataMote devices with a single click.' },
            { _key: 'f2', icon: 'bar-chart', title: 'Big Data & AI Ready', description: 'Beyond simple logging, SigCloud runs advanced analytics. It integrates seamlessly with SigSAS algorithms to detect anomalies in vibration or acoustic data that require heavy cloud processing.' },
            { _key: 'f3', icon: 'plug', title: 'API-First Architecture', description: 'Built for interoperability. Easily export data to third-party ERPs, BI tools, or custom applications via our robust RESTful APIs and WebSocket streams.' },
        ],
        // Specifications
        specifications: [
            { _key: 's1', label: 'Data Security', value: 'End-to-end encryption (TLS 1.3) from device to dashboard' },
            { _key: 's2', label: 'Scalability', value: 'Horizontal scaling architecture designed to handle thousands of concurrent connections (MQTT/HTTP)' },
            { _key: 's3', label: 'Storage', value: 'Hot storage for instant access and cold storage for long-term compliance logging' },
            { _key: 's4', label: 'Protocols', value: 'MQTT, HTTP/S, WebSocket' },
            { _key: 's5', label: 'Deployment', value: 'Cloud / On-premise options available' },
        ],
        // Use Cases
        useCases: [
            { _key: 'u1', icon: 'activity', title: 'AVAS (Industrial)', description: 'Preventive Maintenance Dashboard - Visualize spectral analysis from SigMote. Track vibration trends over months to predict machine failure before it halts production.' },
            { _key: 'u2', icon: 'map', title: 'Locomopt (Mobility)', description: 'Real-Time Fleet Tracking - Live map visualization for vehicles and scooters equipped with DataMote. Define geofences and receive instant alerts for violations.' },
            { _key: 'u3', icon: 'wind', title: 'AQNS (Smart City)', description: 'Environmental Heatmaps - Monitor air quality and noise pollution across the city. Generate compliance reports and identify pollution hotspots instantly.' },
        ],
        // Footer CTA
        footerCta: {
            headline: 'Unify Your IoT Network',
            body: 'Schedule a demo to see how SigCloud can streamline your operations.',
            buttonLabel: 'Schedule Demo',
            buttonHref: '/#contact',
        },
        // SEO
        seo: {
            metaTitle: 'SigCloud | Scalable IoT Management & Analytics Platform',
            metaDescription: 'The central nervous system for your sensor networks. SigCloud provides real-time data visualization, device management, and cloud-side AI integration for smart city and industrial applications.',
        },
    },

    // ==================== LOCOMOPT ====================
    {
        _type: 'product',
        title: 'Locomopt',
        slug: { _type: 'slug', current: 'locomopt' },
        tagline: 'Intelligent Fleet Orchestration & GIS Platform',
        icon: 'map',
        category: 'platform',
        order: 4,
        // Hero Section
        heroHeadline: 'Redefining Urban Mobility',
        heroSubheadline: 'The complete IoT/Edge GIS Data Platform for micromobility operators and fleet managers. Orchestrate your vehicles with precision, from location tracking to predictive maintenance.',
        primaryCta: { label: 'Request Platform Demo', href: '/#contact' },
        secondaryCta: { label: 'Explore Hardware', href: '/products/datamote' },
        // Key Features
        features: [
            { _key: 'f1', icon: 'map-pin', title: 'Precision GIS Tracking', description: 'Monitor your fleet on a live GIS (Geographic Information System) layer. Get sub-meter accuracy on vehicle location, speed, and heading.' },
            { _key: 'f2', icon: 'shield-alert', title: 'Fall & Crash Detection', description: 'Detect accidents instantly. Locomopt processes accelerometer data at the edge (via DataMote) to identify falls or impacts and alert operation teams immediately.' },
            { _key: 'f3', icon: 'lock', title: 'Remote Command', description: 'Take full control. Remotely lock/unlock vehicles, immobilize stolen assets, and manage battery power usage—all from the cloud dashboard.' },
        ],
        // Specifications
        specifications: [
            { _key: 's1', label: 'Positioning', value: 'GPS, GLONASS, BeiDou, Galileo' },
            { _key: 's2', label: 'Accuracy', value: '< 2 meters, sub-meter with RTK' },
            { _key: 's3', label: 'Hardware Integration', value: 'Native support for DataMote telemetry unit' },
            { _key: 's4', label: 'CAN Bus Support', value: 'Extract battery levels, motor diagnostics, and sensor data' },
            { _key: 's5', label: 'Predictive Analytics', value: 'Tyre wear analysis and structural anomaly detection' },
        ],
        // Use Cases
        useCases: [
            { _key: 'u1', icon: 'bike', title: 'Micromobility Sharing', description: 'Scooters & E-bikes. Battery swapping management, geofencing enforcement, and user billing integration.' },
            { _key: 'u2', icon: 'car', title: 'Corporate Fleets', description: 'Light commercial vehicles. Driver Monitoring Systems (DMS) to detect fatigue or aggressive driving behaviors.' },
            { _key: 'u3', icon: 'package', title: 'Smart Logistics', description: 'Real-time cargo tracking and cold-chain monitoring.' },
        ],
        // Footer CTA
        footerCta: {
            headline: 'Optimize Your Fleet Today',
            body: 'Join the operators managing thousands of assets with Locomopt.',
            buttonLabel: 'Talk to an Expert',
            buttonHref: '/#contact',
        },
        // SEO
        seo: {
            metaTitle: 'Locomopt | Intelligent Fleet Orchestration & GIS Platform',
            metaDescription: 'An advanced IoT/Edge GIS platform for micromobility and fleet management. Features real-time tracking, remote locking, fall detection, and predictive tire wear analysis.',
        },
    },
]

async function seedProducts() {
    console.log('\n🌱 Seeding products to Sanity...\n')

    if (!process.env.NEXT_PUBLIC_SANITY_API_WRITE_TOKEN) {
        console.error('❌ NEXT_PUBLIC_SANITY_API_WRITE_TOKEN not found in .env.local')
        return
    }

    for (const product of products) {
        try {
            const result = await client.createOrReplace({
                _id: `product-${product.slug.current}`,
                ...product,
            })
            console.log(`✅ Created: ${result.title}`)
        } catch (error) {
            console.error(`❌ Failed to create ${product.title}:`, error)
        }
    }

    console.log('\n🎉 Seeding complete!')
}

seedProducts()
