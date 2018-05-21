---
order: 0
title: web-component-seed
---

基于 antd 的组件库开发脚手架

---

## 特性

- 开箱即用的高质量 React 组件。
- 基于 npm + webpack + babel 的工作流，支持 ES2015。

## 支持环境

* 现代浏览器和 IE9 及以上（需要 [polyfills](https://ant.design/docs/react/getting-started-cn#兼容性)）。
* 支持服务端渲染。
* [Electron](http://electron.atom.io/)

## 安装

### 使用 npm 安装

如果需要使用到公司基础库（yd），需现将本机 npm 切换至私有源 http://192.168.8.130:8081/repository/npm-public/

```bash
$ npm install yd -D
```

## 示例

```jsx
import { DemoOne } from 'web-component-seed';
ReactDOM.render(<DemoOne />, mountNode);
```

### 按需加载

下面两种方式都可以只加载用到的组件。

- 使用 [babel-plugin-import](https://github.com/ant-design/babel-plugin-import)（推荐）。

   ```js
   // .babelrc or babel-loader option
   {
     "plugins": [
       ["import", { "libraryName": "web-component-seed", "libraryDirectory": "es", "style": "true" }] // `style: true` 会加载 less 文件
     ]
   }
   ```
   
   然后只需从 web-component-seed 引入模块即可，无需单独引入样式。等同于下面手动引入的方式。

   ```jsx
   // babel-plugin-import 会帮助你加载 JS 和 CSS
   import { DemoOne } from 'web-component-seed';
   ```

- 手动引入

   ```jsx
   import DemoOne from 'web-component-seed/lib/demo-one';  // 加载 JS
   import 'web-component-seed/lib/demo-one/style/css';        // 加载 CSS
   // import 'web-component-seed/lib/demo-one/style';         // 加载 LESS
   ```
