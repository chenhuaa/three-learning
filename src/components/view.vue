<template>
  <div class="three-learning-container">
    <div class="view-container">
      <el-container>
        <el-aside width="150px">
          <el-menu default-sctive="0" class="menu" @select="handleSelect" @open="handleOpen" @close="handleClose">
            <el-menu-item index="chapter01">chapter01</el-menu-item>
            <el-menu-item index="gradient01">着色器实例-立方体</el-menu-item>
            <el-menu-item index="gradient02">gradient02</el-menu-item>
            <el-menu-item index="canvasPlane">canvas渐变</el-menu-item>
            <el-menu-item index="canvasMap">canvas纹理贴图</el-menu-item>
            <el-menu-item index="videoTexture">video纹理贴图</el-menu-item>
            <el-menu-item index="gradient04">顶点颜色渐变</el-menu-item>
            <el-menu-item index="textureTest">图片纹理贴图</el-menu-item>
            <el-menu-item index="animate01">动画</el-menu-item>
            <el-menu-item index="columnBarChart">柱状图</el-menu-item>
          </el-menu>
        </el-aside>
        <el-main>
          <component :is="path"></component>
        </el-main>
      </el-container>
    </div>
  </div> 
</template>
<script>
import './view.css'
import chapter01 from './chapter01/chapter01.vue'
import gradient01 from './gradient01/gradient01.vue'
import gradient02 from './gradient02/gradient02.vue'
import gradient04 from './gradient04/gradient04.vue'
import canvasPlane from './canvasPlane/canvasPlane.vue'
import canvasMap from './canvasMap/canvasMap.vue'
import videoTexture from './videoTexture/videoTexture.vue'
import textureTest from './textureTest/textureTest.vue'
import animate01 from './animate01/animate01.vue'
import columnBarChart from './test/columnBarChart/index.vue'
export default {
  data() {
    return {
      path: ''
    }
  },
  components: {
    chapter01,
    gradient01,
    gradient02,
    gradient04,
    canvasPlane,
    canvasMap,
    videoTexture,
    textureTest,
    animate01,
    columnBarChart
  },
  methods: {
    handleOpen(key, path) {
      console.log(key, path, 'kjhgfds')
    },
    handleClose(key, path) {
      console.log(key, path, 'kjhgfds')
    },
    handleSelect(key) {
      this.path = key;
    }
  }
}
</script>
