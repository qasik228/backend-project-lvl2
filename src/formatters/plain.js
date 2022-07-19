const str = (value) => {
  if (value === null) {
    return null;
  } if (typeof value === 'object') {
    return '[complex value]';
  } if (typeof value === 'string') {
    return `'${value}'`;
  }
  return String(value);
};

const plain = (compFile) => {
  const transform = (nodes, parent) => nodes.filter((item) => item.type !== 'unchanged').map((item) => {
    const property = parent ? `${parent}.${item.key}` : item.key;
    switch (item.type) {
      case 'added':
        return `Property '${property}' was added with value: ${str(item.value)}`;
      case 'deleted':
        return `Property '${property}' was removed`;
      case 'changed':
        return `Property '${property}' was updated. From ${str(item.value1)} to ${str(item.value2)}`;
      case 'nested':
        return `${transform(item.child, property)}`;
      default:
        throw new Error(`Mark not defined: ${item.type}`);
    }
  }).join('\n');
  return transform(compFile, 0);
};

export default plain;
