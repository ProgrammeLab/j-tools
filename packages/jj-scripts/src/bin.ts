#!/usr/bin/env node

import program from 'commander';
import buildUtil from './scripts/build/index';

const { version } = require('../package.json');
const commandList = ['build:component'];

program
  .version(version)
  .name('jj-scripts')
  .usage('command [options]')
  .arguments('<cmd>')
  .action((cmd) => {
    if (commandList.indexOf(cmd) === -1) {
      console.error('Invalid command');
      program.help();
    }
  });

program
  .command('build:component')
  .description('build all these sources: es, cjs, dist and css')
  .action(() => {
    buildUtil.build();
  });

program.parse(process.argv);
