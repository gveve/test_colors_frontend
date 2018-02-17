import { v4 } from 'uuid';
import chroma from 'chroma-js'

export const TOOL_POLY = 'Poly';

export default (context) => {
  let poly = null;
  let points = [];
  let BB = null;
  var offsetX;
  var offsetY;
  var coordinates = [];
  var isDone=false;
  var vertex = [];
  var cw = context.canvas.width;
  var ch = context.canvas.height;
  let COLOURS = []

  const onMouseDown = (x, y, color, size, fill) => {
    poly = {
      id: v4(),
      tool: TOOL_POLY,
      color,
      size,
      fill,
      points: [{ x, y }],
    };

    COLOURS = chroma.scale([color, '#FFFFFF']).colors(20)
      console.log("down",poly);
    return [poly];

  };

  const drawLine = (item, start, { x, y }) => {
    BB=context.canvas.getBoundingClientRect();
    offsetX=BB.left;
    offsetY=BB.top;

    const startX = start.x;
    const startY = start.y;
    let radius = Math.floor((Math.random()* 40 )+1);
    // let side = 2 * radius Math.tan(180/8);

    var cx = x;  //center x
    var cy = y;  //center y
    var n = 10;   //number of sides
    var centerAng = 2*Math.PI/n;
    var r = radius;  //radius. Dist from center to a vertex
    var ang;
    var startAng = Math.PI/2
    // vertex.push( {X:startX, Y:startY} )

    for(var i=0 ; i<n ; i++)
      { ang = startAng + (i*centerAng);
        let vx = Math.round(cx + r*Math.cos(ang));
        let vy = Math.round(cy - r*Math.sin(ang));
        vertex.push( {X:vx , Y:vy} );
      }
    // vertex.push( {X:startX, Y:startY} )

    let clr = COLOURS[Math.floor(Math.random()*COLOURS.length)]
    context.lineWidth=item.size;
    context.strokeStyle=clr;
    context.beginPath();
    context.moveTo = (vertex[0].X, vertex[0].Y);
    for(var index=1; index<vertex.length;index++) {
      context.lineTo(vertex[index].X, vertex[index].Y);
    }
    context.globalAlpha = 0.5
    context.fillStyle = clr
    context.closePath();
    context.stroke();
    context.restore();
    // if (item.fill) context.fill()
  };

  const onMouseMove = (x, y) => {
    if (!poly) return [];
    const newPoint = { x, y };
    const start = poly.points.slice(-1)[0];
    drawLine(poly, start, newPoint);
    poly.points.push(newPoint);
    points.push(newPoint);

    return [poly];
  };

  // const onDebouncedMouseMove = () => {
  //   const debouncedPoints = points;
  //   points = [];
  //   return [poly, debouncedPoints];
  // };

  const onMouseUp = (x, y) => {
    if (!poly) return;
    // onMouseMove(x, y);
    points = [];
    vertex = []
    const item = poly;
    poly = null;
    return [item];
  };

  const draw = (item, animate) => {
    let time = 0;
    let i = 0;
    const j = item.points.length;
    for (i, j; i < j; i++) {
      if (!item.points[i - 1]) continue;
      if (animate) {
        setTimeout(drawLine.bind(null, item, item.points[i - 1], item.points[i]), time);
        time += 10;
      } else {
        drawLine(item, item.points[i - 1], item.points[i]);
      }
    }
  };

  return {
    onMouseDown,
    onMouseMove,
    // onDebouncedMouseMove,
    onMouseUp,
    draw,
  };
};
