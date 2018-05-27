import Vue from 'vue'
import Vuex from 'vuex'
import * as TYPES from '~/store/mutation-types';
import { isLarge } from '../lib/utile';

import * as topic from './topic';

Vue.use(Vuex)

const store = () => new Vuex.Store({

  state: {
    drawerOpened: false,
  },
  getters: {
    isDrawerOpened({ drawerOpened }) {
      return isLarge() || drawerOpened;
    }
  },
  mutations: {
    [TYPES.TOGGLE_DRAWER](state, opened) {
      state.drawerOpened = opened;
    }
  },
  modules: {
    topic
  }
})

export default store