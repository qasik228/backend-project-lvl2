import _ from 'lodash';

export const compareFiles = (file1, file2) => {
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

  //   if (_.has(file2, key)) {
  //     if (_.isPlainObject(file2[key])) {
  //       if (file1[key]) {
  //         finishedArray[key] = ['  ', compareFiles(file1[key], file2[key])];
  //       } else {
  //         finishedArray[key] = ['+ ', file2[key]];
  //       }
  //     } else if (file1[key] === file2[key]) {
  //       finishedArray[key] = ['  ', file1[key]];
  //     } else if (_.has(file1, key)) {
  //       finishedArray[key] = ['- ', '+ ', file1[key], file2[key]];
  //     } else {
  //       finishedArray[key] = ['+ ', file2[key]];
  //     }
  //   } else {
  //     finishedArray[key] = ['- ', file1[key]];
  //   }
  //   return finishedArray;
  // });
  // return finishedArray;

  // return sorted.map((key) => {
  //   if (!_.has(file2, key)) {
  //     return { mark: '-', key, data: file1[key] };
  //   }
  //   if (!_.has(file1, key)) {
  //     return { mark: '+', key, data: file2[key] };
  //   }
  //   if (_.isPlainObject(file1) && _.isPlainObject(file2)) {
  //     return { mark: 'recursion', key, data: compareFiles(file1[key], file2[key]) };
  //   }
  //   if (_.has(file1, key) && _.has(file2, key)) {
  //     if (file1[key] !== file2[key]) {
  //       return { mark: '-+', key, data1: file1[key], data2: file2[key] };
  //     }
  //     if (file1[key] === file2[key]) {
  //       return { mark: ' ', key, data: file1[key] };
  //     }
  //   }
  // });

  // const newString = sorted.map((key) => {
  //   if (!_.has(file2, key)) {
  //     resultString += `  - ${key}: ${file1[key]}\n`;
  //   }
  //   if (!_.has(file1, key)) {
  //     resultString += `  + ${key}: ${file2[key]}\n`;
  //   }
  //   if (_.has(file1, key) && _.has(file2, key)) {
  //     if (file1[key] === file2[key]) {
  //       resultString += `    ${key}: ${file1[key]}\n`;
  //     }
  //     if (file1[key] !== file2[key]) {
  //       resultString += `  - ${key}: ${file1[key]}\n`;
  //       resultString += `  + ${key}: ${file2[key]}\n`;
  //     }
  //   }
  // });
  // return resultString + '}';
};

// export default buildTree;
