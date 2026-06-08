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

const addCareerCollageColumns = async (db: DB, tableName: string) => {
  await addColumnIfMissing(db, tableName, 'career_collage_image_one_id integer')
  await addColumnIfMissing(db, tableName, 'career_collage_image_two_id integer')
  await addColumnIfMissing(db, tableName, 'career_collage_image_three_id integer')
}

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await addCareerCollageColumns(db, 'pages_blocks_hero')
  await addCareerCollageColumns(db, '_pages_v_blocks_hero')

  await db.run(sql.raw('CREATE INDEX IF NOT EXISTS pages_blocks_hero_career_collage_image_one_idx ON pages_blocks_hero (career_collage_image_one_id)'))
  await db.run(sql.raw('CREATE INDEX IF NOT EXISTS pages_blocks_hero_career_collage_image_two_idx ON pages_blocks_hero (career_collage_image_two_id)'))
  await db.run(sql.raw('CREATE INDEX IF NOT EXISTS pages_blocks_hero_career_collage_image_three_idx ON pages_blocks_hero (career_collage_image_three_id)'))
  await db.run(sql.raw('CREATE INDEX IF NOT EXISTS _pages_v_blocks_hero_career_collage_image_one_idx ON _pages_v_blocks_hero (career_collage_image_one_id)'))
  await db.run(sql.raw('CREATE INDEX IF NOT EXISTS _pages_v_blocks_hero_career_collage_image_two_idx ON _pages_v_blocks_hero (career_collage_image_two_id)'))
  await db.run(sql.raw('CREATE INDEX IF NOT EXISTS _pages_v_blocks_hero_career_collage_image_three_idx ON _pages_v_blocks_hero (career_collage_image_three_id)'))
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  void db
}
