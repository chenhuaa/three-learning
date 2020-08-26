/*
 * @Author: chenhua
 * @Date: 2020-08-24 10:41:07
 * @LastEditTime: 2020-08-26 12:01:46
 * @Description: 星球组合
 * @FilePath: /three-learning/src/components/reprint/scatter/planet.js
 */
import * as THREE from 'three'

import sphereBg from '../../../assets/reprint/outerzhihu.png'
import planetBg from '../../../assets/reprint/planet.png'
import zhihu from '../../../assets/reprint/zhihu.png'
import user from '../../../assets/reprint/body.png'

import Sprite from './sprite.js'
import Track from './track.js'

const INITIONS = {
  sphereSize: 200,
  centerImg1: sphereBg,
  centerImg2: planetBg,
  centerImg3: zhihu,
  iconImg: user,
  iconSize: 20,
  trackRadius: 200
}

// const INIT = Symbol('INIT');
const GROUP = Symbol('GROUP');
const SPHERE = Symbol('SPHERE');
const TRACK = Symbol('TRACK');
const TRACK_DATA = Symbol('TRACK_DATA');

class Planet {
  constructor(opts) {
    this.options = Object.assign({}, INITIONS, opts);
    let planet = this[GROUP]()
    return planet
  }

  [GROUP] () {
    let group = new THREE.Group();
    group.add(this[SPHERE]())
    group.add(this[TRACK]())
    this.animate();
    return group
  }

  [TRACK] () {
    let track = new THREE.Group();
    for (let j = 0; j < 3; j++) {
      let trackGroup = new Track({
        radius: this.options.trackRadius,
      })
      let quaternion = new THREE.Quaternion();
      quaternion.setFromAxisAngle(new THREE.Vector3(0, 1, 0), j * Math.PI / 3);
      for(let i = 1; i < 9; i++) {
        let arc = i * Math.PI / 4;
        // let arc = (Math.random() + 1) * i * Math.PI / 4;
        let icon = new Sprite({
          scale: this.options.iconSize,
          image: this.options.iconImg
        });
        icon.position.set(this.options.trackRadius * Math.sin(arc), this.options.trackRadius * Math.cos(arc), 0)
        const vector = new THREE.Vector3(icon.position.x, icon.position.y, icon.position.z)
        //icon.position.clone()
        vector.applyQuaternion(quaternion); 
        icon.position.set(vector.x, vector.y, vector.z)       
        trackGroup.add(icon);
      }
      trackGroup.rotation.y = j * Math.PI / 3;

      let vector = new THREE.Vector3(0, 0, 1);
      vector.applyQuaternion(quaternion);
      let matrix = new THREE.Matrix4();
      matrix.makeRotationFromQuaternion(quaternion)
      trackGroup.geometry.applyMatrix(matrix)

      // 轨道向量计算
      // let vec = new THREE.Vector3(Math.sin(j * Math.PI / 3), 0, Math.cos(j * Math.PI / 3));
      trackGroup.vec = vector;
      track.add(trackGroup);
    }
    this[TRACK_DATA] = track;
    return track
  }

  [SPHERE] () {
    let sphere = new THREE.Group();
    sphere.add(new Sprite({
      scale: this.options.sphereSize * 1.5,
      image: this.options.centerImg1
    }))
    sphere.add(new Sprite({
      scale: this.options.sphereSize * 1.3,
      image: this.options.centerImg2
    }))
    sphere.add(new Sprite({
      scale: this.options.sphereSize,
      image: this.options.centerImg3
    }))
    return sphere
  }

  animate () {
    this[TRACK_DATA].children.forEach((val) => {
      // if (i != 1) return
      // console.log(val, 'val')
      // let matrix = new THREE.Matrix4();
      // matrix.makeRotationAxis(val.vec.normalize(), Math.PI / 180);
      // matrix.multiply(val.matrix);
      // val.matrix = matrix;
      // val.rotation.setFromRotationMatrix(val.matrix);
      val.rotateOnAxis(val.vec, 0.01)
    })
    requestAnimationFrame(this.animate.bind(this));
  }
}

export default Planet
