import { v4 } from 'uuid';

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

  const onMouseDown = (x, y, color, size) => {
    poly = {
      id: v4(),
      tool: TOOL_POLY,
      color,
      size,
      points: [{ x, y }]
    };
    return [poly];

    BB=canvas.getBoundingClientRect();
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
    var startAng = startAng = Math.PI/2

    function toRadians(degs)
  { return Math.PI*degs/180;
  }

    if(startAng == 0) //none supplied
     {  if(isOdd(n))
         startAng = Math.PI/2;  //12 oclock
    else
       startAng = Math.PI/2 - centerAng/2;
     }

    function isOdd(n)
      { return (n%2 == 1);
    }

    for(var i=0 ; i<n ; i++)
      { ang = startAng + (i*centerAng);
        let vx = Math.round(cx + r*Math.cos(ang));
        let vy = Math.round(cy - r*Math.sin(ang));
        vertex.push( {X:vx , Y:vy} );
      }
  };

  const drawLine = (item, start, { x, y }) => {
    context.lineWidth=2;
    context.strokeStyle='blue';
    context.clearRect(0,0,cw,ch);
    context.beginPath();
    context.moveTo(vertex[0].x, vertex[0].y);
    for(var index=1; index<vertex.length;index++) {
      context.lineTo(vertex[index].x, vertex[index].y);
    }
    context.closePath();
    context.stroke();
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
    onMouseMove(x, y);
    points = [];
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
