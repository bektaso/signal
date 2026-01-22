/**
 * Seed Content Script
 * Populates Payload CMS with initial content for Home and Careers pages
 * 
 * Usage: npx tsx scripts/seed-content.ts
 */

import dotenv from 'dotenv'
import path from 'path'

// Load environment variables
dotenv.config({ path: path.resolve(process.cwd(), '.env') })
dotenv.config({ path: path.resolve(process.cwd(), '.env.local'), override: true })

import { getPayload } from 'payload'
import config from '../payload.config'

// ==================== HOME PAGE CONTENT ====================
const homePageContent = {
  title: 'Home',
  slug: 'home',
  seo: {
    title: 'Signalton | Invisible Intelligence',
    description: 'Advanced signal processing, AI, and digital systems for challenging real-world problems. IoT, Edge Computing, and AI solutions.',
  },
  blocks: [
    // Hero Block
    {
      blockType: 'heroBlock',
      headline: 'Invisible Intelligence',
      subheadline: 'Advanced signal processing, AI, and digital systems for challenging real-world problems.',
      ctaPrimary: { label: 'Explore Solutions', href: '#products' },
      ctaSecondary: { label: 'Contact Us', href: '#contact' },
    },
    // Features Block
    {
      blockType: 'featuresBlock',
      title: 'About Signalton',
      subtitle: 'Bringing together decades of academic and industry expertise in signal processing and AI.',
      features: [
        { icon: 'cpu', title: 'IoT & Edge Computing', description: 'Cutting-edge sensor networks and edge processing solutions for real-time data analysis.' },
        { icon: 'brain', title: 'AI & Machine Learning', description: 'Deep learning and pattern recognition for intelligent, autonomous systems.' },
        { icon: 'eye', title: 'Computer Vision', description: 'Image and video analysis for industrial automation and smart city applications.' },
        { icon: 'radio', title: 'Signal Processing', description: 'Advanced DSP, spectral analysis, and acoustic signal processing expertise.' },
        { icon: 'database', title: 'Data Fusion', description: 'Intelligent multi-source data integration and decision support systems.' },
        { icon: 'shield', title: 'Disaster Resilience', description: 'Smart monitoring systems for structural health, safety, and early warning.' },
      ],
    },
    // Products Block
    {
      blockType: 'productsBlock',
      title: 'Products & Solutions',
      subtitle: 'Versatile digital systems and end-to-end intelligent solutions for industry and infrastructure.',
    },
    // Services Block
    {
      blockType: 'servicesBlock',
      title: 'Our Services',
      subtitle: 'Outstanding expert team with exceptional experience in cutting-edge technologies.',
      services: [
        { title: 'R&D Consulting', description: 'Outsourced research, collaboration, or consulting towards scalable joint products and innovations.' },
        { title: 'Signal Processing', description: 'Spectral analysis, acoustic/audio/vibration analysis, array signal processing, and filter design.' },
        { title: 'AI Implementation', description: 'Machine learning, deep learning, pattern recognition, classification, and anomaly detection systems.' },
        { title: 'Electronic Design', description: 'Hardware design and production management for prototyping and volume production.' },
        { title: 'Software Development', description: 'Custom software solutions, embedded programming, and cloud platform development.' },
        { title: 'Startup Consultancy', description: 'Idea preparation, project development, funding applications, and rapid-growth support.' },
      ],
    },
    // Contact Block
    {
      blockType: 'contactBlock',
      title: 'Contact Us',
      subtitle: 'Get in touch for any inquiry about our products and services.',
      email: 'info@signalton.com.tr',
      phone: '+90-533-348-3873',
      address: 'Ankara, Turkey',
      linkedIn: 'https://www.linkedin.com/company/signalton',
    },
  ],
}

