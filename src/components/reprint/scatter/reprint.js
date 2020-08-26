/*
 * @Author: chenhua
 * @Date: 2020-08-10 18:51:38
 * @LastEditTime: 2020-08-26 11:59:09
 * @Description: 场景组合
 * @FilePath: /three-learning/src/components/reprint/scatter/reprint.js
 */
import * as THREE from 'three'
import * as d3 from 'd3'
import zhihu from '../../../assets/reprint/zhihu.png'
import { TrackballControls } from  '../../../../utils/trackballControl/TrackballControl.js'
import Planet from './planet.js'

const INITIONS = {
  sphereSize: 200,
  trackRadius: 200,
  centerImg3: zhihu,
  iconSize: 40
}

const INIT = Symbol('INIT');
const GROUP = Symbol('GROUP');

class Sphere {
  constructor (opts, dom) {
    this.options = Object.assign({}, INITIONS, opts);
    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.controls = null; // 控制器
    this[INIT](dom);
    return this;
  }

  [INIT](dom) {
    let w = dom.clientWidth, h = dom.clientHeight;
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(60, w / h, 0.1, 10000);
    this.camera.position.z = 800;
    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true
    });
    this.renderer.setSize(w, h);
    this.renderer.setClearAlpha(0.0);

    // light
    let ambient = new THREE.AmbientLight('rgb(142, 185, 245)');
    this.scene.add(ambient);

    let axes = new THREE.AxesHelper(50);
    this.scene.add(axes);

    let group = new THREE.Group();

    for (let i = 0; i < 10; i++) {
      let planet = new Planet(this.options);
      // let step = (i + 1) * 100;
      // planet.position.x = Math.random() * step - step / 2
      // planet.position.y = Math.random() * step - step / 2
      // planet.position.z = Math.random() * 1000 - 500
      group.add(planet)
    }

    // 包布局
    let data = d3.hierarchy(group, d => { return d.children })
                .sum(d => { return d.value })
    let pack = d3.pack()
                .size([w, h])
                .padding(1)
                .radius(() => { return 8 });
    let stars = pack(data);

    stars.children.forEach((d, i) => {
      group.children[i].position.x = d.x - w / 2
      group.children[i].position.y = d.y - w / 2
      group.children[i].position.z = Math.random() * 1000 - 500
    })

    this[GROUP] = group;

    this.scene.add(this[GROUP]);

    dom.appendChild(this.renderer.domElement);

    this.controls = new TrackballControls(this.camera, this.renderer.domElement);

    this.animate();
  }
  
  animate () {
    this.renderer.render(this.scene, this.camera);
    requestAnimationFrame(this.animate.bind(this));
    this.controls.update();
    this.scene.rotation.y += 0.001;
  }
}

export default Sphere
