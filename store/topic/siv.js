import axios from 'axios';
import { topicGetter, replayGetter } from '~/lib/utile';
import API from '~/lib/api';
import * as TYPES from '~/store/mutation-types';

export const state = {
  topic: {},
  author: {},
  replies: [],
}

export const actions = {
  async fetchTopic({commit, rootState}, id) {
    if (!id) {
      return;
    }
    const { accesstoken } = rootState;
    const res = await axios.get(API.topic({id}), {
      params: {  accesstoken }
    });
    commit(TYPES.FETCH_TOPIC_DONE, res.data.data)
  }
}

export const getters = {
  topic: state => topicGetter(state.topic),
  replies: state => state.replies.map(replayGetter)
}

export const mutations = {
  [TYPES.FETCH_TOPIC_DONE](state, topic) {
    state.topic = topic;
    state.author = topic.author;
    state.replies = topic.replies;
  }
}

export const namespaced = true;