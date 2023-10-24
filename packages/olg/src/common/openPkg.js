const { execSync } = require('child_process');
const chalk = require('chalk');
const inquirer = require('inquirer');


const getName = (type, des) => {
  return `${chalk.green.blue(type || '')}  ${des}`;
};
const fn = async () => {


  const info = await inquirer.prompt({
    type: 'list',
    name: 'type',
    message: '请选择打开类型：',
    default: '',
    choices: [
      {
        name: getName('', '打开依赖包'),
        value: 1,
      },
      {
        name: getName('', '打开文件'),
        value: 2,
      },
    ],
  });

  const giturlParam = await inquirer.prompt([
    {
      name: 'name',
      message: info.type === 1? `请输入包名：` : `请输入文件路径：`,
      type: 'input',
    },
  ]);


  if (info.type === 1) {
    const path = `./node_modules/${giturlParam.name}/package.json`;
    const str = execSync(`code ${path}`, { cwd: process.cwd() }).toString();
    console.log(str);
    return;
  }
  if (info.type === 2) {
    const path = `${giturlParam.name}`;
    const str = execSync(`code ${path}`, { cwd: process.cwd() }).toString();
    console.log(str);
  }
};

module.exports = {
  cli: fn,
  quickCli: fn,
};
