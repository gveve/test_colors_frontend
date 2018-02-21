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
    <div style={{ textAlign: "center", padding: "3%" }}>
      <h1 className="bg-teal-lightest border-t-4 border-teal rounded-b text-teal-darkest px-4 py-3 shadow-md font-bold" >
        Because of the graphic heavy nature of vapor paint, it cannot
        be viewed on mobile devices. Please come back on your laptop or
        desktop computer!
      </h1>
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
