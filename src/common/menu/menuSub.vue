<template>
  <el-submenu :index="item.name">
    <template slot="title">
      <span>{{ item.text }}</span>
    </template>
    <el-menu-item-group>
      <menu-item v-for="child in item.children" :item="child" :basePath="item.path" :key="child.name"></menu-item>
    </el-menu-item-group>
  </el-submenu>
</template>
<script>
import MenuItem from './menuItem.vue'
export default {
  name: 'menu-sub',
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  components: {
    MenuItem
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
