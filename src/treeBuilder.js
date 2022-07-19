import _ from 'lodash';

const buildTree = (file1, file2) => {
  const keys = Object.keys({ ...file1, ...file2 });
  const sorted = _.sortBy(keys);
  return sorted.map((key) => {
    if (!_.has(file2, key)) {
      return { type: 'deleted', key, value: file1[key] };
    }
    if (!_.has(file1, key)) {
      return { type: 'added', key, value: file2[key] };
    }
    if (_.isPlainObject(file1[key]) && _.isPlainObject(file2[key])) {
      return { type: 'nested', key, child: buildTree(file1[key], file2[key]) };
    }
    if (file1[key] !== file2[key]) {
      return {
        type: 'changed', key, value1: file1[key], value2: file2[key],
      };
    }
    return { type: 'unchanged', key, value: file1[key] };
  });
};

export default buildTree;
