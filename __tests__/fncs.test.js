import * as fs from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import gendiff from '../bin/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

const cases = [
  ['filepath1.json', 'filepath2.json', 'expectedstylish.txt', 'stylish'],
  ['filepath1.yml', 'filepath2.yml', 'expectedstylish.txt', 'stylish'],
  ['filepath1.json', 'filepath2.json', 'expectedplain.txt', 'plain'],
  ['filepath1.json', 'filepath2.json', 'expectedjson.txt', 'json'],
];

test.each(cases)('gendiff', (file1, file2, expectedResult, format) => {
  const firstFile = getFixturePath(file1);
  const secondFile = getFixturePath(file2);
  const getResult = readFile(expectedResult);
  const result = gendiff(firstFile, secondFile, format);
  expect(result).toEqual(getResult);
});
