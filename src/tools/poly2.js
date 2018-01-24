import { v4 } from 'uuid';
import sketch from 'sketch-js/js/sketch'
import { GUI } from 'dat-gui'
import Alea from 'alea'
import newArray from 'new-array'
import { index as Glvec}  from 'gl-vec3/index'
import lerp from 'lerp'
import _newArray from 'new-array';
import _glVec from 'gl-vec3';
import _lerp from 'lerp';

var _glVec2 = _interopRequireDefault(_glVec);
var _newArray2 = _interopRequireDefault(_newArray);
var _lerp2 = _interopRequireDefault(_lerp);


function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }


export const TOOL_POLYGON = 'Polygon';

export default (context) => {

  var settings = {
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


  let imageData = null;
  // let MAX_POLYGONS = 280;
  // let COLOURS = [ '#69D2E7', '#A7DBD8', '#E0E4CC', '#F38630', '#FA6900', '#FF4E50', '#F9D423' ];
  var polygons = [];
  // var pool = [];
  let stroke = null;
  let points = [];
  let rand;
  let randomFn;
  let shapes;
  // let canvasCenter = null

  var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();


  const onMouseDown = (x, y, color, size) => {


    // debugger;
    stroke = {
      id: v4(),
      tool: TOOL_POLYGON,
      color,
      size,
      points: [{ x, y }]
    };
    return [stroke];

    imageData = context.getImageData(0, 0, context.canvas.clientWidth, context.canvas.clientHeight);

    // drawPolygonPolifyll(x, y, Math.random( 5, 40 ))

  };

  // function Polygon( x, y, radius ) {
  //   // debugger
  //         this.alive = true;
  //         this.radius = radius || 10;
  //         this.wander = 0.15;
  //         this.theta = random( 2 * Math.pi );
  //         this.drag = 0.92;
  //         this.color = '#fff';
  //         this.x = x || 0.0;
  //         this.y = y || 0.0;
  //         this.vx = 0.0;
  //         this.vy = 0.0;
  // };

  const waterStart = () => {
    rand = () => Math.random()*settings.randomSeed
    // ctx.clearRect(0, 0, ctx.width, ctx.height)
    let canvasCenter = [context.canvas.clientWidth / 2, context.canvas.clientHeight / 2]
    const colors = []

    for (var i = 0; i < settings.colors; i++) {
      const color = [
        Math.random() * 256,
        Math.random() * 256,
        Math.random() * 256
      ]
      // debugger;
      const rads = Math.random() * Math.PI * 2
      const dist = Math.pow(Math.random(), 0.5) * settings.spread
      const position = [
        Math.cos(rads) * dist + canvasCenter[0],
        Math.sin(rads) * dist + canvasCenter[1]
      ]
      colors.push({ color, position })
    }

    const params = ({
      randomFn: rand,
      context: context.canvas,
      colors: colors
    })
    // debugger;
    watercolor(params)
  }

  const watercolor = (params) => {
    // debugger
    let context = params.context
    randomFn = params.randomFn;

  context.globalCompositeOperation = settings.blend;

  let shapes = params.colors.map(function (ref) {
      var color = ref.color,
      position = ref.position;

  var points = []

  for (var i = 0; i < settings.shapePoints; i++) {
    var rads = Math.PI * 2 / settings.shapePoints * i;
    points.push([Math.cos(rads) * settings.colorSize + position[0], Math.sin(rads) * settings.colorSize + position[1]])
  }

  var j = settings.deformations + 2;
  while (j--) {
    // debugger;
    points = deformPolygon(points);
  }

  // fix this to turn any color representation into rgb
  var rgb = color;

  return { points: points, rgb: rgb };
  })
  // debugger;
  polyDraw(shapes)
  }

  const polyDraw = (shapes) => {
    // debugger
    var q = shapes.length * settings.layers;
    while (q--) {
      var _shapes = shapes[q % shapes.length],
          points = _shapes.points,
          rgb = _shapes.rgb;

      var detailedDeform = points.slice();
      var k = settings.deformations;
      while (k--) {
        // debugger;
        detailedDeform = deformPolygon(detailedDeform);
      }
      var opacity = 1 / (settings.layers + 4);
      var color = 'rgba(' + rgb.join(', ') + ', ' + opacity + ')';
      // debugger;
      drawPolygonWithMask(context, detailedDeform, color);
    }
  }

  const normal = (mu, sigma, rand) => {
    var x, r
    mu = mu == null ? 0 : +mu
    sigma = sigma == null ? 1 : +sigma
    rand = rand == null ? Math.random : rand
    return function () {
      var y

      // If available, use the second previously-generated uniform random.
      if (x != null) {
        y = x
        x = null
      // eslint-disable-next-line
      } else do { // Otherwise, generate a new x and y.
        x = rand() * 2 - 1
        y = rand() * 2 - 1
        r = x * x + y * y
      } while (!r || r > 1)

      return mu + sigma * y * Math.sqrt(-2 * Math.log(r) / r)
    }
  }

  const thing = (out, a, b, t) => {
   var ax = a[0],
   ay = a[1]
   // az = a[2],
   // aw = a[3]
     out[0] = ax + t * (b[0] - ax)
     out[1] = ay + t * (b[1] - ay)
     // out[2] = az + t * (b[2] - az)
     // out[3] = aw + t * (b[3] - aw)
     // debugger
     return out
   }

   const distance = (a, b) => {
     var x = b[0] - a[0],
       y = b[1] - a[1]
       // z = b[2] - a[2],
       // w = b[3] - a[3]
     return Math.sqrt(x * x + y * y)
   }

  const deformPolygon = (points) => {

    // debugger;
    var newPoints = [];
    for (var i = 0; i < points.length; i++) {
      newPoints.push(points[i]);
      var nextPoint = points[i + 1] || points[0];
      newPoints.push(thing([], points[i], nextPoint, randomFn()));
    }
    newPoints = newPoints.map(function (pt, i) {
      var lastPt = newPoints[i - 1] || newPoints[newPoints.length - 1];
      var nextPt = newPoints[i + 1] || newPoints[0];
      var distToClosestPt = (distance(pt, lastPt) + distance(pt, nextPt)) / 2;
      var r = normal(0, distToClosestPt / settings.sigma, randomFn);
      return [r() + pt[0], r() + pt[1]];
    });
    // debugger
    return newPoints;
  }

  const drawPolygonWithMask = (context, poly, color) => {
    var polygonBounds = getPolygonExtent(poly);
    context.save();
    if (settings.mask) {
      setMask(context, polygonBounds);
    }
    // debugger;
    drawPolygon(context, poly, color);
    context.restore();
  }

  const thing2 = (a, b, t) => {
    let out = []
   var ax = a[0],
   ay = a[1]
   // az = a[2],
   // aw = a[3]
     out[0] = ax + t * (b[0] - ax)
     out[1] = ay + t * (b[1] - ay)
     // out[2] = az + t * (b[2] - az)
     // out[3] = aw + t * (b[3] - aw)
     // debugger
     return out
   }

  const setMask = (context, bounds) => {
    // debugger;
    var _bounds$ = _slicedToArray(bounds[0], 2),
        xMin = _bounds$[0],
        yMin = _bounds$[1];

    var _bounds$2 = _slicedToArray(bounds[1], 2),
        xMax = _bounds$2[0],
        yMax = _bounds$2[1];

    context.beginPath();
    var j = settings.maskCircles;
    while (j--) {
      var x = (0, _lerp2.default)(xMin, xMax, randomFn());
      var y = (0, _lerp2.default)(yMin, yMax, randomFn());
      var radius = randomFn() * settings.maskCircleSize;
      context.arc(x, y, radius, 0, Math.PI * 2);
    }
    context.clip();
  }

  const getPolygonExtent = (poly) => {
    // debugger;
    var xMin = 0;
    var xMax = 500;
    var yMin = 0;
    var yMax = 500;
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = poly[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var point = _step.value;

        xMin = point[0] < xMin ? point[0] : xMin;
        xMax = point[0] > xMax ? point[0] : xMax;
        yMin = point[1] < yMin ? point[1] : yMin;
        yMax = point[1] > yMax ? point[1] : yMax;
        // debugger;
      }
      // debugger;
    } catch (err) {
      // debugger
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return) {
          // debugger;
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
          // debugger;
        }
      }
    }

    return [[xMin, yMin], [xMax, yMax]];
  }

  const drawPolygon = (context, points, color) => {
    // debugger;
    context.lineJoin = 'round';
    context.lineCap = 'round';
    context.beginPath();
    context.lineWidth = settings.shapePoints
    context.strokeStyle = color;
    context.globalAlpha = 0.4
    // context.moveTo = ( x + Math.random()* 40,  y + Math.random()* 40 )
    context.moveTo = (points[0][0], points[0][1]);
    points.slice(1).forEach(function (pt) {
      return context.lineTo(pt[0], pt[1]);
    });
    context.lineTo(points[0][0], points[0][1]);
    // context.fill();
    context.fillStyle = color;
    context.closePath();
    context.stroke();
  }

  const onMouseMove = (x, y) => {
    if (!stroke) return [];
    const newPoint = { x, y };
    // const start = stroke.particlePoints.slice(-1)[0];
    waterStart(stroke, newPoint);
    stroke.points.push(newPoint);
    points.push(newPoint);
    console.log(points);

    return [stroke];
  };

  // const onDebouncedMouseMove = () => {
  //   const debouncedPoints = points;
  //   points = [];
  //   return [stroke, debouncedPoints];
  // };

  const onMouseUp = (x, y) => {
    if (!stroke) return;
    onMouseMove(x, y);
    points = [];
    const item = stroke;
    stroke = null;
    return [item];
  };

  const draw = (item, animate) => {
    let time = 0;
    let i = 0;
    console.log('drawing');
    const j = item.points.length;
    for (i, j; i < j; i++) {
      if (!item.points[i - 1]) continue;
      if (animate) {
        setTimeout(waterStart.bind(null, item, item.points[i - 1], item.points[i]), time);
        time += 10;
      } else {
        waterStart(item, item.points[i - 1], item.points[i]);
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
