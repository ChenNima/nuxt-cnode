<template>
  <div class="user-info-container">
    <v-avatar size="100">
      <img src="~/assets/image/anonymous-user.png" alt="avatar">
    </v-avatar>
    <div class="pt-2 pb-2">
      <v-btn color="green darken-3" @click="setLoginModalStatus(true)">登录</v-btn>
    </div>
    <v-divider />
  </div>
</template>

<script>
import { mapMutations } from 'vuex';
import * as TYPES from '~/store/mutation-types';

export default {
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
</style>
