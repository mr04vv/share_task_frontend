import cookie from 'react-cookies'
import client from "../../../utilities/apiClient";

const MODULE_NAME = "USER_REGISTER";
const initialState = {
  data: null
};

export const REGISTER = `redux/${MODULE_NAME}/REGISTER`;
export const REGISTER_SUCCESS = `redux/${MODULE_NAME}/REGISTER_SUCCESS`;
export const REGISTER_FAIL = `redux/${MODULE_NAME}/RECEIVE_FAIL`;
export const LOGOUT = `redux/${MODULE_NAME}/LOGOUT`;

// Reducer
export default function userRegister(state = initialState, action = {}) {
  switch (action.type) {
    case REGISTER:
      return {
        ...state,
        loading: true,
        status: "check"
      };

    case REGISTER_SUCCESS:
      return {
        ...state,
        data: action.payload,
        loading: false,
        status: "success"
      };

    case REGISTER_FAIL:
      return {
        ...state,
        loading: false,
        status: "fail"
      };

    default:
      return state;
  }
}

function isLoading() {
  return {
    type: REGISTER
  }
}


export function registerSuccess(payload) {
  return {
    type: REGISTER_SUCCESS,
    payload: payload
  }
}

export function registerFail(err) {
  return {
    type: REGISTER_FAIL,
    err: err
  }
}

export const registerAction = (postData) => {


  return dispatch => {
    dispatch(isLoading());
    return client.post(`/users`, postData).then(
      res => {
        const payload = res.data;
        dispatch(registerSuccess(payload))
      },
      err => {
        dispatch(registerFail(err));
        throw err.response.status
      }
    )
  }
};




