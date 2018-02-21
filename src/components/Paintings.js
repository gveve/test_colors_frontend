import {connect} from 'react-redux'
import React, {Component} from 'react';
import { withRouter } from 'react-router-dom';
import AuthAdapter from "../services";
import * as actions from '../actions';


class Paintings extends Component{



  showImages = () => {
    let imgs = this.props.imagesArray.images

    if (imgs) {
      if (imgs.length > 0) {
        // debugger;
        return imgs.map((image, i) => {
          let imageSrc = "data:image/png;base64,"+`${image.img}`
          let user = image.user.username
        return (
          <div className=" flex-auto max-w-xs px-4 py-2 m-2 rounded overflow-hidden shadow-lg">
           <img id="image" className="w-full" src={imageSrc}></img>
            <div className="px-6 py-4">
            <div class="font-base text-sm mb-2">By: {user}</div>
            </div>
        </div>
          )
        })
      }
    }
  }



  render(){
  console.log("paintindkmfkldmfklnklnfgs", this.props);
  // debugger;
  return (
    <div className="flex justify-center bg-grey-lighter px-8">
      <div className="items-start bg-grey-lighter bg-white shadow-md w-screen rounded px-8 mt-8 mb-8 py-8 h-auto">
        <div className="flex">
          <div className="flex-1 text-grey-darker text-center bg-grey-light px-4 py-2 m-2"><label className="shadow bg-purple text-white font-bold py-2 px-4 items-center rounded text-xl w-full" ></label></div>
          <div className="flex-1 text-grey-darker text-center bg-grey-light px-4 py-2 m-2"><label className="shadow bg-purple text-white font-bold py-2 px-4 items-center rounded text-xl" >Everyone's Paintings</label></div>
          <div className="flex-1 text-grey-darker text-center bg-grey-light px-4 py-2 m-2"><label className="shadow bg-purple text-white font-bold py-2 px-4 items-center rounded text-xl" ></label></div>
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
   console.log('paintings state', state);
   return {
     currentUser: state.auth.currentUser,
     imagesArray: state.imagesReducer.imagesArray
   }
 }


export default withRouter(connect(mapStateToProps, actions)(Paintings));
