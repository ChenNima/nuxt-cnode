<template>
<loading-container v-if="isLoadingTab" />
  <pull-refresh-layout v-else :isLoading="isLoading" @refresh="handleRefresh">
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
import { mapActions, mapGetters, mapState } from 'vuex';

export default {
  asyncData({store, route}) {
    return store.dispatch('topic/fetchTopics', {
        page:1,
        tab: route.query.tab
      });
  },
  data: () => ({
    isLoading: false,
    isLoadingMore: false,
    isLoadingTab: false
  }),
  components: {
    TopicList,
    PullRefreshLayout,
    InfinityScrollLayout,
    LoadingContainer
  },
  computed: {
    ...mapGetters('topic', ['topics']),
    ...mapState('topic', ['page', 'tab'])
  },
  methods: {
    ...mapActions('topic', ['fetchTopics']),
    async handleRefresh(o, n) {
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
    async tab(newValue, oldValue) {
      if (newValue === oldValue) {
        return;
      }
      this.isLoadingTab = true;
      await this.fetchTopics(1);
      this.isLoadingTab = false;
    },
    '$route': {
      handler: 'handleRefresh'
    }
  }
}
</script>
