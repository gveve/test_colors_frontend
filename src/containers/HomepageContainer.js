import React, { Component } from 'react'
import { Link } from "react-router-dom";
import HeaderContainer from "./HeaderContainer"
import ProfileContainer from "./ProfileContainer"
import PaintingContainer from "./PaintingContainer"
import Login from '../components/Login'
import Signup from '../components/Signup'
import Profile from '../components/Profile'

class HomePageContainer extends Component {

  render() {
    return (
      <div>
        <h1>WaterColor</h1>
        <p> You are in homepage </p>
        <button as={Link} to='/login'>Login</button>
        <button as={Link} to='/signup'>Signup</button>
        <button as={Link} to='/profile'>Profile</button>
      </div>
    )
  }
}

export default HomePageContainer;
