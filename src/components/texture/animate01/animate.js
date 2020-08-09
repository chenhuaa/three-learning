/*
 * @Author: your name
 * @Date: 2020-07-28 14:35:15
 * @LastEditTime: 2020-08-09 20:07:32
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /three-learning/src/components/texture/animate01/animate.js
 */ 
import * as THREE from 'three'
import yanhua from '../../../assets/yanhua.jpg'

const INIT = Symbol('INIT');
const INIT_TEXTURE = Symbol('INIT_TEXTURE');
const INIT_MATERIAL = Symbol('INIT_MATERIAL');
const INIT_GEOMETRY = Symbol('INIT_GEOMETRY');
const INIT_MESH = Symbol('INIT_MESH');

const INITIONS = {
  row: 8,
  col: 8,
  iconLength: 64,
  img: yanhua,
  during: 3
}

class SpriteAnimate {
  constructor (opts, dom) {
    !opts.iconLength && (INITIONS.iconLength = this.options.row * this.options.col);
    this.options = Object.assign({}, INITIONS, opts);
    this.wUnit = 1 / this.options.row;
    this.hUnit = 1 / this.options.col;
    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.texture = null;
    this.timer = 0; // 记录实际帧数
    this.number = 0; // 图片帧数记录（实际位移次数） -- 最大帧数为iconLength
    this.timeEnd = this.options.during * 1000 / 16.7 / this.options.iconLength; // 时间控制
    this[INIT](dom)
    return this;
  }

  [INIT] (dom) {
    let width = dom.clientWidth, height = dom.clientHeight;
    !width && (width = 500);
    !height && (height = 500);
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
    this.camera.position.z = 1000;
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(width, height);
    this.renderer.setClearColor(0xcccccc);
    
    let axes = new THREE.AxesHelper(50);
    this.scene.add(axes);

    this[INIT_MESH] = new THREE.Mesh(this[INIT_GEOMETRY](), this[INIT_MATERIAL]());

    this.scene.add(this[INIT_MESH]);

    dom.appendChild(this.renderer.domElement);

    this.animate();
  }

  [INIT_GEOMETRY] () {
    let plane = new THREE.PlaneGeometry(500, 500);
    let t0 = [0, 1],
        t1 = [0, 1 - this.hUnit],
        t2 = [this.wUnit, 1 - this.hUnit],
        t3 = [this.wUnit, 1];
    plane.faceVertexUvs[0].forEach((ele, i) => {
      i == 0 && ele.forEach((vec, j) => {
        j == 0 && vec.set(...t0);
        j == 1 && vec.set(...t1);
        j == 2 && vec.set(...t3);
      })
      i == 1 && ele.forEach((vec, j) => {
        j == 0 && vec.set(...t1)
        j == 1 && vec.set(...t2)
        j == 2 && vec.set(...t3)
      })
    })
    return plane
  }

  [INIT_TEXTURE] () {
    this.texture = new THREE.TextureLoader().load(this.options.img);
    return this.texture
  }

  [INIT_MATERIAL] () {
    return new THREE.MeshBasicMaterial({
      map: this[INIT_TEXTURE]()
    })
  }

  render () {
    this.renderer.render(this.scene, this.camera);
  }

  animate () {
    this.render();
    requestAnimationFrame(this.animate.bind(this));
    this.timer++;
    // 时间控制
    if (this.timer < this.timeEnd) return;
    this.timer = 0;
    this.number++;
    if (this.number > this.options.iconLength) {
      this.number = 0;
      this.texture.offset.x = 0;
      this.texture.offset.y = 0;
    } else if (this.texture.offset.x >= 1 - this.wUnit && this.texture.offset.y != -1) {
      this.texture.offset.x = 0;
      // TODO：计算精度问题 待优化
      this.texture.offset.y -= this.hUnit;
    } else if (0 + this.texture.offset.y > -1) {
      this.texture.offset.x += this.wUnit;
    } else {
      this.texture.offset.x = 0;
      this.texture.offset.y = 0;
    }
  }
}


export default SpriteAnimate