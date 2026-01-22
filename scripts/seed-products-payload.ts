/**
 * Seed Products to Payload CMS
 * 
 * Usage: npx tsx scripts/seed-products-payload.ts
 */

import dotenv from 'dotenv'
import path from 'path'

// Load environment variables
dotenv.config({ path: path.resolve(process.cwd(), '.env') })
dotenv.config({ path: path.resolve(process.cwd(), '.env.local'), override: true })

import { getPayload } from 'payload'
import config from '../payload.config'

const products = [
  // ==================== SIGMOTE ====================
  {
    title: 'SigMote',
    slug: 'sigmote',
    tagline: 'Edge AI & Signal Processing Platform',
    icon: 'cpu',
    category: 'hardware',
    order: 1,
    heroHeadline: 'Intelligence at the Edge',
    heroSubheadline: 'Process audio, vibration, and video data in real-time. SigMote is the all-in-one hardware platform for Edge AI and advanced Digital Signal Processing.',
    primaryCta: { label: 'Download Datasheet', href: '/downloads/sigmote-datasheet.pdf' },
    secondaryCta: { label: 'Request Demo', href: '/#contact' },
    features: [
      { icon: 'zap', title: 'Zero Latency', description: "Don't wait for the cloud. SigMote processes critical sensor data locally, enabling millisecond-level decision-making for industrial automation." },
      { icon: 'shield', title: 'Privacy First', description: 'Analyze sensitive audio and video on-device. Only metadata and insights are transmitted, ensuring full GDPR/KVKK compliance.' },
      { icon: 'database', title: 'Bandwidth Efficient', description: 'Reduce data transmission costs by up to 90%. Transform gigabytes of raw sensor data into kilobytes of actionable insights before transmission.' },
    ],
    specifications: [
      { label: 'Acoustic Array', value: '2x Analog & 2x Digital MEMS Microphones for beamforming and source localization' },
      { label: 'Vibration Sensing', value: 'Integrated 3-axis MEMS Accelerometer for structural health monitoring' },
      { label: 'Visual Processing', value: 'On-board Video Decoder for composite/component inputs, ready for Computer Vision' },
      { label: 'Connectivity', value: 'Ethernet, USB, and expansion slots for cellular integration' },
    ],
    useCases: [
      { icon: 'factory', title: 'Industrial Predictive Maintenance', description: 'Motor fault detection via vibration analysis and acoustic monitoring.' },
      { icon: 'shield-alert', title: 'Acoustic Event Detection', description: 'Gunshot, glass break, or cry detection for security applications.' },
      { icon: 'building', title: 'Smart City Monitoring', description: 'Noise pollution analysis and traffic counting.' },
    ],
    footerCta: {
      headline: 'Ready to Deploy Edge AI?',
      body: 'Contact our engineering team for technical documentation and bulk pricing.',
      buttonLabel: 'Contact Us',
      buttonHref: '/#contact',
    },
    seo: {
      metaTitle: 'SigMote | Edge AI Platform',
      metaDescription: 'Advanced edge computing platform with MEMS microphones and accelerometers for real-time DSP and AI inference.',
    },
  },

  // ==================== DATAMOTE ====================
  {
    title: 'DataMote',
    slug: 'datamote',
    tagline: 'Industrial IoT Gateway & Telemetry Unit',
    icon: 'radio',
    category: 'hardware',
    order: 2,
    heroHeadline: 'Connect Your Physical World to the Cloud',
    heroSubheadline: 'An industrial-grade IoT telemetry module designed for reliable data collection, precise geopositioning, and secure cellular transmission. The backbone of your digital twin.',
    primaryCta: { label: 'Download Datasheet', href: '/downloads/datamote-datasheet.pdf' },
    secondaryCta: { label: 'Contact Sales', href: '/#contact' },
    features: [
      { icon: 'signal', title: 'Always Connected', description: 'Built-in 4G/LTE and GSM/GPRS fallback ensure your data reaches the cloud from anywhere. Supports MQTT/S and HTTP/S protocols for seamless integration with AWS, Azure, or custom backends.' },
      { icon: 'map-pin', title: 'Precision Tracking', description: 'Integrated GNSS receiver (GPS, GLONASS, BeiDou) provides location accuracy under 2 meters. Perfect for tracking mobile assets, vehicle fleets, or micromobility solutions.' },
      { icon: 'database', title: 'Blackbox Logging', description: 'With 1Gb of onboard Flash memory, DataMote acts as a reliable data logger. Even if the network fails, your data is stored locally and synced when connectivity is restored.' },
    ],
    specifications: [
      { label: 'Core Power', value: 'ARM Cortex-M4F Processor (80 MHz) optimized for low-power operation' },
      { label: 'Industrial Interfaces', value: 'Native support for CAN 2.0 A/B, USB 2.0, I2C, SPI, and UART' },
      { label: 'Wireless Versatility', value: 'Beyond cellular, features Bluetooth 5.0 and BLE for communicating with nearby sensors' },
      { label: 'Motion Sensing', value: 'On-board 3-axis accelerometer for detecting impacts, vibration, or movement initiation' },
      { label: 'Operating System', value: 'Runs on TI-RTOS with POSIX support, ensuring real-time responsiveness' },
    ],
    useCases: [
      { icon: 'truck', title: 'Fleet Management & Telematics', description: 'Monitor vehicle health, fuel consumption, and driver behavior in real-time via CAN Bus and GPS integration.' },
      { icon: 'bike', title: 'Smart Micromobility (Locomopt)', description: 'The core unit for scooter and bike-sharing platforms, providing location tracking, locking mechanisms, and usage analytics.' },
      { icon: 'cloud-sun', title: 'Remote Environmental Monitoring', description: 'Deploy in remote locations to log weather or structural data and transmit periodically via LTE, independent of local Wi-Fi.' },
    ],
    footerCta: {
      headline: 'Start Collecting Data Today',
      body: 'Need a custom integration? Our team can help configure DataMote for your specific sensor protocols.',
      buttonLabel: 'Get a Quote',
      buttonHref: '/#contact',
    },
    seo: {
      metaTitle: 'DataMote | Industrial IoT Gateway',
      metaDescription: 'Ruggedized IoT data collector with 4G/LTE, GNSS positioning, and CAN Bus for fleet management and asset tracking.',
    },
  },

  // ==================== SIGCLOUD ====================
  {
    title: 'SigCloud',
    slug: 'sigcloud',
    tagline: 'Scalable IoT Management & Analytics Platform',
    icon: 'cloud',
    category: 'platform',
    order: 3,
    heroHeadline: 'The Command Center for Your Digital Reality',
    heroSubheadline: 'Securely ingest, analyze, and visualize data from thousands of SigMote and DataMote devices. Turn massive sensor streams into actionable intelligence.',
    primaryCta: { label: 'Platform Features', href: '#features' },
    secondaryCta: { label: 'Login', href: '/login' },
    features: [
      { icon: 'settings', title: 'Total Device Management', description: 'Monitor the health, battery status, and connectivity of your entire fleet. Push Over-the-Air (OTA) firmware updates to SigMote and DataMote devices with a single click.' },
      { icon: 'bar-chart', title: 'Big Data & AI Ready', description: 'Beyond simple logging, SigCloud runs advanced analytics. It integrates seamlessly with SigSAS algorithms to detect anomalies in vibration or acoustic data that require heavy cloud processing.' },
      { icon: 'plug', title: 'API-First Architecture', description: 'Built for interoperability. Easily export data to third-party ERPs, BI tools, or custom applications via our robust RESTful APIs and WebSocket streams.' },
    ],
    specifications: [
      { label: 'Data Security', value: 'End-to-end encryption (TLS 1.3) from device to dashboard' },
      { label: 'Scalability', value: 'Horizontal scaling architecture designed to handle thousands of concurrent connections (MQTT/HTTP)' },
      { label: 'Storage', value: 'Hot storage for instant access and cold storage for long-term compliance logging' },
      { label: 'Protocols', value: 'MQTT, HTTP/S, WebSocket' },
      { label: 'Deployment', value: 'Cloud / On-premise options available' },
    ],
    useCases: [
      { icon: 'activity', title: 'AVAS (Industrial)', description: 'Preventive Maintenance Dashboard - Visualize spectral analysis from SigMote. Track vibration trends over months to predict machine failure before it halts production.' },
      { icon: 'map', title: 'Locomopt (Mobility)', description: 'Real-Time Fleet Tracking - Live map visualization for vehicles and scooters equipped with DataMote. Define geofences and receive instant alerts for violations.' },
      { icon: 'wind', title: 'AQNS (Smart City)', description: 'Environmental Heatmaps - Monitor air quality and noise pollution across the city. Generate compliance reports and identify pollution hotspots instantly.' },
    ],
    footerCta: {
      headline: 'Unify Your IoT Network',
      body: 'Schedule a demo to see how SigCloud can streamline your operations.',
      buttonLabel: 'Schedule Demo',
      buttonHref: '/#contact',
    },
    seo: {
      metaTitle: 'SigCloud | IoT Management Platform',
      metaDescription: 'Scalable IoT platform for real-time data visualization, device management, and AI analytics for smart cities.',
    },
  },

  // ==================== LOCOMOPT ====================
  {
    title: 'Locomopt',
    slug: 'locomopt',
    tagline: 'Intelligent Fleet Orchestration & GIS Platform',
    icon: 'map',
    category: 'platform',
    order: 4,
    heroHeadline: 'Redefining Urban Mobility',
    heroSubheadline: 'The complete IoT/Edge GIS Data Platform for micromobility operators and fleet managers. Orchestrate your vehicles with precision, from location tracking to predictive maintenance.',
    primaryCta: { label: 'Request Platform Demo', href: '/#contact' },
    secondaryCta: { label: 'Explore Hardware', href: '/products/datamote' },
    features: [
      { icon: 'map-pin', title: 'Precision GIS Tracking', description: 'Monitor your fleet on a live GIS (Geographic Information System) layer. Get sub-meter accuracy on vehicle location, speed, and heading.' },
      { icon: 'shield-alert', title: 'Fall & Crash Detection', description: 'Detect accidents instantly. Locomopt processes accelerometer data at the edge (via DataMote) to identify falls or impacts and alert operation teams immediately.' },
      { icon: 'lock', title: 'Remote Command', description: 'Take full control. Remotely lock/unlock vehicles, immobilize stolen assets, and manage battery power usage—all from the cloud dashboard.' },
    ],
    specifications: [
      { label: 'Positioning', value: 'GPS, GLONASS, BeiDou, Galileo' },
      { label: 'Accuracy', value: '< 2 meters, sub-meter with RTK' },
      { label: 'Hardware Integration', value: 'Native support for DataMote telemetry unit' },
      { label: 'CAN Bus Support', value: 'Extract battery levels, motor diagnostics, and sensor data' },
      { label: 'Predictive Analytics', value: 'Tyre wear analysis and structural anomaly detection' },
    ],
    useCases: [
      { icon: 'bike', title: 'Micromobility Sharing', description: 'Scooters & E-bikes. Battery swapping management, geofencing enforcement, and user billing integration.' },
      { icon: 'car', title: 'Corporate Fleets', description: 'Light commercial vehicles. Driver Monitoring Systems (DMS) to detect fatigue or aggressive driving behaviors.' },
      { icon: 'package', title: 'Smart Logistics', description: 'Real-time cargo tracking and cold-chain monitoring.' },
    ],
    footerCta: {
      headline: 'Optimize Your Fleet Today',
      body: 'Join the operators managing thousands of assets with Locomopt.',
      buttonLabel: 'Talk to an Expert',
      buttonHref: '/#contact',
    },
    seo: {
      metaTitle: 'Locomopt | Fleet GIS Platform',
      metaDescription: 'IoT/Edge GIS platform for micromobility with real-time tracking, remote locking, and fall detection.',
    },
  },

  // ==================== SIGSAS ====================
  {
    title: 'SigSAS',
    slug: 'sigsas',
    tagline: 'AI-Powered Signal Analysis Suite',
    icon: 'brain',
    category: 'software',
    order: 5,
    heroHeadline: 'Decode the Signals That Matter',
    heroSubheadline: 'A comprehensive suite of AI-powered algorithms for acoustic, vibration, and video signal analysis. From raw data to actionable insights in milliseconds.',
    primaryCta: { label: 'Explore Algorithms', href: '#features' },
    secondaryCta: { label: 'Request Trial', href: '/#contact' },
    features: [
      { icon: 'waveform', title: 'Spectral Analysis', description: 'Advanced FFT-based analysis for acoustic and vibration signals. Identify frequency patterns that indicate equipment health or environmental conditions.' },
      { icon: 'brain', title: 'Deep Learning Models', description: 'Pre-trained neural networks for common industrial use cases. Custom model training available for specialized applications.' },
      { icon: 'zap', title: 'Edge-Optimized', description: 'Algorithms designed to run efficiently on SigMote hardware. No cloud dependency for critical real-time decisions.' },
    ],
    specifications: [
      { label: 'Supported Signals', value: 'Audio (up to 96kHz), Vibration (3-axis), Video (up to 4K)' },
      { label: 'Processing Modes', value: 'Real-time streaming, Batch processing, Hybrid' },
      { label: 'Output Formats', value: 'JSON, Protocol Buffers, MQTT messages' },
      { label: 'Integration', value: 'Native integration with SigMote, SigCloud, and third-party systems' },
      { label: 'ML Frameworks', value: 'TensorFlow Lite, ONNX Runtime, custom C++ inference' },
    ],
    useCases: [
      { icon: 'factory', title: 'Predictive Maintenance', description: 'Detect bearing failures, motor imbalances, and pump cavitation before they cause downtime.' },
      { icon: 'shield', title: 'Security & Surveillance', description: 'Acoustic event detection: gunshots, glass breaks, screams. Video analytics: intrusion detection, crowd counting.' },
      { icon: 'stethoscope', title: 'Medical & Healthcare', description: 'Remote patient monitoring through acoustic analysis of breathing patterns and cough detection.' },
    ],
    footerCta: {
      headline: 'Unlock the Power of Your Data',
      body: 'Let our signal processing experts design a custom analysis pipeline for your application.',
      buttonLabel: 'Schedule Consultation',
      buttonHref: '/#contact',
    },
    seo: {
      metaTitle: 'SigSAS | AI Signal Analysis Suite',
      metaDescription: 'Transform sensor data into insights with AI-powered signal analysis for industrial IoT and edge computing.',
    },
  },
]

async function seedProducts() {
  console.log('🌱 Starting product seed to Payload CMS...\n')

  const payload = await getPayload({ config })

  for (const product of products) {
    try {
      // Check if product exists
      const existing = await payload.find({
        collection: 'products',
        where: { slug: { equals: product.slug } },
        limit: 1,
      })

      if (existing.docs.length > 0) {
        // Update existing
        await payload.update({
          collection: 'products',
          id: existing.docs[0].id,
          data: product,
        })
        console.log(`   ✅ Updated: ${product.title}`)
      } else {
        // Create new
        await payload.create({
          collection: 'products',
          data: product,
        })
        console.log(`   ✅ Created: ${product.title}`)
      }
    } catch (error) {
      console.error(`   ❌ Error with ${product.title}:`, error)
    }
  }

  console.log('\n✨ Product seeding completed!')
  console.log('\n📍 Products available at: http://localhost:3000/admin/collections/products\n')

  process.exit(0)
}

seedProducts().catch((error) => {
  console.error('Fatal error:', error)
  process.exit(1)
})
