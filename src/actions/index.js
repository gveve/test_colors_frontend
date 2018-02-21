import AuthAdapter from "../services";
import {
  ASYNC_START,
  LOGOUT_USER,
  SET_CURRENT_USER,
  TOGGLE_MODAL,
  SET_IMAGES
} from "./types";

const url = "http://localhost:3000/api/v1";
const other = "https://vapor-paint.herokuapp.com/api/v1"

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
    fetch(`${url}/auth`, {headers: getHeaders}).then(res => res.json()).then(response => dispatch({
      type: 'SET_CURRENT_USER', user: response.user
    }))
  }
}

export function saveImage(data, user, name, history){
  return dispatch => {
    AuthAdapter.handleUpload(data, user, name);
    history.push('/profile');
    AuthAdapter.getImagesFetch();
  }
}

export function getImages(){
  return dispatch => {
    AuthAdapter.getImagesFetch().then(response => dispatch({
          type: 'SET_IMAGES', images: response
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
  return dispatch => { type: 'TOGGLE_MODAL' };
}
