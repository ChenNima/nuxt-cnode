<template>
  <v-card class="reply-card">
    <reply-title-bar :reply="reply" />
    <mark-down-text :content="reply.content" />
    <div class="action-bar">
      <span class="pink--text text--darken-1 like-count">{{reply.ups.length}}</span>
      <v-btn icon flat color="pink darken-1"><v-icon>{{`favorite${reply.is_uped ? '' : '_border'}`}}</v-icon></v-btn>
      <v-btn icon flat color="green darken-3"><v-icon>reply</v-icon></v-btn>
    </div>
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
.action-bar {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  height: 24px;
}
.like-count {
  margin-right: -10px;
}
</style>

