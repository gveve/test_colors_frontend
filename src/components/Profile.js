import {connect} from 'react-redux'
import React from 'react';

const Profile = props => {

  console.log("profile", props);
  return (
    <div className="flex justify-center mt-8 mb-8 pb-8 h-full">
    <div className="flex mt-8 pt-8 mb-8 pb-8 w-full max-w-xl max-h-xl h-screen bg-white shadow-md rounded justify-center">
    <div className=" justify-center">
      <label className="shadow bg-purple text-white font-bold py-2 px-4 justify-center rounded" >Profile</label>
    </div>
      </div>
    </div>
  );
};

 function mapStateToProps (state){
   return {
     currentUser: state.auth.currentUser
   }
 }

export default connect(mapStateToProps, null)(Profile);
