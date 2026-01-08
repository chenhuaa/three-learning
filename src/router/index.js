import Vue from 'vue'
import Router from 'vue-router'

/**
 * @description: 解决以下报错
 * Error: Avoided redundant navigation to current location -- 路由重复
 */
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(Router);

let routes = [
  {
    name: 'chapter01',
    text: 'chapter01',
    path: '/chapter01',
    component: () => import('../components/chapter01'),
    children: [
      {
        name: 'chapter01-example',
        text: '入门实例',
        path: 'chapter01-example',
        component: () => import('../components/chapter01/chapter01/chapter01.vue'),
      }
    ]
  },
  // {
  //   path: '/chapter02',
  //   name: 'chapter02',
  //   text: 'chapter02',
  //   children: []
  // },
  // {
  //   path: '/chapter03',
  //   name: 'chapter03',
  //   text: 'chapter03',
  //   children: []
  // },
  {
    name: 'gradient',
    text: '渐变',
    path: '/gradient',
    component: () => import('../components/gradient'),
    children: [
      {
        name: 'gradient01',
        text: '立方体-着色器渐变',
        path: 'gradient01',
        component: () => import('../components/gradient/gradient01/gradient01.vue')
      },
      {
        name: 'gradient02',
        text: '直线-顶点颜色渐变',
        path: 'gradient02',
        component: () => import('../components/gradient/gradient02/gradient02.vue')
      },
      {
        name: 'gradient03',
        text: 'TODO未完成',
        path: 'gradient03',
        component: () => import('../components/gradient/gradient03/gradient03.vue')
      },
      {
        name: 'gradient04',
        text: '平面-顶点颜色插值渐变',
        path: 'gradient04',
        component: () => import('../components/gradient/gradient04/gradient04.vue')
      },
      {
        name: 'canvasPlane',
        text: 'canvas渐变',
        path: 'canvasPlane',
        component: () => import('../components/gradient/canvasPlane/canvasPlane.vue')
      },
    ]
  },
  {
    name: 'texture',
    text: '纹理',
    path: '/texture',
    component: () => import('../components/texture'),
    children: [
      {
        name: 'videoTexture',
        text: '视频纹理',
        path: 'videoTexture',
        component: () => import('../components/texture/videoTexture/videoTexture.vue')
      },
      {
        name: 'textureTest',
        text: '图片纹理',
        path: 'textureTest',
        component: () => import('../components/texture/textureTest/textureTest.vue')
      },
      {
        name: 'canvasMap',
        text: 'canvas纹理',
        path: 'canvasMap',
        component: () => import('../components/texture/canvasMap/canvasMap.vue')
      },
      {
        name: 'animate01',
        text: '动画纹理',
        path: 'animate01',
        component: () => import('../components/texture/animate01/animate01.vue')
      },
      {
        name: 'geometry',
        text: '几何纹理',
        path: 'geometry',
        component: () => import('../components/texture/geometry/geometry.vue')
      }
    ]
  },
  {
    name: 'sprite',
    text: '动画',
    path: '/sprite',
    component: () => import('../components/sprite'),
    children: [
      {
        name: 'anime',
        text: '精灵动画',
        path: 'anime',
        component: () => import('../components/sprite/anime/anime.vue')
      }
    ]
  },
  {
    name: 'reprint',
    text: '复刻场景',
    path: '/reprint',
    component: () => import('../components/reprint'),
    children: [
      {
        name: 'scatter',
        text: '星云',
        path: 'scatter',
        component: () => import('../components/reprint/scatter/scatter.vue')
      },
      {
        name: 'test',
        text: '星云test',
        path: 'test',
        component: () => import('../components/reprint/test/test.vue')
      }
    ]
  },
  {
    name: "test",
    text: "测试",
    path: "/test",
    component: () => import('../components/test'),
    children: [
      {
        name: 'resize',
        text: '可拖拽框',
        path: 'resize',
        component: () => import('../components/test/resize/index.vue')
      },
      {
        name: 'columnBarChart',
        text: '柱状图',
        path: 'columnBarChart',
        component: () => import('../components/test/columnBarChart/index.vue')
      },
      {
        name: 'table',
        text: '表格',
        path: 'table',
        component: () => import('../components/test/table/index.vue')
      },
      {
        name: 'list',
        text: '列表',
        path: 'list',
        component: () => import('../components/test/list/index.vue')
      },
      {
        name: 'modal',
        text: '模态框',
        path: 'modal',
        component: () => import('../components/test/modal/index.vue')
      },
      {
        name: 'editor',
        text: 'markdown编辑器',
        path: 'editor',
        component: () => import('../components/test/editor/index.vue')
      }
    ]
  }
]

export default new Router({ routes })

export { routes }
