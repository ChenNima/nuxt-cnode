<template>
  <div>
    <v-list-tile avatar :key="topic.id" @click="test">
      <v-list-tile-avatar>
        <img :src="author.avatar_url">
      </v-list-tile-avatar>
      <v-list-tile-content>
        <v-list-tile-title>
          {{topic.title}}
        </v-list-tile-title>
        <v-list-tile-sub-title class="subtitle">
          <topic-meta-bar :view="topic.visit_count" :comment="topic.reply_count" :time="topic.readableTime"></topic-meta-bar>
          <v-chip color="green" text-color="white" small v-if="topic.top">
            <v-icon>star</v-icon>
          </v-chip>
          <v-chip color="orange" text-color="white" small v-else-if="topic.good">
            <v-icon>thumb_up</v-icon>
          </v-chip>
        </v-list-tile-sub-title>
      </v-list-tile-content>
    </v-list-tile>
    <v-divider :inset="true"></v-divider>
  </div>
</template>

<script>
import TopicMetaBar from '../common/TopicMetaBar.vue';

export default {
  props: ['topic'],
  components: {
    TopicMetaBar
  },
  computed: {
    author() {
      return this.topic.author;
    },
    topClass() {
      return {
        'blue-grey': this.topic.top,
        'darken-2': this.topic.top
      }
    }
  },
  methods: {
    test() {

    }
  }
}
</script>

<style lang="scss" scoped>
.subtitle {
  display: flex;
  justify-content: space-between;

  .chip{
    height: 18px;
  }
  .title-text {
    max-width: 80%;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
</style>


