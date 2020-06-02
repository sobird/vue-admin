/**
 * 导航菜单路由
 *
 * sobird<i@sobird.me> at 2020/06/01 16:30:54 created.
 */

import LayoutWithSidebar from "@/components/LayoutWithSidebar";

export default [
  // 表单路由
  {
    path: "/form",
    name: "form",
    component: LayoutWithSidebar,
    redirect: { name: "basicForm" },
    meta: {
      title: "表单页",
      icon: "form"
    },
    children: [
      {
        path: "",
        name: "basicForm",
        component: () => import("@/views/form/basic.vue"),
        meta: {
          title: "基础表单",
          icon: "form"
        }
      },
      {
        path: "step",
        name: "stepsForm",
        component: () => import("@/views/form/step.vue"),
        meta: {
          title: "分步表单",
          icon: "form"
        }
      },
      {
        path: "advanced",
        name: "advancedForm",
        component: () => import("@/views/form/advanced.vue"),
        meta: {
          title: "高级表单",
          icon: "form"
        }
      },
      {
        path: "complex",
        name: "complexForm",
        component: () => import("@/views/form/complex.vue"),
        meta: {
          title: "复杂表单",
          icon: "form"
        }
      }
    ]
  },

  // 组件路由
  {
    path: "/component",
    name: "component",
    component: LayoutWithSidebar,
    redirect: { name: "cascaderComponent" },
    meta: {
      title: "组件",
      icon: "component"
    },
    children: [
      {
        path: "cascader",
        name: "cascaderComponent",
        component: () => import("@/views/component/Cascader"),
        meta: {
          title: "省市级联选择",
          icon: "component"
        }
      }
    ]
  },

  // 我的项目
  {
    path: "/project",
    name: "project",
    component: LayoutWithSidebar,
    children: [
      {
        path: "",
        component: () => import("@/views/project/list.vue"),
        meta: {
          title: "我的项目",
          icon: "fa fa-product-hunt"
        }
      }
    ]
  }
];
