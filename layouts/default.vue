<template>
<v-app dark>
  <v-navigation-drawer app clipped absolute v-model="drawerOpened"></v-navigation-drawer>
  <v-toolbar app class="toolbar">
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
export default {
  data: () => ({
    drawerOpened: true
  })
}
</script>


<style>
@import '../node_modules/vuetify/dist/vuetify.min.css';
.toolbar {
  position: relative;
  z-index: 5;
}
</style>
