// 特殊原因，
/* eslint-disable */

import * as THREE from 'three'
import image from './yanhua.jpg';

let scene, camera, renderer;

function init(dom) {
  let width = dom.clientWidth, height = dom.clientHeight;
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
  camera.position.z = 1000;
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(width, height);
  renderer.setClearColor(0xffffff);

  let plane = new THREE.PlaneGeometry(width, height);

  // 自定义纹理坐标
  // plane.faceVertexUvs[0].forEach((ele, i) => {
  //   i == 0 && ele.forEach((vec, j) => {
  //     j == 0 && vec.set(0, 0.5)
  //     j == 1 && vec.set(0, 0.375)
  //     j == 2 && vec.set(0.125, 0.5)
  //   })
  //   i == 1 && ele.forEach((vec, j) => {
  //     // TODO：顶点顺序与渲染方向有关系--每个面的顶点坐标的定义顺序必须遵循逆时针方向
  //     j == 0 && vec.set(0, 0.375)
  //     j == 2 && vec.set(0.125, 0.5)
  //     j == 1 && vec.set(0.125, 0.375)
  //   })
  // })

  // 方式1：ImageLoader
  // // 图片加载器
  // let ImageLoader = new THREE.ImageLoader();
  // // 执行load方法，按照路径加载图片，返回一个html的元素img对象
  // ImageLoader.load(image, function(img) {

  //   let texture = new THREE.Texture(img);
  //   // 下次使用纹理时触发更新
  //   texture.needsUpdate = true;

  //   let material = new THREE.MeshBasicMaterial({
  //     map: texture
  //   })
  //   let mesh = new THREE.Mesh(plane, material);
  //   scene.add(mesh);
  // });

  // 方式2：TextureLoader
  // TextureLoader创建一个纹理加载器对象，可以加载图片作为几何体纹理
  let TextureLoader = new THREE.TextureLoader();
  // 执行load方法，加载纹理贴图成功后，返回一个纹理对象Texture
  TextureLoader.load(image, function(texture) {
    let material = new THREE.MeshBasicMaterial({
      map: texture
    })
    // let mesh = new THREE.Mesh(textureTest01(), material);
    let mesh = new THREE.Mesh(textureTest02(plane), material);
    // let mesh = new THREE.Mesh(plane, material);
    scene.add(mesh);
  });
  

  dom.appendChild(renderer.domElement);

  animate();
}

function textureTest02(plane) {
  /**
   * 局部三角面显示完整纹理贴图
   */
  let vt0 = new THREE.Vector2(0, 1); //图片左下角
  let vt1 = new THREE.Vector2(0, 0); //图片右下角
  let vt2 = new THREE.Vector2(1, 0); //图片右上角
  let vt3 = new THREE.Vector2(1, 1); //图片左上角
  let uvs1 = [vt0, vt1, vt3]; //选中图片一个三角区域像素——用于映射到一个三角面
  let uvs2 = [vt1, vt2, vt3]; //选中图片一个三角区域像素——用于映射到一个三角面
  // 设置第五、第六个三角形面对应的纹理坐标
  plane.faceVertexUvs[0][4] = uvs1
  plane.faceVertexUvs[0][5] = uvs2
  return plane
}


function textureTest01() {
  let geometry = new THREE.Geometry(); //创建一个空几何体对象
  /**顶点坐标(纹理映射位置)*/
  let p1 = new THREE.Vector3(0,0,0); //顶点1坐标
  let p2 = new THREE.Vector3(160,0,0); //顶点2坐标
  let p3 = new THREE.Vector3(160,80,0); //顶点3坐标
  let p4 = new THREE.Vector3(0,80,0); //顶点4坐标
  geometry.vertices.push(p1,p2,p3,p4); //顶点坐标添加到geometry对象
  /** 三角面1、三角面2*/
  let normal = new THREE.Vector3( 0, 0, 1 ); //三角面法向量
  let face0 = new THREE.Face3( 0, 1, 2, normal); //三角面1
  let face1 = new THREE.Face3( 0, 2, 3, normal); //三角面2
  geometry.faces.push( face0,face1 ); //三角面1、2添加到几何体
  /**纹理坐标*/
  let t0 = new THREE.Vector2(0,0);//图片左下角
  let t1 = new THREE.Vector2(1,0);//图片右下角
  let t2 = new THREE.Vector2(1,1);//图片右上角
  let t3 = new THREE.Vector2(0,1);//图片左上角
  let uv1 = [t0,t1,t2];//选中图片一个三角区域像素——映射到三角面1
  let uv2 = [t0,t2,t3];//选中图片一个三角区域像素——映射到三角面2
  geometry.faceVertexUvs[0].push(uv1,uv2);//纹理坐标传递给纹理三角面属性
  return geometry
}

function render() {
  renderer.render(scene, camera);
}

function animate() {
  render();
  requestAnimationFrame(animate);
}

export { init }
