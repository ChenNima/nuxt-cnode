<template>
  <v-list two-line>
    <topic-card :topic="topic" v-for="topic in topics" :key="topic.id"/>
  </v-list>
</template>

<script>
import TopicCard from './TopicCard';

export default {
  props: ['topics'],
  components: {
    TopicCard
  }
}
</script>


