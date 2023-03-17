import _ from 'lodash'
import { readFileSync } from 'node:fs';
import path from 'path';
import { cwd } from 'node:process';

const compare = (filepath1, filepath2) => {
  const obj1 = JSON.parse(readFileSync(path.resolve(`${cwd()}`,filepath1)));
  const obj2 = JSON.parse(readFileSync(path.resolve(`${cwd()}`,filepath2)));
  
  const arrFile1=[];
  const arrFile2=[];

  _.forIn(obj1,function(value, key) {
    arrFile1.push(`${key}:${value} `);
  });
  _.forIn(obj2,function(value, key) {
    arrFile2.push(`${key}:${value} `);
  });
  
  const rest = [...new Set([...arrFile1,...arrFile2])].sort();

  const result = rest.map((item) => {
    if (arrFile1.includes(item) && arrFile2.includes(item)) {
      return `  ${item}`;
    } else if (arrFile1.includes(item)) {
      return `- ${item}`;
    }
    return `+ ${item}`;

  })
  return result.join('\n');
};

export default compare;
