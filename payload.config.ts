import { buildConfig } from 'payload'
import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'

// Collections
import { Pages } from './src/payload/collections/Pages'
import { Products } from './src/payload/collections/Products'
import { Users } from './src/payload/collections/Users'
import { Media } from './src/payload/collections/Media'
import { Careers } from './src/payload/collections/Careers'

export default buildConfig({
  // Admin panel configuration
  admin: {
    user: 'users',
    meta: {
      titleSuffix: '- Signalton CMS',
      description: 'Signalton İçerik Yönetim Sistemi',
    },
    components: {
      graphics: {
        // Logo görüntülenecek alan - ileride özel logo eklenebilir
        // Logo: '/components/admin/Logo',
      },
    },
    avatar: 'gravatar', // Kullanıcı avatarları için Gravatar
  },

  // Collections (content types)
  collections: [
    Users,
    Pages,
    Products,
    Careers,
    Media,
  ],

  // Globals (singleton documents)
  globals: [],

  // Editor configuration
  editor: lexicalEditor({}),

  // Database adapter
  db: sqliteAdapter({
    client: {
      url: (() => {
        const dbPath = process.env.DATABASE_URI || './signal.db'
        // If already a file:// URL, use as-is
        if (dbPath.startsWith('file:')) {
          return dbPath
        }
        // Add file: protocol for SQLite
        return `file:${dbPath}`
      })(),
    },
  }),

  // Secret for JWT tokens
  secret: process.env.PAYLOAD_SECRET || 'your-secret-key',

  // TypeScript configuration
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },

  // Server URL
  serverURL: process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000',
})
