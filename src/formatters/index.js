import stylish from './stylish.js';
import plain from './plain.js';

const format = (compFile, formatName) => {
  switch (formatName) {
    case 'stylish':
      return stylish(compFile);
    case 'plain':
      return plain(compFile);
    default:
      return JSON.stringify(compFile);
  }
};

export default format;
