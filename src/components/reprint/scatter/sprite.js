/*
 * @Author: chenhua
 * @Date: 2020-08-11 16:45:37
 * @LastEditTime: 2020-08-25 17:04:41
 * @Description: 精灵
 * @FilePath: /three-learning/src/components/reprint/scatter/sprite.js
 */
import * as THREE from 'three'
import user from '../../../assets/reprint/body.png'

// const INIT = Symbol('INIT');
const SPRITE = Symbol('SPRITE');

const INITIONS = {
  scale: 10,
  image: user
}

class Sprite {
  constructor(opts) {
    this.options = Object.assign({}, INITIONS, opts);
    let sprite = this[SPRITE]();
    sprite.scale.set(...new Array(3).fill(this.options.scale));
    return sprite;
  }

  [SPRITE]() {
    return new THREE.Sprite(
      new THREE.SpriteMaterial({
        map: new THREE.TextureLoader().load(this.options.image),
        transparent: true,
        blending: THREE.NormalBlending,
        depthWrite: false,
        // alphaTest: 1.0
        // blending: THREE.AdditiveBlending,
      })
    )
  }

  animate () {
    requestAnimationFrame(this.animate.bind(this));
  }
}

export default Sprite

