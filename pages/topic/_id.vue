<template>
  <div></div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  asyncData({store, route}) {
    return store.dispatch('topic/fetchTopic', route.params.id);
  },
  computed: {
    ...mapGetters('topic', ['getTopic']),
    topic() {
      return this.getTopic(this.$route.params.id);
    }
  }
};
</script>
