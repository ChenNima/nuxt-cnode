<template>
  <div>
    <v-list-tile avatar :key="topic.id" @click="test">
      <v-list-tile-avatar>
        <img :src="author.avatar_url">
      </v-list-tile-avatar>
      <v-list-tile-content>
        <v-list-tile-title class="title">
          {{author.loginname}}
          <v-chip color="orange" text-color="white" small v-if="topic.top">
            top
            <v-icon right>star</v-icon>
          </v-chip>
        </v-list-tile-title>
        <v-list-tile-sub-title v-html="topic.title"></v-list-tile-sub-title>
      </v-list-tile-content>
    </v-list-tile>
    <v-divider :inset="true"></v-divider>
  </div>
</template>

<script>
export default {
  props: ['topic'],
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

<style scoped>
.title {
  display: flex;
  justify-content: space-between;
}
.title .chip{
  height: 20px;
}
</style>


