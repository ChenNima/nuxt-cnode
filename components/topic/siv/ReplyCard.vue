<template>
  <v-card class="reply-card">
    <reply-title-bar :reply="reply" />
    <mark-down-text :content="reply.content" />
  </v-card>
</template>

<script>
import MarkDownText from '~/components/common/MarkDownText'
import ReplyTitleBar from './ReplyTitleBar'

export default {
  props: ['reply'],
  components: {
    MarkDownText,
    ReplyTitleBar
  }
}
</script>

<style lang="scss" scoped>
.reply-card {
  padding: 8px 16px;
}
</style>

