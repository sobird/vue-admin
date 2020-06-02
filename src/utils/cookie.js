/**
 * cookie.js
 * js-cookie
 * @Usage
 * Cookies.set('name', 'value', { expires: 7 })
 *
 * @see https://github.com/js-cookie/js-cookie
 * sobird<i@sobird.me> at 2020/06/02 14:51:13 created.
 */

import Cookies from "js-cookie";

export default {
  install: function(Vue, options) {
    // 添加示例方法
    Vue.prototype.$cookie = this;
    delete this.install;
    // 添加全局方法
    Vue.cookie = this;
  },
  get: function(name) {
    return Cookies.get(name);
  },
  set: function(name, value, attributes) {
    Cookies.set(name, value, attributes);
  },
  remove: function(name, attributes) {
    Cookies.remove(name, attributes);
  },
  getJSON: function(name) {
    return Cookies.getJSON(name);
  }
};
