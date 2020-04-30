/**
 * Description
 *
 * @author  Yang,junlong at 2019-02-25 20:46:28 build.
 * @version $Id$
 */

const rewrites = require('./rewrites.config');

module.exports = {
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
