import { getPayload } from 'payload'
import config from '../payload.config'
import dotenv from 'dotenv'
import path from 'path'

// Load environment variables from both .env and .env.local
dotenv.config({ path: path.resolve(process.cwd(), '.env') })
dotenv.config({ path: path.resolve(process.cwd(), '.env.local'), override: true })

const createAdminUser = async () => {
  try {
    // Initialize Payload
    const payload = await getPayload({ config })
    console.log('🚀 Payload initialized successfully!')

    // Check if any users exist
    const existingUsers = await payload.find({
      collection: 'users',
      limit: 1,
    })

    if (existingUsers.docs.length > 0) {
      console.log('✅ Admin user already exists!')
      console.log('📧 Email:', existingUsers.docs[0].email)
      process.exit(0)
    }

    // Create first admin user
    const adminUser = await payload.create({
      collection: 'users',
      data: {
        email: 'admin@signalton.com',
        password: 'admin123456', // Change this after first login!
        firstName: 'Admin',
        lastName: 'User',
        role: 'admin',
      },
    })

    console.log('✅ Admin user created successfully!')
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
    console.log('📧 Email:', adminUser.email)
    console.log('🔑 Password: admin123456')
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
    console.log('⚠️  IMPORTANT: Change this password after first login!')
    console.log('')
    console.log('🌐 Admin Panel: http://localhost:3000/admin')
    console.log('')

    process.exit(0)
  } catch (error) {
    console.error('❌ Error creating admin user:', error)
    console.error(error)
    process.exit(1)
  }
}

createAdminUser()
