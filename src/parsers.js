import * as path from 'path';
import * as yaml from 'js-yaml';

const parsTree = {
  json: JSON.parse,
  yml: yaml.safeLoad,
};

const getParsers = (read, pathFile) => {
  const fileFormat = path.extname(pathFile).substring(1);
  const parse = parsTree[fileFormat];
  return parse(read);
};

export default getParsers;
