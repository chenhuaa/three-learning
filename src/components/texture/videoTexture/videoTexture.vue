<template>
  <div class="video-container01">
    <video id="video01" autoplay controls loop style="display: none;">
      <source src="./test.mp4" type='video/mp4; codecs="avc1.42E01E, mp4a.40.2"'>
    </video>
  </div>
</template>
<script>
import { init } from './videoTexture.js'
export default {
  data() {
    return {}
  },
  mounted() {
    init(document.getElementsByClassName('video-container01')[0], document.getElementById('video01'))
  }
}
</script>
<style>
.video-container01 {
  /* position: relative; */
  height: 600px;
}
#video01 {
  position: fixed;
  left: 160px;
  bottom: 20px;
  width: 400px;
}
</style>
