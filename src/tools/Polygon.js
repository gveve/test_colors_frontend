import { v4 } from 'uuid';
import sketch from 'sketch-js/js/sketch'
import { GUI } from 'dat-gui'
import Alea from 'alea'
import newArray from 'new-array'
import chroma from 'chroma-js'

export const TOOL_POLYGON = 'Polygon';

export default (context) => {
  let imageData = null;
  let MAX_PARTICLES = 280;
  let COLOURS = [ '#69D2E7', '#A7DBD8', '#E0E4CC', '#F38630', '#FA6900', '#FF4E50', '#F9D423' ];
  var particles = [];
  var pool = [];
  let polygon = null;
  let params = null;
  let points = [];
  let polygons = [];
  let randomFn;
  let shapes;
  // let ctx = context.canvas
  let canvasCenter;

  const random = ( min, max ) => {
    if ( Array.isArray( min ) )
      return min[ ~~( Math.random() * min.length ) ];
    if ( Number.isInteger( max ) )
      max = min || 1, min = 0;
    return min + Math.random() * ( max - min );
  }

  const onMouseDown = (x, y, color, size) => {

    polygon = {
      id: v4(),
      tool: TOOL_POLYGON,
      color,
      size,
      points: [{ x, y }],
      colors: 1,
      shapePoints: 5,
      spread: 100,
      colorSize: 100,
      deformations: 2,
      layers: 55,
      randomSeed: 10,
      sigma: 1.5,
      blend: 'lighten',
      mask: true,
      maskCircles: 200,
      maskCircleSize: 150,
      random: Math.random
    };

    imageData = context.getImageData(0, 0, context.canvas.clientWidth, context.canvas.clientHeight);

    randomFn = () => Math.random() * polygon.randomSeed
    // ctx.clearRect(0, 0, ctx.width, ctx.height)
    canvasCenter = [context.canvas.clientWidth / 2, context.canvas.clientHeight / 2]

    for (var i = 0; i < 10; i++) {

      const clr = chroma.scale('OrRd').colors(10)
      const rads = () =>  Math.random() * Math.PI * 2
      const dist = () => Math.pow(Math.random(), 0.5) * polygon.spread

    let x0 = x
    let y0 = y
    let ex = 0
    let ey = 0
    let r0 = 0
    let c0 = 0
    let x1 = Math.abs(Math.cos(rads()) * (dist() + x))
    let y1 = Math.abs(Math.sin(rads()) * (dist() + y))
    let ex1 = 0
    let ey1 = 0
    let r1 = 0
    let c1 = 0
    let x2 = Math.abs(Math.cos(rads()) * (dist() + x))
    let y2 = Math.abs(Math.sin(rads()) * (dist() + y))
    let ex2 = 0
    let ey2 = 0
    let r2 = 0
    let c2 = 0
    let x3 = Math.abs(Math.cos(rads()) * (dist() + x))
    let y3 = Math.abs(Math.sin(rads()) * (dist() + y))
    let ex3 = 0
    let ey3 = 0
    let r3 = 0
    let c3 = 0

      const position = [
       x0: x0,
       y0: y0,
       ex: ex,
       ey: ey,
       r0: r0,
       c0: c0,
       x1: x1,
       y1: y1,
      ex1: ex1,
      ey1: ey1,
       r1: r1,
       c1: c1,
       x2: x2,
       y2: y2,
      ex2: ex2,
      ey2: ey2,
       r2: r2,
       c2: c2,
       x3: x3,
       y3: y3,
      ex3: ex3,
      ey3: ey3,
       r3: r3,
       c3: c3
      ]
      // debugger;
      COLOURS.push({ clr, position })

      drawPolygon(polygon, points, {x,y})
    }

    context = context.canvas

    return [polygon];
    // params = ({
    //   randomFn: "thing",
    //   context: context.canvas,
    //   colors: COLOURS
    // })
  };

  function Polygon( x, y, radius ) {
    // debugger
          this.alive = true;
          this.radius = radius || 10;
          this.wander = 0.15;
          this.theta = random( 2 * Math.pi );
          this.drag = 0.92;
          this.color = '#fff';
          this.x = x || 0.0;
          this.y = y || 0.0;
          this.vx = 0.0;
          this.vy = 0.0;
  };


  const drawPolygonPolifyll = (item, vertex, radius) => {
    context.moveTo(vertex[0], vertex[1]);
    for(var item = 2 ; item < vertex.length-1 ; item+=2 ){context.lineTo( vertex[item] , vertex[item+1] )}

  }


  const drawPolygon = (item, start, { x, y }) => {


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

    var vertex = [];
	  for(var i=0 ; i<n ; i++)
			{ ang = startAng + (i*centerAng);
			  let vx = Math.round(cx + r*Math.cos(ang));
			  let vy = Math.round(cy - r*Math.sin(ang));
			  vertex.push( {X:vx , Y:vy} );
			}

      context.save();
      context.beginPath();
      // context.lineWidth = item.size;
      context.globalAlpha = 0.5;
      // context.strokeStyle = item.color;
      context.fillStyle = '#69D2E7';
      context.moveTo(vertex[0], vertex[1]);
      for(var i = 2 ; i < vertex.length-1 ; i+=2 ){context.lineTo( vertex[i] , vertex[i] )}
      context.closePath();
      context.fill();
      context.restore()
      // debugger;

    // polygon = new Polygon(startX, startY, radius);
    // polygon.wander = Math.floor(Math.random()* 2);
    // polygon.color = COLOURS.clr[(Math.floor(Math.random()*COLOURS.length)+1)];
    // polygon.drag = Math.random( 0.9, 0.99 );
    // theta = Math.random( 2 * Math.PI );
    // force = Math.random( 2, 8 );
    // polygon.vx = Math.sin( theta ) * force;
    // polygon.vy = Math.cos( theta ) * force;
    // // debugåger
    // polygons.push( particle )



    // let shapes = COLOURS.map((ref, i) => {
    //     var color = ref.clr,
    //     position = ref.position;
    //
    // var pnts = []
    //
    // for (var i = 0; i < item.shapePoints; i++) {
    //   var rads = Math.PI * 2 / item.shapePoints * i;
    //   pnts.push([Math.cos(rads) * item.colorSize + position[0], Math.sin(rads) * item.colorSize + position[1]])
    // }
    //
    // var j = item.deformations + 2;
    // while (j--) {
    //   // debugger;
    //   // pnts = deformPolygon(points);
    // }
    //
    // // fix this to turn any color representation into rgb
    // var rgb = color;
    //
    // return { points: points, rgb: rgb };
    // })

  };

  const onMouseMove = (x, y) => {
    // if (!polygon) return [];
    // const newPoint = { x, y };
    // const start = polygon.points.slice(-1)[0];
    // drawPolygon(polygon, start, newPoint);
    // polygon.points.push(newPoint);
    // points.push(newPoint);
    // console.log(points);
    //
    // return [polygon];
  };

  // const onDebouncedMouseMove = () => {
  //   const debouncedPoints = points;
  //   points = [];
  //   return [polygon, debouncedPoints];
  // };

  const onMouseUp = (x, y) => {
    if (!polygon) return;
    onMouseMove(x, y);
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
        setTimeout(drawPolygon.bind(null, item, item.points[i - 1], item.points[i]), time);
        time += 10;
      } else {
        drawPolygon(item, item.points[i - 1], item.points[i]);
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
