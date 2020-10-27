/**
 * nested-store.js
 * 
 * sobird<i@sobird.me> at 2020/10/27 15:19:43 created.
 */


export default {
  namespaced: true,
  state: {
    elements: [
      {
        id: 1,
        name: 'Shrek',
        elements: [],
      },
      {
        id: 2,
        name: 'Fiona',
        elements: [
          {
            id: 4,
            name: 'Lord Farquad',
            elements: [],
          },
          {
            id: 5,
            name: 'Prince Charming',
            elements: [],
          },
        ],
      },
      {
        id: 3,
        name: 'Donkey',
        elements: [],
      },
    ],
  },
  mutations: {
    updateElements: (state, payload) => {
      state.elements = payload;
    },
  },
  actions: {
    updateElements: ({ commit }, payload) => {
      commit('updateElements', payload);
    },
  },
};
