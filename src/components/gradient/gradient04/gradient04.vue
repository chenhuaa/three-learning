<template>
  <div class="gradient04-container">
    <div class="gradient04"></div>
  </div>
</template>
<script>
import { init } from './gradient04.js'
export default {
  data() {
    return {}
  },
  mounted() {
    init(document.getElementsByClassName('gradient04')[0]);
  }
}
</script>
<style>
.gradient04-container {
  width: 100%;
  height: 100%;
}
.gradient04 {
  width: 100%;
  height: 100%;
}
</style>
