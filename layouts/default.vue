<template>
<v-app dark>
  <v-navigation-drawer app clipped absolute v-model="drawerOpened">
    <v-list dense>
        <v-list-tile>
          <v-list-tile-action>
            <v-icon>dashboard</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>All</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
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
export default {
  data: () => ({
    drawerOpened: false
  })
}
</script>


<style>
@import '../node_modules/vuetify/dist/vuetify.min.css';
.toolbar {
  z-index: 5;
}
</style>
