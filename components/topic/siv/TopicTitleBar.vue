<template>
  <div>
    <h2>{{topic.title}}</h2>
    <div class="meta-bar">
      <div class="author-info">
        <v-avatar :size="30">
          <img :src="author.avatar_url" :alt="author.loginname">
        </v-avatar>
        <span class="author-name">
          {{author.loginname}}
        </span>
      </div>
      <topic-meta-bar :view="topic.visit_count" :comment="topic.reply_count" :time="topic.readableCreateTime" />
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
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #333;
  padding: 10px 20px;
  margin-top: 20px;
  border-radius: 7px;
  margin: 20px 0;
}
.author-info {
  color: rgb(148, 148, 148);
  .author-name {
    margin-left: 5px;
    font-size: 16px;
  }
}
@media (max-width: 600px) {
  .meta-bar {
    flex-direction: column;
    align-items: flex-start;
  }
  .author-info {
    margin-bottom: 10px;
  }
}
</style>

