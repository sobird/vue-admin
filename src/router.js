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
      redirect: { name: 'basicForm' },
      meta: {
        title: '表单页',
        icon: 'form'
      },
      children: [
        {
          path: '',
          name: 'basicForm',
          component: () => import('@/views/form/basic.vue'),
          meta: {
            title: '基础表单',
            icon: 'form'
          }
        },
        {
          path: 'step',
          name: 'stepsForm',
          component: () => import('@/views/form/step.vue'),
          meta: {
            title: '分步表单',
            icon: 'form'
          }
        },
        {
          path: 'advanced',
          name: 'advancedForm',
          component: () => import('@/views/form/advanced.vue'),
          meta: {
            title: '高级表单',
            icon: 'form'
          }
        }
      ]
    },

    {
      path: '/component',
      name: 'component',
      component: LayoutWithSidebar,
      redirect: { name: 'cascaderComponent' },
      meta: {
        title: '组件',
        icon: 'component'
      },
      children: [
        {
          path: 'cascader',
          name: 'cascaderComponent',
          component: () => import('@/views/component/cascader.vue'),
          meta: {
            title: '级联选择器',
            icon: 'component'
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
