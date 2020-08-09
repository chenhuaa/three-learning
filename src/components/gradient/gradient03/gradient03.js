import * as THREE from 'three'

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

  // let face = new THREE.Face3(0, 1, 2);

  dom.appendChild(renderer.domElement);

  renderer.render(scene, camera);
}

export { init }
