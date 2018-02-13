<template>
  <topic-list :topics="topics" :isLoading="isLoading" @refresh="handleRefresh"/>
</template>

<script>
import TopicList from '~/components/topic/TopicList.vue';
import { mapActions, mapState } from 'vuex';

export default {
  asyncData({store}) {
    return store.dispatch('topic/fetchTopics', 1);
  },
  data: () => ({
    isLoading: false
  }),
  components: {
    TopicList
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
