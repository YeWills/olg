
## 说明
olg 来源`哦(奥)利给`拼音首字，牛逼的意思。

一个工作日常的 工具集。

## 使用

### 删除本地分支
```s
olg git -d branchName #删除本地分支branchName
```

## 工具开发规范
```js
module.exports = {
  cli, //每个工具要有一个这个名字的变量吐出，用于执行该工具, 执行olg命令进行选择时使用
  quickCli, //每个工具要有一个这个名字的变量吐出，用于执行快速执行该工具 比如 olg giturl https://npm.baidu.com/
};
```

每次开发工具 在文件`./src/config.js`中定义：
```js
const config = {
  cmdList: {
    defaultVal: '',
    list: [
      {
        name: getName('giturl', 'git 地址转为 http 地址'),
        value: 'giturl',
        cliInfo: giturlCli,
      },
    ],
  },
};
```

将工具js写到 `./src/common` 目录下