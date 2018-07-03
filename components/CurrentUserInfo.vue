<template>
  <div class="user-info-container">
    <v-avatar size="100">
      <picture class="avatar-set">
        <source :srcset="currentUser.avatar_url" v-if="isLoggedIn" />
        <img srcset="~/assets/image/anonymous-user.png" alt="avatar">
      </picture>
    </v-avatar>
    <div class="pt-2 pb-2">
      <div class="username" v-if="isLoggedIn">{{currentUser.loginname}}</div>
      <v-btn color="green darken-3" @click="setLoginModalStatus(true)" v-else>登录</v-btn>
    </div>
    <v-divider />
  </div>
</template>

<script>
import { mapMutations, mapState, mapGetters } from 'vuex';
import * as TYPES from '~/store/mutation-types';

export default {
  computed: {
    ...mapState(['currentUser']),
    ...mapGetters(['isLoggedIn'])
  },
  methods: {
    ...mapMutations({
      setLoginModalStatus: TYPES.SET_LOGIN_MODAL_STATUS
    })
  }
}
</script>

<style lang="scss" scoped>
.user-info-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 15px 10px 10px;
}
.avatar-set {
  width: 100%;
}
.username {
  font-size: 24px;
  cursor: pointer;
}
</style>
