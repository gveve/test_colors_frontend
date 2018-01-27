import AuthAdapter from "../services";
import {
  ASYNC_START,
  LOGOUT_USER,
  SET_CURRENT_USER,
  TOGGLE_MODAL,
  SET_IMAGES
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
    fetch("https://vapor-paint.herokuapp.com/api/v1/auth", {headers: getHeaders}).then(res => res.json()).then(response => dispatch({
      type: 'SET_CURRENT_USER', user: response.user
    }))
  }
}

export function saveImage(data, user, history){
  debugger;
  return dispatch => {
    AuthAdapter.handleUpload(data, user)
    history.push('/profile')
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
