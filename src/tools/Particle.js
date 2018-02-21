import { v4 } from 'uuid';
// import sketch from 'sketch-js/js/sketch'
import { GUI } from 'dat-gui'
import Alea from 'alea'
import newArray from 'new-array'
import chroma from 'chroma-js'

export const TOOL_PARTICLE = 'Particle';

export default (context) => {
  let imageData = null;
  let MAX_PARTICLES = 280;
  let COLOURS = [ ];
  var particles = [];
  var pool = [];
  let particle = null;
  let points = [];

  const random = ( min, max ) => {
    if ( Array.isArray( min ) )
      return min[ ~~( Math.random() * min.length ) ];
    if ( Number.isInteger( max ) )
      max = min || 1, min = 0;
    return min + Math.random() * ( max - min );
  }

  const onMouseDown = (x, y, color, size, fill, effect) => {

    particle = {
      id: v4(),
      tool: TOOL_PARTICLE,
      color,
      size,
      fill,
      effect,
      points: [{ x, y }]
    };
    imageData = context.getImageData(0, 0, context.canvas.clientWidth, context.canvas.clientHeight);
    COLOURS = chroma.scale([color, '#FFFFFF']).colors(20)
    return [particle];

  };

  function Particle( x, y, radius ) {
          this.radius = radius || 10;
          this.color = ''
  };


  const drawParticlePolifyll = (x, y) => {
    var particle, theta, force;
    particle = new Particle( x, y, Math.random( 5, 40 ) );
    particle.wander = Math.random( 0.5, 2.0 );
    particle.color = COLOURS[Math.floor(Math.random()*COLOURS.length)];
    particles.push( particle );
  }


  const drawParticle = (item, start, { x, y }) => {

      var particle, theta, force;
      particle = new Particle( x, y, Math.floor((Math.random()* 40 )+1 ));
      particle.color = COLOURS[(Math.floor(Math.random()*COLOURS.length)+1)];
      particles.push( particle );
      context.save();
      context.lineJoin = 'round';
      context.lineCap = 'round';
      context.beginPath();
      context.fillStyle = particle
      context.lineWidth = particle.radius * (item.size/2);
      context.strokeStyle = particle.color;
      context.globalCompositeOperation = item.effect;
      context.globalAlpha = 0.4
      context.moveTo( x + Math.random()* 40,  y + Math.random()* 40 );
      context.lineTo( x + Math.random()* 40,  y + Math.random()* 40 );
      context.closePath();
      context.stroke();
      // context.arc(x, y, particle.radius/2, 0, Math.PI*2, true);
      context.restore();

  };

  const onMouseMove = (x, y) => {
    if (!particle) return [];
    const newPoint = { x, y };
    const start = particle.points.slice(-1)[0];
    drawParticle(particle, start, newPoint);
    particle.points.push(newPoint);
    points.push(newPoint);
    console.log(points);

    return [particle];
  };

  // const onDebouncedMouseMove = () => {
  //   const debouncedPoints = points;
  //   points = [];
  //   return [particle, debouncedPoints];
  // };

  const onMouseUp = (x, y) => {
    if (!particle) return;
    onMouseMove(x, y);
    points = [];
    const item = particle;
    particle = null;
    return [item];
  };

  const draw = (item, animate) => {
    let time = 0;
    let i = 0;

    const j = item.points.length;
    for (i, j; i < j; i++) {
      if (!item.points[i - 1]) continue;
      if (animate) {
        setTimeout(drawParticle.bind(null, item, item.points[i - 1], item.points[i]), time);
        time += 10;
      } else {
        drawParticle(item, item.points[i - 1], item.points[i]);
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
