import chalk from 'chalk';
import fs from 'fs-extra';
import gulp from 'gulp';
import rename from 'gulp-rename';
import replace from 'gulp-replace';
import mergeStream from 'merge-stream';
import styleConfig from '../../config/style.config';

interface CompileCssJsEntryOptions {
  /** Glob of css entry file */
  styleJSEntry: string[];
  /** Path of ESM */
  outDirES: string;
  /** Path of CJS */
  outDirCJS: string;
}

const { cssConfig, jsEntry: jsEntryConfig } = styleConfig;

async function compileCssJsEntry({
  styleJSEntry,
  outDirES,
  outDirCJS,
}: CompileCssJsEntryOptions) {
  const compile = (module: 'es' | 'cjs') => {
    return new Promise((resolve, reject) => {
      mergeStream(
        styleJSEntry.map((entry) => {
          return gulp.src(entry, {
            allowEmpty: true,
            base: entry.replace(/(\/\*{1,2})*\/style\/index\.[jt]s$/, ''),
          });
        })
      )
        .pipe(replace(`.${jsEntryConfig.styleSheetExtension}`, '.css'))
        .pipe(
          // import './index.css' => import './index.css'
          // import '../es/Button/style' => import '../es/Button/style/css.js'
          replace(/import\s+'(.+(?:\/style)?)(?:\/index.[jt]s)?'/g, (_, $1) => {
            const suffix = $1.endsWith('/style') ? '/css.js' : '';
            return module === 'es'
              ? `import '${$1}${suffix}'`
              : `require('${$1}${suffix}')`;
          })
        )
        .pipe(
          rename(function (path) {
            const [basename, extname] = 'css.js'.split('.');
            path.basename = basename;
            path.extname = `.${extname}`;
          })
        )
        .pipe(gulp.dest(module === 'es' ? outDirES : outDirCJS))
        .on('end', resolve)
        .on('error', reject);
    });
  };

  if (Array.isArray(styleJSEntry) && styleJSEntry.length) {
    try {
      const asyncTask: Array<Promise<unknown>> = [];
      if (fs.existsSync(outDirES)) {
        asyncTask.push(compile('es'));
      }
      if (fs.existsSync(outDirCJS)) {
        asyncTask.push(compile('cjs'));
      }

      await Promise.all(asyncTask);
    } catch (error) {
      console.error(chalk.redBright('failed to build js entry css.js'), error);
    }
  }
}

export default async function handleStyleJSEntry() {
  await compileCssJsEntry({
    styleJSEntry: jsEntryConfig.entry,
    outDirCJS: cssConfig.output.cjs,
    outDirES: cssConfig.output.es,
  });
}
