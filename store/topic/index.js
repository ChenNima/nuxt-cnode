import axios from 'axios';
import moment from 'moment';
import { compactInteger } from 'humanize-plus';
import API from '~/lib/api';
import * as TYPES from '~/store/mutation-types';

export const state = {
  topics: [],
  page: 1
}

export const actions = {
  async fetchTopics({ commit }, page) {
    if (!page) {
      return;
    }
    const res = await axios.get(API.topics);
    commit(TYPES.FETCH_TOPICS_DONE, res.data.data)
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
  }
}

export const namespaced = true;