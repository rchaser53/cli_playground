import * as fs from 'fs';
import * as jetpack from 'fs-jetpack';
import * as lessc from 'less';

export const less = async (fileConfig, options): Promise<void> => {
  const { cwd, src, dest } = fileConfig;
  const actualOptions = createLessOption(options, cwd);

  const errorStack = await src.reduce(async (stack, filePath) => {
    const actualStack = await stack;
    const actualFilePath = await filePath;
    const resultFilePath = actualFilePath.replace(/\.less$/, '.css');

    try {
      const srcCode = fs.readFileSync(`${cwd}${actualFilePath}`, 'utf8');
      const ret = await lessc.render(srcCode, actualOptions);

      jetpack.write(`${dest}${resultFilePath}`, ret.css);
      if (options.map) jetpack.write(`${dest}${resultFilePath}.map`, ret.map);
    } catch (err) {
      actualStack.push(err);
    }

    return actualStack;
  }, []);

  if (0 < errorStack.length) throw new Error(errorStack);
};

export const createLessOption = (options, cwd) => {
  return (options.sourceMap)
          ? {
            sourceMap: {
              sourceMapRootpath: '/',
              sourceMapFileInline: true
            },
            paths: [cwd]
          }
          : {
            sourceMap: false,
            paths: [cwd]
          };
};