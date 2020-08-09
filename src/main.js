import Vue from 'vue'
import App from './App.vue'
import * as THREE from 'three'
import ElementUI from  'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import router from './router/index.js'

Vue.config.productionTip = false
Vue.use(ElementUI)

window.THREE = THREE

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
