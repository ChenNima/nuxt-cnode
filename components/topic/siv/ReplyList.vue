<template>
  <div class="replaies-container">
    <replay-card class="reply-item" :reply="reply" v-for="reply in replies" :key="reply.id"/>
  </div>
</template>

<script>
import ReplayCard from './ReplyCard'

export default {
  props: ['replies'],
  components: {
    ReplayCard
  }
}
</script>

<style lang="scss" scoped>
.replaies-container {
  padding-top: 20px;
}
.reply-item {
  margin-bottom: 10px;
}
</style>

