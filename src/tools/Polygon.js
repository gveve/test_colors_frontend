import { v4 } from 'uuid';
import chroma from 'chroma-js'

export const TOOL_POLYGON = 'Polygon';

export default (context) => {
  let imageData = null;
  let polygon = null;
  let points = [];
  let BB = null;
  var offsetX;
  var offsetY;
  var coordinates = [];
  var isDone=false;
  var cw = context.canvas.width;
  var ch = context.canvas.height;
  let COLOURS = []

  const onMouseDown = (x, y, color, size, fill, effect) => {

    polygon = {
      id: v4(),
      tool: TOOL_POLYGON,
      color,
      size,
      points: [{ x, y }],
      fill,
      effect
    };

    COLOURS = chroma.scale([color, '#FFFFFF']).colors(20)
    imageData = context.getImageData(0, 0, context.canvas.clientWidth, context.canvas.clientHeight);

    return [polygon];

  };

  const drawLine = (item, start, { x, y }) => {

      BB=context.canvas.getBoundingClientRect();
      offsetX=BB.left;
      offsetY=BB.top;

      const startX = x;
      const startY = y;
      let radius = Math.floor((Math.random()* 40 )+1);
      // let side = 2 * radius Math.tan(180/8);

      var cx = x;  //center x
      var cy = y;  //center y
      var n = 10;   //number of sides
      var centerAng = 2*Math.PI/n;
      var r = radius;  //radius. Dist from center to a vertex
      var ang;
      var startAng = Math.PI/2
      var vertex = [];
      vertex.push( {X:startX, Y:startY} )

      for(var i=0 ; i<n ; i++)
        { ang = startAng + (i*centerAng);
          let vx = Math.round(cx + r*Math.cos(ang));
          let vy = Math.round(cy - r*Math.sin(ang));
          vertex.push( {X:vx, Y:vy} );
        }

      let clr = COLOURS[Math.floor(Math.random()*COLOURS.length)]
      context.lineWidth=item.size;
      context.strokeStyle=clr;
      context.beginPath();
      context.globalCompositeOperation = item.effect
      context.globalAlpha = 0.5
      context.moveTo(vertex[0].X, vertex[0].Y);
      for(var index=1; index<vertex.length;index++) {
        context.lineTo(vertex[index].X, vertex[index].Y);
      }
      context.fillStyle = clr
      context.closePath();
      context.stroke();
      context.restore();
      // vertex = []
      if (item.size) context.fill()

  };

  const onMouseMove = (x, y) => {
    if (!polygon) return [];
    const newPoint = { x, y };
    const start = polygon.points.slice(-1)[0];
    // context.putImageData(imageData, 0, 0);
    drawLine(polygon, start, newPoint);
    polygon.points.push(newPoint);
    points.push(newPoint);

    return [polygon];
  };

  // const onDebouncedMouseMove = () => {
  //   const debouncedPoints = points;
  //   points = [];
  //   return [polygon, debouncedPoints];
  // };

  const onMouseUp = (x, y) => {
    if (!polygon) return;
    // onMouseMove(x, y);
    points = [];
    const item = polygon;
    polygon = null;
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
