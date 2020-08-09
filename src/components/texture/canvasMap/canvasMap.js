import * as THREE from 'three'

function gradient(w, h, dom) {
  let canvas = document.createElement('canvas');
  console.log(dom, 'iuytr')
  // dom.appendChild(canvas);
  canvas.width = w;
  canvas.height = h;

  let ctx = canvas.getContext('2d');
  let plane = ctx.createLinearGradient(0, 0, w, h);
  plane.addColorStop(0, 'pink');
  plane.addColorStop(1, 'purple');

  ctx.fillStyle = plane;
  ctx.fillRect(0, 0, w, h);
  
  return canvas;
}

function draw(w, h, dom) {
  let scene = new THREE.Scene();
  let camera = new THREE.PerspectiveCamera(45, w / h, 0.1, 1000);
  camera.position.z = 1000;
  let renderer = new THREE.WebGLRenderer();
  renderer.setSize(w, h)
  const canvas = new THREE.CanvasTexture(gradient(w, h, dom));
  canvas.minFilter = THREE.LinearFilter;
  let material = new THREE.MeshBasicMaterial({
    map: canvas,
    // transparent: true,
    // side: THREE.DoubleSide
  })
  let mesh = new THREE.Mesh(
    new THREE.PlaneGeometry(w, h),
    material
  )
  scene.add(mesh);

  dom.appendChild(renderer.domElement);
  renderer.render(scene, camera);
}

export { draw }

