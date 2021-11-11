import * as fs from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import { compareFiles } from '../bin/fncs.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

const data1 = getFixturePath('file1.json');
const data2 = getFixturePath('file2.json');
const data3 = getFixturePath('file1.yml');
const data4 = getFixturePath('file2.yml');
// const getResult = readFile('expectedfile.txt');

test('compareFiles, json format', () => {
    expect(compareFiles(data1, data2)).toEqual(
`{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`
);
});

test('compareFiles, yml format', () => {
  expect(compareFiles(data3, data4)).toEqual(
`{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`
);
});

// test ('getParsers', () => {

// });
