/**
 * gulp vue 插件
 * 
 * sobird<i@sobird.me> at 2020/10/05 11:46:18 created.
 */

const through = require('through2');
const compiler = require('vue-template-compiler');
const transpile = require('vue-template-es2015-compiler');
const gulp = require('gulp');
const Vinyl = require('vinyl');

console.log(gulp.src.toString());

/**
 * compile template to:
 * {
 *   render:
 *   staticRenderFns: 
 * }
 * 
 * @param {*} template 
 */
function compileTemplate(template) {
  var compiled = compiler.compile(template)
  if (compiled.errors.length) {
    compiled.errors.forEach(function (msg) {
      console.error('\n' + msg + '\n')
    })
    throw new Error('Vue template compilation failed')
  } else {
    return {
      render: toFunction(compiled.render),
      staticRenderFns: '[' + compiled.staticRenderFns.map(toFunction).join(',') + ']'
    }
  }
}

function toFunction(code) {
  return transpile('function render () {' + code + '}')
}

module.exports = function () {
  return through.obj(function (file, encoding, callback) {
    // ignore empty files
    if (file.isNull()) {
      callback();
      return;
    }

    // we don't do streams (yet)
    if (file.isStream()) {
      this.emit('error', new Error('gulp-plugin-vue: Streaming not supported'));
      callback();
      return;
    }
    let contents = file.contents.toString();

    let codes = [];
    /**
     * SFCDescriptor
     * 
     * @example
     * {
     *   template: {
     *     type: 'template',
     *     content: '',
     *     start: 0,
     *     attrs: {},
     *     end: 10
     *   },
     *   script: {
     *     type: 'script',
     *     content: '',
     *     start: 10,
     *     attrs: {},
     *     end: 20
     *   },
     *   styles: [
     *     {
     *       type: 'style',
     *       content: '',
     *       start: 468,
     *       attrs: [Object],
     *       lang: 'scss',
     *       end: 908
     *     }
     *   ],
     *   customBlocks: [],
     *   errors: []
     * }
     */
    let descriptor = compiler.parseComponent(contents);

    // 处理脚本
    if (descriptor.script) {
      codes.push(descriptor.script.content);
    } else {
      codes.push('module.exports = {}');
    }

    codes.push('var __vue__options__;');
    codes.push('if(exports && exports.__esModule && exports.default){');
    codes.push('  __vue__options__ = exports.default;');
    codes.push('}else{');
    codes.push('  __vue__options__ = module.exports;');
    codes.push('}');

    // 编译模板
    if (descriptor.template) {
      /**
       * Compiles a template string and returns compiled JavaScript code. 
       * The returned result is an object of the following format:
       * {
       *   ast: ?ASTElement, // parsed template elements to AST
       *   render: string, // main render function code
       *   staticRenderFns: Array<string>, // render code for static sub trees, if any
       *   errors: Array<string> // template syntax errors, if any
       *   tips: Array<string>
       * }
       */
      let templated = compileTemplate(descriptor.template.content);
      //console.log(template);

      if (templated) {
        codes.push('__vue__options__.render = ' + templated.render + ';');
        codes.push('__vue__options__.staticRenderFns = ' + templated.staticRenderFns + ';');
      }
    }

    // 处理样式
    let styles = {};
    descriptor.styles.forEach(item => {
      if (!item.content) {
        return;
      }

      // empty string, or all space line
      if (/^\s*$/.test(item.content)) {
        return;
      }

      let style = styles[item.lang || 'css'];

      if (!style) {
        style = styles[item.lang || 'css'] = [];
      }

      style.push(item.content);
    });

    for (let lang in styles) {
      let style = styles[lang];
      if (style.length) {

        let styleFile = file.clone();
        styleFile.contents = Buffer.from(style.join('\n'));
        styleFile.extname = '.' + lang;

        this.push(styleFile);
      }
    }

    file.contents = Buffer.from(codes.join('\n'));
    file.extname = '.js';

    callback(null, file);
  }, callback => {
    // 
    callback();
  });
}