// ==================== CAREERS PAGE CONTENT ====================
const careersContent = {
  heroHeadline: 'Shape the Future of Edge Intelligence',
  heroSubheadline: "We don't just write code; we bridge the gap between physical signals and digital insights. Join the team building the nervous system of smart cities and industries.",
  heroCta: { label: 'View Open Roles', href: '#positions' },
  
  whyUsHeadline: 'Why Signalton?',
  whyUsBody: 'At Signalton, we tackle the hardest problems in IoT: Latency, Bandwidth, and Privacy. We are a playground for the curious—where Digital Signal Processing meets Modern Web Tech, and where a line of code translates into real-world action.',
  whyUsPoints: [
    { title: 'No Silos', description: 'Hardware engineers talk to Frontend devs. We believe innovation happens at the intersection of disciplines.' },
    { title: 'Tangible Impact', description: "Your work won't be buried in a server. It will manage traffic, secure facilities, and optimize industries." },
  ],

  cultureHeadline: 'Our Culture & Values',
  cultureValues: [
    { icon: 'lightbulb', title: 'Relentless Curiosity', description: "We love 'impossible' challenges. We experiment, we fail fast, and we learn faster. R&D is in our DNA." },
    { icon: 'cpu', title: 'Engineering Excellence', description: "Whether it's a PCB layout or a React component, we obsess over quality, performance, and clean architecture." },
    { icon: 'globe', title: 'Global Vision', description: 'Based in Turkey, building for the world. We adhere to global standards in everything we do.' },
  ],

  perksHeadline: 'Fuel for Your Best Work',
  perks: [
    { icon: 'monitor', title: 'The Best Tools', description: 'High-end workstations, latest prototyping gear, and access to our hardware labs.' },
    { icon: 'graduation-cap', title: 'Continuous Learning', description: 'Budget for courses, conferences, and professional certifications.' },
    { icon: 'clock', title: 'Flexible Culture', description: 'We value output over hours. Hybrid and remote working options available.' },
    { icon: 'users', title: 'Collaborative Environment', description: 'Regular tech talks, hackathons, and team retreats to foster innovation.' },
  ],

  positionsHeadline: 'Open Positions',
  positions: [
    { 
      title: 'Senior Embedded Software Engineer', 
      type: 'Full-time', 
      location: 'Istanbul / Remote', 
      department: 'Engineering', 
      description: 'C/C++ expertise for embedded systems development, RTOS, and low-level optimization.',
      applyLink: 'mailto:careers@signalton.com.tr?subject=Application: Senior Embedded Software Engineer',
      isOpen: true,
    },
    { 
      title: 'Full Stack Developer', 
      type: 'Full-time', 
      location: 'Istanbul / Remote', 
      department: 'Engineering', 
      description: 'Next.js, Node.js, TypeScript expertise for our cloud platforms and web applications.',
      applyLink: 'mailto:careers@signalton.com.tr?subject=Application: Full Stack Developer',
      isOpen: true,
    },
    { 
      title: 'Hardware Design Engineer', 
      type: 'Full-time', 
      location: 'Istanbul', 
      department: 'Hardware', 
      description: 'PCB design with Altium, schematic capture, and IoT device prototyping experience.',
      applyLink: 'mailto:careers@signalton.com.tr?subject=Application: Hardware Design Engineer',
      isOpen: true,
    },
    { 
      title: 'Machine Learning Engineer', 
      type: 'Full-time', 
      location: 'Remote', 
      department: 'AI/ML', 
      description: 'TensorFlow/PyTorch expertise for edge AI deployment and model optimization.',
      applyLink: 'mailto:careers@signalton.com.tr?subject=Application: Machine Learning Engineer',
      isOpen: true,
    },
  ],
  emptyStateText: "Don't see your role? We are always looking for exceptional talent. Send us your CV!",

  footerCta: {
    headline: 'Create Your Own Role',
    body: "Think you can make a difference but don't fit the boxes above? Send us your portfolio and tell us how you can contribute to the Signalton vision.",
    buttonLabel: 'Pitch Us',
    buttonHref: 'mailto:careers@signalton.com.tr?subject=Open Application',
  },

  seo: {
    metaTitle: 'Careers at Signalton | Join Our Team',
    metaDescription: 'Join the team building the future of Edge AI and IoT. Explore open positions in engineering, hardware design, and AI/ML.',
  },
}

