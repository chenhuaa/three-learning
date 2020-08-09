<template>
  <div class="chapter01">
    <div class="chapter01-dom"></div>
  </div>
</template>
<script>
import { init, onResize, gui } from './chapter01.js'
export default {
  data() {
    return {}
  },
  mounted() {
    const dom = document.getElementsByClassName('chapter01-dom')[0];
    const width = dom.clientWidth;
    const height = dom.clientHeight;
    init(width, height, dom);
    window.addEventListener('resize', onResize(width, height), false);
  },
  beforeDestroy() {
    gui.destroy();
  }
}
</script>
<style>
.chapter01 {
  width: 100%;
  height: 100%;
}
.chapter01-dom {
  width: 100%;
  height: 100%;
}
</style>
