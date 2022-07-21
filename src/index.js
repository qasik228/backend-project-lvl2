import * as fs from 'fs';
import * as path from 'path';
import buildTree from './treeBuilder.js';
import format from './formatters/index.js';
import getParsers from './parsers.js';

const getData = (file) => {
  const filePath = path.resolve(process.cwd(), file);
  const read = fs.readFileSync(filePath, 'utf-8');
  const fileFormat = path.extname(filePath).substring(1);
  return getParsers(read, fileFormat);
};

const gendiff = (filepath1, filepath2, formatName = 'stylish') => {
  const diff1 = getData(filepath1);
  const diff2 = getData(filepath2);
  const compFile = buildTree(diff1, diff2);
  return format(compFile, formatName);
};

export default gendiff;
