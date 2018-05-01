/* eslint no-param-reassign: 1 */
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userName: '',
    participants: 0,
    messages: [],
    typings: [],
  },
  getters: {
    userName(state) {
      return state.userName;
    },
    participants(state) {
      return state.participants;
    },
    messages(state) {
      return state.messages;
    },
    typings(state) {
      return state.typings;
    },
  },
  mutations: {
    addMessage(state, { id, userName, title }) {
      state.messages.push({
        id,
        userName,
        title,
      });
    },
    addTyping(state, { id, userName }) {
      const items = state.typings.find(item =>
        item.userName === userName);
      if (items) {
        return;
      }
      state.typings.push({
        id,
        userName,
      });
    },
    removeTyping(state, userName) {
      const index = state.typings.findIndex(item =>
        item.userName === userName);
      state.typings.splice(index, 1);
    },
  },
  actions: {
    // pass
  },
});
