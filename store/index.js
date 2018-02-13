import Vue from 'vue'
import Vuex from 'vuex'

import * as topic from './topic';

Vue.use(Vuex)

const store = () => new Vuex.Store({

  state: {
    counter: 0
  },
  mutations: {
    increment (state) {
      state.counter++
    }
  },
  modules: {
    topic
  }
})

export default store