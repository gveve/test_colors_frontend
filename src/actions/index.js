import AuthAdapter from "../services";
import {
  ASYNC_START,
  LOGOUT_USER,
  SET_CURRENT_USER
} from "./types";

export function createUser(user, history) {
  debugger;
  return dispatch => {
    AuthAdapter.signup(user).then(res => {
      if (!res.errors) {
        localStorage.setItem("token", res.token);
        debugger;
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



export const logoutUser = () => {
  localStorage.removeItem('token');
  return { type: 'LOGOUT_USER' };
};
