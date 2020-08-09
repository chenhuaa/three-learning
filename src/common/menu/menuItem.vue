<template>
  <el-menu-item class="ch-menu-item" :key="item.name" :index="path">
    <span slot="title">{{ item.text }}</span>
  </el-menu-item>
</template>
<script>
export default {
  name: 'menu-item',
  props: {
    item: {
      type: Object,
      required: true
    },
    basePath: {
      type: String
    }
  },
  computed: {
    path() {
      return this.basePath + '/' + this.item.path
    }
  },
  data() {
    return {}
  },
  mounted() {
  }
}
</script>
<style>
</style>
