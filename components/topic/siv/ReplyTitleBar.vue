<template>
  <div class="reply-title-bar">
    <div class="author-info">
      <v-avatar :size="30">
        <img :src="author.avatar_url" :alt="author.loginname">
      </v-avatar>
      <span class="author-name">
        {{author.loginname}}
      </span>
    </div>
    <span class="reply-time">
      {{reply.readableTime}}
    </span>
  </div>
</template>

<script>
export default {
  props: ['reply'],
  computed: {
    author() {
      return this.reply.author;
    }
  }
}
</script>

<style lang="scss" scoped>
.reply-title-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #565656;
  padding-bottom: 10px;
  margin-bottom: 10px;
}
.author-info {
  color: rgb(148, 148, 148);
  .author-name {
    margin-left: 5px;
  }
}
.reply-time {
  color: #949494;
}
</style>

