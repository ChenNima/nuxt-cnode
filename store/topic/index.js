import axios from 'axios';
import moment from 'moment';
import { compactInteger } from 'humanize-plus';
import { uniqBy } from 'lodash';
import API from '~/lib/api';
import * as TYPES from '~/store/mutation-types';

export const state = {
  topics: [],
  page: 1,
  tab: 'all'
}

export const actions = {
  async fetchTopics({ commit, state }, page) {
    if (!page) {
      return;
    }
    const res = await axios.get(API.topics, {
      params: {
        page,
        tab: state.tab
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
  topics: state => state.topics.map((topic) => {
    return {
      ...topic,
      readableTime: moment(topic.last_reply_at).fromNow(),
      reply_count: compactInteger(topic.reply_count),
      visit_count: compactInteger(topic.visit_count)
    }
  })
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
  }
}

export const namespaced = true;