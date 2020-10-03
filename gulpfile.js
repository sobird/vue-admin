/**
 * gulpfile.js
 * 
 * sobird<i@sobird.me> at 2020/09/28 15:56:35 created.
 */

const gulp = require('gulp');
const { src, dest, parallel, watch } = gulp;

// const babel = require('gulp-babel');
const concat = require('gulp-concat');
var vueify = require('mix-vueify');
const rollup = require('rollup');
const rollupTypescript = require('rollup-plugin-typescript');
const through2 = require('through2');

const vueCompiler = require('vue-template-compiler')
const vueEs6Compiler = require('vue-template-es2015-compiler');

const babel = require('@babel/core');
const presetenv = require('@babel/preset-env');
// var babel = require('babel-core');
// var presetenv = require('babel-preset-es2015');

// const pug = require('gulp-pug');
// const less = require('gulp-less');
// const minifyCSS = require('gulp-csso');
// const concat = require('gulp-concat');

// function html() {
//   return src('client/templates/*.pug')
//     .pipe(pug())
//     .pipe(dest('build/html'))
// }

// function css() {
//   return src('client/templates/*.less')
//     .pipe(less())
//     .pipe(minifyCSS())
//     .pipe(dest('build/css'))
// }

function js() {
  return src('src/*.js', { sourcemaps: true })
    //.pipe(concat('all.js'))
    .pipe(dest('output', { sourcemaps: true }))
}

function toFunction(code) {
  return vueEs6Compiler('function render () {' + code + '}')
}

function babelPluginTest(b) {
  //console.log(b.types.CallExpression);
//console.log(Object.keys(b.types));

Object.keys(b.types).forEach(item => {
  if(item.indexOf('require') > -1) {
    console.log(item)
  }
});

  return {
    visitor: {
      Identifier: (path, state) => {
        //console.log(path.node.name);
      },
      CallExpression: function(path, state) {
        //console.log(Object.keys(path));
        if(path.node.callee.name == 'require') {
          //console.log(path.node, state.filename);
        }
        
      },
      ImportDeclaration: (path, state) => {
        path.node.source.value = path.node.source.value + "/test"
      },
      VariableDeclarator: (path, state) => {
        //console.log(path.node.id);
      }
    }
  }
}

var Stream = require('stream');

function vue() {
  return src('src/components/BaiduMap.vue', { sourcemaps: true })
    .pipe((function() {
      
      var stream = new Stream.Transform({ objectMode: true });
      stream._transform = function(originalFile, unused, callback) {
        console.log(originalFile)

        callback(null, originalFile);
      };

      return stream;
    })())
    .pipe(src('src/App.vue'))
    .pipe(through2.obj(function (file, enc, cb) {
      if (file.isBuffer()) {
        let content = file.contents.toString();

        let sfcDescriptor = vueCompiler.parseComponent(content);

        // 编译模板
        if (sfcDescriptor.template) {
          let template = vueCompiler.compile(sfcDescriptor.template.content);
          //console.log(template);

          template = {
            render: toFunction(template.render),
            staticRenderFns: '[' + template.staticRenderFns.map(toFunction).join(',') + ']'
          };

          //console.log(template);
        }

        // 编译脚本
        if (sfcDescriptor.script) {
          let babelResult = babel.transform(sfcDescriptor.script.content, {
            filename: file.path,
            presets: [["@babel/preset-env",
              {
                //"useBuiltIns": "usage",
                "targets": {
                  "browsers": ["> 1%", "last 2 versions", "not ie <= 8"]
                }
              }
            ]],
            //babelrc: false,
            plugins: [babelPluginTest, ["@babel/plugin-transform-runtime", {
              corejs: 3, "helpers": true,
              "regenerator": true,
              "useESModules": false
            }]],
          });

          //console.log(babelResult.code);
          file.contents = Buffer.from(babelResult.code)
        }



      }

      // file.extname = '.jsx';
      cb(null, file);
    }))
    .pipe(dest('output', { sourcemaps: true }))
}

watch('src/**/*.vue', vue);

gulp.task('build', async function () {
  const bundle = await rollup.rollup({
    input: './src/gulp/main.ts',
    plugins: [
      rollupTypescript()
    ]
  });

  await bundle.write({
    file: './output/library.js',
    format: 'cjs',
    name: 'library',
    sourcemap: true
  });
});

exports.js = js;
exports.vue = vue;
// exports.html = html;
exports.default = parallel(/*html, css,*/ js, vue);
