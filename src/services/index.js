
const url = "http://localhost:3000/api/v1";

const getHeaders = () => {
  return {
    "content-type": "application/json",
    accept: "application/json",
    Authorization: localStorage.getItem("token")
  };
};

class AuthAdapter {
  static signup(params) {
    debugger
    return fetch(`${url}/users`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify({
        user: {
          username: params.username,
          password: params.password,
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
}

export default AuthAdapter;
