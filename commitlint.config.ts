import type { UserConfig } from '@commitlint/types';

const Configuration: UserConfig = {
  extends: ['@commitlint/config-conventional'],
  formatter: '@commitlint/format',
  ignores: [(commitMessage) => commitMessage.startsWith('chore(release): :bookmark: bump version')],
};

export default Configuration;
