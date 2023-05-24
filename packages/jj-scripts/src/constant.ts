import chalk from 'chalk';
import process from 'process';

export const CWD = process.cwd();
console.log(chalk.blueBright('CWD:'), chalk.yellowBright(CWD));

export const FILE_ASSET_EXT = [
  'png',
  'jpg',
  'jpeg',
  'gif',
  'svg',
  'ttf',
  'eot',
  'woff',
  'woff2',
  'css',
  'less',
];

export const ESM_DIR_NAME = 'es';
export const CJS_DIR_NAME = 'lib';
export const UMD_DIR_NAME = 'dist';

export const COMPONENT_LIBRARY_DIR = 'components';

export const DIST_CSS_FILE_NAME = 'index.css';
