/**
 * vue.config.js
 * 
 * @see https://cli.vuejs.org/zh/config/
 *
 * @author  Yang,junlong at 2019-02-25 20:46:28 build.
 * @version $Id$
 */
const CompressionWebpackPlugin = require('compression-webpack-plugin');
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');
const rewrites = require('./rewrites.config');

// 生产环境判断
const isProd = process.env.NODE_ENV === 'production';

module.exports = {
  /**
   * 在 multi-page 模式下构建应用。
   * 每个“page”应该有一个对应的 JavaScript 入口文件。
   * 其值应该是一个对象，对象的 key 是入口的名字，value 是：
   * 1. 一个指定了 entry, template, filename, title 和 chunks 的对象 (除了 entry 之外都是可选的)；
   * 2. 或一个指定其 entry 的字符串。
   * @type Object
   */
  // pages: {
  //   index: {
  //     // page 的入口 首页
  //     entry: "src/pages/index/main.js",
  //     // 模板来源
  //     template: "public/index.html",
  //     // 在 dist/index.html 的输出
  //     //filename: 'index.html',
  //     // 当使用 title 选项时，
  //     // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
  //     title: "Index Page",
  //     // 在这个页面中包含的块，默认情况下会包含
  //     // 提取出来的通用 chunk 和 vendor chunk。
  //     chunks: ["chunk-vendors", "chunk-common", "index"]
  //   }
  // },

  /**
   * 如果这个值是一个对象，则会通过 webpack-merge 合并到最终的配置中。
   * 如果这个值是一个函数，则会接收被解析的配置作为参数。
   * 该函数既可以修改配置并不返回任何东西，也可以返回一个被克隆或合并过的配置版本。
   * 
   * @type Object | Function
   */
  configureWebpack: config => {
    // 开启gzip压缩
    // isProd && config.plugins.push(new CompressionWebpackPlugin({
    //   algorithm: 'gzip',
    //   test: /\.js$|\.html$|\.json$|\.css/,
    //   threshold: 10240,
    //   minRatio: 0.8
    // }));

    config.plugins.push(new MonacoWebpackPlugin({
      languages: ['typescript', 'javascript', 'css']
    }));
  },

  /**
   * 是一个函数，会接收一个基于 webpack-chain 的 ChainableConfig 实例。
   * 允许对内部的 webpack 配置进行更细粒度的修改。
   * 
   * @type Function
   */
  chainWebpack: config => {},

  /**
   * 部署应用包时的基本 URL。
   * 用法和 webpack 本身的 output.publicPath 一致，
   * 但是 Vue CLI 在一些其他地方也需要用到这个值，
   * 所以请始终使用 publicPath 而不要直接修改 webpack 的 output.publicPath
   */
  publicPath: "",

  /**
   * 当运行 vue-cli-service build 时生成的生产环境构建文件的目录。
   * 注意目标目录在构建之前会被清除 (构建时传入 --no-clean 可关闭该行为)。
   */
  outputDir: "dist",

  /**
   * 放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录。
   */
  assetsDir: "static",

  /**
   * 指定生成的 index.html 的输出路径 (相对于 outputDir)。
   * 也可以是一个绝对路径。
   */
  indexPath: "index.html",

  /**
   * 默认情况下，生成的静态资源在它们的文件名中包含了 hash 以便更好的控制缓存。
   * 然而，这也要求 index 的 HTML 是被 Vue CLI 自动生成的。
   * 如果你无法使用 Vue CLI 生成的 index HTML，
   * 你可以通过将这个选项设为 false 来关闭文件名哈希。
   */
  filenameHashing: true,

  /**
   * 是否在开发环境下通过 eslint-loader 在每次保存时 lint 代码。
   * 这个值会在 @vue/cli-plugin-eslint 被安装之后生效。
   */
  lintOnSave: false,

  /**
   * 是否使用包含运行时编译器的 Vue 构建版本。
   * 设置为 true 后你就可以在 Vue 组件中使用 template 选项了，
   * 但是这会让你的应用额外增加 10kb 左右。
   */
  runtimeCompiler: false,

  /**
   * 默认情况下 babel-loader 会忽略所有 node_modules 中的文件。
   * 如果你想要通过 Babel 显式转译一个依赖，可以在这个选项中列出来。
   */
  transpileDependencies: [],

  /**
   * 如果你不需要生产环境的 source map，
   * 可以将其设置为 false 以加速生产环境构建。
   */
  productionSourceMap: false,

  /**
   * 设置生成的 HTML 中 <link rel="stylesheet"> 和 <script> 标签的 crossorigin 属性。
   * 需要注意的是该选项仅影响由 html-webpack-plugin 在构建时注入的标签 - 
   * 直接写在模版 (public/index.html) 中的标签不受影响。
   */
  crossorigin: undefined,

  /**
   * 在生成的 HTML 中的 <link rel="stylesheet"> 和 <script> 标签上启用 Subresource Integrity (SRI)。
   * 如果你构建后的文件是部署在 CDN 上的，启用该选项可以提供额外的安全性。
   */
  integrity: false,

  pwa: {},
  pluginOptions: {},

  devServer: {
    port: 8080,
    open: true,
    hot: true,

    // 代理
    proxy: {
      "/example": { // 水印服务
        target: "https://example.com/",
        ws: true,
        changeOrigin: true
      }
    },

    // 本地请求URL重写
    before: function (app, server) {
      for (let path in rewrites) {
        app.get(path, function (req, res) {
          res.sendFile(rewrites[path], { root: __dirname });
        });
        app.post(path, function (req, res) {
          res.sendFile(rewrites[path], { root: __dirname });
        });
      }
    }
  }
};
