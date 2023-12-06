## 脚手架特点
* 项目基于vite 构建，开发效率、体验更好（已集成兼容包`@vitejs/plugin-legacy`）
* 统一了代码规法、约束，`eslint+prettier+husky+commitizen`，代码规范，提交规范等。
* `eslint` 规法采用的是`eslint-plugin-vue` + `@typescript-eslint`标准,由`prettier`来执行格式化，如想使用分号结尾或者4个空格，可在`.prettierrc`文件中修改。
* 统一集成了`unocss`（`tailwindcss`构建升级版） css工具库，更有效率的开发页面。
* 网络请求基于更加简洁的`ofetch`封装
* 统一封装了`svg`图标组件，把相关svg文件放入`src/aseets/svg`文件夹内，重新 `yarn dev`运行项目，
在页面中通过`<Svg-icon type="back" color="red" size="220px" />` 即可使用。
* 提供部分组件通用开发规则
## 使用方式

### 使用前需全局执行以下命令
* `npm install -g commitizen` 解决部分 windows 电脑提交代码时校验不生效（macOS 系统可跳过）
* `git config --global core.autocrlf false` 解决部分 windows 电脑下换行符问题（macOS 系统可跳过）

### 构建命令
```
pnpm dev // 开发环境启动项目
pnpm build:staging // 测试环境build命令
pnpm build // 生产环境build命令
```
## commit规范

    示例: `git commit -m "feat(home): 添加导航栏"`

1. type（必须） : commit 的类别，只允许使用下面几个标识：
```
  - feat : 新功能
  - fix : 修复bug
  - bug: 此项特别针对bug号，用于向测试反馈bug列表的bug修改情况
  - docs : 文档改变
  - style : 代码格式改变
  - refactor : 某个已有功能重构
  - test : 增加测试
  - build : 改变了build工具 如 grunt换成了 npm
  - revert : 撤销上一次的 commit
  - chore : 构建过程或辅助工具的变动
  - merge : 合并分支， 例如： merge（前端页面）： feature-xxxx修改线程地址
```
2. scope（必须） : 用于说明 commit 影响的范围，比如数据层、控制层、视图层等等，视项目不同而不同。

3. subject（必须） : commit 的简短描述，不超过50个字符。
