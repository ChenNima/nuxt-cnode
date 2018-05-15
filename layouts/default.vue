<template>
<v-app dark>
  <v-navigation-drawer app clipped fixed :value="drawerOpened" @input="toggleDrawer">
    <nav-list />
  </v-navigation-drawer>
  <v-toolbar app fixed clipped-left class="toolbar">
    <v-toolbar-side-icon @click.stop="toggleDrawer(!drawerOpened)"></v-toolbar-side-icon>
  </v-toolbar>
  <v-content>
    <v-container id="main_container" fluid>
      <nuxt/>
    </v-container>
  </v-content>
  <v-footer app></v-footer>
</v-app>
</template>

<script>
import NavList from '../components/NavList.vue';
import * as TYPES from '~/store/mutation-types';
import { isLarge } from '~/lib/utile.js';
import { mapMutations, mapState } from 'vuex';

export default {
  components: {
    NavList
  },
  beforeMount () {
    if (isLarge()) {
      this.toggleDrawer(true);
    }
  },
  computed: {
    ...mapState(['drawerOpened'])
  },
  methods: {
    ...mapMutations({
      toggleDrawer: TYPES.TOGGLE_DRAWER
    })
  }
}
</script>


<style>
@import '../node_modules/vuetify/dist/vuetify.min.css';
.toolbar {
  z-index: 5;
}
@media (max-width: 600px) {
  #main_container {
    padding:  0;
  }
}
</style>
