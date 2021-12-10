import stylish from './stylish.js';
import plain from './plain.js';

const format = (compFile, formatName) => {
  if (formatName === 'stylish') {
    return stylish(compFile);
  } if (formatName === 'plain') {
    return plain(compFile);
  }
  return JSON.stringify(compFile);
  // switch (formatName) {
  //   case 'stylish':
  //     return stylish(compFile);
  //   case 'plain':
  //     return plain(compFile);
  //   case 'json':
  //     return JSON.stringify(compFile);
  //   default:
  //     throw new Error(`This format is not supported: ${formatName}`);
  // }
};

export default format;
