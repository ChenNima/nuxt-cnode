import { forEach } from 'lodash';

const prefix = 'https://cnodejs.org/api/v1/';
const api = {
  topics: 'topics',
  topic: ({id}) => `topic/${id}`
};

forEach(api, (v, k) => {
  if (v instanceof Function) {
    api[k] = (...args) => {
      return prefix + v(...args);
    }
  } else {
    api[k] = prefix + v;
  }
})

export default api;