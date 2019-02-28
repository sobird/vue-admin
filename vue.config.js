/**
 * Description
 * 
 * @author  Yang,junlong at 2019-02-25 20:46:28 build.
 * @version $Id$
 */

var fs = require('fs');
var path = require('path');
var rewrite = require('./rewrite.js');

module.exports = {
  publicPath: '',
  outputDir: 'dist',
  assetsDir: 'static',
  pwa: {},
  pluginOptions: {},

  devServer: {
    port: 8080,
  	before(app){
      for(var key in rewrite){
        (function(key){
          app.get(key, (req, res, next) => {
            res.json(readJSON(rewrite[key]));
          })
        })(key);
      }
    }
  },
};


function readJSON(filename) {
  var content = '{}';
  filename = path.resolve('./mock/' + filename);

  if(fs.existsSync(filename)) {
  	content = fs.readFileSync(filename, 'utf8');
  }

  var json = JSON.parse(content);

  return json;
}