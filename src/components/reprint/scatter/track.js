/*
 * @Author: chenhua
 * @Date: 2020-08-21 17:41:28
 * @LastEditTime: 2020-08-24 21:30:58
 * @Description: 星球轨道
 * @FilePath: /three-learning/src/components/reprint/scatter/track.js
 */
import * as THREE from 'three'
import image from '../../../assets/reprint/light_dot.png'
import vs from './Round.vs'
import fs from './Round.fs'

const texture = new THREE.TextureLoader().load(image)

const MESH = Symbol('MESH');
const TRACK_TORUS = Symbol('TRACK_TORUS');

const INITIONS = {
  radius: 120, // 环半径
  tube: 2, // 管道半径
  radialSegments: 16, // 圆环的分段数
  tubularSegments: 60, // 管道的分段数
}

class Track {
  constructor(opts) {
    this.options = Object.assign({}, INITIONS, opts);
    let track = this[TRACK_TORUS]();
    // this.animate();
    return track;
  }

  [MESH] () {
    // return new THREE.MeshBasicMaterial({
    //   color: 'rgb(142, 185, 245)',
    //   opacity: 0.5,
    //   // wireframe: true
    // })
    return new THREE.ShaderMaterial({
      side: THREE.DoubleSide,
      transparent: true,
      uniforms: {
        u_color: {
          value: new THREE.Color('rgb(142, 185, 245)')
        },
        u_map: {
          value: texture
        }
      },
      vertexShader: vs,
      fragmentShader: fs,
      depthWrite: false,
      blending: THREE.AdditiveBlending
    })
  }

  [TRACK_TORUS] () {
    return new THREE.Mesh(
      new THREE.TorusGeometry(
        this.options.radius,
        this.options.tube,
        this.options.radialSegments,
        this.options.tubularSegments
      ),
      this[MESH]()
    )
  }

  animate () {
    requestAnimationFrame(this.animate.bind(this));
  }
}

export default Track
