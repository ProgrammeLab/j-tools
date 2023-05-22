import chalk from 'chalk';
import webpack from 'webpack';

export default (config, callback?) => {
  return new Promise<void>((resolve, reject) => {
    webpack(config, (err, stats) => {
      callback && callback(err, stats);

      if (err) {
        console.error(
          '[jj-scripts] webpack compile Error:',
          chalk.redBright(err.stack || err)
        );
        reject();
        return;
      }

      console.log(
        stats.toString({
          assets: true,
          colors: true,
          warnings: true,
          errors: true,
          errorDetails: true,
          entrypoints: true,
          version: true,
          hash: false,
          timings: true,
          chunks: false,
          chunkModules: false,
          children: false,
        })
      );

      if (stats.hasErrors()) {
        reject();
      } else {
        resolve(null);
      }
    });
  });
};
