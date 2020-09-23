/**
 * main.js
 * 
 * @author  Yang,junlong at 2019-02-25 17:50:49 build.
 * @version $Id$
 */

import Vue from 'vue';
import 'normalize.css';

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import i18n from './lang';
import App from './App.vue';
import router from './router';
import store from './store';

Vue.config.productionTip = false;

Vue.use(ElementUI, {
  size: 'mini', // set element-ui default size
  zIndex: 3000,
  // manual set to compatible vue-i18n
  i18n: (key, value) => i18n.t(key, value)
});

// 定义一个全局指令
Vue.directive('view-title', function(el, binding) {
  document.title = binding.value || 'Vue Element Pro';
});

// 注册全局组件
import LayoutViewHeader from '@/components/LayoutViewHeader.vue';
Vue.component('LayoutViewHeader', LayoutViewHeader);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');