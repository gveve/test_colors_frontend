import React from 'react';
import Login from '../components/Login'
import Signup from '../components/Signup'
import Profile from '../components/Profile'
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import chroma from 'chroma-js'

const Canvas = props => {
  console.log(props);
  // debugger
  let colorBG = props.colors.colorscal
  if (colorBG.length != 0) {
    // debugger;
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');
    var gradient = ctx.createLinearGradient(0, 0, 200, 0);
    gradient.addColorStop(0, props.colors.color1);
    gradient.addColorStop(1, props.colors.color2);
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height)
  }

  return (
    <div className="flex w-5/6 h-auto">
      <canvas id="canvas" className="flex border-black w-screen h-auto"></canvas>
    </div>
  );
};

export default Canvas;
