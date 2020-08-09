<template>
  <div class="canvas-plane">
    <canvas id="linearPlane"></canvas>
    <canvas id="RadialPlane"></canvas>
  </div>
</template>
<script>
import { drawLinear, drawRadial } from './canvasPlane.js'
export default {
  data() {
    return {}
  },
  mounted() {
    let domLinear = document.getElementById('linearPlane');
    let domRadial = document.getElementById('RadialPlane');
    drawLinear(domLinear);
    drawRadial(domRadial);
  }
}
</script>
<style>
.canvas-plane {
  width: 100%;
  height: 100%;
}
</style>
