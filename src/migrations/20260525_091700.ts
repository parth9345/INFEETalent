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
  await addColumnIfMissing(db, 'site_settings_footer_partners', 'new_tab integer DEFAULT false')
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  void db
}
