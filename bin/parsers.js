import * as path from 'path';
import * as yaml from 'js-yaml';

const getParsers = (read, pathFile) => {
  const fileFormat = path.extname(pathFile);
  switch (fileFormat) {
    case '.json':
      return JSON.parse(read);
    case '.yml':
      return yaml.load(read);
  }
};

export default getParsers;
