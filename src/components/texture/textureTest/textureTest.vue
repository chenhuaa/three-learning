<template>
  <div class="textureTest-container">
    <div class="textureTest"></div>
  </div>
</template>
<script>
import { init } from './textureTest.js'
export default {
  data() {
    return {}
  },
  mounted() {
    init(document.getElementsByClassName('textureTest')[0]);
  }
}
</script>
<style>
.textureTest-container {
  width: 100%;
  height: 100%;
}
.textureTest {
  width: 100%;
  height: 100%;
}
</style>
