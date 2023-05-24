import lessCompiler from 'gulp-less';
import {
  CJS_DIR_NAME,
  COMPONENT_LIBRARY_DIR,
  CWD,
  DIST_CSS_FILE_NAME,
  ESM_DIR_NAME,
  FILE_ASSET_EXT,
  UMD_DIR_NAME,
} from '../constant';

const styleConfig = {
  cssConfig: {
    entry: [`${COMPONENT_LIBRARY_DIR}/**/index.less`],
    watch: [`${COMPONENT_LIBRARY_DIR}/**/*.{${FILE_ASSET_EXT.join(',')}}`],
    output: {
      es: `${CWD}/${ESM_DIR_NAME}/`,
      cjs: `${CWD}/${CJS_DIR_NAME}/`,
      dist: {
        path: `${CWD}/${UMD_DIR_NAME}/css`,
        cssFileName: DIST_CSS_FILE_NAME,
        rawFileName: 'index.less',
      },
    },
    compiler: lessCompiler,
    lessOptions: {},
  },
};

export default styleConfig;
