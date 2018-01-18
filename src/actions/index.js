import AuthAdapter from "../services";
import {
  ASYNC_START,
  LOGOUT_USER,
  SET_CURRENT_USER,
  TOGGLE_MODAL
} from "./types";

export function createUser(user, history) {
  return dispatch => {
    AuthAdapter.signup(user).then(res => {
      if (!res.errors) {
        localStorage.setItem("token", res.token);
        dispatch({ type: 'SET_CURRENT_USER', user: res.user });
        history.push("/profile");
      }
    });
  };
}

export function loginUser(user, history) {
  return dispatch => {
    AuthAdapter.login(user).then(res => {
      if (!res.errors) {
        localStorage.setItem("token", res.token);
        dispatch({ type: 'SET_CURRENT_USER', user: res.user });
        history.push("/profile");
      }
    });
  };
}

export function fetchUser(){
  const getHeaders = {
      Authorization: localStorage.getItem("token")
    }
  return dispatch => {
    fetch("http://localhost:3000/api/v1/auth", {headers: getHeaders}).then(res => res.json()).then(response => dispatch({
      type: 'SET_CURRENT_USER', user: response.user
    }))
  }
}

export function logoutUser() {
  return dispatch => {
    localStorage.clear();
    dispatch({ type: 'LOGOUT_USER' });
  }
};

export function toggleModal() {
  return { type: 'TOGGLE_MODAL' };
}
