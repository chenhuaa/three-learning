import * as THREE from 'three'

let scene, camera, renderer;

function init(dom) {
  let width = dom.clientWidth, height = dom.clientHeight;
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
  camera.position.x = 100;
  camera.position.y = 100;
  camera.position.z = 100;
  camera.lookAt(scene.position);
  renderer = new THREE.WebGLRenderer();
  renderer.setClearColor(0xffffff);
  renderer.setSize(width, height);

  let axes = new THREE.AxesHelper(50);
  scene.add(axes);

  gradient();
  normal();

  dom.appendChild(renderer.domElement);

  animate();
}

function gradient() {
  // 声明一个缓冲几何对象
  let geometry = new THREE.BufferGeometry();
  // 类型化数组创建顶点位置
  let position = new Float32Array([
    -30, 0, 40,
    30, 0, 40,
    10, 0, -40,
    -50, 0, -40,
    -30, 0, 40,
    10, 0, -40,
  ])
  // TODO：透明度无效果？？
  // g
  let color = new Float32Array([
    1, 0, 0, 0.1,
    0, 1, 0, 0.1,
    0, 0, 1, 0.1,
    1, 0, 1, 0.1,
    0, 1, 1, 0.1,
    1, 1, 0, 0.1,
  ])
  // let normal = new Float32Array([
    
  // ])
  // 设置几何体attributes属性的位置和颜色属性
  geometry.attributes.position = new THREE.BufferAttribute(position, 3);
  geometry.attributes.color = new THREE.BufferAttribute(color, 4);

  // 用于 Mesh、Line
  let material = new THREE.MeshBasicMaterial({
    vertexColors: THREE.VertexColors // 支持颜色插值
  })
  // 用于 Points
  // let material = new THREE.PointsMaterial({
  //   vertexColors: VertexColors,
  //   size: 10.0
  // })

  let mesh = new THREE.Mesh(geometry, material);
  // let mesh = new THREE.Line(geometry, material);
  // let mesh = new THREE.Points(geometry, material);
  scene.add(mesh);
}

function normal() {
  let geometry = new THREE.BufferGeometry();
  // 注意：顶点顺序问题，顺序不对得不到渲染预期效果（此处是三角形渲染）
  let position = new Float32Array([
    30, 0, 0,
    60, 0, 0,
    45, 60, 0,
    30, 0, 0,
    45, 0, 60,
    60, 0, 0,
  ])
  // TODO：添加法向量后，几何面对光无实际的效果？？
  let normals = new Float32Array([
    0, 0, 1,
    0, 0, 1,
    0, 0, 1,
    0, 1, 0,
    0, 1, 0,
    0, 1, 0,
  ])
  let material = new THREE.MeshLambertMaterial({
    color: '#33f',
    // wireframe: true
  })
  geometry.attributes.position = new THREE.BufferAttribute(position, 3);
  geometry.attributes.normal = new THREE.BufferAttribute(normals, 3);
  let mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  // 平行光
  var directionalLight = new THREE.DirectionalLight(0xffffff, 1);
  // 设置光源的方向：通过光源position属性和目标指向对象的position属性计算
  // directionalLight.position.set(50, 60, 100);

  // 方向光指向对象网格模型mesh，可以不设置，默认的位置是0,0,0
  // directionalLight.target = mesh;
  scene.add(directionalLight);
}

function render() {
  renderer.render(scene, camera);
}

function animate() {
  render();
  requestAnimationFrame(animate);
}

export { init }