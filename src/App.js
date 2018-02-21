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
      this.props.history.push("/")
    }
  }

  render() {
    console.log("app", this.props);
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

const mapStateToProps = state => ({
  loggedIn: !!state.auth.currentUser.id,
  imagesArray: state.imagesReducer.imagesArray
});

export default connect(mapStateToProps, actions)(App);
