import { buildConfig } from 'payload'
import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'

// Collections
import { Pages } from './src/payload/collections/Pages'
import { Products } from './src/payload/collections/Products'
import { Users } from './src/payload/collections/Users'
import { Media } from './src/payload/collections/Media'

export default buildConfig({
  // Admin panel configuration
  admin: {
    user: 'users',
    meta: {
      titleSuffix: '- Signalton CMS',
    },
  },

  // Collections (content types)
  collections: [
    Users,
    Pages,
    Products,
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
