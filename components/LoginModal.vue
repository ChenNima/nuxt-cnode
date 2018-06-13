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
              <v-text-field label="Access Token" color="green darken-3" required></v-text-field>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="green darken-2" flat @click.native="handleInput(false)">递交</v-btn>
        <v-btn flat @click.native="handleInput(false)">取消</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex';
import * as TYPES from '~/store/mutation-types';

export default {
  computed: {
    ...mapGetters(['isLoginModalOpen'])
  },
  methods: {
    ...mapMutations({
      setLoginModalStatus: TYPES.SET_LOGIN_MODAL_STATUS
    }),
    handleInput(isOpen) {
      this.setLoginModalStatus(isOpen);
    }
  }
}
</script>


