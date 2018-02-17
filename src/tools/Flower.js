import { v4 } from 'uuid';
// import sketch from 'sketch-js/js/sketch'
import { GUI } from 'dat-gui'
// import Alea from 'alea'
import newArray from 'new-array'
import chroma from 'chroma-js'

export const TOOL_FLOWER = 'Flower';

export default (context) => {

  let imageData = null;
  var flowers = [];
  let flower = null;
  let points = [];
  var n = 15;
  var rows_ = 5;
  let COLOURS = []

  const onMouseDown = (x, y, color, size) => {

    flower = {
      id: v4(),
      tool: TOOL_FLOWER,
      color,
      size,
      points: [{ x, y }]
    };

    COLOURS = chroma.scale([color, '#FFFFFF']).colors(20)
    imageData = context.getImageData(0, 0, context.canvas.clientWidth, context.canvas.clientHeight);
    return [flower];
    // drawParticlePolifyll(x, y, Math.random( 5, 40 ))
    // var n = 15;
    // var rows_ = 5;
    //
    // for(var l = 0; l < n; ++l) {
    //   flowers.push(generateFlower());
    // }

  };

  const random = ( min, max ) => {
    if ( Array.isArray( min ) )
      return min[ ~~( Math.random() * min.length ) ];
    if ( Number.isInteger( max ) )
      max = min || 1, min = 0;
    return min + Math.random() * ( max - min );
  }

  const randomi = (a, b) => {
    return Math.floor(random(a,b));
  }


  // const generateFlower = () => {
	// 	var flower = [];
  //
	// 	var previousRadius = 0.0;
	// 		previousRadius += random(0.1, 0.2);
  //
	// 		var colorPrimary =
	// 			'rgb(' +
	// 				randomi(0, 255) + ',' +
	// 				randomi(0, 255) + ',' +
	// 				randomi(0, 255) + ')';
  //
	// 		var params = [
	// 			random(0, 0.07),
	// 			randomi(5, 20),
	// 			random(5, 10),
	// 			random(0.5, 2)
	// 		];
  //
	// 		flower.unshift({
	// 			radius 			: previousRadius,
	// 			colorPrimary 	: colorPrimary,
	// 			type 			: random(['wave', 'wave']),
	// 			params 			: params,
	// 			x_0 			: random(0.0,0.1),
	// 			x_1				: 0
	// 		});
  //
	// 	return flower;
	// }

	// var n = 15;
	// var rows_ = 5;
  //
	// for(var l = 0; l < n; ++l) {
	// 	flowers.push(generateFlower());
	// }

  function Flower(x, y, radius){

		var previousRadius = radius;

			var colorPrimary ='rgb(' +
					randomi(0, 255) + ',' +
					randomi(0, 255) + ',' +
					randomi(0, 255) + ')';

			var params = [
				random(0, 0.07),
				randomi(5, 20),
				random(5, 10),
				random(0.5, 2)
			];

				this.radius = previousRadius || 10;
				this.colorPrimary = colorPrimary,
				this.type = random(['wave', 'wave']),
				this.params = params,
				this.x_0 = random(0.0,0.1),
				this.x_1	= 0

  };


  const drawFlower = (item, start, { x, y }) => {

    // debugger;
      var flower = new Flower(x, y, Math.floor((Math.random()* 40 )+1 ))
      flowers.push(flower)
      console.log(flowers);
      let clr = COLOURS[Math.floor(Math.random()*COLOURS.length)]
      context.save();
      // debugger;
      // context.lineJoin = 'round';
      // context.lineCap = 'round';
      // context.clip()

      context.lineWidth = flower.radius
      context.strokeStyle = clr
      context.beginPath();
      context.translate( x + Math.random()* 40,  y + Math.random()* 40 );

      // ctx.scale(min_ * 0.9, min_ * 0.9);

      var radius = Math.abs(flower.x_0);
      var angleStep = (Math.PI * 2)/140;
      context.globalAlpha = 0.4

      context.moveTo = (radius*Math.cos(0.0),radius*Math.sin(0.0));
      for(var angle = 0.0; angle < Math.PI * 2; angle += angleStep) {
        context.fillStyle = flower.color;
        // debugger;
        var rad = radius + flower.params[0] * Math.sin(angle * flower.params[1]);

        context.lineTo(
           rad * Math.cos(angle),
           rad * Math.sin(angle));

           context.lineTo(
             radius*Math.cos(0.0),
             radius*Math.sin(0.0));

           context.fill()
      };

			// context.scale(min_ * 0.9, min_ * 0.9);
      context.closePath();
      context.stroke();
      context.arc(x, y, radius/2, 0, Math.PI*2, true);
      context.restore();

    }

  const onMouseMove = (x, y) => {
    if (!flower) return [];
    const newPoint = { x, y };
    const start = flower.points.slice(-1)[0];
    drawFlower(flower, start, newPoint);
    flower.points.push(newPoint);
    points.push(newPoint);
    console.log(points);

    return [flower];
  };

  // const onDebouncedMouseMove = () => {
  //   const debouncedPoints = points;
  //   points = [];
  //   return [flower, debouncedPoints];
  // };

  const onMouseUp = (x, y) => {
    if (!flower) return;
    onMouseMove(x, y);
    points = [];
    const item = flower;
    flower = null;
    return [item];
  };

  const draw = (item, animate) => {
    let time = 0;
    let i = 0;

    const j = item.points.length;
    for (i, j; i < j; i++) {
      if (!item.points[i - 1]) continue;
      if (animate) {
        setTimeout(drawFlower.bind(null, item, item.points[i - 1], item.points[i]), time);
        time += 10;
      } else {
        drawFlower(item, item.points[i - 1], item.points[i]);
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
