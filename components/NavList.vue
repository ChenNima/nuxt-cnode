<template>
<v-list dense>
  <v-list-tile v-for="nav in navItem" :key="nav.tab" :to="`/?tab=${nav.tab}`" activeClass="" :class="{actived: isActived(nav.tab)}">
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
import navItem from '~/assets/json/nav-list.json';
import * as TYPES from '~/store/mutation-types';

export default {
  data: () => ({
    navItem
  }),
  computed: {
    ...mapState('topic', ['tab'])
  },
  methods: {
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

