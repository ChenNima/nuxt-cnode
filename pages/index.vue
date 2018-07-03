<template>
<div>
  <pull-refresh-layout :isLoading="isLoading" @refresh="handleRefresh">
    <infinity-scroll-layout :isLoading="isLoadingMore" @loadMore="onLoadMore">
      <topic-list :topics="topics"/>
    </infinity-scroll-layout>
  </pull-refresh-layout>
  <portal to="top-right-tool" v-if="isLoggedIn">
    <v-btn flat icon color="white">
      <v-icon>edit</v-icon>
    </v-btn>
  </portal>
</div>
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

export default {
  asyncData({store, route}) {
    const tab = route.query.tab || 'all';
    if (tab !== store.state.topic.tab || !store.state.topic.topics.length) {
      return store.dispatch('topic/fetchTopics', {
        page:1,
        tab: route.query.tab
      });
    }
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
  mounted() {
    const currentTab = this.$route.query.tab
    if (this.scrollTop && currentTab === this.tab) {
      const scrollTop = this.scrollTop;
      setTimeout(() => {
        window.scrollTo({ top: scrollTop });
      }, 0);
    }
    this.setTopicTab(currentTab);
    this.setScrollTop(0);
  },
  computed: {
    ...mapGetters(['isLoggedIn']),
    ...mapGetters('topic', ['topics']),
    ...mapState('topic', ['page', 'scrollTop', 'tab'])
  },
  methods: {
    ...mapActions('topic', ['fetchTopics']),
    ...mapMutations('topic', {
      setTopicTab: TYPES.SET_TOPIC_TAB,
      setScrollTop: TYPES.SET_SCROLL_TOP
    }),
    async handleRefresh(route) {
      const tab = get(route, 'query.tab');
      if (tab) {
        this.setTopicTab(tab);
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
  },
  beforeRouteLeave(to, { fullPath }, next) {
    this.setScrollTop(document.scrollingElement.scrollTop);
    next();
  }
}
</script>
