import { type MigrateDownArgs, type MigrateUpArgs, sql } from '@payloadcms/db-sqlite'

type DB = MigrateUpArgs['db']
type TableInfoRow = {
  name?: unknown
}

const tableExists = async (db: DB, tableName: string) => {
  const result = (await db.run(
    sql.raw(`SELECT name FROM sqlite_master WHERE type = 'table' AND name = '${tableName}'`),
  )) as { rows?: TableInfoRow[] }

  return Boolean(result.rows?.length)
}

const columnExists = async (db: DB, tableName: string, columnName: string) => {
  if (!(await tableExists(db, tableName))) {
    return false
  }

  const result = (await db.run(sql.raw(`PRAGMA table_info(${tableName})`))) as { rows?: TableInfoRow[] }

  return Boolean(result.rows?.some((row) => row.name === columnName))
}

const addColumnIfMissing = async (db: DB, tableName: string, columnDefinition: string) => {
  const [columnName] = columnDefinition.split(/\s+/)

  if (!columnName || (await columnExists(db, tableName, columnName))) {
    return
  }

  await db.run(sql.raw(`ALTER TABLE ${tableName} ADD COLUMN ${columnDefinition}`))
}

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await addColumnIfMissing(db, 'blogs', 'category text')
  await addColumnIfMissing(db, 'blogs', "author_name text DEFAULT 'INFE Talent Team'")
  await addColumnIfMissing(db, 'blogs', 'author_image_id integer')
  await addColumnIfMissing(db, 'blogs', 'read_time text')
  await addColumnIfMissing(db, 'blogs', 'featured integer DEFAULT false')

  await addColumnIfMissing(db, '_blogs_v', 'version_category text')
  await addColumnIfMissing(db, '_blogs_v', "version_author_name text DEFAULT 'INFE Talent Team'")
  await addColumnIfMissing(db, '_blogs_v', 'version_author_image_id integer')
  await addColumnIfMissing(db, '_blogs_v', 'version_read_time text')
  await addColumnIfMissing(db, '_blogs_v', 'version_featured integer DEFAULT false')

  await db.run(sql.raw('CREATE INDEX IF NOT EXISTS blogs_author_author_image_idx ON blogs (author_image_id)'))
  await db.run(sql.raw('CREATE INDEX IF NOT EXISTS blogs_featured_idx ON blogs (featured)'))
  await db.run(sql.raw('CREATE INDEX IF NOT EXISTS blogs_category_idx ON blogs (category)'))
  await db.run(sql.raw('CREATE INDEX IF NOT EXISTS _blogs_v_version_author_author_image_idx ON _blogs_v (version_author_image_id)'))
  await db.run(sql.raw('CREATE INDEX IF NOT EXISTS _blogs_v_version_version_featured_idx ON _blogs_v (version_featured)'))
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  void db
}
