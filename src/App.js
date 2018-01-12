import React, { Component } from 'react';
import { Link, Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import Login from './components/Login';
import Signup from './components/Signup';
import Profile from './components/Profile';
import HomepageContainer from './containers/HomepageContainer'
import PaintingContainer from './containers/PaintingContainer'
import ProfileContainer from './containers/ProfileContainer'
import * as actions from './actions';

class App extends Component {
  render() {
    console.log(this.props);
    return (
      <div className="App">
        <h2>Welcome to Watercolor</h2>
        <ul>
          <li>
            {this.props.loggedIn ? (
              <a
                onClick={e => {
                  e.preventDefault();
                  this.props.logoutUser();
                }}
              >
                Sign Out
              </a>
            ) : (
              <Link to="/login">Go to Login</Link>
            )}
          </li>
          <li>
            <Link to="/profile">Go to Profile</Link>
          </li>
          <li>
            <Link to="/signup">Go to Signup</Link>
          </li>
        </ul>
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
