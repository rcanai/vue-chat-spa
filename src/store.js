/* eslint no-param-reassign: 1 */
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userName: '',
    participants: [],
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
    participantsCount(state) {
      return state.participants.length;
    },
    messages(state) {
      return state.messages;
    },
    typings(state) {
      return state.typings;
    },
  },
  mutations: {
    addMessage(state, data) {
      state.messages.push(data);
    },
    addTyping(state, { id, userName }) {
      const index = state.typings.findIndex(item =>
        item.userName === userName);
      if (index !== -1) {
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
    clear(state) {
      state.userName = '';
      state.participants = [];
      state.messages = [];
      state.typings = [];
    },
  },
  actions: {
    // pass
  },
});
