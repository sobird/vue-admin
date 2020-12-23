import { createRouter, createWebHashHistory} from 'vue-router';

import EntryWithAside from '@/components/Layout/EntryWithAside';
import NavMenuRouter from './NavMenuRouter';

const router = createRouter({
  routes: [
    {
      path: '/',
      name: 'home',
      component: EntryWithAside,
      children: [
        {
          path: '',
          component: () => import('@/views/Home.vue'),
        },
      ],
    },
    ...NavMenuRouter,

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
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { x: 0, y: 0 };
    }
  },
});

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
