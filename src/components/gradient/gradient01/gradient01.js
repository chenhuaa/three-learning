import * as THREE from 'three'
import vertexShader from './shader.vs'
import fragmentShader from './shader.fs'
import { TrackballControls } from  '../../../../utils/trackballControl/TrackballControl.js'

let camera, scene, renderer;
let uniforms;
let width, height;
let control = null;

function init(w, h, dom) {
  width = w;
  height = h;

  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(45, w / h, 1, 1000);
  camera.position.z = 200;

  let geometry = new THREE.CubeGeometry(50,50,50);

  uniforms = {
    u_time: {
      type: 'f',
      value: 1.0
    },
    u_resolution: {
      type: 'v3',
      value: new THREE.Vector3()
    },
    u_mouse: {
      type: 'v2',
      value: new THREE.Vector2()
    }
  }

  // 定制着色器
  let material = new THREE.ShaderMaterial({
    uniforms: uniforms,
    // wireframe: true,
    vertexShader: vertexShader, // 顶点着色器
    fragmentShader: fragmentShader, // 片元着色器
  })

  let mesh = new THREE.Mesh(geometry, material);
  // let mesh = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({color: 0x00ffff}));
  scene.add(mesh);

  scene.add(new THREE.AxesHelper(100))

  renderer = new THREE.WebGLRenderer();
  // renderer.setPixelRatio(2); // 设置像素比（window.devicePixelRatio不推荐使用）

  onWindowResize();
  window.addEventListener('resize', onWindowResize, false);

  dom.appendChild(renderer.domElement)

  control = new TrackballControls(camera, renderer.domElement);

  animate();
}

function onWindowResize() {
  renderer.setClearColor(new THREE.Color(0x333333));
  renderer.setSize(width, height);
  uniforms.u_resolution.value.x = renderer.domElement.width;
  uniforms.u_resolution.value.y = renderer.domElement.height;
  uniforms.u_resolution.value.z = 20;
}

// function animate() {
//   requestAnimationFrame(animate);
//   render();
// }

function render() {
  uniforms.u_time.value += 0.05;
  renderer.render(scene, camera)
}

function animate() {
  render();
  requestAnimationFrame(animate);
  control.update();
}

export { init }
