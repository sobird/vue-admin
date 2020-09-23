/**
 * Description
 *
 * @author  Yang,junlong at 2019-02-25 20:46:28 build.
 * @version $Id$
 */
const CompressionWebpackPlugin = require('compression-webpack-plugin');
const rewrites = require('./rewrites.config');

module.exports = {
  // 配置webpack
  configureWebpack: config => {
    // 开启gzip压缩
    isProd && config.plugins.push(new CompressionWebpackPlugin({
      algorithm: 'gzip',
      test: /\.js$|\.html$|\.json$|\.css/,
      threshold: 10240,
      minRatio: 0.8
    }));
  },

  publicPath: "",
  outputDir: "dist",
  assetsDir: "static",
  pwa: {},
  pluginOptions: {},

  devServer: {
    port: 8080,
    open: true,
    hot: true,

    before: function(app, server) {
      for(let path in rewrites) {
        app.get(path, function(req, res) {
          res.sendFile(rewrites[path], {root: __dirname});
        });
        app.post(path, function(req, res) {
          res.sendFile(rewrites[path], {root: __dirname});
        });
      }
    }
  },
  lintOnSave: false
};
