import { spawnSync } from './.internal/utils';

(async () => {
  const args = process.argv.slice(2);

  let command = `babel src --out-dir dist --extensions ".ts,.js"`;

  if (args.length) {
    command = `babel ${args.join(' ')} --extensions ".ts,.js"`;
  }

  spawnSync(command, { cwd: process.cwd() });
})();
