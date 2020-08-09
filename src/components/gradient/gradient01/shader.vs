// 顶点着色器
varying vec3 pos;
void main() {
  pos = position;
  gl_Position = projectionMatrix * modelViewMatrix * vec4 (position, 2.0);
}