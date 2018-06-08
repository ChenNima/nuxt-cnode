import axios from 'axios';
import { topicGetter } from '~/lib/utile';
import API from '~/lib/api';
import * as TYPES from '~/store/mutation-types';

export const state = {
  topic: {},
  author: {},
  replies: [],
}

export const actions = {
  async fetchTopic({commit}, id) {
    if (!id) {
      return;
    }
    const res = await axios.get(API.topic({id}));
    commit(TYPES.FETCH_TOPIC_DONE, res.data.data)
  }
}

export const getters = {
  topic: state => topicGetter(state.topic)
}

export const mutations = {
  [TYPES.FETCH_TOPIC_DONE](state, topic) {
    state.topic = topic;
    state.author = topic.author;
    state.replies = topic.replies;
  }
}

export const namespaced = true;