import React, { Component } from 'react';
import { Link, Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import Login from './components/Login';
import Signup from './components/Signup';
import Profile from './components/Profile';
import HomepageContainer from './containers/HomepageContainer'
import PaintingContainer from './containers/PaintingContainer'
import ProfileContainer from './containers/ProfileContainer'
import HeaderContainer from './containers/HeaderContainer'
import * as actions from './actions';

class App extends Component {
  constructor(){
    super()
    this.state = {

    }
  }

  toggleModal = () => {
    debugger

  }

  render() {
    console.log(this.props);
    return (
      <div className="App">
        <HeaderContainer/>
        <PaintingContainer />
        <Signup />
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/profile" component={Profile} />
          <Route path="/signup" component={Signup} />
          <Route path="/home" component={HomepageContainer}/>
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  loggedIn: !!state.auth.currentUser.id
});
export default connect(mapStateToProps, actions)(App);
