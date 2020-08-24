varying vec2 v_uv;
uniform sampler2D u_map;
uniform vec3 u_color;

void main () {
  vec4 t_color = texture2D( u_map, v_uv.st );
  t_color.rgb *= t_color.rgb * u_color;
  t_color.a *= 0.35;
  if (t_color.a < 0.05) {
    discard;
  }
  gl_FragColor = t_color;
}