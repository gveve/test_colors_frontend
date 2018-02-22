import React, { Component } from 'react';
import { Link, Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import Login from './components/Login';
import Signup from './components/Signup';
import Profile from './components/Profile';
import SketchContainer from './sketch/SketchContainer';
import HomepageContainer from './containers/HomepageContainer';
import PaintingContainer from './containers/PaintingContainer';
import Paintings from './components/Paintings';
import ProfileContainer from './containers/ProfileContainer';
import HeaderContainer from './containers/HeaderContainer';
import About from './components/About'
import * as actions from './actions';

class App extends Component {
  constructor(){
    super()
  }

  componentDidMount = () => {
    this.props.getImages()
    if (localStorage.getItem('token')) {
      this.props.fetchUser()
    } else {
      window.alert('If you are sensetive to light, or have epilepsy please move the mouse slowly')
      this.props.history.push("/")
    }
  }

  render() {
    if (
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Mobile|Kindle|Silk|Opera Mini/i.test(
    navigator.userAgent
  )
) {
  return (
    <div className="flex items-center justify-between text-center text-lg bg-teal p-2 h-full" >
    <div>
    <div className="flex px-4 py-2 items-center flex-no-shrink text-white">
      <svg className="fill-current h-8 w-8 mr-2" width="54" height="54" viewBox="0 0 54 54" xmlns="http://www.w3.org/2000/svg"><path d="M13.5 22.1c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05zM0 38.3c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05z"/></svg>
      <span className="font-semibold text-2xl tracking-tight">Vapor paint</span>
    </div>
    </div>
    <div>
      <h1 className="rounded-b text-white px-4 py-3 shadow-md font-bold" >
        Because of the graphic heavy nature of vapor paint, it cannot
        be viewed on mobile devices. Please come back on your laptop or
        desktop computer!
      </h1>
    </div>
    </div>
  )
  } else {
    return (
      <div className="App" style={{ height: window.innerHeight }}>
        <HeaderContainer/>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/profile" component={ProfileContainer} />
          <Route path='/paintings' component={Paintings}/>
          <Route path="/signup" component={Signup} />
          <Route exact path="/" component={HomepageContainer}/>
          <Route path="/sketch" component={SketchContainer}/>
          <Route path="/about" component={About}/>
        </Switch>
      </div>
    );
  }
  }
}

const mapStateToProps = state => ({
  loggedIn: !!state.auth.currentUser.id,
  imagesArray: state.imagesReducer.imagesArray
});

export default connect(mapStateToProps, actions)(App);
