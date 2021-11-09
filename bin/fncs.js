import * as fs from 'fs';
import * as path from 'path';
import _ from 'lodash';

export const getFilePath = (firstfile) => {
  const filePath = path.isAbsolute(firstfile) ? firstfile : path.resolve(process.cwd(), firstfile);
  const read = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(read);
};

export const compareFiles = (filepath1, filepath2) => {
  const file1 = getFilePath(filepath1);
  const file2 = getFilePath(filepath2);
  const keys = _.keys({ ...file1, ...file2 });
  let resultString = '{\n';
  const sorted = _.sortBy(keys);
  const newString = sorted.map((key) => {
    if (!_.has(file1, key)) {
      resultString += `  + ${key}: ${file2[key]}\n`;
    }
    if (!_.has(file2, key)) {
      resultString += `  - ${key}: ${file1[key]}\n`;
    }
    if (_.has(file1, key) && _.has(file2, key)) {
      if (file1[key] === file2[key]) {
        resultString += `    ${key}: ${file1[key]}\n`;
      }
      if (file1[key] !== file2[key]) {
        resultString += `  - ${key}: ${file1[key]}\n`;
        resultString += `  + ${key}: ${file2[key]}\n`;
      }
    }
  });
  return resultString + '}';
};
