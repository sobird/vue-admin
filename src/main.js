/**
 * main.js
 * 
 * @author  Yang,junlong at 2019-02-25 17:50:49 build.
 * @version $Id$
 */

import { createApp } from 'vue';
import 'normalize.css';

import ElementPlus from 'element-plus';
import 'element-plus/packages/theme-chalk/src/index.scss';
import locale from "element-plus/lib/locale/lang/zh-cn";
// import '@/themes/default.scss';

// import i18n from './lang';
import router from './router';
import store from './store';
import installComponents from  '@/components';

import App from './App.vue';



// Vue.use(ElementUI, {
//   size: 'mini', // set element-ui default size
//   zIndex: 3000,
//   // manual set to compatible vue-i18n
//   i18n: (key, value) => i18n.t(key, value)
// });



const app = createApp(App);
app.config.productionTip = false;

// 定义一个全局指令
app.directive('view-title', function(el, binding) {
  document.title = binding.value || 'Vue Element Pro';
});

installComponents(app);

app.use(router);
app.use(store);
app.use(ElementPlus, { size: 'mini', locale });
app.mount('#app', false);
