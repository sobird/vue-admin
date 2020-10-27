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
        path: "api",
        name: "apiForm",
        component: () => import("@/views/form/api.vue"),
        meta: {
          title: "接口配置表单",
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

  // 组件
  {
    path: "/components",
    name: "components",
    component: EntryWithAside,
    redirect: { name: "draggable" },
    meta: {
      title: "组件",
      icon: "component"
    },
    children: [
      {
        path: "draggable",
        name: "draggable",
        component: () => import("@/views/components/draggable"),
        children: [
          {
            path: "simple",
            name: "simpleDraggable",
            component: () => import("@/views/components/draggable/simple"),
            meta: {
              title: "拖拽演示",
              icon: "draggable"
            }
          },
          {
            path: "two-lists",
            name: "twoListsDraggable",
            component: () => import("@/views/components/draggable/two-lists"),
            meta: {
              title: "拖拽演示",
              icon: "draggable"
            }
          },
          {
            path: "clone",
            name: "cloneDraggable",
            component: () => import("@/views/components/draggable/clone"),
            meta: {
              title: "拖拽演示",
              icon: "draggable"
            }
          },
          {
            path: "custom-clone",
            name: "customCloneDraggable",
            component: () => import("@/views/components/draggable/custom-clone"),
            meta: {
              title: "拖拽演示",
              icon: "draggable"
            }
          },
          {
            path: "clone-on-control",
            name: "cloneOnControlDraggable",
            component: () => import("@/views/components/draggable/clone-on-control"),
            meta: {
              title: "拖拽演示",
              icon: "draggable"
            }
          },
          {
            path: "handle",
            name: "handleDraggable",
            component: () => import("@/views/components/draggable/handle"),
            meta: {
              title: "拖拽演示",
              icon: "draggable"
            }
          },
          {
            path: "transition",
            name: "transitionDraggable",
            component: () => import("@/views/components/draggable/transition"),
            meta: {
              title: "拖拽演示",
              icon: "draggable"
            }
          }
        ]
      }
    ]
  },

  // 组件路由
  {
    path: "/designer",
    name: "component",
    component: EntryWithAside,
    redirect: { name: "crudDesigner" },
    meta: {
      title: "设计器",
      icon: "designer"
    },
    children: [
      {
        path: "crud",
        name: "crudDesigner",
        component: () => import("@/views/designer/crud"),
        meta: {
          title: "crud表格",
          icon: "designer"
        }
      }
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
