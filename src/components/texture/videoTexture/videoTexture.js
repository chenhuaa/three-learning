import * as THREE from 'three'

let camera, scene, renderer;

function init(dom, video) {
  console.log(video, 'video')
  let width = dom.clientWidth, height = dom.clientHeight;
  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
  // camera.position.z = 40;
  // camera.position.y = 30;
  // camera.position.x = -40;
  camera.position.set(0, 0, 500);
  camera.lookAt(scene.position);

  renderer = new THREE.WebGLRenderer();
  renderer.setClearColor(new THREE.Color(0xeeeeee));
  renderer.setSize(width, height);

  let axes = new THREE.AxesHelper(20);
  axes.position.z = 100;
  scene.add(axes);

  let plane = new THREE.PlaneGeometry(800, 500);
  let texture = new THREE.VideoTexture(video);
  texture.wrapS = texture.wrapT = THREE.ClampToEdgeWrapping;
  texture.minFilter = THREE.LinearFilter;
  let material = new THREE.MeshBasicMaterial({map: texture});
  let mesh = new THREE.Mesh(plane, material);
  console.log(mesh, 'mata')
  scene.add(mesh);

  dom.appendChild(renderer.domElement);

  animate();
}

function render() {
  renderer.render(scene, camera);
}

function animate() {
  render();
  requestAnimationFrame(animate);
}

export { init }