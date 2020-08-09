import * as THREE from 'three'
import { Stats, Dat} from '../../../../utils/index.js'
import { TrackballControls } from  '../../../../utils/trackballControl/TrackballControl.js'

// const THREE = window.THREE;

let scene = null, camera = null, renderer = null;
let cube = null, sphere = null;
let step = 0;
let stats = null;
let guiControls = new function() {
  this.rotationSpeed = 0.02;
  this.bouncingSpeed = 0.03;
}
let controls = null, gui = null;

function init(width, height, dom) {
  stats = initState(dom);
  
  scene = new THREE.Scene();

  // 透视投影摄像机
  camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
  renderer = new THREE.WebGLRenderer();
  renderer.setClearColor(new THREE.Color(0x333333));
  renderer.setSize(width, height);
  renderer.shadowMapEnabled = true; // 开启阴影效果

  // 创建坐标轴（红-x，绿-y，蓝-z）
  let axes = new THREE.AxesHelper(10);
  scene.add(axes);

  // 创建平面
  let planeGeometry = new THREE.PlaneGeometry(60, 30);
  let planeMaterial = new THREE.MeshBasicMaterial({
    color: 0xAAAAAA
  })
  let plane = new THREE.Mesh(planeGeometry, planeMaterial);
  plane.rotation.x = -0.5 * Math.PI;
  plane.position.set(25, -10, -10);
  plane.receiveShadow = true; // 接收阴影
  scene.add(plane);

  // 创建立方体
  let cubeGeometry = new THREE.BoxGeometry(5, 5, 5);
  let cubeMaterial = new THREE.MeshBasicMaterial({
    color: 0x606088,
    wireframe: true
  })
  cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
  cube.castShadow = true;
  cube.position.set(20, 3, 0)
  scene.add(cube);

  // 创建球
  let sphereGeometry = new THREE.SphereGeometry(4, 20, 20);
  let sphereMaterial = new THREE.MeshStandardMaterial({
    metalness: 0,
    roughness: 0.4,
    color: 0xcf1ce68
  })
  sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
  sphere.position.set(-10, 5, 2);
  sphere.castShadow = true; // 投射阴影
  scene.add(sphere)

  // 创建光源
  let spotLight = new THREE.SpotLight(0xffffff); // 点光源
  spotLight.position.set(-20, 20, -15);
  spotLight.angle = Math.PI / 4;
  // spotLight.position.set(-30, 20, 0);
  spotLight.castShadow = true; // 投射阴影
  spotLight.shadow.mapSize = new THREE.Vector2(1024, 1024);
  spotLight.shadow.camera.far = 1300;
  spotLight.shadow.camera.near = 0;
  // spotLight.target = sphere;
  scene.add(spotLight);

  let light = new THREE.SpotLightHelper(spotLight, 0xdfdfdf);
  scene.add(light);

  // 定位相机，并指向场景
  camera.position.set(-50, 40, 50);
  camera.lookAt(scene.position);

  // 挂在到html上
  dom.appendChild(renderer.domElement);

  controls = new TrackballControls(camera, renderer.domElement);
  // clock = new THREE.Clock();

  animate();
  initDat();
}

function onResize (w, h) {
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
  renderer.setSize(w, h);
}

function render () {
  // 渲染场景
  renderer.render(scene, camera);
}

function animate () {
  stats.update();
  render();
  requestAnimationFrame(animate);

  controls.update();

  // 立方体动画
  cube.rotation.x += guiControls.rotationSpeed;
  cube.rotation.y += guiControls.rotationSpeed;
  cube.rotation.z += guiControls.rotationSpeed;

  // 球体动画
  step += guiControls.bouncingSpeed;
  sphere.position.x = 5 + 10 * (Math.cos(step));
  sphere.position.y = -10 + 10 * Math.abs(Math.sin(step));
}

function initState (dom, type) {
  let panel = (typeof type !== 'undefined' && type) && (!isNaN(type)) ? parseInt(type) : 0;
  let stats = new Stats();
  stats.showPanel(panel); // 0: fps, 1: ms, 2: mb, 3+: custom
  dom.appendChild(stats.dom);
  return stats
}

function initDat () {
  gui = new Dat.GUI();
  gui.add(guiControls, 'rotationSpeed', 0, 0.5)
  gui.add(guiControls, 'bouncingSpeed', 0, 0.5)
}

export { init, onResize, gui }