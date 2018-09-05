import cookie from 'react-cookies'
import client from "../../../utilities/apiClient";

const MODULE_NAME = "POST_TASK";
const initialState = {
  data: null
};

export const POST_TASK = `redux/${MODULE_NAME}/POST_TASK`;
export const POST_TASK_SUCCESS = `redux/${MODULE_NAME}/POST_TASK_SUCCESS`;
export const POST_TASK_FAIL = `redux/${MODULE_NAME}/RECEIVE_FAIL`;
export const LOGOUT = `redux/${MODULE_NAME}/LOGOUT`;

// Reducer
export default function taskPost(state = initialState, action = {}) {
  switch (action.type) {
    case POST_TASK:
      return {
        ...state,
        loading: true,
        status: "check"
      };

    case POST_TASK_SUCCESS:
      return {
        ...state,
        data: action.data,
        loading: false,
        status: "success"
      };

    case POST_TASK_FAIL:
      return {
        ...state,
        loading: false,
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
    type: POST_TASK
  }
}


export function postTaskSuccess(data) {
  return {
    type: POST_TASK_SUCCESS,
    data: data
  }
}

export function postTaskFail(err) {
  return {
    type: POST_TASK_FAIL,
    err: err
  }
}

export const postTaskAction = (postData) => {

  return dispatch => {
    dispatch(isLoading());
    return client.post(`/tasks`,postData).then(
      res => {
        const payload = res.data;
        dispatch(postTaskSuccess(payload))
      },
      err => {
        dispatch(postTaskFail(err));
        throw err.response.status
      }
    )
  }
};
