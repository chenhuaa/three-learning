<template>
  <div class="gradient01">
    <div class="gradient01-dom"></div>
  </div>
</template>
<script>
import { init } from './gradient01.js'
export default {
  data() {
    return {}
  },
  mounted() {
    const dom = document.getElementsByClassName('gradient01-dom')[0];
    const width = dom.clientWidth;
    const height = dom.clientHeight;
    init(width, height, dom);
    console.log('iuytgfdfop========')
  }
}
</script>
<style>
.gradient01 {
  width: 100%;
  height: 100%;
}
.gradient01-dom {
  width: 100%;
  height: 100%;
}
</style>
