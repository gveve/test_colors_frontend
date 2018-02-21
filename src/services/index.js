// import { BrowserRouter as Router, Route, Switch, Link, Redirect } from 'react-router-dom';

const url = "http://localhost:3000/api/v1";
const other = "https://vapor-paint.herokuapp.com/api/v1"

const getHeaders = () => {
  return {
    "content-type": "application/json",
    accept: "application/json",
    Authorization: localStorage.getItem("token")
  };
};

class AuthAdapter {
  static signup(params) {
    return fetch(`${url}/users`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify({
        user: {
          username: params.username,
          password: params.password,
          email: params.email
        }
      })
    }).then(res => res.json());
  }

  static login(params) {
    return fetch(`${url}/auth`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify(params)
    }).then(res => res.json());
  }

  static authorizeUser() {
    return fetch(`${url}/auth`, {
      headers: getHeaders()
    }).then(res => res.json());
  }

  static handleUpload(image, user, name) {
    return fetch(`${url}/images`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        accept: "application/json"
      },
      body: JSON.stringify({name: name, img: image, user_id: user})
    }).then(res => res.json());

  }

  static getImagesFetch() {
    return fetch(`${url}/images`, {
      headers: getHeaders()
    }).then(res => res.json());
  }
}

export default AuthAdapter;
