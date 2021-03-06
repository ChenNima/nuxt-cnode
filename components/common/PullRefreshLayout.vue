<template>
  <div v-touch="touch" class="pull-list" :style="listStyle">
    <div class="loading-container">
      <v-progress-circular indeterminate v-if="isLoadingSpin" color="green"></v-progress-circular>
      <v-icon large color="green" :style="spinerStyle" v-else>autorenew</v-icon>
    </div>
    <slot />
  </div>
</template>

<script>
export default {
  props: ['isLoading'],
  data: () => ({
    touchstartY: 0,
    touchmoveY: 0,
    isTouching: false,
    isTopTouching: false
  }),
  computed: {
    touch() {
      return {
        start: this.start,
        move: this.move,
        end: this.end
      }
    },
    moved() {
      let moved = this.touchmoveY - this.touchstartY;
      moved = this.isTopTouching ? Math.max(moved, 0) : 0;
      return this.isLoading ? 60 : Math.pow(moved, 0.85);
    },
    isReleasing() {
      return !this.isTouching;
    },
    listStyle() {
      return {
        top: `${this.moved}px`,
        transition: `${this.isReleasing ? '0.5s' : null}`
      }
    },
    spinerStyle() {
      return {
        transform: `rotate(${270 * this.moved / 60}deg)`
      }
    },
    isLoadingSpin() {
      return this.moved >= 60 || this.isLoading;
    }

  },
  methods: {
    start({ touchstartY }) {
      this.touchstartY = touchstartY;
      this.touchmoveY = touchstartY;
      this.isTouching = true;
      this.isTopTouching = this.isTop();
    },
    move({ touchmoveY }) {
      this.touchmoveY = touchmoveY;
    },
    end() {
      if (this.moved > 60) {
        this.$emit('refresh');
      }
      this.touchmoveY = 0;
      this.touchstartY = 0;
      this.isTouching = false;
      this.isTopTouching = false;
    },
    isTop() {
      return typeof document === 'undefined' ? true : !document.scrollingElement.scrollTop;
    }
  },
  watch: {
    moved(value, oldValue) {
      if (!!value === !!oldValue) {
        return;
      }
      ['html', 'body'].forEach((tag) => {
        const style = document.getElementsByTagName(tag)[0].style;
        if(value) {
          style.overflowY = 'hidden';
        } else {
          style.overflowY = 'scroll';
        }
      });
    }
  }
}
</script>

<style scoped>
.pull-list {
  position: relative;
}
.loading-container {
  position: absolute;
  width: 100%;
  display: flex;
  justify-content: center;
  top: -60px;
  z-index: 4;
}
</style>


