import React, { Component } from 'react'
import {connect} from 'react-redux'
import { Link } from "react-router-dom";
import * as actions from '../actions';
import ProfileContainer from "./ProfileContainer"
import PaintingContainer from "./PaintingContainer"
import Login from '../components/Login'
import Signup from '../components/Signup'
import Profile from '../components/Profile'

class HeaderContainer extends Component {
  constructor(){
    super()
  }

  handleLogout = () => {
    let thing = this.props
    this.props.logoutUser()
  }

  render() {

    const logged_in =
                <div className="w-full block flex-no-shrink lg:w-auto">
                  <div className="text-sm">
                  </div>
                  <div>
                    <Link to='/' onClick={this.handleLogout} className="inline-block text-sm px-4 py-2 leading-none mt-4 lg:inline-block lg:mt-0 text-teal-lighter hover:text-white mr-4">Logout</Link>

                    <Link to='/profile' className="inline-block text-sm px-4 py-2 leading-none mt-4 lg:inline-block lg:mt-0 text-teal-lighter hover:text-white mr-4">Profile</Link>
                  </div>
                </div>


    const not_logged_in =
                <div className="w-full block flex-no-shrink lg:w-auto">
                  <div className="text-sm">
                  </div>
                  <div>
                    <Link to='/login' className="inline-block text-sm px-4 py-2 leading-none mt-4 lg:inline-block lg:mt-0 text-teal-lighter hover:text-white mr-4">Login</Link>

                    <Link to='/signup' className="inline-block text-sm px-4 py-2 leading-none mt-4 lg:inline-block lg:mt-0 text-teal-lighter hover:text-white mr-4">Sign up</Link>
                  </div>
                </div>

      console.log("header", this.props);

    return (

      <div>
      <nav className="flex items-center justify-between bg-teal p-2">
        <Link to="/" style={{ textDecoration: 'none' }}>
          <div className="flex px-4 py-2 items-center flex-no-shrink text-white">
            <svg className="fill-current h-8 w-8 mr-2" width="54" height="54" viewBox="0 0 54 54" xmlns="http://www.w3.org/2000/svg"><path d="M13.5 22.1c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05zM0 38.3c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05z"/></svg>
            <span className="font-semibold text-xl tracking-tight">Watercolor</span>
          </div>
        </Link>
          {this.props.loggedIn ? logged_in : not_logged_in}
      </nav>
      </div>
    )
  }
}

function mapStateToProps (state){
  return {
    currentUser: state.auth.currentUser,
    loggedIn: !!state.auth.currentUser.id
  }
}

export default connect(mapStateToProps, actions)(HeaderContainer);
