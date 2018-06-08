

import moment from 'moment';
import { compactInteger } from 'humanize-plus';
import navItem from '~/assets/json/nav-list.json';
import { get } from 'lodash';

export function isDesktop() {
  return process.client && window.outerWidth > 960
}

export function isMedium() {
  return  process.client && window.outerWidth <= 1264 && window.outerWidth > 960;
}

export function isPhone() {
  return process.client && window.outerWidth <= 960
}

export function topicGetter(topic) {
  return {
    ...topic,
    readableTime: moment(topic.last_reply_at).fromNow(),
    readableCreateTime: moment(topic.create_at).fromNow(),
    reply_count: compactInteger(topic.reply_count),
    visit_count: compactInteger(topic.visit_count)
  };
}

export function getNavName(tab) {
  return get(navItem.find(nav => nav.tab === tab), 'name');
}