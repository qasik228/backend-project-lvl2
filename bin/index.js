import * as fs from 'fs';
import * as path from 'path';
import _ from 'lodash';
import { compareFiles } from './fncs.js';
import format from './formatters/index.js';
import getParsers from './parsers.js';

const getFilePath = (firstfile) => {
  const filePath = path.isAbsolute(firstfile) ? firstfile : path.resolve(process.cwd(), firstfile);
  const read = fs.readFileSync(filePath, 'utf-8');
  return getParsers(read, filePath);
};

const gendiff = (filepath1, filepath2, formatName) => {
  const file1 = getFilePath(filepath1);
  const file2 = getFilePath(filepath2);
  const compFile = compareFiles(file1, file2);
  return format(compFile, formatName);
};

export default gendiff;