// ==================== ABOUT PAGE CONTENT ====================
const aboutPageContent = {
  title: 'About Us',
  slug: 'about',
  seo: {
    title: 'About Signalton | Our Story & Mission',
    description: 'Learn about Signalton - pioneers in Edge AI, IoT, and Digital Signal Processing solutions for smart cities and industries.',
  },
  blocks: [
    // Hero Block
    {
      blockType: 'heroBlock',
      headline: 'Pioneering Edge Intelligence',
      subheadline: 'Founded by signal processing experts with decades of academic and industry experience, Signalton bridges the gap between cutting-edge research and real-world applications.',
      ctaPrimary: { label: 'Meet the Team', href: '/careers' },
      ctaSecondary: { label: 'Our Products', href: '/#products' },
    },
    // Features Block - Our Expertise
    {
      blockType: 'featuresBlock',
      title: 'Our Expertise',
      subtitle: 'Deep technical knowledge across multiple disciplines enables us to deliver complete solutions.',
      features: [
        { icon: 'graduation-cap', title: 'Academic Foundation', description: 'Our team includes PhDs and researchers from top universities, bringing theoretical depth to practical applications.' },
        { icon: 'factory', title: 'Industrial Experience', description: 'Years of experience deploying systems in factories, cities, and critical infrastructure.' },
        { icon: 'rocket', title: 'Innovation Focus', description: 'Continuous R&D investment keeps us at the forefront of Edge AI and signal processing technologies.' },
        { icon: 'handshake', title: 'Partnership Approach', description: 'We work closely with clients to understand their unique challenges and co-develop solutions.' },
      ],
    },
    // Services Block - What We Do
    {
      blockType: 'servicesBlock',
      title: 'What We Do',
      subtitle: 'From concept to deployment, we provide end-to-end solutions.',
      services: [
        { title: 'Custom Hardware Design', description: 'Purpose-built IoT devices and edge computing platforms tailored to your specific requirements.' },
        { title: 'Algorithm Development', description: 'Signal processing and AI algorithms optimized for real-time performance on embedded systems.' },
        { title: 'Cloud Integration', description: 'Seamless data pipelines from edge devices to your cloud infrastructure or on-premise servers.' },
        { title: 'Ongoing Support', description: 'Maintenance, updates, and continuous improvement of deployed systems.' },
      ],
    },
    // CTA Block
    {
      blockType: 'ctaBlock',
      headline: 'Ready to Transform Your Operations?',
      subheadline: 'Let us show you how Edge AI can solve your most challenging problems.',
      cta: { label: 'Get in Touch', href: '/#contact' },
    },
  ],
}

// ==================== SERVICES PAGE CONTENT ====================
const servicesPageContent = {
  title: 'Services',
  slug: 'services',
  seo: {
    title: 'Services | Signalton',
    description: 'Comprehensive IoT and AI services including R&D consulting, hardware design, and cloud platform development.',
  },
  blocks: [
    // Hero Block
    {
      blockType: 'heroBlock',
      headline: 'Expert Services for Complex Challenges',
      subheadline: 'From initial concept to production deployment, our team delivers comprehensive solutions across the full technology stack.',
      ctaPrimary: { label: 'Request Consultation', href: '/#contact' },
      ctaSecondary: { label: 'View Products', href: '/#products' },
    },
    // Services Block
    {
      blockType: 'servicesBlock',
      title: 'Our Services',
      subtitle: 'Tailored solutions for every stage of your project.',
      services: [
        { title: 'R&D Consulting', description: 'Feasibility studies, technology assessment, and research partnerships to validate and develop your ideas.' },
        { title: 'Signal Processing', description: 'Audio, vibration, and RF signal analysis. Algorithm design for filtering, detection, and classification.' },
        { title: 'AI & Machine Learning', description: 'Custom model development, training, and edge deployment. From computer vision to predictive analytics.' },
        { title: 'Embedded Systems', description: 'Firmware development, RTOS integration, and hardware-software co-design for IoT devices.' },
        { title: 'Cloud Platforms', description: 'Scalable backend systems for data ingestion, storage, analytics, and visualization.' },
        { title: 'System Integration', description: 'Connecting sensors, edge devices, and cloud platforms into cohesive, reliable systems.' },
      ],
    },
    // Features Block - Why Choose Us
    {
      blockType: 'featuresBlock',
      title: 'Why Choose Signalton?',
      subtitle: 'What sets us apart from typical system integrators.',
      features: [
        { icon: 'microscope', title: 'Deep Technical Expertise', description: 'Not just integrators—we build algorithms from scratch and understand the physics behind sensors.' },
        { icon: 'puzzle', title: 'Full-Stack Capability', description: 'Hardware, firmware, backend, frontend—one team handles it all, reducing communication overhead.' },
        { icon: 'clock', title: 'Rapid Prototyping', description: 'In-house hardware labs and development tools enable fast iteration from concept to working prototype.' },
        { icon: 'shield-check', title: 'Quality Assurance', description: 'Rigorous testing and documentation ensure reliable, maintainable systems.' },
      ],
    },
    // Contact Block
    {
      blockType: 'contactBlock',
      title: 'Start Your Project',
      subtitle: 'Reach out to discuss how we can help with your next challenge.',
      email: 'info@signalton.com.tr',
      phone: '+90-533-348-3873',
      address: 'Ankara, Turkey',
      linkedIn: 'https://www.linkedin.com/company/signalton',
    },
  ],
}

