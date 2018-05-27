<template>
<v-app dark>
  <v-navigation-drawer app clipped fixed :value="isDrawerOpened" @input="onDrawerInput">
    <nav-list />
  </v-navigation-drawer>
  <v-toolbar app fixed clipped-left class="toolbar">
    <v-toolbar-side-icon @click.stop="toggleDrawer(!drawerOpened)" class="hidden-lg-and-up"></v-toolbar-side-icon>
    <site-logo class="md-mid-title"/>
  </v-toolbar>
  <v-content>
    <v-container id="main_container" fluid>
      <nuxt/>
    </v-container>
  </v-content>
  <!-- <v-footer app></v-footer> -->
</v-app>
</template>

<script>
import NavList from '../components/NavList.vue';
import SiteLogo from '../components/common/SiteLogo.vue';
import * as TYPES from '~/store/mutation-types';
import { isLarge } from '~/lib/utile.js';
import { mapMutations, mapState, mapGetters } from 'vuex';

export default {
  components: {
    NavList,
    SiteLogo
  },
  computed: {
    ...mapGetters(['isDrawerOpened']),
    ...mapState(['drawerOpened'])
  },
  methods: {
    ...mapMutations({
      toggleDrawer: TYPES.TOGGLE_DRAWER
    }),
    onDrawerInput(isOpened) {
      if (isOpened !== this.drawerOpened) {
        this.toggleDrawer(isOpened);
      }
    },
    isLarge() {
      return isLarge;
    }
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
    padding: 10px 5px 0;
  }
  .sm-mid-title{
    position: absolute;
    left: 0;
    right: 0;
    margin: auto !important;
  }
}
@media (max-width: 960px) {
  .md-mid-title{
    position: absolute;
    left: 0;
    right: 0;
    margin: auto !important;
  }
}
</style>
