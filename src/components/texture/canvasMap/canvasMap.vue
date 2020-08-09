<template>
  <div class="canvas-map">
    <div class="gradient" style=""></div>
  </div>
</template>
<script>
import { draw } from './canvasMap.js'
export default {
  data() {
    return {}
  },
  mounted() {
    let dom = document.getElementsByClassName('gradient')[0];
    let width = dom.clientWidth;
    let height = dom.clientHeight;
    draw(width, height, dom);
  }
}
</script>
<style>
.canvas-map {
  width: 100%;
  height: 100%;
}
.gradient {
  width: 100%;
  height: 100%;
}
</style>
