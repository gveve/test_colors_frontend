import React from 'react';
import Login from '../components/Login'
import Signup from '../components/Signup'
import Profile from '../components/Profile'
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';


class ProfileContainer extends React.Component{


  render(){

    return(
      <div>
        <h1> You are in profile container! </h1>
        <Profile />
      </div>
    )
  }
}

export default ProfileContainer;
