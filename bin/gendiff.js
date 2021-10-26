#!/usr/bin/env node

import { Command } from 'commander';
import { getFilePath, compareFiles } from './fncs.js';

const program = new Command();
program
  .version('0.1.0')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'output format')
  .arguments('<filepath1> <filepath2>')
  .action((filepath1, filepath2) => {
    const file1 = getFilePath(filepath1);
    const file2 = getFilePath(filepath2);
    const compared = compareFiles(file1, file2);
    console.log(compared);
  });

program.parse();
