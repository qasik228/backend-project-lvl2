import _ from 'lodash';

const compareFiles = (file1, file2) => {
  const keys = Object.keys({ ...file1, ...file2 });
  const sorted = _.sortBy(keys);
  return sorted.map((key) => {
    if (!_.has(file2, key)) {
      return { mark: '-', key, val: file1[key] };
    }
    if (!_.has(file1, key)) {
      return { mark: '+', key, val: file2[key] };
    }
    if (_.isPlainObject(file1[key]) && _.isPlainObject(file2[key])) {
      return { mark: 'rec', key, child: compareFiles(file1[key], file2[key]) };
    }
    if (file1[key] !== file2[key]) {
      return {
        mark: '-+', key, val1: file1[key], val2: file2[key],
      };
    }
    return { mark: ' ', key, val: file1[key] };
  });
};

export default compareFiles;
