import {connect} from 'react-redux'
import React from 'react';
import AuthAdapter from "../services";
import * as actions from '../actions';


class Profile extends React.Component{
  constructor(props){
    console.log('profile', props);
    super(props)
    this.state = {
      images: []
    }
  }



  render(){


  return (
    <div className="flex justify-center bg-grey-lighter px-8">
      <div className="items-start bg-grey-lighter bg-white shadow-md w-screen rounded px-8 mt-8 mb-8 py-8 h-auto">
        <div className="flex">
          <div className="flex-1 text-grey-darker text-center bg-grey-light px-4 py-2 m-2"><label className="shadow bg-purple text-white font-bold py-2 px-4 items-center rounded text-xl w-full" >Profile</label></div>
          <div className="flex-1 text-grey-darker text-center bg-grey-light px-4 py-2 m-2"><label className="shadow bg-purple text-white font-bold py-2 px-4 items-center rounded text-xl" >{this.props.currentUser.username}</label></div>
          <div className="flex-1 text-grey-darker text-center bg-grey-light px-4 py-2 m-2"><label className="shadow bg-purple text-white font-bold py-2 px-4 items-center rounded text-xl" >Your Paintings</label></div>
        </div>
        <div className="flex flex-wrap items-center justify-center content-center">
        {this.props.showImages()}
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

export default connect(mapStateToProps, actions)(Profile);
