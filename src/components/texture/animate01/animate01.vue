<!--
 * @Author: your name
 * @Date: 2020-07-26 00:44:56
 * @LastEditTime: 2020-08-04 16:53:09
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /three-learning/src/components/texture/animate01/animate01.vue
--> 
<template>
  <div class="animate-container">
    <div class="animate01"></div>
  </div>
</template>
<script>
import SpriteAnimate from './animate.js'
import lunkuo from '../../../assets/yanhua.jpg'
export default {
  data() {
    return {}
  },
  mounted() {
    // let test = new SpriteAnimate({
    //   row: 8,
    //   col: 10,
    //   iconLength: 73,
    //   img: lunkuo
    // }, document.getElementsByClassName('animate01')[0]);
    let test = new SpriteAnimate({
      row: 8,
      col: 8,
      iconLength: 64,
      img: lunkuo
    }, document.getElementsByClassName('animate01')[0]);
    console.log(test, ';juhg')
  }
}
</script>
<style>
.animate-container {
  width: 100%;
  height: 100%;
}
.animate01 {
  width: 100%;
  height: 100%;
}
</style>
