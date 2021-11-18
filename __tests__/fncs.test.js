// import * as fs from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import gendiff from '../bin/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
// const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

const cases = [
  ['filepath1.json', 'filepath2.json'],
];

test.each(cases)('gendiff', (file1, file2) => {
  const firstFile = getFixturePath(file1);
  const secondFile = getFixturePath(file2);
  // const getResult = readFile(expectedResult);
  const result = gendiff(firstFile, secondFile);
  expect(result).toEqual(
    `{
    common: {
      + follow: false
        setting1: Value 1
      - setting2: 200
      - setting3: true
      + setting3: null
      + setting4: blah blah
      + setting5: {
            key5: value5
        }
        setting6: {
            doge: {
              - wow: 
              + wow: so much
            }
            key: value
          + ops: vops
        }
    }
    group1: {
      - baz: bas
      + baz: bars
        foo: bar
      - nest: {
            key: value
        }
      + nest: str
    }
  - group2: {
        abc: 12345
        deep: {
            id: 45
        }
    }
  + group3: {
        deep: {
            id: {
                number: 45
            }
        }
        fee: 100500
    }
}`,
  );
});

// const data1 = getFixturePath('file1.json');
// const data2 = getFixturePath('file2.json');
// const data3 = getFixturePath('file1.yml');
// const data4 = getFixturePath('file2.yml');
// const getResult = readFile('expectedfile.txt');

// test('compareFiles, json format', () => {
//   expect(compareFiles(data1, data2)).toEqual(
//     `{
//   - follow: false
//     host: hexlet.io
//   - proxy: 123.234.53.22
//   - timeout: 50
//   + timeout: 20
//   + verbose: true
// }`,
//   );
// });

// test('compareFiles, yml format', () => {
//   expect(compareFiles(data3, data4)).toEqual(
//     `{
//   - follow: false
//     host: hexlet.io
//   - proxy: 123.234.53.22
//   - timeout: 50
//   + timeout: 20
//   + verbose: true
// }`,
//   );
// });

// test ('getParsers', () => {

// });
