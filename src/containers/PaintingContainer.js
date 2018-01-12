import React from 'react';
import Login from '../components/Login'
import Signup from '../components/Signup'
import Profile from '../components/Profile'
import Canvas from '../components/Canvas'
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';


class PaintingContainer extends React.Component{


  render(){

    return(
      <div>
        <h1> You are in painting container! </h1>
        <Canvas />
      </div>
    )
  }
}

export default PaintingContainer;
