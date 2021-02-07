/**
 * @see https://next.router.vuejs.org/guide/migration/index.html
 * 
 * sobird<i@sobird.me> at 2020/11/18 11:33:00 created.
 */

import { createRouter, createWebHashHistory} from 'vue-router';

// 带有侧边栏导航的入口组件
import EntryWithAside from '@/components/Layout/EntryWithAside';
import NavMenuRouter from './NavMenuRouter';

const router = createRouter({
  routes: [
    // default root route
    {
      path: '/',
      name: 'Layout',
      component: EntryWithAside,
      children: NavMenuRouter,
      meta: {
        title: '首页'
      }
    },

    // CURD表格设计
  {
    path: '/design/curd',
    name: 'design-curd',
    component: () => import('@/views/designer/curdDesign'),
    meta: {
      title: 'CURD表格设计',
      icon: 'design',
    }
  },

    // 404错误页
    {
      path: '/:catchAll(.*)',
      meta: {
        //title: 'Not Found'
      },
      component: EntryWithAside,
      children: [
        {
          path: '',
          name: 'NotFound',
          component: () => import('@/views/404.vue'),
          meta: {
            title: '页面未找到',
          },
        },
      ],
    },
  ],
  history: createWebHashHistory(),
  /**
   * 滚动行为
   * 
   * @param {Route} to 
   * @param {Route} from 
   * @param {Object} savedPosition 
   */
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { x: 0, y: 0 };
    }
  },
});

/**
 * 全局前置守卫
 * 当一个导航触发时，全局前置守卫按照创建顺序调用。守卫是异步解析执行，此时导航在所有守卫 resolve 完之前一直处于 等待中
 * 
 * @params {Route} to 即将要进入的目标 路由对象
 * @params {Route} from 当前导航正要离开的路由
 * @params {Function} next 一定要调用该方法来 resolve 这个钩子。执行效果依赖 next 方法的调用参数。
 */
router.beforeEach((to, from, next) => {
  next();
});

// const originalPush = Router.prototype.push;
// Router.prototype.push = function push(location) {
//   return originalPush.call(this, location).catch(err => err);
// };

// 方便操作router query
// Vue.prototype.$query = function(query) {
//   this.$router.push({ query: Object.assign({}, this.$route.query, query) });
//   return this.$route.query;
// };

export default router;
