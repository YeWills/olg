const chalk = require('chalk');
const inquirer = require('inquirer');

const fn = (gitUrl) => {
  const reg = /^(.*git@)([^:]+):(.+)$/;
  // console.log('init.....');
  console.log(`${chalk.green.bold('git地址为：')} ${gitUrl.replace(reg, 'http://$2/$3')}`);
};

const processGetUrl = async () => {
  const args = process.argv;
  const gitUrl = args[3];
  fn(gitUrl);
};

const getUrl = async (gitUrl) => {
  fn(gitUrl);
};

const cli = async () => {
  const giturlParam = await inquirer.prompt([
    {
      name: 'url',
      message: '请输入git地址：',
      type: 'input',
    },
  ]);
  const validArgs = [giturlParam.url];
  await getUrl(...validArgs);
};

module.exports = {
  cli,
  quickCli: processGetUrl,
};
