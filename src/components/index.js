/**
 * 全局组件注册
 * 
 * sobird<i@sobird.me> at 2020/03/03 15:11:41 created.
 */

import Vue from 'vue';

// 注册全局组件
import LayoutViewHeader from './Layout/ViewHeader.vue';
import Pagination from './Pagination.vue';
import Sticky from './Sticky.vue';
import MonacoEditor from './MonacoEditor.vue';
import Browser from './Browser.vue';

Vue.component('LayoutViewHeader', LayoutViewHeader);
Vue.component('Pagination', Pagination);
Vue.component('Sticky', Sticky);
Vue.component('MonacoEditor', MonacoEditor);

// 内置虚拟浏览器组件，通过iframe打开第三方网站
Vue.component('Browser', Browser);

/**
 * 兼容window.open的实现
 * 
 * @see https://developer.mozilla.org/zh-CN/docs/Web/API/Window/open
 * 
 * @param {String} url 网址
 * @param {String} name 
 * @param {String} specs 
 * @param {*} replace 
 */
Vue.prototype.$open = function (url = '', name, specs, replace) {
  if(url == '') {
    return;
  }
console.log(name);
  switch (name) {
    case '_drawer':
      var urlReg = new RegExp(/(\w+):\/\//);
      if(!urlReg.exec(url)) {
        url = location.protocol + url;
      }

      this.$store.dispatch('browser', {
        url,
        name,
        visible: true
      });
      break;
    default:
      window.open(url, name, specs, replace);
  }
}
