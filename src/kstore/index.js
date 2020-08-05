import Vuex from "./kstore";
import Vue from "vue";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    counter: 1,
  },
  mutations: {
    add(state) {
      state.counter++;
    },
  },
  actions: {
    add({ commit }) {
      setTimeout(() => {
        commit("add");
      }, 1000);
    },
  },
  getters: {
    doubleCounter(state) {
      return state.counter * 2;
    },
    threeCounter(state) {
      return state.counter * 3;
    },
  },
  modules: {},
});
