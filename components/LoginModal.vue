<template>
  <v-dialog :value="isLoginModalOpen" @input="handleInput" persistent max-width="500px">
    <v-card>
      <v-card-title>
        <span class="headline">登录</span>
      </v-card-title>
      <v-card-text>
        <v-container grid-list-md>
          <v-layout wrap>
            <v-flex xs12>
              <v-text-field v-model="accessToken" label="Access Token" color="green darken-3" required></v-text-field>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn :loading="isLoading" color="green darken-2" flat @click="handleLogin">
          <span>递交</span>
        </v-btn>
        <v-btn :disabled="isLoading" flat @click="handleInput(false)">取消</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapMutations, mapGetters, mapActions } from 'vuex';
import * as TYPES from '~/store/mutation-types';

export default {
  data: () => ({
    accessToken: null,
    isLoading: false
  }),
  computed: {
    ...mapGetters(['isLoginModalOpen', 'isLoggedIn'])
  },
  methods: {
    ...mapMutations({
      setLoginModalStatus: TYPES.SET_LOGIN_MODAL_STATUS
    }),
    ...mapActions(['login']),
    handleInput(isOpen) {
      if (this.isLoading) {
        return;
      }
      this.setLoginModalStatus(isOpen);
    },
    async handleLogin() {
      if (this.isLoading) {
        return;
      }
      this.isLoading = true;
      await this.login(this.accessToken);
      this.accessToken = null;
      this.isLoading = false;
      if (this.isLoggedIn) {
        this.setLoginModalStatus(false);
      }
    }
  }
}
</script>


