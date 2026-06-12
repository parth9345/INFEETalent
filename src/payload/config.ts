import { postgresAdapter } from '@payloadcms/db-postgres'
import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { copyFileSync, existsSync } from 'fs'
import path from 'path'
import { buildConfig } from 'payload'
import sharp from 'sharp'
import { fileURLToPath } from 'url'

import { collections } from '@/collections'
import { SiteSettings } from '@/globals/SiteSettings'
import { siteConfig } from '@/lib/site'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)
const localOrigins = ['http://localhost:3000', 'http://127.0.0.1:3000', 'http://192.168.1.9:3000']
const allowedOrigins = Array.from(new Set([siteConfig.url, ...localOrigins]))
const schemaPush = process.env.PAYLOAD_ENABLE_SCHEMA_PUSH === 'true'

const getDatabaseUrl = () => {
  if (process.env.DATABASE_URL) {
    return process.env.DATABASE_URL
  }

  if (process.env.VERCEL) {
    const sourcePath = path.resolve(process.cwd(), 'infe-talent.sqlite')
    const targetPath = '/tmp/infe-talent.sqlite'

    if (!existsSync(targetPath) && existsSync(sourcePath)) {
      copyFileSync(sourcePath, targetPath)
    }

    return `file:${targetPath}`
  }

  return 'file:./infe-talent.sqlite'
}

const databaseUrl = getDatabaseUrl()
const isPostgres = /^postgres(ql)?:\/\//i.test(databaseUrl)

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
  db: isPostgres
    ? postgresAdapter({
        push: schemaPush,
        pool: {
          connectionString: databaseUrl,
        },
      })
    : sqliteAdapter({
        push: schemaPush,
        client: {
          url: databaseUrl,
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
