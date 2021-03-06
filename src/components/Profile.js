import {connect} from 'react-redux'
import React from 'react';
import Modal from './Modal'
import AuthAdapter from "../services";
import * as actions from '../actions';


class Profile extends React.Component{

  state = () => {
    showModal: false
    img: ''
  }

  handleOpenModal = (event) => {
    this.setState({
      showModal: true,
      img: event.target.src
    })
  }

  handleCloseModal = () => {
    this.setState=({
      showModal: false
    })
  }



  showImages = () => {
    if (this.props.imagesArray) {
      if (this.props.imagesArray.images) {
        let images = this.props.imagesArray.images
        return images.map((image, i) => {
          if (image.user.id === this.props.currentUser.id) {
            let imageSrc = "data:image/png;base64,"+`${image.img}`
            let name = image.name
          return (
            <div className=" flex-auto max-w-xs px-4 py-2 m-2 rounded overflow-hidden shadow-lg">
             <img onClick={this.handleOpenModal} id="image" className="w-full" src={imageSrc}></img>
             <div class="font-base text-sm mb-2">Name: {name}</div>
              <div className="px-6 py-4">
              </div>
          </div>
            )
          }
        })
      }
    }
  }



  render(){


  return (
    <div className="flex justify-center px-8">
      <div className="items-start bg-grey-lighter bg-white shadow-md w-screen rounded px-8 mt-8 mb-8 py-8 h-auto">
        <div className="flex">
          <div className="flex-1 text-grey-darker text-center bg-grey-light px-4 py-2 m-2"><label className="shadow bg-purple text-white font-bold py-2 px-4 items-center rounded text-xl w-full" >Profile</label></div>
          <div className="flex-1 text-grey-darker text-center bg-grey-light px-4 py-2 m-2"><label className="shadow bg-purple text-white font-bold py-2 px-4 items-center rounded text-xl" >{this.props.currentUser.username}</label></div>
          <div className="flex-1 text-grey-darker text-center bg-grey-light px-4 py-2 m-2"><label className="shadow bg-purple text-white font-bold py-2 px-4 items-center rounded text-xl" >Your Paintings</label></div>
        </div>
        <div className="flex flex-wrap items-center justify-center content-center">
        {this.showImages()}
        <Modal
          state={this.state}
          isOpen={this.state.showModal}
          handleCloseModal2={this.handleCloseModal}
          whichModal='ModalImg' />
        </div>
      </div>
    </div>

  );
}
};

 function mapStateToProps (state){
   return {
     currentUser: state.auth.currentUser,
     imagesArray: state.imagesReducer.imagesArray
   }
 }

export default connect(mapStateToProps, actions)(Profile);
