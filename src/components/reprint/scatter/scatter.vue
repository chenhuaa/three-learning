<!--
 * @Author: chenhua
 * @Date: 2020-08-10 18:31:36
 * @LastEditTime: 2020-08-24 21:52:22
 * @Description: 星云
 * @FilePath: /three-learning/src/components/reprint/scatter/scatter.vue
-->
<template>
  <div class="container">
    <div class="scatter"></div>
    <div class="planet"></div>
  </div>
</template>
<script>
import Sphere from './reprint.js'
import SkyBox from './skyBox.js'
export default {
  data() {
    return {}
  },
  mounted() {
    new SkyBox(
      {
        boxSize: 900
      },
      document.getElementsByClassName('scatter')[0]
    );
    new Sphere(
      {
        sphereSize: 50, // 中心精灵缩放大小
        // centerImg1: sphereBg, // 中心精灵图1层
        // centerImg2: planetBg, // 中心精灵图2层
        // centerImg3: zhihu, // 中心精灵图3层
        // iconImg: user, // 轨道上icon
        iconSize: 10, // 轨道上icon精灵缩放半径
        trackRadius: 50 // 轨道半径
      },
      document.getElementsByClassName('planet')[0]
    )
  }
}
</script>
<style>
.container {
  position: relative;
  width: 100%;
  height: 100%;
}
.scatter, .planet {
  width: 100%;
  height: 100%;
}
.planet {
  position: absolute;
  top: 0;
}
</style>
