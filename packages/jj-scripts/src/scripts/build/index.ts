import chalk from 'chalk';
import webpackConfig from '../../config/webpack/component';
import { CWD, ESM_DIR_NAME, UMD_DIR_NAME } from '../../constant';
import compileTs from '../utils/compileTs';
import webpackWithPromise from '../utils/webpackWithPromise';

/**
 * use webpack to build UMD module
 */
const buildUMD = () => {
  chalk.gray(
    `[jj-design], Start to build UMD module to the ${UMD_DIR_NAME} DIR`
  );
  return webpackWithPromise(webpackConfig).then(
    () => chalk.green('Build UMD success'),
    (error) => {
      throw error;
    }
  );
};

const buildES = () => {
  return compileTs({
    outDir: `${CWD}/${ESM_DIR_NAME}`,
    buildModuleType: 'es',
  });
};

export default {
  build: async () => {
    try {
      await Promise.all([buildUMD(), buildES()]);
    } catch (error) {
      console.error(
        `[jj-scripts] Error Failed to build`,
        chalk.redBright(`[jj-scripts] Error Failed to build`, error)
      );
    }
  },
  buildES,
  buildUMD,
};
