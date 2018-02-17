import React from 'react';
import Profile from '../components/Profile'
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import {connect} from 'react-redux'
import AuthAdapter from "../services";
import * as actions from '../actions';


class ProfileContainer extends React.Component{
  constructor(){
    super()
    this.state = {
      images: []
    }
  }

  getImages = () => {

  }

  componentWillMount = () => {
    this.props.getImages();
  }



  render(){
    return(
      <div className="h-screen bg-grey-lighter">
        <Profile imgs={this.state.images}/>
      </div>
    )
  }
}

function mapStateToProps (state){
  return {
    currentUser: state.auth.currentUser,
    imagesArray: state.imagesReducer.imagesArray
  }
}

export default connect(mapStateToProps, actions)(ProfileContainer);
