<template>
  <v-snackbar :value="isToastOpen" @input="toggleToast" top :timeout="5000" >
    <span class="deep-orange--text text--lighten-1">{{toastMessage}}</span>
  </v-snackbar>
</template>

<script>
import { mapMutations, mapState } from 'vuex';
import * as TYPES from '~/store/mutation-types';
export default {
  computed: {
    ...mapState(['isToastOpen', 'toastMessage'])
  },
  methods: {
    ...mapMutations({
      toggleToast: TYPES.SET_TOAST_STATUS
    })
  }
}
</script>

