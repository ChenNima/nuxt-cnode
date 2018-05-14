<template>
<v-app dark>
  <v-navigation-drawer app clipped fixed v-model="drawerOpened">
    <nav-list />
  </v-navigation-drawer>
  <v-toolbar app fixed clipped-left class="toolbar">
    <v-toolbar-side-icon @click.stop="drawerOpened = !drawerOpened"></v-toolbar-side-icon>
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

export default {
  data: () => ({
    drawerOpened: false
  }),
  components: {
    NavList
  }
}
</script>


<style>
@import '../node_modules/vuetify/dist/vuetify.min.css';
.toolbar {
  z-index: 5;
}
</style>
