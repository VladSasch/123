//import { all } from "axios";
//import { stopSubmit } from "redux-form";
//import { authAPI } from "../api/api";
import { getAuthUserData } from './auth-reducer';

const INITIALIZED_SUCCESS = 'INITIALIZED_SUCCESS';

let initialState = {
  initialized: false,
};

export const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case INITIALIZED_SUCCESS:
      return { ...state, initialized: true };
    default:
      return state;
  }
};

export const initializedSuccess = () => ({
  type: INITIALIZED_SUCCESS,
});

export const initializeApp = () => (dispatch) => {
  let promise = dispatch(getAuthUserData());
  Promise.all([promise]).then(() => {
    //Promise.all -если нужно выполнить много промисов,мы их помещаем в массив
    dispatch(initializedSuccess());
  });
};

export default appReducer;
