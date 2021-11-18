import { compareFiles, getFilePath } from './fncs.js';
import stylish from './stylish.js';

const gendiff = (filepath1, filepath2) => {
  const file1 = getFilePath(filepath1);
  const file2 = getFilePath(filepath2);
  const compFile = compareFiles(file1, file2);
  return stylish(compFile);
};

export default gendiff;
