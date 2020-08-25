/*
 * @Author: chenhua
 * @Date: 2020-08-24 16:30:30
 * @LastEditTime: 2020-08-25 15:19:21
 * @Description: 天空盒
 * @FilePath: /three-learning/src/components/reprint/scatter/skyBox.js
 */
import * as THREE from 'three'
import left from '../../../assets/skybox/left.jpg'
import right from '../../../assets/skybox/right.jpg'
import top from '../../../assets/skybox/top.jpg'
import bottom from '../../../assets/skybox/bottom.jpg'
import front from '../../../assets/skybox/front.jpg'
import back from '../../../assets/skybox/back.jpg'

const INIT = Symbol('INIT')
const MESH = Symbol('MESH')

const INITIONS = {
  boxSize: 5000,
  color: '#ffffff',
  maps: [left, right, top, bottom, front, back],
  rotation: {
    x: 0,
    y: 0,
    z: 0
  }
}

class SkyBox {
  constructor (opts, dom) {
    this.options = Object.assign({}, INITIONS, opts);
    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this[INIT](dom);
    return this;
  }

  [INIT] (dom) {
    let w = dom.clientWidth, h = dom.clientHeight;
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(60, w / h, 0.1, 1000);
    this.camera.position.z = 100;
    this.camera.position.y = 10;
    this.renderer = new THREE.WebGLRenderer({ antialias: true })
    this.renderer.setSize(w, h);
    this.scene.add(this[MESH]());

    // let axes = new THREE.AxesHelper(100);
    // this.scene.add(axes);

    dom.appendChild(this.renderer.domElement);

    this.animate();
  }

  [MESH] () {
    let materialArr = [];
    this.options.maps.forEach(val => {
      materialArr.push(
        new THREE.MeshBasicMaterial({
          map: new THREE.TextureLoader().load(val),
          side: THREE.DoubleSide,
          color: this.options.color
        })
      )
    })
    return this[MESH] = new THREE.Mesh(
      new THREE.BoxGeometry(...new Array(3).fill(this.options.boxSize)),
      materialArr
    )
  }

  animate() {
    this.renderer.render(this.scene, this.camera);
    requestAnimationFrame(this.animate.bind(this));
    this.scene.rotation.y += 0.0005;
  }
}

export default SkyBox
