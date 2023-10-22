import { join } from 'path';

const ROOT = join(__dirname, '../../');
export const PATHS = {
  ROOT,
  PACKAGES: join(ROOT, './packages'),
  LERNA_CONFIG: join(ROOT, './lerna.json'),
} as const;

export const SCRIPTS = {
  BUNDLE_DEPS: 'olg-scripts bundleDeps',
  DEV: 'olg-scripts todo dev',
  BUILD: 'olg-scripts build',
} as const;
