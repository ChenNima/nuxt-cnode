<template>
  <div></div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
import * as TYPES from '~/store/mutation-types';

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
