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
    AuthAdapter.getImages().then(response => this.setState({images: response}));
  }

  componentDidMount = () => {
    this.getImages(this.props.currentUser.id)
  }

  showImages = () => {
    // this.getImages()
    if (this.state.images.length != 0) {
      let images = this.state.images
      // debugger
      return images.map((image, i) => {
        let imageSrc = "data:image/png;base64,"+`${image.img}`
      return (
        <div className=" flex-auto max-w-xs px-4 py-2 m-2 rounded overflow-hidden shadow-lg">
         <img id="image" className="w-full" src={imageSrc}></img>
          <div className="px-6 py-4">
          </div>
      </div>
        )
      })
    }
  }


  render(){

    return(
      <div>
        <Profile showImages = {this.showImages} />
      </div>
    )
  }
}

function mapStateToProps (state){
  return {
    currentUser: state.auth.currentUser
  }
}

export default connect(mapStateToProps, actions)(ProfileContainer);
