import * as baseGrob from 'glob';
import * as isGlob from 'is-glob';
import * as async from 'async';

export const globConverter = (srcArray: string[]): Promise<string[]> => {
  return srcArray.reduce(async (stackPromise: Promise<string[]>, targetPath: string): Promise<string[]> => {
    const actualSrcArray = await convertGlobToActualPaths(targetPath);
    const stack = await stackPromise;
    return stack.concat(actualSrcArray);
  }, Promise.resolve([]));
};

export const avoidSamePath = (targetArray: string[]): string[] => {
  return targetArray.reduce((stack: string[], targetPath) => {
    return stack.includes(targetPath)
            ? stack
            : stack.concat(targetPath);
  }, []);
};

export const convertGlobToActualPaths = (src: string): Promise<string[]> => {
  return new Promise((resolve, reject) => {
    if (isGlob(src) === false) {
      resolve([src]);
      return;
    }
    new baseGrob.Glob(src, (err, resultArray) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(resultArray);
    });
  });
};


export const promisedAsyncReduce = <T>(src: any[], memo, iterator: (stack, next, cb) => any): Promise<T> => {
  return new Promise((resolve, reject) => {
    return async.reduce(src, memo, iterator, (err, result) => {
      if (err) {
        reject(err);
      }
      resolve(result);
    });
  });
};