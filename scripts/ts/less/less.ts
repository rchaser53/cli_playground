import { lessConfig } from './less.config';
import { less } from './utils';

const { fileConfigs, options } = lessConfig;

const lessFiles = async () => {
  Object.keys(fileConfigs).forEach(() => {
    try {
      less(fileConfigs, options);
    }
    catch (errorStack) {
      errorStack.forEach((err) => {
        console.error(err);
      });
      process.exit(1);
    }
  });
};

export const emitStartAndEndLog = async (taskTitle: string, task: () => Promise<any>) => {
  console.log(`${taskTitle} start`);

  await task();       // 各taskの中でエラーハンドリングは行うこと
  console.log(`${taskTitle} end
  `);
};

emitStartAndEndLog('less', lessFiles);