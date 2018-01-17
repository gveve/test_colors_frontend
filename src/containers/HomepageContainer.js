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
      <PaintingContainer />
      </div>
    )
  }
}

export default HomePageContainer;
