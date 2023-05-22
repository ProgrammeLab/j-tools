import chalk from 'chalk';
import process from 'process';

export const CWD = process.cwd();
console.log(chalk.blueBright('CWD:'), chalk.yellowBright(CWD));

export const ESM_DIR_NAME = 'es';
export const CJS_DIR_NAME = 'lib';
export const UMD_DIR_NAME = 'dist';
