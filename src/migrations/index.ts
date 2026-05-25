import * as migration_20260523_064609 from './20260523_064609';
import * as migration_20260525_091700 from './20260525_091700';

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
];
