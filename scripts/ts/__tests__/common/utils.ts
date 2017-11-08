import test from 'ava';
import { globConverter } from '../../common/utils';

test('should resolve glob paths and convert actual path', async (t) => {
  t.deepEqual(
    await globConverter(['scripts/fixture/inputs/**/*.target']),
    ['scripts/fixture/inputs/nest/nest.target']
  );
});

test('should resolve paths mixed with glob and convert actual path', async (t) => {
  t.deepEqual(
    await globConverter(['scripts/fixture/inputs/**/*.target', 'scripts/fixture/inputs/importLess.less']),
    ['scripts/fixture/inputs/nest/nest.target', 'scripts/fixture/inputs/importLess.less']
  );
});