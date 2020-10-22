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

Vue.component('LayoutViewHeader', LayoutViewHeader);
Vue.component('Pagination', Pagination);
Vue.component('Sticky', Sticky);
Vue.component('MonacoEditor', MonacoEditor);
