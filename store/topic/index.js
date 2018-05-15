import axios from 'axios';
import moment from 'moment';
import { compactInteger } from 'humanize-plus';
import { uniqBy } from 'lodash';
import API from '~/lib/api';
import * as TYPES from '~/store/mutation-types';

export const state = {
  topics: [],
  topic: {},
  page: 1,
  tab: 'all'
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
  },
  async fetchTopic({commit}, id) {
    if (!id) {
      return;
    }
    const res = await axios.get(API.topic({id}));
    commit(TYPES.FETCH_TOPIC_DONE, res.data.data)
  }
}

export const getters = {
  topics: state => state.topics.map((topic) => {
    return {
      ...topic,
      readableTime: moment(topic.last_reply_at).fromNow(),
      reply_count: compactInteger(topic.reply_count),
      visit_count: compactInteger(topic.visit_count)
    }
  }),
  getTopic: (state, getters) => id => getters.topics.find(topic => topic.id === id) || {}
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
  [TYPES.FETCH_TOPIC_DONE](state, topic) {
    const index = state.topics.findIndex(existTopic => existTopic.id === topic.id);
    if (index !== undefined) {
      state.topics.splice(index, 1, topic);
    } else {
      state.topics.push(topic);
    }
  }
}

export const namespaced = true;