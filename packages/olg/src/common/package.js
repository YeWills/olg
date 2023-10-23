const { execSync, exec } = require('child_process');
const chalk = require('chalk');
const inquirer = require('inquirer');

// function fn() {
//   const str = execSync('cat ./node_module', { cwd: process.cwd() }).toString();
//   console.log(1109, str);
// }
const getName = (type, des) => {
  return `${chalk.green.blue(type || '')}  ${des}`;
};
const fn = async () => {
  const giturlParam = await inquirer.prompt([
    {
      name: 'name',
      message: '请输入包名：',
      type: 'input',
    },
  ]);

  const info = await inquirer.prompt({
    type: 'list',
    name: 'type',
    message: '请选择要使用的命令：',
    default: '',
    choices: [
      {
        name: getName('', '获取版本号'),
        value: 1,
      },
      {
        name: getName('', '获取详细信息'),
        value: 2,
      },
    ],
  });
  if (info.type === 1) {
    const path = `./node_modules/${giturlParam.name}/package.json`;
    const str = execSync(`cat ${path} | grep version`, { cwd: process.cwd() }).toString();
    console.log(str);
    return;
  }
  if (info.type === 2) {
    const path = `./node_modules/${giturlParam.name}/package.json`;
    const str = execSync(`cat ${path}`, { cwd: process.cwd() }).toString();
    console.log(str);
  }
};

module.exports = {
  cli: fn,
  quickCli: fn,
};
