import { v4 } from 'uuid';
import sketch from 'sketch-js/js/sketch'
import { GUI } from 'dat-gui'
import Alea from 'alea'
import newArray from 'new-array'

export const TOOL_PARTICLE = 'particle';

export default (context) => {
  let imageData = null;
  let MAX_PARTICLES = 280;
  let COLOURS = [ '#69D2E7', '#A7DBD8', '#E0E4CC', '#F38630', '#FA6900', '#FF4E50', '#F9D423' ];
  var particles = [];
  var pool = [];
  let stroke = null;
  let points = [];

  const random = ( min, max ) => {
    if ( Array.isArray( min ) )
      return min[ ~~( Math.random() * min.length ) ];
    if ( Number.isInteger( max ) )
      max = min || 1, min = 0;
    return min + Math.random() * ( max - min );
  }

  const onMouseDown = (x, y, color, size) => {

    stroke = {
      id: v4(),
      tool: TOOL_PARTICLE,
      color,
      size,
      points: [{ x, y }]
    };
    return [stroke];

    imageData = context.getImageData(0, 0, context.canvas.clientWidth, context.canvas.clientHeight);

    drawParticlePolifyll(x, y, Math.random( 5, 40 ))

  };

  function Particle( x, y, radius ) {
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


  const drawParticlePolifyll = (x, y) => {
    var particle, theta, force;
    // debugger;
    particle = new Particle( x, y, Math.random( 5, 40 ) );
    particle.wander = Math.random( 0.5, 2.0 );
    particle.color = COLOURS[Math.floor(Math.random()*COLOURS.length)];
    particle.drag = Math.random( 0.9, 0.99 );
    theta = Math.random( 2 * Math.pi );
    force = Math.random( 2, 8 );
    particle.vx = Math.sin( theta ) * force;
    particle.vy = Math.cos( theta ) * force;
    // debugger
    particles.push( particle );
  }


  const drawParticle = (item, start, { x, y }) => {
    // debugger;
    for (var i = 0; i <= points.length; i++) {
      var particle, theta, force;
      // debugger;
      particle = new Particle( x, y, Math.floor((Math.random()* 40 )+1 ));
      particle.wander = Math.random( 0.5, 2.0 );
      particle.color = COLOURS[(Math.floor(Math.random()*COLOURS.length)+1)];
      particle.drag = Math.random( 0.9, 0.99 );
      theta = Math.random( 2 * Math.PI );
      force = Math.random( 2, 8 );
      particle.vx = Math.sin( theta ) * force;
      particle.vy = Math.cos( theta ) * force;
      // debugåger
      particles.push( particle );
      console.log(particle);
      context.save();
      context.lineJoin = 'round';
      context.lineCap = 'round';
      context.beginPath();
      context.fillStyle = particle.color
      context.globalAlpha = 0.5
      context.lineWidth = particle.radius;
      context.strokeStyle = particle.color;
      context.globalCompositeOperation = 'lighter';
      context.moveTo(start.x, start.y);
      context.lineTo(x, y);
      context.closePath();
      context.stroke();
      context.arc(x, y, particle.radius/2, 0, Math.PI*2, true);
      context.restore();
    }
    console.log(particles.length);
  };

  const onMouseMove = (x, y) => {
    if (!stroke) return [];
    const newPoint = { x, y };
    const start = stroke.points.slice(-1)[0];
    drawParticle(stroke, start, newPoint);
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
