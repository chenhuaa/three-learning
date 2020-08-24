import * as THREE from 'three'
import lunkuo from '../../../assets/lunkuo.jpg'
import { TrackballControls } from  '../../../../utils/trackballControl/TrackballControl.js'


const INIT = Symbol('INIT');
const SPRITE = Symbol('SPRITE');
const MATERIAL = Symbol('MATERIAL');
// const INIT_GEOMETRY = Symbol('INIT_GEOMETRY');

const INITIONS = {
  row: 8,
  col: 10,
  iconLength: 64,
  img: lunkuo,
  during: 3
}

class SpriteAnime {
  constructor(opts, dom) {
    !opts.iconLength && (INITIONS.iconLength = this.options.row * this.options.col);
    this.options = Object.assign({}, INITIONS, opts);
    this.wUnit = 1 / this.options.row;
    this.hUnit = 1 / this.options.col;
    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.controls = null; // 控制器
    this.sprite = null;
    this.timer = 0; // 记录实际帧数
    this.number = 0; // 图片帧数记录（实际位移次数） -- 最大帧数为iconLength
    this.timeEnd = this.options.during * 1000 / 16.7 / this.options.iconLength; // 时间控制
    this[INIT](dom)
    return this
  }

  [INIT](dom) {
    let w = dom.clientWidth, h = dom.clientHeight;
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(60, w / h, 0.1, 1000);
    this.camera.position.z = 1000;
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(w, h);
    this.renderer.setClearColor(0x000);

    let axes = new THREE.AxesHelper(50);
    this.scene.add(axes);
    
    this.sprite = this[SPRITE]();
    this.sprite.scale.set(700,700,700);
    this.scene.add(this.sprite);
    this.sprite.material.map.offset.x = 0;
    this.sprite.material.map.offset.y = 1 - this.hUnit;

    // let tmp = new THREE.Mesh(new THREE.PlaneGeometry(300,300), new THREE.MeshBasicMaterial({
    //   map: new THREE.TextureLoader().load(this.options.img)
    // }))
    // this.scene.add(tmp)

    dom.appendChild(this.renderer.domElement);

    this.controls = new TrackballControls(this.camera, this.renderer.domElement);

    this.animate();
  }

  [MATERIAL]() {
    let texture = new THREE.TextureLoader().load(this.options.img);
    let material = new THREE.SpriteMaterial({
      map: texture
    })
    material.map.repeat = new THREE.Vector2(this.wUnit, this.hUnit);
    return material;
  }

  [SPRITE]() {
    return new THREE.Sprite(this[MATERIAL]());
  }
  
  animate () {
    this.renderer.render(this.scene, this.camera);
    requestAnimationFrame(this.animate.bind(this));
    this.controls.update();
    this.timer++;
    // 时间控制
    if (this.timer < this.timeEnd) return;
    this.timer = 0;
    this.number++;
    if (this.number > this.options.iconLength) {
      this.number = 0;
      this.sprite.material.map.offset.x = 0;
      this.sprite.material.map.offset.y = 1 - this.hUnit;
    } else if (this.sprite.material.map.offset.x >= 1 - this.wUnit) { // 换行
      this.sprite.material.map.offset.x = 0;
      // TODO：计算精度问题 待优化
      this.sprite.material.map.offset.y -= this.hUnit;
    } else if (0 + this.sprite.material.map.offset.x < 1 - this.wUnit) {
      this.sprite.material.map.offset.x += this.wUnit;
    } else {
      this.sprite.material.map.offset.x = 0;
      this.sprite.material.map.offset.y = 1 - this.hUnit;
    }
  }
}

export default SpriteAnime
