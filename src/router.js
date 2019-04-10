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
      path: '/form',
      name: 'form',
      component: LayoutWithSidebar,
      meta: {
        title: '表单页',
        icon: 'fa fa-wpforms'
      },
      children: [
        {
          path: '',
          component: () => import('@/views/form/basic.vue'),
          meta: {
            title: '基础表单',
            icon: 'fa fa-wpforms'
          }
        },
        {
          path: 'step',
          component: () => import('@/views/form/step.vue'),
          meta: {
            title: '分步表单',
            icon: 'fa fa-wpforms'
          }
        },
        {
          path: 'advanced',
          component: () => import('@/views/form/advanced.vue'),
          meta: {
            title: '高级表单',
            icon: 'fa fa-wpforms'
          }
        }
      ]
    },

    {
      path: '/component',
      name: 'component',
      component: LayoutWithSidebar,
      meta: {
        title: '表单页',
        icon: 'fa fa-wpforms'
      },
      children: [
        {
          path: 'cascader',
          component: () => import('@/views/component/cascader.vue'),
          meta: {
            title: '级联选择器',
            icon: 'fa fa-chevron-circle-down'
          }
        },
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

  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
});
