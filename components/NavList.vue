<template>
<v-list dense>
  <v-list-tile v-for="nav in navItem" :key="nav.tab" @click="setTopicTab(nav.tab)">
    <v-list-tile-action>
      <v-icon>{{nav.icon}}</v-icon>
    </v-list-tile-action>
    <v-list-tile-content>
      <v-list-tile-title>{{nav.name}}</v-list-tile-title>
    </v-list-tile-content>
  </v-list-tile>
</v-list>
</template>

<script>
import { mapMutations } from 'vuex';
import * as TYPES from '~/store/mutation-types';

export default {
  data: () => ({
    navItem: [
      {
        name: '全部',
        icon: 'toc',
        tab: 'all'
      },
      {
        name: '精华',
        icon: 'star',
        tab: 'good'
      },
      {
        name: '分享',
        icon: 'share',
        tab: 'share'
      },
      {
        name: '问答',
        icon: 'question_answer',
        tab: 'ask'
      },
      {
        name: '招聘',
        icon: 'business_center',
        tab: 'job'
      }
    ]
  }),
  methods: {
    ...mapMutations('topic', {
      setTopicTab: TYPES.SET_TOPIC_TAB
    })
  }
}
</script>

