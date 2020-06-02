/**
 * Vuex Store Setting
 *
 * @example 简单的Store
 * import Vue from 'vue'
 * import Vuex from 'vuex'
 *
 * const store = new Vuex.Store({
 *   state: {
 *     count: 0
 *   },
 *   mutations: {
 *     increment (state) {
 *       state.count++
 *     }
 *   },
 *   actions: {},
 *   getters: {}
 * })
 *
 * @example 复杂的Store项目结构
 * ── store
 *    ├── index.js          # 我们组装模块并导出 store 的地方
 *    ├── actions.js        # 根级别的 action
 *    ├── mutations.js      # 根级别的 mutation
 *    └── modules
 *        ├── cart.js       # 购物车模块
 *        └── products.js   # 产品模块
 *
 * @see https://vuex.vuejs.org/zh/guide/
 * @author  Yang,junlong at 2019-02-26 16:51:57 build.
 * @version $Id$
 */

import Vue from "vue";
import Vuex from "vuex";
import * as types from "./mutation-types";
import VueCookie from "@/utils/cookie";

Vue.use(Vuex);

// 组件中载入$cookie
Vue.use(VueCookie);

const store = new Vuex.Store({
  /**
   * State
   *
   * 组件通过计算属性来读取此处的状态
   * 在组件中使用 mapState 来自动生成计算属性
   * @example
   * {
   *   ...
   *   computed: {
   *     ...mapState({})
   *   }
   * }
   */
  state: {
    viewkey: +new Date(),
    sidebar: {
      collapse: VueCookie.get("sidebarStatus") == 1 ? true : false
    },
    userinfo: {}
  },
  /**
   * Getter
   *
   * Getter会暴露为store.getters对象，你可以以属性的形式访问这些值
   * Getter可以返回一个函数，来实现给 getter 传参
   *
   * Getter接受state作为第一个参数
   * Getter接受其他getter作为第二个参数
   * Getter接受rootState作为第三个参数
   * Getter接受rootGetters作为第三个参数
   *
   * mapGetters 可以将store中的getter映射到局部计算属性
   */
  getters: {
    sidebar: function(state) {
      return state.sidebar;
    },
    userinfo: state => state.userinfo
  },

  /**
   * Mutation
   * 更改 Vuex 的 store 中的状态的唯一方法是提交 mutation
   * 它会接受 state 作为第一个参数
   * 通过 store.commit(MUTATION, payload) 来调用一个mutation
   * 或者：
   * store.commit({
   *   type: MUTATION,
   *   amount: 10
   * });
   *
   * // 使用常量替代 Mutation 事件类型
   * mutation 必须是同步函数
   *
   * 在组件中通过mapMutations将store中的mutation映射到组件的methods对象
   */
  mutations: {
    REFRESH_VIEW(state) {
      state.viewkey = +new Date();
    },
    [types.TOGGLE_SIDEBAR]: state => {
      if (state.sidebar.collapse) {
        VueCookie.set("sidebarStatus", 0);
      } else {
        VueCookie.set("sidebarStatus", 1);
      }
      state.sidebar.collapse = !state.sidebar.collapse;

      // 主动触发window.resize事件
      setTimeout(() => {
        window.dispatchEvent(new Event("resize"));
      }, 300);
    },
    [types.CLOSE_SIDEBAR]: state => {
      VueCookie.set("sidebarStatus", 0);
      state.sidebar.collapse = false
    },
    SET_USERINFO: (state, payload) => {
      state.userinfo = payload;
    }
  },

  /**
   * Action
   * Action提交的是mutation，不可以直接变更状态
   * Action可以包含任意异步操作
   * Action 函数接受一个与 store 实例具有相同方法和属性的 context 对象
   * {
   *   commit,
   *   dispatch,
   *   getters,
   *   rootGetters,
   *   rootState,
   *   state
   * }
   * 参数可以通过参数结构的方式来简化代码
   *
   * 通过 store.dipatch(ACTION, payload) 来分发一个action
   * 或者：
   * store.dispatch({
   *   type: ACTION,
   *   amount: 10
   * });
   *
   * 在组件中可以通过mapActions将组件的methods映射为store.dispatch调用
   */
  actions: {
    refreshView({ commit }) {
      commit(types.TOGGLE_SIDEBAR);
    },
    toggleSideBarCollapse({ commit, state }) {
      commit(types.TOGGLE_SIDEBAR);
    },
    setUserInfo({ commit }, payload) {
      commit("SET_USERINFO", payload);
    }
  },

  /**
   * Modeule
   * Vuex 允许我们将 store 分割成模块（module）。
   * 每个模块拥有自己的 state、mutation、action、getter、甚至是嵌套子模块——从上至下进行同样方式的分割
   *
   * 对于模块内部的 mutation 和 getter，接收的第一个参数是模块的局部状态对象。
   *
   * 默认情况下，模块内部的 action、mutation 和 getter 是注册在全局命名空间的——这样使得多个模块能够对同一 mutation 或 action 作出响应。
   *
   * 注：
   * 模块将会覆盖掉rootState中的同名对象
   * 默认情况下模块中声明的getters如果和rootGetters名称重复，将会报错：[vuex] duplicate getter key: xxx
   * 而，actions和mutations中的同名方法，将会合并到store相应的数组中
   *
   * 若需要在带命名空间的模块注册全局 action，你可添加 root: true，并将这个 action 的定义放在函数 handler 中
   * {
   *   actions: {
   *     someAction: {
   *      root: true,
   *      handler() {namespacedContext, payload}
   *     }
   *   }
   * }
   *
   * 动态注册模块
   * 在 store 创建之后，你可以使用 store.registerModule 方法注册模块：
   *
   */
  modules: {
    // 这是一个测试模块
    testModule: {
      //namespaced: true,
      state: {
        count: 1
      },
      getters: {
        count: state => state.count
      },
      mutations: {
        increment: state => {
          state.count++;
        }
      },
      actions: {
        increment({ commit }, payload) {
          commit("increment", payload);
        }
      },

      // 嵌套module
      modules: {}
    }
  }
});

export default store;
