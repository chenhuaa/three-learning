/*
 * @Author: your name
 * @Date: 2020-07-26 00:45:02
 * @LastEditTime: 2020-07-28 14:22:41
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /three-chenhua/src/components/animate01/animate01.js
 */ 
import * as THREE from 'three'
import image from '../../../assets/yanhua.jpg';

let scene, camera, renderer, texture;
let timer = 0;

function init(dom) {
  let width = dom.clientWidth, height = dom.clientHeight;
  !width && (width = 500);
  !height && (height = 500);
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
  camera.position.z = 1000;
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(width, height);
  renderer.setClearColor(0xcccccc);

  let plane = new THREE.PlaneGeometry(500,  500);

  // 设置UV坐标，取第一块图片内容
  plane.faceVertexUvs[0].forEach((ele, i) => {
    i == 0 && ele.forEach((vec, j) => {
      j == 0 && vec.set(0, 1)
      j == 1 && vec.set(0, 0.875)
      j == 2 && vec.set(0.125, 1)
    })
    i == 1 && ele.forEach((vec, j) => {
      j == 0 && vec.set(0, 0.875)
      j == 1 && vec.set(0.125, 0.875)
      j == 2 && vec.set(0.125, 1)
    })
  })

  // 方式2：TextureLoader
  // TextureLoader创建一个纹理加载器对象，可以加载图片作为几何体纹理
  let TextureLoader = new THREE.TextureLoader();
  // 执行load方法，加载纹理贴图成功后，返回一个纹理对象Texture
  texture = TextureLoader.load(image, function(texture) {
    let material = new THREE.MeshBasicMaterial({
      map: texture
    })
    let mesh = new THREE.Mesh(plane, material);
    scene.add(mesh);
    return texture
  });

  dom.appendChild(renderer.domElement);

  animate();
}
function render() {
  renderer.render(scene, camera);
}

function animate() {
  render();
  requestAnimationFrame(animate);
  timer++;
  if (timer < 3) return;
  timer = 0;
  // console.log(texture.offset.y, 'offset.y')
  if (texture.offset.x >= 0.8 && texture.offset.y != -1) {
    texture.offset.x = 0;
    texture.offset.y -= 0.125;
  } else if (0 + texture.offset.y > -1) {
    texture.offset.x += 0.125;
  } else {
    texture.offset.x = 0;
    texture.offset.y = 0;
  }
}

export { init }
