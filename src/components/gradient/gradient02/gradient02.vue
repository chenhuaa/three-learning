<template>
  <div class="gradient02">
    <div class="gradient02-dom"></div>
  </div>
</template>
<script>
import { init } from './gradient02.js'
export default {
  data() {
    return {}
  },
  mounted() {
    const dom = document.getElementsByClassName('gradient02-dom')[0];
    const width = dom.clientWidth;
    const height = dom.clientHeight;
    init(width, height, dom);
  }
}
</script>
<style>
.gradient02 {
  width: 100%;
  height: 100%;
}
.gradient02-dom {
  width: 100%;
  height: 100%;
}
</style>