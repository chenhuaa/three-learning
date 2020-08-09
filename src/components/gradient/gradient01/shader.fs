// 片元着色器

uniform vec3 u_resolution;
uniform float u_time;
varying vec3 pos;

void main() {
  vec3 size = vec3(50.0, 50.0, 50.0);
  vec3 st = pos.xyz/size.xyz;
  gl_FragColor = vec4(st.x, st.y, st.z, 1.0);
}
