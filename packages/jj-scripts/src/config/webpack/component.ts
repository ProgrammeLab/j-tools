import chalk from 'chalk';
import ProgressBarPlugin from 'progress-bar-webpack-plugin';

import { COMPONENT_LIBRARY_DIR, CWD, UMD_DIR_NAME } from '../../constant';
import babelConfig from '../babel.config';

const lessRegExp = /\.less$/;
const lessModuleRegExp = /\.module\.less$/;

function getUse(cssModule) {
  const options = cssModule
    ? {
        modules: {
          localIdentName: '[local]-[hash:10]',
        },
      }
    : {};
  return [
    {
      loader: require.resolve('style-loader'),
    },
    {
      loader: require.resolve('css-loader'),
      options,
    },
    {
      loader: require.resolve('less-loader'),
    },
  ];
}

const config = {
  mode: 'production',
  entry: {
    'jj-design': `${CWD}/${COMPONENT_LIBRARY_DIR}/index.ts`,
  },
  output: {
    path: `${CWD}/${UMD_DIR_NAME}`,
    filename: '[name].min.js',
    library: '[name]',
    libraryTarget: 'umd',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: require.resolve('babel-loader'),
            options: babelConfig,
          },
          {
            loader: require.resolve('ts-loader'),
          },
        ],
      },
      {
        test: lessRegExp,
        exclude: lessModuleRegExp,
        use: getUse(false),
      },
      {
        test: /\.css$/,
        sideEffects: true,
        use: [
          {
            loader: require.resolve('style-loader'),
          },
          {
            loader: require.resolve('css-loader'),
          },
        ],
      },
      {
        test: /\.(png|jpg|gif|ttf|eot|woff|woff2)$/,
        loader: require.resolve('file-loader'),
        options: {
          esModule: false,
        },
      },
      {
        test: /\.svg$/,
        use: [require.resolve('@svgr/webpack')],
      },
      {
        test: lessModuleRegExp,
        use: getUse(true),
      },
    ],
  },
  externals: [
    {
      react: {
        root: 'React',
        commonjs: 'react',
        commonjs2: 'react',
        amd: 'react',
      },
      'react-dom': {
        root: 'ReactDOM',
        commonjs: 'react-dom',
        commonjs2: 'react-dom',
        amd: 'react-dom',
      },
    },
  ],
  resolve: {
    // 模块解析的搜索目录
    modules: ['node_modules'],
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
  resolveLoader: {
    modules: ['node_modules', 'node_modules/jj-scripts/node_modules'],
  },
  plugins: [
    new ProgressBarPlugin({
      format: `[jj-design]: [:bar] ${chalk} ${chalk.green.bold(
        ':percent'
      )} (:elapsed seconds)`,
    }),
  ],
  optimization: {
    concatenateModules: false,
  },
};

export default config;
