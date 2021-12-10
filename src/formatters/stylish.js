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
        throw new Error(`Mark not defined: ${item.mark}`);
    }
  });
  return `{\n${getResult(compFiles, 1).join('')}}`;
};

export default stylish;
