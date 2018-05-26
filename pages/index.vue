<template>
<pull-refresh-layout :isLoading="isLoading" @refresh="handleRefresh">
  <infinity-scroll-layout :isLoading="isLoadingMore" @loadMore="onLoadMore">
    <topic-list :topics="topics"/>
  </infinity-scroll-layout>
</pull-refresh-layout>
</template>

<script>
import TopicList from '~/components/topic/TopicList.vue';
import PullRefreshLayout from '~/components/common/PullRefreshLayout.vue';
import InfinityScrollLayout from '~/components/common/InfinityScrollLayout.vue';
import LoadingContainer from '~/components/common/LoadingContainer.vue';
import navItem from '~/assets/json/nav-list.json';
import { get, find } from 'lodash';
import { mapActions, mapGetters, mapState, mapMutations } from 'vuex';
import * as TYPES from '~/store/mutation-types';

function getTabName(tab) {
  return find(navItem, nav => nav.tab === tab).name;
}

export default {
  asyncData({store, route}) {
    const tab = route.query.tab || 'all';
    store.commit('topic/' + TYPES.SET_TOPIC_TAB, tab);
    store.commit(TYPES.SET_TITLE, getTabName(tab));
    return store.dispatch('topic/fetchTopics', {
        page:1,
        tab: route.query.tab
      });
  },
  data: () => ({
    isLoading: false,
    isLoadingMore: false
  }),
  components: {
    TopicList,
    PullRefreshLayout,
    InfinityScrollLayout,
    LoadingContainer
  },
  computed: {
    ...mapGetters('topic', ['topics']),
    ...mapState('topic', ['page'])
  },
  methods: {
    ...mapActions('topic', ['fetchTopics']),
    ...mapMutations('topic', {
      setTopicTab: TYPES.SET_TOPIC_TAB
    }),
    ...mapMutations({
      setTitle: TYPES.SET_TITLE
    }),
    async handleRefresh(route) {
      const tab = get(route, 'query.tab');
      if (tab) {
        this.setTopicTab(tab);
        this.setTitle(getTabName(tab));
      }
      window.scrollTo({top: 0, behavior: 'smooth'});
      this.isLoading = true;
      await this.fetchTopics({
        page:1,
        tab: this.$route.query.tab
      });
      this.isLoading = false;
    },
    async onLoadMore() {
      this.isLoadingMore = true;
      await this.fetchTopics({
        page: this.page + 1,
        tab: this.$route.query.tab
      });
      this.isLoadingMore = false;
    }
  },
  watch: {
    '$route': {
      handler: 'handleRefresh'
    }
  }
}
</script>
