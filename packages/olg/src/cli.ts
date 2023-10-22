import { chalk, isLocalDev, yParser } from '@olgjs/utils';

const args = yParser(process.argv.slice(2), {
  alias: {
    version: ['v'],
    help: ['h'],
  },
  boolean: ['version'],
});

if (args.version && !args._[0]) {
  args._[0] = 'version';
  const local = isLocalDev() ? chalk.cyan('@local') : '';
  const { name, version } = require('../package.json');
  console.log(`${name}@${version}${local}`);
} else if (args._[0] === 'help') {
  console.log(`olg git -d branchName 删除本地分支branchName `);
} else {
  require('./')
    .default({
      cwd: process.cwd(),
      args,
    })
    .catch((err: Error) => {
      console.error(`Create failed, ${err.message}`);
      console.error(err);
    });
}
