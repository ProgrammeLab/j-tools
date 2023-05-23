import chalk from 'chalk';
import fs from 'fs-extra';
import { glob } from 'glob';
import gulp from 'gulp';
import minifyCss from 'gulp-clean-css';
import renameFile from 'gulp-rename';
import mergeStream from 'merge-stream';
import path from 'path';
import styleConfig from '../../config/style.config';

const { cssConfig } = styleConfig;

function copyFiles() {
  const watchPatternArray = cssConfig.watch;
  const destDirs = [cssConfig.output.cjs, cssConfig.output.es].filter(Boolean);

  if (!destDirs.length) {
    return Promise.resolve(null);
  }
  const rawStyleEntries = [];

  cssConfig.entry.forEach((filePattern) => {
    glob
      .sync(filePattern, {
        ignore: '!dist/**/*.(less|css)',
      })
      .forEach((relativePath) => {
        rawStyleEntries.push(path.resolve(relativePath));
      });
  });

  return new Promise((resolve, reject) => {
    let stream = mergeStream(
      watchPatternArray.map((pattern) => {
        gulp.src(pattern, { allowEmpty: true });
      })
    );

    destDirs.forEach((destDir) => {
      stream = stream.pipe(gulp.dest(destDir));
    });

    stream.on('end', resolve).on('error', (error) => {
      console.log(
        chalk.redBright('Failed to build css, error in copying files'),
        error
      );
      reject(error);
    });
  });
}

function compileLessFileToBundle() {
  const bundleDirs = [cssConfig.output.cjs, cssConfig.output.es].filter(
    (path) => fs.existsSync(path)
  );

  if (!bundleDirs.length) return;

  let stream = gulp.src(cssConfig.entry, { allowEmpty: true });
  // 提供 hook beforeCompile、afterCompile
  stream = stream.pipe(cssConfig.compiler(cssConfig.lessOptions));

  stream = stream.pipe(minifyCss());

  bundleDirs.forEach((dir) => {
    stream = stream.pipe(gulp.dest(dir));
  });

  return stream.on('error', (error) => {
    console.log(chalk.redBright('compile less file error'));
    console.error(error);
  });
}

function distLessFiles() {
  const { path: distCssPath, rawFileName } = cssConfig.output.dist;
  let entries = [];

  cssConfig.entry.forEach((entry) => {
    entries = entries.concat(glob.sync(entry));
    console.log(chalk.blueBright('debug'), glob.sync(entry));
  });

  if (entries.length) {
    const content = [];

    entries.forEach((entry) => {
      const esCssEntry = cssConfig.output.es + entry;

      const relativePath = path.relative(distCssPath, esCssEntry);
      const text = `@import "${relativePath}";`;
      console.log(chalk.blueBright('debug'), esCssEntry, relativePath);

      if (esCssEntry.startsWith(`${cssConfig.output.es}/style`)) {
        content.unshift(text);
      } else {
        content.push(text);
      }
    });

    fs.outputFileSync(`${distCssPath}/${rawFileName}`, content.join('\n'));
  }
}

function distCss() {
  const { path: cssDistPath, cssFileName, rawFileName } = cssConfig.output.dist;

  let stream = gulp.src(`${cssDistPath}/${rawFileName}`, { allowEmpty: true });

  stream = stream.pipe(cssConfig.compiler(cssConfig.lessOptions));

  return stream
    .pipe(renameFile(cssFileName))
    .pipe(gulp.dest(cssDistPath))
    .on('error', (error) => {
      console.log(
        chalk.redBright('Failed to build css in dist all css'),
        error
      );
    });
}

export default {
  compileLessFileToBundle,
  distCss,
  distLessFiles,
  copyFiles,
  compileStyle: () => {
    return new Promise((resolve) => {
      gulp.series(
        gulp.parallel(compileLessFileToBundle),
        gulp.parallel(distLessFiles, distCss),
        gulp.parallel(() => resolve(null))
      )(null);
    });
  },
};
