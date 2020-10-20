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

var sass = require('gulp-sass');
sass.compiler = require('sass');
var gulpIf = require('gulp-if');

const gulpPostcss = require('gulp-postcss');
const precss = require('precss');
const gulpBabel = require('gulp-babel');

const isImage = require('is-image');
const resolve = require('resolve');

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
  .pipe(gulpBabel({
    presets: ['@babel/env'],
    plugins: [["@babel/plugin-transform-runtime", {
      corejs: 2, "helpers": true,
      "regenerator": true,
      "useESModules": false
    }]],
}))
  .pipe(dest('output'));
}

function toFunction(code) {
  return babel.transform('function render () {' + code + '}', {
    filename: 'file.ts',
    presets: ["@babel/preset-env"],
  })
}

let pth = path;
function babelPluginTest(b, opts, cwd) {
  if(!opts.file.deps) {
    opts.file.deps = [];
  }
  console.log(cwd)
  return {
    visitor: {
      Identifier: (path, state) => {
        //console.log(path.node.name);
      },
      CallExpression: function(path, state) {
        //console.log(Object.keys(path));

        // 兼容 import 和 require两种语法
        if(path.node.callee.name == 'require') {
          let requireValue = path.node.arguments[0].value;

          if(isImage(requireValue)) {

            let rela = pth.resolve(pth.dirname(state.filename), requireValue);

            console.log(pth.relative( state.cwd, rela));

           // console.log(resolve.sync(pth.relative( state.cwd, rela)), 123);

            //path.parent.arguments[0] = b.types.stringLiteral(requireValue);
          }
          
        }
        
      },
      ImportDeclaration: (path, state) => {
        //path.node.source.value = path.node.source.value + "/test"
        let value = path.node.source.value;

        if(isImage(value)) {
          console.log(value, 'ImportDeclaration');
        }
        //console.log(resolve.sync(path.node.source.value));
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

          // template = {
          //   render: toFunction(template.render),
          //   staticRenderFns: '[' + template.staticRenderFns.map(toFunction).join(',') + ']'
          // };

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
              "absoluteRuntime": false,
              "corejs": false,
              "helpers": true,
              "regenerator": false,
              "useESModules": true,
              "version": "7.0.0-beta.0"
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
exports.vue = vue;
// exports.html = html;
exports.default = parallel(/*html, css,*/ js, vue);


exports.test = function() {
  return src('./src/**/*.{png,jp{,e}g,svg,gif}')
  .pipe(src('./src/**/*.{png,jp{,e}g,svg,gif}'))
  .pipe(through2.obj(function(file, enc, callback) {

    console.log(file.path, 1);

this.push(file);
this.push(file);
    callback();
  }))
  .pipe(through2.obj(function(file, enc, callback) {
    console.log(file.path, 2);

    this.push(file);
    callback();
  }))
  .pipe(dest('image'));
}
