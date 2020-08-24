<template>
  <div class="sprite-anime"></div>
</template>
<script>
import SpriteAnime from './anime'
import yanhua from '../../../assets/lunkuo.jpg'
export default {
  data() {
    return {}
  },
  mounted() {
    new SpriteAnime({
      row: 8,
      col: 10,
      iconLength: 73,
      img: yanhua,
      during: 3
    }, document.getElementsByClassName('sprite-anime')[0]);
  }
}
</script>
<style scoped>
.sprite-anime {
  width: 100%;
  height: 100%;
}
</style>
