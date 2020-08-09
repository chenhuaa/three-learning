import * as THREE from 'three'
import img from '../../../assets/lunkuo.jpg';
// import video from '../../../assets/video.mp4';
import { TrackballControls } from  '../../../../utils/trackballControl/TrackballControl.js'

let scene, camera, renderer;
let w, h;
let control = null;

function init(dom) {
  w = dom.clientWidth;
  h = dom.clientHeight;
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(60, w / h, 0.1, 1000);
  camera.position.set(0, 0, 700);
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(w, h);
  renderer.setClearColor(0x000000);
  scene.add(camera);
  dom.appendChild(renderer.domElement);

  control = new TrackballControls(camera, renderer.domElement);
}

function plane() {
  let plane = new THREE.PlaneGeometry(300, 300);
  console.log(plane, 'plane')
  plane.faceVertexUvs[0].forEach((ele, i) => {
    i == 0 && ele.forEach((vec, j) => {
      j == 0 && vec.set(0, 1)
      j == 1 && vec.set(0, 0.9)
      j == 2 && vec.set(0.125, 1)
    })
    i == 1 && ele.forEach((vec, j) => {
      j == 0 && vec.set(0, 0.9)
      j == 1 && vec.set(0.125, 0.9)
      j == 2 && vec.set(0.125, 1)
    })
  })
  return plane;
}

function cube() {
  let cube = new THREE.BoxGeometry(450, 250, 250);
  console.log(cube, 'cube')
  cube.faceVertexUvs[0].forEach((ele, i) => {
    i % 2 == 0 && ele.forEach((vec, j) => {
      j == 0 && vec.set(0, 1)
      j == 1 && vec.set(0, 0.9)
      j == 2 && vec.set(0.125, 1)
    })
    i % 2 == 1 && ele.forEach((vec, j) => {
      j == 0 && vec.set(0, 0.9)
      j == 1 && vec.set(0.125, 0.9)
      j == 2 && vec.set(0.125, 1)
    })
  })
  return cube;
}

function sphere() {
  let sphere = new THREE.SphereGeometry(200, 200, 200);
  console.log(sphere, 'sphere')
  // sphere.faceVertexUvs[0].forEach((ele, i) => {
  //   i == 0 && ele.forEach((vec, j) => {
  //     j == 0 && vec.set(0, 1)
  //     j == 1 && vec.set(0, 0.9)
  //     j == 2 && vec.set(0.125, 1)
  //   })
  //   i == 1 && ele.forEach((vec, j) => {
  //     j == 0 && vec.set(0, 0.9)
  //     j == 1 && vec.set(0.125, 0.9)
  //     j == 2 && vec.set(0.125, 1)
  //   })
  // })
  return sphere;
}

async function draw(dom, type) {
  await init(dom);
  if (type == 'img') {
    let textureLoader = new THREE.TextureLoader();
    textureLoader.load(img, (texture) => {
      let material = new THREE.MeshBasicMaterial({
        map: texture
      })
      drawMesh(material);
    })
  } else {
    // let loader = new THREE.MaterialLoader();
    // loader.load(video, (texture) => {
    //   console.log('lkj')
    //   let material = new THREE.MeshBasicMaterial({
    //     map: texture
    //   })
    //   drawVideoMesh(material);
    // })
  }
}

function drawMesh(material) {
  let axes = new THREE.AxesHelper(50);
  scene.add(axes);

  let meshPlane = new THREE.Mesh(plane(), material);// 设置UV坐标，取第一块图片内容
  scene.add(meshPlane);
  meshPlane.position.set(-300, 150, 0)

  let meshCube = new THREE.Mesh(cube(), material);
  scene.add(meshCube);
  meshCube.position.set(250, 150, -200);
  meshCube.rotation.x = - Math.PI / 9;
  meshCube.rotation.y = Math.PI / 9;

  let meshSphere = new THREE.Mesh(sphere(), material);
  scene.add(meshSphere);
  meshSphere.position.set(0, -100, 100);
  meshSphere.rotation.x = Math.PI / 2

  render();
}

// function drawVideoMesh(material) {
  // let meshPlane = new THREE.Mesh(plane(), material);
  // scene.add(meshPlane);
  // meshPlane.position.set(-300, -150, 0)
// }

/**
 * @description: render函数必须写在最后
 * @param {type} 
 * @return {type} 
 */
function render() {
  renderer.render(scene, camera);
  requestAnimationFrame(render);
  control.update();
}

export { draw }