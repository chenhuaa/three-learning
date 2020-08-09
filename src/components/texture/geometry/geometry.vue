<template>
  <div class="geometry-container">
  </div>
</template>
<script>
import { draw } from './geometry'
export default {
  data() {
    return {}
  },
  mounted() {
    draw(document.getElementsByClassName('geometry-container')[0], 'img');
  }
}
</script>
<style>
.geometry-container {
  width: 100%;
  height: 100%;
}
</style>
