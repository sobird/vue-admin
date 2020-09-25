import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

import EntryWithAside from "@/components/Layout/EntryWithAside";
import NavMenuRouter from "./NavMenuRouter";

const router = new Router({
  test: [],
  routes: [
    {
      path: "/",
      name: "home",
      component: EntryWithAside,
      children: [
        {
          path: "",
          component: () => import("@/views/Home.vue")
        }
      ]
    },
    ...NavMenuRouter
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { x: 0, y: 0 };
    }
  }
});

router.beforeEach((to, from, next) => {
  next();
});

console.log(router);

export default router;
