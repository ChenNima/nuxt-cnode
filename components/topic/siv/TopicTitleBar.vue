<template>
  <div>
    <h2>{{topic.title}}</h2>
    <div class="meta-bar">
      <div>
        <v-avatar :size="30">
          <img :src="author.avatar_url" :alt="author.loginname">
        </v-avatar>
        {{author.loginname}}
      </div>
      <topic-meta-bar :view="topic.visit_count" :comment="topic.reply_count" :time="topic.readableTime" />
    </div>
  </div>
</template>

<script>
import TopicMetaBar from '~/components/common/TopicMetaBar.vue';

export default {
  props: ['topic', 'author'],
  components: {
    TopicMetaBar
  }
}
</script>

<style lang="scss" scoped>
.meta-bar {
  padding: 10px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>

