// const stylish = (compFile, replacer = ' ', spacesCount = 1) => {
//   const iter = (currentValue, space) => {
//     if (typeof currentValue !== 'object') {
//       return currentValue.toString();
//     }

//     const indentSize = space * spacesCount;
//     const currentIn = replacer.repeat(indentSize);
//     const bracketIndent = replacer.repeat(indentSize - spacesCount);
//     const currentIndent = currentIn === undefined ? '' : currentIn;
//     const lines = Object.entries(currentValue).map(([key, val]) => {
//       switch (val.length) {
//         case 2:
//           return `${currentIndent}${val[0]}${key}: ${iter(val[1], space + 2)}`;
//         case 4:
//           return `${currentIndent}${val[0]}${key}: ${iter(val[2], space + 2)}\n
//           ${currentIndent}${val[1]}${key}: ${val[3]}`;
//         default:
//           return `${currentIndent}  ${key}: ${iter(val, space + 2)}`;
//       }
//     });
//     return [
//       '{',
//       ...lines,
//       `${bracketIndent}}`,
//     ].join('\n');
//   };

//   return iter(compFile, 1);
// };

const getSpace = (space, spaceCount = 4) => ' '.repeat(spaceCount * space - 2);
const str = (data, compFileSpace) => {
  if (typeof data !== 'object') {
    return `${data}`;
  }
  if (data === null) {
    return null;
  }
  const lines = Object.entries(data).map(([key, value]) => `${getSpace(compFileSpace + 1)}  ${key}: ${str(value, compFileSpace + 1)}`);
  return [
    '{',
    ...lines,
    `${getSpace(compFileSpace)}  }`,
  ].join('\n');
};
const stylish = (compFiles) => {
  const getResult = (compFile, space) => compFile.map((item) => {
    const getValue = (value, symbol) => `${getSpace(space)}${symbol} ${item.key}: ${str(value, space)}\n`;
    switch (item.mark) {
      case '-':
        return `${getValue(item.val, '-')}`;
      case '+':
        return `${getValue(item.val, '+')}`;
      case ' ':
        return `${getValue(item.val, ' ')}`;
      case '-+':
        return `${getValue(item.val1, '-')}${getValue(item.val2, '+')}`;
      case 'rec':
        return `${getSpace(space)}  ${item.key}: {\n${getResult(item.child, space + 1).join('')}${getSpace(space)}  }\n`;
      default:
        throw new Error(`This mark does't exist: ${item.mark}`);
    }
  });
  return `{\n${getResult(compFiles, 1).join('')}}`;
};

export default stylish;
