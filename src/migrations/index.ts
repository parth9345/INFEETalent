import * as migration_20260523_064609 from './20260523_064609';
import * as migration_20260525_091700 from './20260525_091700';
import * as migration_20260526_000001 from './20260526_000001';
import * as migration_20260608_000001 from './20260608_000001';
import * as migration_20260608_000002 from './20260608_000002';
import * as migration_20260608_000003 from './20260608_000003';

export const migrations = [
  {
    up: migration_20260523_064609.up,
    down: migration_20260523_064609.down,
    name: '20260523_064609',
  },
  {
    up: migration_20260525_091700.up,
    down: migration_20260525_091700.down,
    name: '20260525_091700',
  },
  {
    up: migration_20260526_000001.up,
    down: migration_20260526_000001.down,
    name: '20260526_000001',
  },
  {
    up: migration_20260608_000001.up,
    down: migration_20260608_000001.down,
    name: '20260608_000001',
  },
  {
    up: migration_20260608_000002.up,
    down: migration_20260608_000002.down,
    name: '20260608_000002',
  },
  {
    up: migration_20260608_000003.up,
    down: migration_20260608_000003.down,
    name: '20260608_000003',
  },
];
