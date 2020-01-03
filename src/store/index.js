import Vue from 'vue'
import Vuex from 'vuex'
import meteorite from './modules/meteorite'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    meteorite: {
      namespaced: true,
      ...meteorite
    }
  }
})
