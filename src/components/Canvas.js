import React, {Component, PropTypes} from 'react';
import Login from '../components/Login'
import Signup from '../components/Signup'
import Profile from '../components/Profile'
import { findDOMNode } from 'react-dom'
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import chroma from 'chroma-js'

const Canvas = (props) => {

  console.log("canvas", props);
  // debugger
  let colorBG = props.colors.colorscal
  let canvas = document.getElementById('canvas');

  if (colorBG.length != 0) {
    // debugger;
    let ctx = canvas.getContext('2d');
    let gradient = ctx.createLinearGradient(0, 0, 200, 0);
    gradient.addColorStop(0, props.colors.color1);
    gradient.addColorStop(1, props.colors.color2);
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    let image = document.getElementById('canvas')
    let dataIMG = image.toDataURL("image/png")
      if (props.colors.dataURL === "") {
        let data = dataIMG.replace(/^data:image\/(png|jpg);base64,/, "")
        // debugger
        props.handleDataURL(data)
      }
  }

  return (
    <div className="flex w-5/6 h-auto">
      <canvas id="canvas" className="flex border-black w-screen h-auto"></canvas>
    </div>
  );
};

export default Canvas;
