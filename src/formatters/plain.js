const str = (val) => {
  if (val === null) {
    return null;
  } if (typeof val === 'object') {
    return '[complex value]';
  } if (typeof val === 'string') {
    return `'${val}'`;
  }
  return String(val);
};

const plain = (compFile) => {
  const transform = (nodes, parent) => nodes.filter((item) => item.mark !== ' ').map((item) => {
    const property = parent ? `${parent}.${item.key}` : item.key;
    switch (item.mark) {
      case '+':
        return `Property '${property}' was added with value: ${str(item.val)}`;
      case '-':
        return `Property '${property}' was removed`;
      case '-+':
        return `Property '${property}' was updated. From ${str(item.val1)} to ${str(item.val2)}`;
      case 'rec':
        return `${transform(item.child, property)}`;
      default:
        throw new Error(`Mark not defined: ${item.mark}`);
    }
  }).join('\n');
  return transform(compFile, 0);
};

export default plain;
