import * as path from 'path';
import * as fs from 'fs';
import test from 'ava';
import * as del from 'del';

import * as appRootDir from 'app-root-dir';
const rootDir = appRootDir.get();

import { less } from '../../less/utils';

test.beforeEach((t) => {
  del(path.join(rootDir, 'scripts/fixture/outputs/*'));
});

test('should emit only css when sourceMap is false', async (t) => {
  await less(
    {
      cwd: path.join(rootDir, 'scripts/fixture/inputs/'),
      src: [ 'index.less' ],
      dest: path.join(rootDir, 'scripts/fixture/outputs/'),
      paths: [ path.join(rootDir, 'scripts/fixture/inputs/') ]
    },
    {
      sourceMap: false
    }
  );

  t.is(
    fs.readFileSync(path.join(rootDir, 'scripts/fixture/comparisons/index.css'), 'utf8'),
    fs.readFileSync(path.join(rootDir, 'scripts/fixture/outputs/index.css'), 'utf8')
  );
});