// ==================== SEED FUNCTION ====================
async function seedContent() {
  console.log('🌱 Starting content seed...\n')

  const payload = await getPayload({ config })

  // ----- SEED HOME PAGE -----
  console.log('📄 Seeding Home Page...')
  try {
    // Check if home page exists
    const existingHome = await payload.find({
      collection: 'pages',
      where: { slug: { equals: 'home' } },
      limit: 1,
    })

    if (existingHome.docs.length > 0) {
      // Update existing
      await payload.update({
        collection: 'pages',
        id: existingHome.docs[0].id,
        data: homePageContent,
      })
      console.log('   ✅ Home page updated')
    } else {
      // Create new
      await payload.create({
        collection: 'pages',
        data: homePageContent,
      })
      console.log('   ✅ Home page created')
    }
  } catch (error) {
    console.error('   ❌ Error seeding Home page:', error)
  }

  // ----- SEED CAREERS PAGE -----
  console.log('💼 Seeding Careers Page...')
  try {
    // Check if careers document exists
    const existingCareers = await payload.find({
      collection: 'careers',
      limit: 1,
    })

    if (existingCareers.docs.length > 0) {
      // Update existing
      await payload.update({
        collection: 'careers',
        id: existingCareers.docs[0].id,
        data: careersContent,
      })
      console.log('   ✅ Careers page updated')
    } else {
      // Create new
      await payload.create({
        collection: 'careers',
        data: careersContent,
      })
      console.log('   ✅ Careers page created')
    }
  } catch (error) {
    console.error('   ❌ Error seeding Careers page:', error)
  }

  // ----- SEED ABOUT PAGE -----
  console.log('ℹ️  Seeding About Page...')
  try {
    const existingAbout = await payload.find({
      collection: 'pages',
      where: { slug: { equals: 'about' } },
      limit: 1,
    })

    if (existingAbout.docs.length > 0) {
      await payload.update({
        collection: 'pages',
        id: existingAbout.docs[0].id,
        data: aboutPageContent,
      })
      console.log('   ✅ About page updated')
    } else {
      await payload.create({
        collection: 'pages',
        data: aboutPageContent,
      })
      console.log('   ✅ About page created')
    }
  } catch (error) {
    console.error('   ❌ Error seeding About page:', error)
  }

  // ----- SEED SERVICES PAGE -----
  console.log('🛠️  Seeding Services Page...')
  try {
    const existingServices = await payload.find({
      collection: 'pages',
      where: { slug: { equals: 'services' } },
      limit: 1,
    })

    if (existingServices.docs.length > 0) {
      await payload.update({
        collection: 'pages',
        id: existingServices.docs[0].id,
        data: servicesPageContent,
      })
      console.log('   ✅ Services page updated')
    } else {
      await payload.create({
        collection: 'pages',
        data: servicesPageContent,
      })
      console.log('   ✅ Services page created')
    }
  } catch (error) {
    console.error('   ❌ Error seeding Services page:', error)
  }

  console.log('\n✨ Content seeding completed!')
  console.log('\n📍 Next steps:')
  console.log('   1. Go to http://localhost:3000/admin')
  console.log('   2. Check Pages to edit content (Home, About, Services)')
  console.log('   3. Check Careers to edit careers page content')
  console.log('   4. Products are managed in Products collection')
  console.log('\n🌐 Available pages:')
  console.log('   - http://localhost:3000 (Home)')
  console.log('   - http://localhost:3000/about')
  console.log('   - http://localhost:3000/services')
  console.log('   - http://localhost:3000/careers')
  console.log('   - http://localhost:3000/products/[slug]\n')

  process.exit(0)
}

// Run the seed
seedContent().catch((error) => {
  console.error('Fatal error:', error)
  process.exit(1)
})
