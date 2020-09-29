/**
 * gulpfile.js
 * 
 * sobird<i@sobird.me> at 2020/09/28 15:56:35 created.
 */

const { src, dest, parallel } = require('gulp');
const babel = require('gulp-babel');
const concat = require('gulp-concat');
var vueify = require('gulp-vueify');

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
    .pipe(babel({
      presets: ['@vue/app']
    }))
    //.pipe(concat('all.js'))
    .pipe(dest('output', { sourcemaps: true }))
}

function vue() {
  return src('src/**/*.vue', { sourcemaps: true })
    .pipe(vueify())
    .pipe(dest('output', { sourcemaps: true }))
}

exports.js = js;
// exports.css = css;
// exports.html = html;
exports.default = parallel(/*html, css,*/ js, vue);
