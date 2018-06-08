

import moment from 'moment';
import { compactInteger } from 'humanize-plus';

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
    reply_count: compactInteger(topic.reply_count),
    visit_count: compactInteger(topic.visit_count)
  };
}