<template>
<v-list dense>
  <v-list-tile v-for="nav in navItem" :key="nav.tab" :to="`/?tab=${nav.tab}`" activeClass="">
  <!-- <v-list-tile v-for="nav in navItem" :key="nav.tab" @click="onClickTab(nav.tab)" :disabled="isActived(nav.tab)" :class="{actived: isActived(nav.tab)}"> -->
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
import { mapMutations, mapState } from 'vuex';
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
  computed: {
    ...mapState('topic', ['tab'])
  },
  methods: {
    ...mapMutations('topic', {
      setTopicTab: TYPES.SET_TOPIC_TAB
    }),
    ...mapMutations({
      toggleDrawer: TYPES.TOGGLE_DRAWER
    }),
    onClickTab(tab) {
      this.setTopicTab(tab);
      if (window.innerWidth <= 1264) {
        this.toggleDrawer(false);
      }
    },
    isActived(tab) {
      return tab === this.tab;
    }
  }
}
</script>

<style lang="scss" scoped>
.actived {
  background: #525252
}
</style>

