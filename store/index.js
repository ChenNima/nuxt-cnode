import Vue from 'vue'
import Vuex from 'vuex'
import * as TYPES from '~/store/mutation-types';
import API from '~/lib/api';
import { isDesktop } from '../lib/utile';
import { last, get } from 'lodash';
import { saveAccessToke } from '../lib/session-utils'; 
import axios from 'axios';

import * as topic from './topic';

Vue.use(Vuex)

const store = () => new Vuex.Store({

  state: {
    drawerOpened: false,
    isLoginModalOpen: false,
    backRoutes: [],
    currentUser: null,
    accesstoken: null,
    isToastOpen: false,
    toastMessage: null
  },
  actions: {
    async nuxtServerInit({ dispatch }, { req: { accesstoken } }) {
      if (accesstoken) {
        await dispatch('login', accesstoken)
      }
    },
    back({ commit, state }) {
      if (!state.backRoute.length) {
        return;
      }
      this.app.router.push(last(state.backRoute));
      commit(TYPES.POP_BACK_ROUTE);
    },
    async login({ commit, dispatch }, accesstoken) {
      if (!accesstoken) {
       return; 
      }
      try {
        const res = await axios.post(API.login, {
          accesstoken
        });
        saveAccessToke(accesstoken);
        commit(TYPES.SET_CURRENT_USER, res.data);
        commit(TYPES.SET_ACCESS_TOKEN, accesstoken);
      } catch (error) {
        const message = get(error, 'response.data.error_msg') || error.message;
        dispatch('showToast', message);
      }
    },
    showToast({ commit }, message) {
      if (!message) {
        return;
      }
      commit(TYPES.SET_TOAST_STATUS, true);
      commit(TYPES.SET_TOAST_MESSAGE, message);
    }
  },
  getters: {
    isDrawerOpened({ drawerOpened }) {
      return isDesktop() || drawerOpened;
    },
    isLoginModalOpen({ isLoginModalOpen }) {
      return isLoginModalOpen;
    },
    isLoggedIn: ({ currentUser }) => !! currentUser
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
    },
    [TYPES.SET_CURRENT_USER](state, currentUser) {
      state.currentUser = currentUser;
    },
    [TYPES.SET_ACCESS_TOKEN](state, accesstoken) {
      state.accesstoken = accesstoken;
    },
    [TYPES.SET_TOAST_STATUS](state, isToastOpen) {
      state.isToastOpen = isToastOpen;
    },
    [TYPES.SET_TOAST_MESSAGE](state, toastMessage) {
      state.toastMessage = toastMessage;
    }
  },
  modules: {
    topic
  }
})

export default store