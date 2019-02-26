/**
 * Vuex Store Setting
 * 
 * @author  Yang,junlong at 2019-02-26 16:51:57 build.
 * @version $Id$
 */

import Vue from 'vue';
import Vuex from 'vuex';
import Cookies from 'js-cookie';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    viewkey: + new Date,
    sidebar: {
      collapse: Cookies.get('sidebarStatus') == 1 ? true : false,
    },
    userinfo: {},
  },
  mutations: {
    REFRESH_VIEW(state) {
      state.viewkey = + new Date;
    },
    TOGGLE_SIDEBAR_COLLAPSE: state => {
      if (state.sidebar.collapse) {
        Cookies.set('sidebarStatus', 0)
      } else {
        Cookies.set('sidebarStatus', 1)
      }
      state.sidebar.collapse = !state.sidebar.collapse;

      // 主动触发window.resize事件
      setTimeout(() => {
        window.dispatchEvent(new Event('resize'));
      }, 300)
    },
    SET_USERINFO: (state, payload) => {
      state.userinfo = payload;
    }
  },
  actions: {
    refreshView({ commit }) {
      commit('REFRESH_VIEW');
    },
    toggleSideBarCollapse({ commit }) {
      commit('TOGGLE_SIDEBAR_COLLAPSE')
    },
    setUserInfo({ commit }, payload) {
      commit('SET_USERINFO', payload)
    }
  },
  getters: {
    sidebar: state => state.sidebar,
    userinfo: state => state.userinfo
  }
});
