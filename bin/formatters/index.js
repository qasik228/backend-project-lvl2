import stylish from './stylish.js';
import plain from './plain.js';

const format = (compFile, formatName) => {
  switch (formatName) {
    case 'stylish':
      return stylish(compFile);
    case 'plain':
      return plain(compFile);
    case 'json':
      return JSON.stringify(compFile);
    default:
      throw new Error(`This format is not supported: ${formatName}`);
  }
};

export default format;
