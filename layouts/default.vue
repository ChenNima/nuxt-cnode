<template>
<v-app dark>
  <v-navigation-drawer app clipped fixed :value="drawerOpened" @input="toggleDrawer">
    <nav-list />
  </v-navigation-drawer>
  <v-toolbar app fixed clipped-left class="toolbar">
    <v-toolbar-side-icon @click.stop="toggleDrawer(!drawerOpened)"></v-toolbar-side-icon>
  </v-toolbar>
  <v-content>
    <v-container fluid>
      <nuxt/>
    </v-container>
  </v-content>
  <v-footer app></v-footer>
</v-app>
</template>

<script>
import NavList from '../components/NavList.vue';
import * as TYPES from '~/store/mutation-types';
import { mapMutations, mapState } from 'vuex';

export default {
  components: {
    NavList
  },
  computed: {
    ...mapState(['drawerOpened'])
  },
  methods: {
    ...mapMutations({
      toggleDrawer: TYPES.TOGGLE_DRAWER
    }),
    onTransitionend(e) {
      console.log(e);
    }
  }
}
</script>


<style>
@import '../node_modules/vuetify/dist/vuetify.min.css';
.toolbar {
  z-index: 5;
}
</style>
