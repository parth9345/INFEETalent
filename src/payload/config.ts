import { postgresAdapter } from '@payloadcms/db-postgres'
import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { copyFileSync, existsSync, statSync } from 'fs'
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

const getSQLitePath = (databaseUrl = 'file:./infe-talent.sqlite') => databaseUrl.replace(/^file:/i, '')

const copySQLiteToWritableVercelPath = (databaseUrl?: string) => {
  const sourcePath = path.resolve(process.cwd(), getSQLitePath(databaseUrl))
  const targetPath = '/tmp/infe-talent.sqlite'

  if (!existsSync(sourcePath)) {
    return `file:${targetPath}`
  }

  const shouldCopy =
    !existsSync(targetPath) ||
    statSync(sourcePath).size !== statSync(targetPath).size ||
    statSync(sourcePath).mtimeMs > statSync(targetPath).mtimeMs

  if (shouldCopy) {
    copyFileSync(sourcePath, targetPath)
  }

  return `file:${targetPath}`
}

const getDatabaseUrl = () => {
  const configuredDatabaseUrl = process.env.DATABASE_URL?.trim()
  const isConfiguredSqlite = configuredDatabaseUrl ? /^file:/i.test(configuredDatabaseUrl) : false

  if (process.env.VERCEL && (!configuredDatabaseUrl || isConfiguredSqlite)) {
    return copySQLiteToWritableVercelPath(configuredDatabaseUrl)
  }

  if (configuredDatabaseUrl) {
    return configuredDatabaseUrl
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
