import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as actions from '../actions';

class Signup extends React.Component {
  constructor() {
    super();
    this.state = {
      error: false,
      fields: {
        username: '',
        password: ''
      }
    };
  }

  handleChange = e => {
    const newFields = { ...this.state.fields, [e.target.name]: e.target.value };
    this.setState({ fields: newFields });
  };

  handleSubmit = e => {
    console.log("sign up", this.state);
    // debugger
    e.preventDefault();
    const { fields: { username, password } } = this.state;
    this.props.createUser( this.state.fields, this.props.history);
  };

  render() {
    const { fields } = this.state;
    console.log("sign up", this.props);
    return (
      <div>
        {this.state.error ? <h1>Try Again</h1> : null}
        <div className="ui form">
          <form onSubmit={this.handleSubmit}>
            <div className="ui field">
              <label>Username</label>
              <input
                name="username"
                placeholder="username"
                value={fields.username}
                onChange={this.handleChange}
              />
            </div>
            <div className="ui field">
              <label>Password</label>
              <input
                name="password"
                type="password"
                placeholder="password"
                value={fields.password}
                onChange={this.handleChange}
              />
            </div>
            <button type="submit">
              Signup
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default withRouter(connect(null, actions)(Signup));
