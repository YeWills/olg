## olg
是一个工具包集合，采用monorepo方式，基于`pnpm lerna turbo ts`，使用`turbo`的缓存编译功能，极大地提高了编译速度，给开发带来很大便利。
>本工程也是一个经典的monorepo方式的工程范例，包含了完整的开发、编译、发布、husky、文档集成。

目前集成的功能有：
- 获取项目依赖包(node module)的信息,如版本信息、package.json;
- 快捷使用vscode打开依赖包(node module)的package.json文件，因此可以快速打开查看依赖包的文件
- olg git -d branch 快捷删除git本地分支
- 获取项目git信息

## 使用
```s
npm i olg -g
```
然后使用命令：`olg` 或 `olg git -d branch`，根据提示操作。
## 开发
### 安装与构建
根目录下执行:
```shell
pnpm i && pnpm build
```

### 启动
- 根目录下执行 pnpm dev
- 或进入具体pkg下，执行 pnpm dev
- pnpm dev 可以监听包编译，时刻输出最新代码

### 发布

- tsc生成声明文件
如果需要生成声明文件，使用 pnpm run tsc

- `pnpm run release`
会处理好git状态、自动编译、git tag打标签、git publish。

### 查看文档
运行命令，文档采用dumi，默认集成packages中的readme作为包的文档，当然也可以自定义，自定义可参考dumi的官网说明。
```s
pnpm run doc #生成文档
```
访问：`http://localhost:8000`

### 查看工程是否正常

```s
pnpm install
pnpm run build
pnpm run tsc
pnpm run doc #生成文档
pnpm run release:d  #debugger 模式
npx olg --version # 测试查看工具版本
npx olg test # 测试查看工具能否使用
```


