<template>
  <div>
    <v-card class="topic-content">
      <v-breadcrumbs divider="/" class="topic-breadcrumbs">
        <v-breadcrumbs-item
          v-for="item in breadcrumbs"
          :key="item.text"
          :disabled="item.disabled"
          :to="item.to"
        >
          {{ item.text }}
        </v-breadcrumbs-item>
      </v-breadcrumbs>
      <topic-title-bar :topic="topic" :author="author" />
      <mark-down-text :content="topic.content" />
    </v-card>
    <reply-list :replies="replies" />
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapState } from 'vuex';
import TopicTitleBar from '~/components/topic/siv/TopicTitleBar';
import MarkDownText from '~/components/common/MarkDownText'
import ReplyList from '~/components/topic/siv/ReplyList'
import * as TYPES from '~/store/mutation-types';
import { getNavName } from '~/lib/utile.js';

export default {
  beforeRouteEnter (to, from, next) {
    next((vm) => {
      if (!from.name) {
        return;
      }
      vm.$store.commit(TYPES.PUSH_BACK_ROUTE, from);
    });
  },
  asyncData({store, route}) {
    return store.dispatch('topic/siv/fetchTopic', route.params.id);
  },
  components: {
    TopicTitleBar,
    MarkDownText,
    ReplyList
  },
  computed: {
    ...mapGetters('topic/siv', ['topic', 'replies']),
    ...mapState('topic/siv', ['author']),
    breadcrumbs() {
      return [
        {
          text: '首页',
          to: '/'
        },
        {
          text: getNavName(this.topic.tab),
          to: `/?tab=${this.topic.tab}`
        },
        {
          text: this.topic.title
        }
      ];
    }
  }
};
</script>

<style lang="scss" scoped>
.topic-content {
  padding: 16px;
  overflow: hidden;
}
.topic-breadcrumbs {
  padding: 0 0 10px;
  display: block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
