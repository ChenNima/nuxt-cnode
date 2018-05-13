import { forEach } from 'lodash';

const prefix = 'https://cnodejs.org/api/v1/';
const api = {
  topics: 'topics'
};

forEach(api, (v, k) => {
  api[k] = prefix + v;
})

export default api;