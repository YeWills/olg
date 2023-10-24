/* eslint-disable no-undef */
/* eslint-disable linebreak-style */
const chalk = require('chalk');
const giturlCli = require('./common/giturl');
const gitCli = require('./common/git');
const packCli = require('./common/package');
const openPkgCli = require('./common/openPkg');

const getName = (type, des) => {
	return `${chalk.green.blue(type)}  ${des}`;
};

const config = {
	cmdList: {
		defaultVal: '',
		list: [
			{
				name: getName('pack', '获取项目依赖包信息'),
				value: 'pack',
				cliInfo: packCli,
			},
			{
				name: getName('openPkg', '打开文件'),
				value: 'openPkg',
				cliInfo: openPkgCli,
			},
			{
				name: getName('giturl', 'git 地址转为 http 地址'),
				value: 'giturl',
				cliInfo: giturlCli,
			},
			{
				name: getName('git', '获取项目git信息'),
				value: 'git',
				cliInfo: gitCli,
			},
		],
	},
};

module.exports = config;
