/* eslint no-param-reassign: "error" */
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userName: '',
  },
  getters: {
    userName(state) {
      return state.userName;
    },
  },
  mutations: {
    setUserName(state, userName) {
      state.userName = userName;
    },
  },
  actions: {

  },
});
