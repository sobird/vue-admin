/**
 * 导航菜单路由
 *
 * sobird<i@sobird.me> at 2020/06/01 16:30:54 created.
 */

import EntryWithAside from "@/components/Layout/EntryWithAside";

export default [
  // 应用管理
  {
    path: "/application",
    name: "application",
    component: EntryWithAside,
    redirect: { name: "basicForm" },
    meta: {
      title: "应用管理",
      icon: "application"
    },
    children: [
      {
        path: "my",
        name: "myApp",
        component: () => import("@/views/application/my.vue"),
        meta: {
          title: "我的应用",
          icon: "application"
        }
      },
      {
        path: "apply",
        name: "applyApp",
        component: () => import("@/views/application/apply.vue"),
        meta: {
          title: "申请新应用",
          icon: "application"
        }
      },
      {
        path: "amend",
        name: "amendApp",
        component: () => import("@/views/application/amend.vue"),
        meta: {
          title: "修改应用",
          icon: "application"
        }
      }
    ]
  },

  // 页面管理
  {
    path: "/page",
    name: "page",
    component: EntryWithAside,
    redirect: { name: "myPage" },
    meta: {
      title: "页面管理",
      icon: "page"
    },
    children: [
      {
        path: "my",
        name: "myPage",
        component: () => import("@/views/page/my.vue"),
        meta: {
          title: "我的页面",
          icon: "page"
        }
      },
      {
        path: "create",
        name: "createPage",
        component: () => import("@/views/page/create.vue"),
        meta: {
          title: "新建页面",
          icon: "page"
        }
      },
      {
        path: "update",
        name: "updatePage",
        component: () => import("@/views/page/update.vue"),
        meta: {
          title: "更新页面",
          icon: "page"
        }
      }
    ]
  },

  // 表单路由
  {
    path: "/form",
    name: "form",
    component: EntryWithAside,
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
        path: "schema",
        name: "schemaForm",
        component: () => import("@/views/form/schema.vue"),
        meta: {
          title: "Schema表单",
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
    component: EntryWithAside,
    redirect: { name: "cascaderComponent" },
    meta: {
      title: "组件",
      icon: "component"
    },
    children: [
      // {
      //   path: "cascader",
      //   name: "cascaderComponent",
      //   component: () => import("@/views/component/Cascader"),
      //   meta: {
      //     title: "省市级联选择",
      //     icon: "component"
      //   }
      // }
    ]
  },

  // 我的项目
  {
    path: "/project",
    name: "project",
    component: EntryWithAside,
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
