const path = require('path');
const CSSSplitWebpackPlugin = require('css-split-webpack-plugin').default;
const replaceLib = require('yd-tools/lib/replaceLib');

const { name, version } = require('../package.json');

const isDev = process.env.NODE_ENV === 'development';
const usePreact = process.env.REACT_ENV === 'preact';

function alertBabelConfig(rules) {
  rules.forEach((rule) => {
    if (rule.loader && rule.loader === 'babel-loader') {
      rule.options.plugins.push(replaceLib);
    } else if (rule.use) {
      alertBabelConfig(rule.use);
    }
  });
}

module.exports = {
  port: 8001,
  source: {
    components: './components',
    docs: './docs',
    changelog: [
      'CHANGELOG.zh-CN.md',
    ],
  },
  theme: './site/theme',
  htmlTemplate: './site/theme/static/template.html',
  themeConfig: {
    typeOrder: {
      General: 0,
    },
    docVersions: {
      [version]: version,
    },
  },
  filePathMapper(filePath) {
    if (filePath === '/index.html') {
      return ['/index.html'];
    }
    if (filePath.endsWith('/index.html')) {
      return [filePath, filePath.replace(/\/index\.html$/, '-cn/index.html')];
    }
    if (filePath !== '/404.html' && filePath !== '/index-cn.html') {
      return [filePath, filePath.replace(/\.html$/, '-cn.html')];
    }
    return filePath;
  },
  doraConfig: {
    verbose: true,
    plugins: ['dora-plugin-upload'],
  },
  webpackConfig(config) {
    config.resolve.alias = {
      // 入口文件配置
      [`${name}/lib`]: path.join(process.cwd(), 'components'),
      [name]: path.join(process.cwd(), 'index'),
      'react-router': 'react-router/umd/ReactRouter',
    };

    config.externals = {
      'react-router-dom': 'ReactRouterDOM',
    };

    if (usePreact) {
      config.resolve.alias = Object.assign({}, config.resolve.alias, {
        react: 'preact-compat',
        'react-dom': 'preact-compat',
        'create-react-class': 'preact-compat/lib/create-react-class',
        'react-router': 'react-router',
      });
    }

    if (isDev) {
      config.devtool = 'source-map';
    }

    alertBabelConfig(config.module.rules);

    config.plugins.push(new CSSSplitWebpackPlugin({ size: 4000 }));

    return config;
  },
};
