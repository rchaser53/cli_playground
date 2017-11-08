import * as baseGrob from 'glob';
import * as isGlob from 'is-glob';

export const globConverter = (srcArray: string[]): Promise<string[]> => {
  return srcArray.reduce(async (stackPromise: Promise<string[]>, targetPath: string): Promise<string[]> => {
    const actualSrcArray = await convertGlobToActualPaths(targetPath);
    const stack = await stackPromise;
    return stack.concat(actualSrcArray);
  }, Promise.resolve([]));
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

export default globConverter;