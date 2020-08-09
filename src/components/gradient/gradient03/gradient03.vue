<template>
  <div class="gradient03">
    <div class="gradient03-dom"></div>
  </div>
</template>
<script>
import { init } from './gradient03.js'
export default {
  data() {
    return {}
  },
  mounted() {
    const dom = document.getElementsByClassName('gradient03-dom')[0];
    const width = dom.clientWidth;
    const height = dom.clientHeight;
    init(width, height, dom);
  }
}
</script>
<style>
.gradient03 {
  width: 100%;
  height: 100%;
}
.gradient03-dom {
  width: 100%;
  height: 100%;
}
</style>