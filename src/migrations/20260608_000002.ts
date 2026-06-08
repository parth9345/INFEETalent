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

const addJoinTeamColumns = async (db: DB, tableName: string) => {
  await addColumnIfMissing(db, tableName, 'join_team_enabled integer')
  await addColumnIfMissing(db, tableName, 'join_team_heading text')
  await addColumnIfMissing(db, tableName, 'join_team_description text')
  await addColumnIfMissing(db, tableName, 'join_team_action_label text')
  await addColumnIfMissing(db, tableName, 'join_team_action_url text')
  await addColumnIfMissing(db, tableName, 'join_team_action_new_tab integer')
  await addColumnIfMissing(db, tableName, 'join_team_years_stat_value text')
  await addColumnIfMissing(db, tableName, 'join_team_years_stat_label text')
  await addColumnIfMissing(db, tableName, 'join_team_professionals_stat_value text')
  await addColumnIfMissing(db, tableName, 'join_team_professionals_stat_label text')
  await addColumnIfMissing(db, tableName, 'join_team_images_portrait_image_id integer')
  await addColumnIfMissing(db, tableName, 'join_team_images_interview_image_id integer')
  await addColumnIfMissing(db, tableName, 'join_team_images_advisor_image_id integer')
  await addColumnIfMissing(db, tableName, 'join_team_avatars_avatar_one_id integer')
  await addColumnIfMissing(db, tableName, 'join_team_avatars_avatar_two_id integer')
  await addColumnIfMissing(db, tableName, 'join_team_avatars_avatar_three_id integer')
  await addColumnIfMissing(db, tableName, 'join_team_avatars_avatar_four_id integer')
}

const addJoinTeamIndexes = async (db: DB, tableName: string, prefix: string) => {
  await db.run(sql.raw(`CREATE INDEX IF NOT EXISTS ${prefix}_join_team_images_portrait_image_idx ON ${tableName} (join_team_images_portrait_image_id)`))
  await db.run(sql.raw(`CREATE INDEX IF NOT EXISTS ${prefix}_join_team_images_interview_image_idx ON ${tableName} (join_team_images_interview_image_id)`))
  await db.run(sql.raw(`CREATE INDEX IF NOT EXISTS ${prefix}_join_team_images_advisor_image_idx ON ${tableName} (join_team_images_advisor_image_id)`))
  await db.run(sql.raw(`CREATE INDEX IF NOT EXISTS ${prefix}_join_team_avatars_avatar_one_idx ON ${tableName} (join_team_avatars_avatar_one_id)`))
  await db.run(sql.raw(`CREATE INDEX IF NOT EXISTS ${prefix}_join_team_avatars_avatar_two_idx ON ${tableName} (join_team_avatars_avatar_two_id)`))
  await db.run(sql.raw(`CREATE INDEX IF NOT EXISTS ${prefix}_join_team_avatars_avatar_three_idx ON ${tableName} (join_team_avatars_avatar_three_id)`))
  await db.run(sql.raw(`CREATE INDEX IF NOT EXISTS ${prefix}_join_team_avatars_avatar_four_idx ON ${tableName} (join_team_avatars_avatar_four_id)`))
}

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await addJoinTeamColumns(db, 'pages_blocks_contact')
  await addJoinTeamColumns(db, '_pages_v_blocks_contact')

  await addJoinTeamIndexes(db, 'pages_blocks_contact', 'pages_blocks_contact')
  await addJoinTeamIndexes(db, '_pages_v_blocks_contact', '_pages_v_blocks_contact')
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  void db
}
