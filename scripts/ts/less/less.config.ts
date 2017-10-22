export interface LessConfig {
  options: {
    sourceMap: boolean
  };
  fileConfigs: {
    [key: string]: {
      cwd: string,
      src: string[],
      dest: string
    }
  };
}

export const lessConfig: LessConfig = {
  options: {
    sourceMap: true
  },
  fileConfigs: {
    index: {
      cwd: 'less',
      src: [],
      dest: 'dist/css/'
    }
  }
};