<template>
  <pull-refresh-layout :isLoading="isLoading" @refresh="handleRefresh">
    <topic-list :topics="topics"/>
  </pull-refresh-layout>
</template>

<script>
import TopicList from '~/components/topic/TopicList.vue';
import PullRefreshLayout from '~/components/common/PullRefreshLayout.vue';
import { mapActions, mapState } from 'vuex';

export default {
  asyncData({store}) {
    return store.dispatch('topic/fetchTopics', 1);
  },
  data: () => ({
    isLoading: false
  }),
  components: {
    TopicList,
    PullRefreshLayout
  },
  computed: {
    ...mapState('topic', ['topics'])
  },
  methods: {
    ...mapActions('topic', ['fetchTopics']),
    handleRefresh() {
      this.isLoading = true;
      this.fetchTopics(1).then(() =>{
        this.isLoading = false;
      });
    }
  }
}
</script>
