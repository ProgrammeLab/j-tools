import chalk from 'chalk';
import fs from 'fs-extra';
import tsc from 'node-typescript-compiler';
import path from 'path';
import { CWD } from '../../constant';

interface CompileOption {
  buildModuleType: 'es' | 'cjs';
  outDir: String;
}

/**
 * get tsconfig.json when use tsc
 */
function getTSConfig(
  tsconfigPath = path.resolve(CWD, 'tsconfig.json'),
  customConfig = { compilerOptions: {} }
) {
  if (fs.pathExistsSync(tsconfigPath)) {
    const config = fs.readJsonSync(tsconfigPath);
    if (config.extends) {
      Object.assign(
        config,
        getTSConfig(path.resolve(tsconfigPath, config.extends))
      );
    }
    const compilerOptions = (config && config.compilerOptions) || {};

    const customCompilerOptions =
      (customConfig && customConfig.compilerOptions) || {};

    customConfig.compilerOptions = {
      ...compilerOptions,
      ...customCompilerOptions,
    };

    Object.assign(config, customConfig);

    return config;
  }

  return customConfig;
}

function compileWithTSC({ buildModuleType, outDir }: CompileOption) {
  const tsconfig = getTSConfig();
  return tsc.compile({
    ...tsconfig.compilerOptions,
    outDir,
    module: buildModuleType === 'es' ? 'es6' : 'commonjs',
    declaration: buildModuleType === 'es',
  });
}

export default (options: CompileOption) => {
  return compileWithTSC(options).then(
    () => {
      console.log(chalk.greenBright('Build TS success'));
    },
    (error) => {
      console.error(chalk.redBright(error));
    }
  );
};
