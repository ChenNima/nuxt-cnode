<template>
<v-app dark v-scroll="onScroll">
  <v-navigation-drawer app clipped fixed :mobileBreakPoint="960" :value="isDrawerOpened" @input="onDrawerInput" :touchless="true">
    <current-user-info />
    <nav-list />
  </v-navigation-drawer>
  <v-toolbar app fixed clipped-left class="toolbar">
    <v-toolbar-side-icon @click.stop="toggleDrawer(!drawerOpened)" class="hidden-md-and-up"></v-toolbar-side-icon>
    <site-logo class="md-mid-title"/>
    <portal-target class="top-right-tool" name="top-right-tool"></portal-target>
  </v-toolbar>
  <v-content>
    <v-container id="main_container" fluid d-flex justify-center>
      <div class="centered-container">
        <nuxt/>
      </div>
    </v-container>
  </v-content>
  <login-modal />
  <global-toast />
  <v-fab-transition>
    <v-btn v-show="showScrollToTop" fab color="green darken-3" fixed bottom right @click="scrollToTop"><v-icon>arrow_upward</v-icon></v-btn>
  </v-fab-transition>
  <!-- <v-footer app></v-footer> -->
</v-app>
</template>

<script>
import NavList from '../components/NavList.vue';
import SiteLogo from '../components/common/SiteLogo.vue';
import CurrentUserInfo from '../components/CurrentUserInfo.vue'
import LoginModal from '../components/LoginModal.vue'
import GlobalToast from '../components/GlobalToast.vue'
import * as TYPES from '~/store/mutation-types';
import { mapMutations, mapState, mapGetters } from 'vuex';

export default {
  data: () => ({
    scrollTop: 0
  }),
  components: {
    NavList,
    SiteLogo,
    CurrentUserInfo,
    LoginModal,
    GlobalToast
  },
  computed: {
    ...mapGetters(['isDrawerOpened']),
    ...mapState(['drawerOpened']),
    showScrollToTop() {
      return this.scrollTop >= 1000;
    }
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
    scrollToTop() {
      window.scrollTo({top: 0, behavior: 'smooth'});
    },
    onScroll() {
      this.scrollTop = document.scrollingElement.scrollTop;
    }
  }
}
</script>

<style lang="scss" scoped>
.toolbar {
  z-index: 5;
}
.centered-container {
  max-width: 960px;
}
.top-right-tool {
  position: absolute;
  right: 0;
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
  .centered-container {
    max-width: 100%;
  }
}
</style>
