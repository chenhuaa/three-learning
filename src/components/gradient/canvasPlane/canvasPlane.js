function drawLinear(dom) {
  dom.width = 500;
  dom.height = 500;
  let ctx = dom.getContext('2d');

  let linear = ctx.createLinearGradient(100, 100, 500, 500);
  linear.addColorStop(0, '#fff000');
  linear.addColorStop(0.5, '#000fff');
  linear.addColorStop(1, '#00ff00');

  ctx.fillStyle = linear;
  ctx.fillRect(0, 0, 500, 500);
}

function drawRadial(dom) {
  dom.width = 500;
  dom.height = 500;
  let ctx  = dom.getContext('2d');

  let radial = ctx.createRadialGradient(150, 150, 100, 250, 250, 100);
  radial.addColorStop(0, '#fff000');
  radial.addColorStop(0.5, '#000fff');
  radial.addColorStop(1, '#00ff00');

  ctx.fillStyle = radial;
  ctx.fillRect(0, 0, 500, 500);
}

export { drawLinear, drawRadial }