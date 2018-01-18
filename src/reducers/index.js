import { combineReducers } from 'redux';
import authReducer from "./authReducer"
import modalReducer from "./modalReducer"
import imagesReducer from "./imagesReducer"


const rootReducer = combineReducers({
  auth: authReducer,
  showModal: modalReducer,
  imagesReducer: imagesReducer
});

export default rootReducer;
