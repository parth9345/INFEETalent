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
  if (!(await tableExists(db, 'site_settings'))) {
    return
  }

  await addColumnIfMissing(db, 'site_settings', 'header_logo_id integer')
  await addColumnIfMissing(db, 'site_settings', 'header_logo_alt text')
  await addColumnIfMissing(db, 'site_settings', 'header_cta_enabled integer DEFAULT false')
  await addColumnIfMissing(db, 'site_settings', 'header_cta_label text')
  await addColumnIfMissing(db, 'site_settings', 'header_cta_url text')
  await addColumnIfMissing(db, 'site_settings', "header_cta_variant text DEFAULT 'primary'")
  await addColumnIfMissing(db, 'site_settings', 'header_cta_new_tab integer DEFAULT false')
  await addColumnIfMissing(db, 'site_settings', 'header_sticky_enabled integer DEFAULT true')
  await addColumnIfMissing(db, 'site_settings', 'footer_logo_id integer')
  await addColumnIfMissing(db, 'site_settings', 'footer_logo_alt text')
  await addColumnIfMissing(db, 'site_settings', 'footer_description text')
  await addColumnIfMissing(db, 'site_settings', 'footer_contact_email text')
  await addColumnIfMissing(db, 'site_settings', 'footer_contact_phone text')
  await addColumnIfMissing(db, 'site_settings', 'footer_contact_address text')
  await addColumnIfMissing(db, 'site_settings', 'footer_contact_uk_phone text')
  await addColumnIfMissing(db, 'site_settings', 'footer_contact_us_phone text')
  await addColumnIfMissing(db, 'site_settings', 'footer_contact_aus_phone text')
  await addColumnIfMissing(db, 'site_settings', 'footer_cta_enabled integer DEFAULT false')
  await addColumnIfMissing(db, 'site_settings', 'footer_cta_label text')
  await addColumnIfMissing(db, 'site_settings', 'footer_cta_url text')
  await addColumnIfMissing(db, 'site_settings', "footer_cta_variant text DEFAULT 'primary'")
  await addColumnIfMissing(db, 'site_settings', 'footer_cta_new_tab integer DEFAULT false')
  await addColumnIfMissing(
    db,
    'site_settings',
    "footer_copyright text DEFAULT 'Copyright 2026 INFE Talent. All rights reserved.'",
  )

  await db.run(sql.raw('CREATE INDEX IF NOT EXISTS site_settings_header_header_logo_idx ON site_settings (header_logo_id)'))
  await db.run(sql.raw('CREATE INDEX IF NOT EXISTS site_settings_footer_footer_logo_idx ON site_settings (footer_logo_id)'))

  await db.run(sql.raw(`CREATE TABLE IF NOT EXISTS site_settings_header_navigation (
    _order integer NOT NULL,
    _parent_id integer NOT NULL,
    id text PRIMARY KEY NOT NULL,
    label text NOT NULL,
    url text NOT NULL,
    new_tab integer DEFAULT false,
    FOREIGN KEY (_parent_id) REFERENCES site_settings(id) ON UPDATE no action ON DELETE cascade
  )`))
  await db.run(sql.raw('CREATE INDEX IF NOT EXISTS site_settings_header_navigation_order_idx ON site_settings_header_navigation (_order)'))
  await db.run(sql.raw('CREATE INDEX IF NOT EXISTS site_settings_header_navigation_parent_id_idx ON site_settings_header_navigation (_parent_id)'))

  await db.run(sql.raw(`CREATE TABLE IF NOT EXISTS site_settings_footer_navigation_columns (
    _order integer NOT NULL,
    _parent_id integer NOT NULL,
    id text PRIMARY KEY NOT NULL,
    title text NOT NULL,
    FOREIGN KEY (_parent_id) REFERENCES site_settings(id) ON UPDATE no action ON DELETE cascade
  )`))
  await db.run(sql.raw('CREATE INDEX IF NOT EXISTS site_settings_footer_navigation_columns_order_idx ON site_settings_footer_navigation_columns (_order)'))
  await db.run(sql.raw('CREATE INDEX IF NOT EXISTS site_settings_footer_navigation_columns_parent_id_idx ON site_settings_footer_navigation_columns (_parent_id)'))

  await db.run(sql.raw(`CREATE TABLE IF NOT EXISTS site_settings_footer_navigation_columns_links (
    _order integer NOT NULL,
    _parent_id text NOT NULL,
    id text PRIMARY KEY NOT NULL,
    label text NOT NULL,
    url text NOT NULL,
    new_tab integer DEFAULT false,
    FOREIGN KEY (_parent_id) REFERENCES site_settings_footer_navigation_columns(id) ON UPDATE no action ON DELETE cascade
  )`))
  await db.run(sql.raw('CREATE INDEX IF NOT EXISTS site_settings_footer_navigation_columns_links_order_idx ON site_settings_footer_navigation_columns_links (_order)'))
  await db.run(sql.raw('CREATE INDEX IF NOT EXISTS site_settings_footer_navigation_columns_links_parent_id_idx ON site_settings_footer_navigation_columns_links (_parent_id)'))

  await db.run(sql.raw(`CREATE TABLE IF NOT EXISTS site_settings_footer_social_links (
    _order integer NOT NULL,
    _parent_id integer NOT NULL,
    id text PRIMARY KEY NOT NULL,
    platform_name text NOT NULL,
    url text NOT NULL,
    icon_name text,
    new_tab integer DEFAULT true,
    FOREIGN KEY (_parent_id) REFERENCES site_settings(id) ON UPDATE no action ON DELETE cascade
  )`))
  await db.run(sql.raw('CREATE INDEX IF NOT EXISTS site_settings_footer_social_links_order_idx ON site_settings_footer_social_links (_order)'))
  await db.run(sql.raw('CREATE INDEX IF NOT EXISTS site_settings_footer_social_links_parent_id_idx ON site_settings_footer_social_links (_parent_id)'))

  await addColumnIfMissing(db, 'site_settings_primary_navigation', 'new_tab integer DEFAULT false')
  await addColumnIfMissing(db, 'site_settings_footer_navigation', 'new_tab integer DEFAULT false')
  await addColumnIfMissing(db, 'site_settings_social_links', 'new_tab integer DEFAULT true')
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  void db
}
