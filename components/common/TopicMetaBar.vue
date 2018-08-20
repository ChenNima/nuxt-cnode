<template>
  <div>
    <div class="meta-block">
      <v-icon>visibility</v-icon>
      <span>{{view}}</span>
    </div>
    <div class="meta-block">
      <v-icon>comment</v-icon>
      <span>{{comment}}</span>
    </div>
    <div class="meta-block">
      <v-icon>watch_later</v-icon>
      <span>{{time}}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: ['view', 'comment', 'time']
}
</script>

<style lang="scss" scoped>
.meta-block {
  display: inline-block;
  margin-right: 10px;
  min-width: 50px;
  color: #949494;

  .v-icon {
    color: #949494;
    font-size: 16px;
    margin-right: 5px;
  }
}
</style>

