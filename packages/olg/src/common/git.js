const { execSync, exec } = require('child_process');

function fn() {
  const str = execSync('cat .git/config', { cwd: process.cwd() }).toString();
  console.log(1109, str);
}

module.exports = {
  cli: fn,
  quickCli: fn,
};
