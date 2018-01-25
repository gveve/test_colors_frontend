import {connect} from 'react-redux'
import React from 'react';
import AuthAdapter from "../services";
import * as actions from '../actions';


class Profile extends React.Component{
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
    this.getImages()
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
  console.log("profile", this.props);

  return (
    <div className="flex justify-center bg-grey-lighter px-8">
      <div className="items-start bg-grey-lighter bg-white shadow-md w-screen rounded px-8 mt-8 mb-8 py-8 h-auto">
        <div className="flex">
          <div className="flex-1 text-grey-darker text-center bg-grey-light px-4 py-2 m-2"><label className="shadow bg-purple text-white font-bold py-2 px-4 items-center rounded text-xl w-full" >Profile</label></div>
          <div className="flex-1 text-grey-darker text-center bg-grey-light px-4 py-2 m-2"><label className="shadow bg-purple text-white font-bold py-2 px-4 items-center rounded text-xl" >{this.props.currentUser.username}</label></div>
          <div className="flex-1 text-grey-darker text-center bg-grey-light px-4 py-2 m-2"><label className="shadow bg-purple text-white font-bold py-2 px-4 items-center rounded text-xl" >Your Paintings</label></div>
        </div>
        <div className="flex flex-wrap items-center justify-center content-center">
          {this.showImages()}
        </div>
      </div>
    </div>

  );
}
};

 function mapStateToProps (state){
   return {
     currentUser: state.auth.currentUser
   }
 }

 // <div className=" justify-center mt-8 mb-8 pb-8 h-full w-full max-w-xl max-h-xl h-screen bg-white shadow-md rounded ">
 //
 //   <div className="w-full">
 //     <label className="shadow bg-purple text-white font-bold py-2 px-4 items-center rounded text-xl w-full" >Profile</label>
 //   </div>
 //   <div className="w-full">
 //     <label className="shadow bg-purple text-white font-bold py-2 px-4 items-center rounded text-xl" >{props.currentUser.username}</label>
 //   </div>
 // </div>

export default connect(mapStateToProps, actions)(Profile);
