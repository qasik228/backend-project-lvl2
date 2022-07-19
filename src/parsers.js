import * as yaml from 'js-yaml';

const parsTree = {
  json: JSON.parse,
  yml: yaml.load,
};

const getParsers = (read, fileFormat) => {
  const parse = parsTree[fileFormat];
  return parse(read);
};

export default getParsers;
