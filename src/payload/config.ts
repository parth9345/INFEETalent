import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import sharp from 'sharp'
import { fileURLToPath } from 'url'

import { collections } from '@/collections'
import { SiteSettings } from '@/globals/SiteSettings'
import { siteConfig } from '@/lib/site'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)
const localOrigins = ['http://localhost:3000', 'http://127.0.0.1:3000']
const allowedOrigins = Array.from(new Set([siteConfig.url, ...localOrigins]))

export default buildConfig({
  admin: {
    user: 'users',
    importMap: {
      baseDir: path.resolve(dirname, '..'),
    },
    meta: {
      titleSuffix: ` - ${siteConfig.name}`,
    },
  },
  collections,
  globals: [SiteSettings],
  cors: allowedOrigins,
  csrf: allowedOrigins,
  db: sqliteAdapter({
    push: process.env.PAYLOAD_ENABLE_SCHEMA_PUSH === 'true',
    client: {
      url: process.env.DATABASE_URL || 'file:./infe-talent.sqlite',
    },
  }),
  editor: lexicalEditor(),
  secret:
    process.env.PAYLOAD_SECRET ||
    'local-development-secret-change-before-production-5f6c2d9e1a0b4c8d',
  serverURL: siteConfig.url,
  sharp,
  typescript: {
    outputFile: path.resolve(dirname, '../payload-types.ts'),
  },
})
