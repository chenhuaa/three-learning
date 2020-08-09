<template>
  <div id="app">
    <div class="app-menu">
      <my-menu></my-menu>
    </div>
    <div class="app-container">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import MyMenu from './common/menu/menu.vue'

export default {
  name: 'App',
  components: {
    MyMenu
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 900px;
  display: flex;
}
.app-menu {
  width: 200px;
}
.app-container {
  width: calc(100% - 200px);
  /* margin-left: 200px; */
}
</style>
