<template>
  <div v-scroll="onScroll">
      <slot />
      <v-layout row justify-center class="loading-container">
        <v-progress-circular indeterminate v-if="isLoading" color="green"></v-progress-circular>
      </v-layout>
  </div>
</template>

<script>
export default {
  props: ['isLoading'],
  data: () => ({
    scrollTop: 0,
    scrollHeight: Infinity,
    clientHeight: 0
  }),
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

<style lang="scss" scoped>
.loading-container {
  margin-top: 10px;
}
</style>

