/**
 * .postcssrc.js | postcss.config.js
 * 
 * @example
 * module.exports = {
 *   plugins: {
 *     autoprefixer: {},
 *   },
 * };
 * 
 * @see https://github.com/postcss/postcss-load-config
 * sobird<i@sobird.me> at 2020/09/27 21:23:32 created.
 */

module.exports = ctx => ({
  map: ctx.env === 'development' ? ctx.map : false,
  plugins: {
    'autoprefixer': {}
  }
})
