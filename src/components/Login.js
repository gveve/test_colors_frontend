import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as actions from '../actions';

class Login extends React.Component {
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

  handleChange = (event) => {
      console.log(event.target);
    const newFields = { ...this.state.fields, [event.target.name]: event.target.value };
    this.setState({ fields: newFields });
  };

  handleSubmit = (event) => {
    // console.log("sign up", this.state);
    // debugger
    event.preventDefault();
    const { fields: { username, password } } = this.state;
    this.props.loginUser( this.state.fields, this.props.history);
  };

  render() {
    const { fields } = this.state;
    console.log("login", this.props);
    return (
      <div className="flex mt-8 pt-8 justify-center">
      <form className="w-full max-w-sm mt-8 bg-white shadow-md rounded px-8 pt-8 pb-8 mb-4 justify-center" onSubmit={this.handleSubmit}>
        <div className="flex items-center mb-6">
          <div className="md:w-1/3">
            <label className="block text-grey font-bold md:text-right mb-1 md:mb-0 pr-4" >
              Full Name
            </label>
          </div>
          <div className="md:w-2/3">
            <input className="bg-grey-lighter appearance-none border-2 border-grey-lighter hover:border-purple rounded w-full py-2 px-4 text-grey-darker " id="inline-full-name" name='username' value={fields.username} onChange={this.handleChange} type="text" placeholder="username"></input>
          </div>
        </div>
        <div className="md:flex md:items-center mb-6">
          <div className="md:w-1/3">
            <label className="block text-grey font-bold md:text-right mb-1 md:mb-0 pr-4">
              Password
            </label>
          </div>
          <div className="md:w-2/3">
            <input className="bg-grey-lighter appearance-none border-2 border-grey-lighter hover:border-purple rounded w-full py-2 px-4 text-grey-darker" id="inline-username" name='password' value={fields.password} onChange={this.handleChange} type="password" placeholder="******************"></input>
          </div>
        </div>
        <div className="md:flex md:items-center">
          <div className="md:w-1/3"></div>
          <div className="md:w-2/3">
            <button className="shadow bg-purple hover:bg-purple-light text-white font-bold py-2 px-4 rounded" type="submit">
              Login
            </button>
          </div>
        </div>
      </form>
      </div>
    );
  }
}

export default withRouter(connect(null, actions)(Login));
