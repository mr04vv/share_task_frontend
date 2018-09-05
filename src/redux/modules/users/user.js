import cookie from 'react-cookies'
import client from "../../../utilities/apiClient";

const MODULE_NAME = "USER_FETCH_ME";
const initialState = {
  data: null
};

export const FETCH_ME = `redux/${MODULE_NAME}/FETCH_ME`;
export const FETCH_ME_SUCCESS = `redux/${MODULE_NAME}/FETCH_ME_SUCCESS`;
export const FETCH_ME_FAIL = `redux/${MODULE_NAME}/RECEIVE_FAIL`;
export const LOGOUT = `redux/${MODULE_NAME}/LOGOUT`;

// Reducer
export default function fetchMe(state = initialState, action = {}) {
  switch (action.type) {
    case FETCH_ME:
      return {
        ...state,
        loading: true,
        status: "check"
      };

    case FETCH_ME_SUCCESS:
      return {
        ...state,
        data: action.data,
        loading: false,
        status: "success"
      };

    case FETCH_ME_FAIL:
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
    type: FETCH_ME
  }
}


export function fetchMeSuccess(data) {
  return {
    type: FETCH_ME_SUCCESS,
    data: data
  }
}

export function fetchMeFail(err) {
  return {
    type: FETCH_ME_FAIL,
    err: err
  }
}

export const fetchMeAction = () => {

  return dispatch => {
    dispatch(isLoading());
    return client.get(`/users/me`).then(
      res => {
        const payload = res.data;
        dispatch(fetchMeSuccess(payload))
      },
      err => {
        dispatch(fetchMeFail(err));
        throw err.response.status
      }
    )
  }
};


export const logout = () => {
  return {
    type: LOGOUT
  }
};



