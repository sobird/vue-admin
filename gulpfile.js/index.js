/**
 * gulpfile.js
 * 
 * sobird<i@sobird.me> at 2020/09/28 15:56:35 created.
 */

const path = require('path');
const gulp = require('gulp');
const { src, dest, parallel, watch } = gulp;

// const babel = require('gulp-babel');
const concat = require('gulp-concat');
var vueify = require('mix-vueify');
const rollup = require('rollup');
const rollupTypescript = require('rollup-plugin-typescript');
const through2 = require('through2');
const File = require('vinyl');

const vueCompiler = require('vue-template-compiler')
const vueEs6Compiler = require('vue-template-es2015-compiler');

const babel = require('@babel/core');
const presetenv = require('@babel/preset-env');

const gulpVue = require('./gulp-plugin-vue');

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
  .pipe(dest('output', { sourcemaps: true }));
}

function toFunction(code) {
  return babel.transform('function render () {' + code + '}', {
    filename: 'file.ts',
    presets: ["@babel/preset-env"],
  })
}

function babelPluginTest(b, opts, cwd) {
  if(!opts.file.deps) {
    opts.file.deps = [];
  }
  return {
    visitor: {
      Identifier: (path, state) => {
        //console.log(path.node.name);
      },
      CallExpression: function(path, state) {
        //console.log(Object.keys(path));
        if(path.node.callee.name == 'require') {
          //console.log(path.node);
        }
        
      },
      ImportDeclaration: (path, state) => {
        //path.node.source.value = path.node.source.value + "/test"

        opts.file.deps.push(path.node.source.value);
      },
      VariableDeclarator: (path, state) => {
        //console.log(path.node.id);
      }
    }
  }
}

var Stream = require('stream');

var lastFile = null;

function vue() {
  return src('src/**/BaiduMap.vue', { sourcemaps: true })
    .pipe((function() {
      
      var stream = new Stream.Transform({ objectMode: true });
      stream._transform = function(originalFile, unused, callback) {
        console.log(originalFile)

        callback(null, originalFile);
      };

      return stream;
    })())
    .pipe(src('src/App.vue'))
    .pipe(through2.obj(async function (file, enc, cb) {
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

          console.log(template);
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
            plugins: [[babelPluginTest, {file}], ["@babel/plugin-transform-runtime", {
              corejs: 2, "helpers": true,
              "regenerator": true,
              "useESModules": false
            }]],
          });

          // const bundle = await rollup.rollup({
          //   input: babelResult.code,
          //   plugins: [
          //     rollupTypescript()
          //   ]
          // });

          // // generate code and a sourcemap
          // const { code, map } = await bundle.generate(outputOptions);

          //console.log(babelResult.code);
          file.contents = Buffer.from(babelResult.code)
        }



      }

      file.extname = '.js';
      cb(null, file);
    }))
    

    .pipe(through2.obj(function (file, enc, cb) {
      console.log(file.deps);

      this.push(file);
      cb();
    }, function(cb) {
      console.log(1212);
      cb();
    }))

    .pipe(through2.obj(function (file, enc, cb) {
      console.log(path.relative(file.base, file.path), file.path);
      lastFile = file;

      //this.push(file);
      //cb(null, {});
    }, function(cb) {

      this.push(new File({
        path: 'test.js',
        contents: Buffer.from('test')
      }));
      cb();
    }))

    .pipe(dest('output', { sourcemaps: true }))
    
}

//watch('src/**/*.vue', vue);

gulp.task('build', async () => {
  const bundle = await rollup.rollup({
    input: './output/App.js',
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
exports.vue = function() {
  return src('src/**/*.vue', { sourcemaps: true })
    .pipe(gulpVue())
    .pipe(dest('output', { sourcemaps: true }))
};
// exports.html = html;
exports.default = parallel(/*html, css,*/ js, vue);
