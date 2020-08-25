<template>
  <div class="container"></div>
</template>
<script>
import * as THREE from 'three'
import { TrackballControls } from  '../../../../utils/trackballControl/TrackballControl.js'

export default {
  data() {
    return {
      scene: null,
      renderer: null,
      camera: null,
    }
  },
  mounted() {
    this.createScene();
  },
  methods: {
    createScene() {
      let dom = document.getElementsByClassName('container')[0];
      this.scene = new THREE.Scene();
      this.camera = new THREE.PerspectiveCamera(40, dom.clientWidth / dom.clientHeight, 0.1, 1000);
      this.camera.position.z = 1000;
      this.camera.position.x = 100;
      this.renderer = new THREE.WebGLRenderer({
        antialias: true,
      });
      this.renderer.setSize(dom.clientWidth, dom.clientHeight);
      this.renderer.setClearColor('#000');

      dom.appendChild(this.renderer.domElement);   
      this.controls = new TrackballControls(this.camera, this.renderer.domElement);

      this.createTorusGroup();

      this.animate();
    },
    animate() {
      this.renderer.render(this.scene, this.camera);
      requestAnimationFrame(this.animate.bind(this));
      this.controls.update();

      // console.log(this.torus, 'this.torus')
      // let matrix = new THREE.Matrix4();
      // matrix.makeRotationAxis(this.torus.vec.normalize(), Math.PI / 180);
      // matrix.multiply(this.torus.matrix);
      // this.torus.matrix = matrix;
      // this.torus.rotation.setFromRotationMatrix(this.torus.matrix);

      // console.log(this.group, 'group')
      this.group.children.forEach(val => {
        let matrix = new THREE.Matrix4();
        matrix.makeRotationAxis(val.vec.normalize(), Math.PI / 180);
        matrix.multiply(val.matrix);
        val.matrix = matrix;
        val.rotation.setFromRotationMatrix(val.matrix);
      })
    },
    createTorus() {
      this.torus = new THREE.Mesh(
        new THREE.TorusGeometry(120, 6, 6, 10),
        new THREE.MeshBasicMaterial({
          color: '#f0f',
          wireframe: true
        })
      )
      this.torus.rotation.y = Math.PI / 4;
      let quaternion = new THREE.Quaternion();
      quaternion.setFromAxisAngle(new THREE.Vector3(0, 1, 0), Math.PI / 4);
      let vector = new THREE.Vector3(0, 0, 1);
      vector.applyQuaternion(quaternion);
      this.torus.vec = vector;
      this.scene.add(this.torus);
    },
    createTorusGroup() {
      this.group = new THREE.Group();
      for (let i = 0 ; i < 3; i++) {
        let torus = new THREE.Mesh(
          new THREE.TorusGeometry(120, 6, 6, 10),
          new THREE.MeshBasicMaterial({
            color: '#f0f',
            wireframe: true
          })
        )
        torus.rotation.y = i * Math.PI / 3;
        let quaternion = new THREE.Quaternion();
        quaternion.setFromAxisAngle(new THREE.Vector3(0, 1, 0), i * Math.PI / 3);
        let vector = new THREE.Vector3(0, 0, 1);
        vector.applyQuaternion(quaternion);
        torus.vec = vector;
        this.group.add(torus);
      }
      this.scene.add(this.group);
    }
  }
}
</script>
<style>
.container {
  width: 100%;
  height: 100%;
}
</style>
