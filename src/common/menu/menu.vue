<template>
  <div class="menu-container">
    <el-menu class="ch-el-menu" unique-opened router @open="menuOpen" @close="menuClose">
      <template v-for="item in menuList">
        <menu-sub v-if="item.children.length" :key="item.name" :item="item"></menu-sub>
        <menu-item :key="item.name" :item="item" v-else></menu-item>
      </template>
    </el-menu>
  </div>
</template>
<script>
import { routes } from '../../router/index.js'
import MenuItem from './menuItem'
import MenuSub from './menuSub'
export default {
  data() {
    return {}
  },
  computed: {
    menuList() {
      return routes
    }
  },
  components: {
    MenuItem,
    MenuSub
  },
  methods: {
    menuOpen(key, keyPath) {
      console.log(key, keyPath, 'open')
    },
    menuClose(key, keyPath) {
      console.log(key, keyPath, 'close')
    }
  },
  mounted() {
    console.log(routes, 'menuList')
  }
}
</script>>

