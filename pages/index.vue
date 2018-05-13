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
import { mapActions, mapGetters, mapState } from 'vuex';

export default {
  asyncData({store}) {
    return store.dispatch('topic/fetchTopics', 1);
  },
  data: () => ({
    isLoading: false,
    isLoadingMore: false
  }),
  components: {
    TopicList,
    PullRefreshLayout,
    InfinityScrollLayout
  },
  computed: {
    ...mapGetters('topic', ['topics']),
    ...mapState('topic', ['page'])
  },
  methods: {
    ...mapActions('topic', ['fetchTopics']),
    async handleRefresh() {
      this.isLoading = true;
      await this.fetchTopics(1);
      this.isLoading = false;
    },
    async onLoadMore() {
      this.isLoadingMore = true;
      await this.fetchTopics(this.page + 1, true);
      this.isLoadingMore = false;
    }
  }
}
</script>
