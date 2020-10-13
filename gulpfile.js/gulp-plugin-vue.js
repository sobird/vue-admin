/**
 * gulp-plugin-vue 插件
 * 
 * sobird<i@sobird.me> at 2020/10/05 11:46:18 created.
 */

const through = require('through2');
const compiler = require('vue-template-compiler');
const transpile = require('vue-template-es2015-compiler');
const crypto = require('crypto');

const postcss = require('postcss');
const selectorParser = require('postcss-selector-parser');
const stripInlineComments = require('postcss-strip-inline-comments');
const postscss = require('postcss-scss');

const postcssVueScopeId = postcss.plugin('postcssVueScopeId', function (scopeId) {
  // 传入配置相关的代码
  return function (root, result) {
    root.walkComments(function (i) {
      if (i.raws.inline) i.remove();
    });

    root.each(function rewriteSelector(node) {
      if (!node.selector) {
        // handle media queries
        if (node.type === 'atrule' && node.name === 'media') {
          //console.log(node);
          node.each(rewriteSelector)
        }
        return
      }

      node.selector = selectorParser(function (selectors) {
        selectors.each(function (selector) {
          var node = null
          selector.each(function (n) {
            

            if (n.type !== 'pseudo') {
              node = n;
            }
          })
          selector.insertAfter(node, selectorParser.attribute({
            attribute: scopeId
          }))
        })
      }).processSync(node);
    })
  };
});

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

module.exports = function (options) {
  options = Object.assign({
    runtime: true
  }, options);
  return through.obj(async function (file, encoding, callback) {
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
      codes.push('module.exports = {};');
    }

    codes.push('var __vue__options__;');
    codes.push('if (exports && exports.__esModule && exports.default) {');
    codes.push('  __vue__options__ = exports.default;');
    codes.push('} else {');
    codes.push('  __vue__options__ = module.exports;');
    codes.push('}');

    // 编译模板
    if (descriptor.template) {
      if (options.runtime) {
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

        if (templated) {
          codes.push('__vue__options__.render = ' + templated.render + ';');
          codes.push('__vue__options__.staticRenderFns = ' + templated.staticRenderFns + ';');
        }
      } else {
        codes.push('__vue__options__.template = ' + JSON.stringify(descriptor.template.content) + ';');
      }
    }

    // 处理样式
    let styles = {};
    let scopeId = '';
    let scoped = descriptor.styles.some(style => {
      return style.scoped
    });

    if (scoped) {
      let hash = crypto.createHmac('sha256', '');
      scopeId = '_v-' + hash.update(contents).digest('hex').substring(0, 8);
      codes.push('__vue__options__._scopeId = ' + JSON.stringify(scopeId) + ';');
    }

    // async/await
    for (let style of descriptor.styles) {
      if (style.content && !/^\s*$/.test(style.content)) {
        let css = styles[style.lang || 'css'];
        if (!css) {
          css = styles[style.lang || 'css'] = [];
        }
        if (style.scoped) {
          let styleRes = await postcss([postcssVueScopeId(scopeId)]).process(style.content, { from: undefined, parser: postscss });
          style.content = styleRes.css;
        }

        css.push(style.content);
      }
    }

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
