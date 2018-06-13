import Vue from 'vue'
import Vuex from 'vuex'
import * as TYPES from '~/store/mutation-types';
import { isDesktop } from '../lib/utile';
import { last } from 'lodash';

import * as topic from './topic';

Vue.use(Vuex)

const store = () => new Vuex.Store({

  state: {
    drawerOpened: false,
    isLoginModalOpen: false,
    backRoutes: []
  },
  actions: {
    back({ commit, state }) {
      if (!state.backRoute.length) {
        return;
      }
      this.app.router.push(last(state.backRoute));
      commit(TYPES.POP_BACK_ROUTE);
    }
  },
  getters: {
    isDrawerOpened({ drawerOpened }) {
      return isDesktop() || drawerOpened;
    },
    isLoginModalOpen({ isLoginModalOpen }) {
      return isLoginModalOpen;
    }
  },
  mutations: {
    [TYPES.TOGGLE_DRAWER](state, opened) {
      state.drawerOpened = opened;
    },
    [TYPES.PUSH_BACK_ROUTE](state, backRoute) {
      state.backRoutes.push(backRoute);
    },
    [TYPES.POP_BACK_ROUTE](state) {
      state.backRoutes.pop();
    },
    [TYPES.SET_LOGIN_MODAL_STATUS](state, isLoginModalOpen) {
      state.isLoginModalOpen = isLoginModalOpen;
    }
  },
  modules: {
    topic
  }
})

export default store