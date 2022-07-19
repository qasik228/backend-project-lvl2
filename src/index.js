import * as fs from 'fs';
import * as path from 'path';
import buildTree from './treeBuilder.js';
import format from './formatters/index.js';
import getParsers from './parsers.js';

const getFilePath = (file) => {
  const filePath = path.resolve(process.cwd(), file);
  const read = fs.readFileSync(filePath, 'utf-8');
  return getParsers(read, filePath);
};

const gendiff = (filepath1, filepath2, formatName = 'stylish') => {
  const file1 = getFilePath(filepath1);
  const file2 = getFilePath(filepath2);
  const compFile = buildTree(file1, file2);
  return format(compFile, formatName);
};

export default gendiff;
