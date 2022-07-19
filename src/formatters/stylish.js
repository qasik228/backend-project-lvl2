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
    switch (item.type) {
      case 'deleted':
        return `${getValue(item.value, '-')}`;
      case 'added':
        return `${getValue(item.value, '+')}`;
      case 'unchanged':
        return `${getValue(item.value, ' ')}`;
      case 'changed':
        return `${getValue(item.value1, '-')}${getValue(item.value2, '+')}`;
      case 'nested':
        return `${getSpace(space)}  ${item.key}: {\n${getResult(item.child, space + 1).join('')}${getSpace(space)}  }\n`;
      default:
        throw new Error(`Mark not defined: ${item.type}`);
    }
  });
  return `{\n${getResult(compFiles, 1).join('')}}`;
};

export default stylish;
