import * as THREE from 'three'
import { Vector3 } from 'three';

function init(w, h, dom) {
  let scene = new THREE.Scene();
  let camera = new THREE.PerspectiveCamera(45, w / h, 0.1, 1000);
  
  let renderer = new THREE.WebGLRenderer({
    antialias: true // 开启反锯齿
  })
  renderer.setSize(w, h);
  renderer.setClearColor(0x333333, 1.0);
  
  // 创建坐标轴（红-x，绿-y，蓝-z）
  let axes = new THREE.AxesHelper(20);
  scene.add(axes);

  camera.position.set(-100, 520, 100);
  camera.up.set(0, 0, 1);
  // camera.lookAt({
  //   x: 0,
  //   y: 0,
  //   z: 0
  // });

  // 定位相机，并指向场景
  // camera.position.set(-100, 120, 100);
  camera.lookAt(scene.position);
  console.log(scene.position)

  let light = new THREE.DirectionalLight(0xff0000, 1, 0);
  light.position.set(100, 100, 200);

  let geometry = new THREE.Geometry();
  let material = new THREE.LineBasicMaterial({
    vertexColors: true // 使用顶点元素
  })

  // 定义顶点颜色
  let color1 = new THREE.Color(0x00ff00);
  let color2 = new THREE.Color(0xff00ff);
  // 线的材质由两点的颜色决定
  let p1 = new Vector3(-100, 0, 100);
  let p2 = new Vector3(100, 0, -100);
  geometry.vertices.push(p1, p2);
  geometry.colors.push(color1, color2);

  let line = new THREE.LineSegments(geometry, material);
  scene.add(line);
  console.log('lkuy890p')
  dom.appendChild(renderer.domElement);

  renderer.render(scene, camera);
}

export { init }
