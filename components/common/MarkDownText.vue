<template>
  <div class="markdown-container" v-html="content"></div>
</template>

<script>
export default {
  props: ['content']
}
</script>

<style lang="scss">
.markdown-text {
  line-height: 2;
  word-break: break-all;
  img {
    max-width: 100%;
  }
  code {
    margin: 5px 0;
    background: #292929;
    color: rgb(76, 175, 80);
    border-left: 3px solid #1d5d39;
    padding: 0 10px;
    font-weight: normal;
    &::before, &::after {
      content: "";  
    }
  }
  ul, ol {
    padding-left: 20px;
  }
  h1, h2, h3 {
    border-bottom: 1px solid #777;
    margin-bottom: 10px;
  }
  p {
    font-size: 15px;
    margin-bottom: 10px;
  }
}
</style>
