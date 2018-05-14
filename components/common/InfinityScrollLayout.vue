<template>
  <div v-scroll="onScroll">
      <slot />
      <loading-container v-if="isLoading" />
  </div>
</template>

<script>
import LoadingContainer from './LoadingContainer.vue';

export default {
  props: ['isLoading'],
  data: () => ({
    scrollTop: 0,
    scrollHeight: Infinity,
    clientHeight: 0
  }),
  components: {
    LoadingContainer
  },
  computed: {
    shouldLoadMore() {
      return this.scrollTop + this.clientHeight >= this.scrollHeight - 100;
    }
  },
  methods: {
    onScroll({ target }) {
      const scrollingElement = target.scrollingElement;
      this.scrollTop = scrollingElement.scrollTop;
      this.scrollHeight = scrollingElement.scrollHeight;
      this.clientHeight = scrollingElement.clientHeight;
    }
  },
  watch: {
    shouldLoadMore(newValue, oldValue) {
      if (this.isLoading || !newValue || (newValue === oldValue)) {
        return;
      }
      this.$emit('loadMore');
    }
  }
}
</script>

