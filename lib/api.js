import { forEach } from 'lodash';

const prefix = 'https://cnodejs.org/api/v1/';
const api = {
  topics: 'topics'
};

const exportApi = {};

forEach(api, (v, k) => {
  exportApi[k] = prefix + v;
})

export default exportApi;