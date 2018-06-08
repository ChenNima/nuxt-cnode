import axios from 'axios';
import { topicGetter } from '~/lib/utile';
import { uniqBy } from 'lodash';
import API from '~/lib/api';
import * as siv from './siv';
import * as TYPES from '~/store/mutation-types';

export const state = {
  topics: [],
  page: 1,
  tab: 'all',
  scrollTop: 0
}

export const actions = {
  async fetchTopics({ commit, state }, {page, tab}) {
    if (!page) {
      return;
    }
    tab = tab || state.tab || 'all';
    const res = await axios.get(API.topics, {
      params: {
        page,
        tab
      }
    });
    if (page === 1) {
      commit(TYPES.FETCH_TOPICS_DONE, res.data.data)
    } else {
      commit(TYPES.FETCH_MORE_TOPICS_DONE, {
        topics: res.data.data,
        page
      });
    }
  }
}

export const getters = {
  topics: state => state.topics.map(topicGetter)
}

export const mutations = {
  [TYPES.FETCH_TOPICS_DONE](state, topics) {
    state.topics = topics;
    state.page = 1;
  },
  [TYPES.FETCH_MORE_TOPICS_DONE](state, { topics, page }) {
    state.topics = uniqBy(state.topics.concat(topics), 'id');
    state.page = page;
  },
  [TYPES.SET_TOPIC_TAB](state, tab) {
    state.tab = tab;
  },
  [TYPES.SET_SCROLL_TOP](state, scrollTop) {
    state.scrollTop = scrollTop;
  },
}

export const modules = {
  siv
};

export const namespaced = true;