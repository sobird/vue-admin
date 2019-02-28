import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';

Vue.use(Router);

import LayoutWithSidebar from '@/components/LayoutWithSidebar';

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: LayoutWithSidebar,
      children: [
        {
          path: '',
          component: () => import('@/views/Home.vue'),
        }
      ]
    },
    {
      path: '/project',
      name: 'project',
      component: LayoutWithSidebar,
      children: [
        {
          path: '',
          component: () => import('@/views/project/list.vue'),
          meta: {
            title: '我的项目',
            icon: 'fa fa-product-hunt'
          }
        }
      ]
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue'),
    },
  ],
});
