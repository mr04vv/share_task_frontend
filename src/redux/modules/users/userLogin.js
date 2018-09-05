import client from "../../../utilities/apiClient";

const MODULE_NAME = "USER_LOGIN";
const initialState = {
  data: null
};

export const LOGIN = `redux/${MODULE_NAME}/LOGIN`;
export const LOGIN_SUCCESS = `redux/${MODULE_NAME}/LOGIN_SUCCESS`;
export const LOGIN_FAIL = `redux/${MODULE_NAME}/RECEIVE_FAIL`;
export const LOGOUT = `redux/${MODULE_NAME}/LOGOUT`;

// Reducer
export default function userLogin(state = initialState, action = {}) {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        loading: true,
        status: "check"
      };

    case LOGIN_SUCCESS:
      return {
        ...state,
        data: action.payload,
        loading: false,
        status: "success"
      };

    case LOGIN_FAIL:
      return {
        ...state,
        loading: false,
        loaded: true,
        status: "fail"
      };

    case LOGOUT:
      return {
        ...state,
        status: "logout"
      };

    default:
      return state;
  }
}

function isLoading() {
  return {
    type: LOGIN
  }
}


export function loginSuccess(data) {
  return {
    type: LOGIN_SUCCESS,
    data: data
  }
}

export function loginFail(err) {
  return {
    type: LOGIN_FAIL,
    err: err
  }
}

export const loginAction = (postData) => {

  return dispatch => {
    dispatch(isLoading());
    return client.post(`/login`, postData).then(
      res => {
        const payload = res.data;
        dispatch(loginSuccess(payload))
      },
      err => {
        dispatch(loginFail(err));
        throw err.response.status
      }
    )
  }
};


export const logout = () => {
  return {
    type: LOGOUT,
  }
};



