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
    // console.log("sign up", this.state);
    // debugger
    e.preventDefault();
    const { fields: { username, password } } = this.state;
    this.props.createUser( this.state.fields, this.props.history);
  };

  render() {
    if(!this.props.show) {
      return null;
    }
    const { fields } = this.state;
    console.log("sign up", this.props);
    return (
      <form className="w-full max-w-xs" onSubmit={this.handleSubmit}>
        <div className="md:flex md:items-center mb-6">
          <div className="md:w-1/3">
            <label className="block text-grey font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-full-name">
              Full Name
            </label>
          </div>
          <div className="md:w-2/3">
            <input className="bg-grey-lighter appearance-none border-2 border-grey-lighter hover:border-purple rounded w-full py-2 px-4 text-grey-darker" id="inline-full-name" value={fields.username} onChange={this.handleChange} type="text" placeholder="Username"></input>
          </div>
        </div>
        <div className="md:flex md:items-center mb-6">
          <div className="md:w-1/3">
            <label className="block text-grey font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-username">
              Password
            </label>
          </div>
          <div className="md:w-2/3">
            <input className="bg-grey-lighter appearance-none border-2 border-grey-lighter hover:border-purple rounded w-full py-2 px-4 text-grey-darker" id="inline-username"  value={fields.password} onChange={this.handleChange} type="password" placeholder="******************"></input>
          </div>
        </div>
        <div className="md:flex md:items-center">
          <div className="md:w-1/3"></div>
          <div className="md:w-2/3">
            <button className="shadow bg-purple hover:bg-purple-light text-white font-bold py-2 px-4 rounded" type="submit">
              Sign Up
            </button>
          </div>
        </div>
      </form>
    );
  }
}

export default withRouter(connect(null, actions)(Signup));
