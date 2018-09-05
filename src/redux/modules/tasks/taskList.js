import cookie from 'react-cookies'
import client from "../../../utilities/apiClient";

const MODULE_NAME = "FETCH_TASK_LIST";
const initialState = {
  data: null
};

export const FETCH_TASK_LIST = `redux/${MODULE_NAME}/FETCH_TASK_LIST`;
export const FETCH_TASK_LIST_SUCCESS = `redux/${MODULE_NAME}/FETCH_TASK_LIST_SUCCESS`;
export const FETCH_TASK_LIST_FAIL = `redux/${MODULE_NAME}/RECEIVE_FAIL`;
export const LOGOUT = `redux/${MODULE_NAME}/LOGOUT`;

// Reducer
export default function taskList(state = initialState, action = {}) {
  switch (action.type) {
    case FETCH_TASK_LIST:
      return {
        ...state,
        loading: true,
        status: "check"
      };

    case FETCH_TASK_LIST_SUCCESS:
      return {
        ...state,
        data: action.data,
        loading: false,
        status: "success"
      };

    case FETCH_TASK_LIST_FAIL:
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
    type: FETCH_TASK_LIST
  }
}


export function fetchTaskListSuccess(data) {
  return {
    type: FETCH_TASK_LIST_SUCCESS,
    data: data
  }
}

export function fetchTaskListFail(err) {
  return {
    type: FETCH_TASK_LIST_FAIL,
    err: err
  }
}

export const fetchTaskListAction = (query) => {

  return dispatch => {
    dispatch(isLoading());
    return client.get(`/tasks/${query}`).then(
      res => {
        const payload = res.data;
        dispatch(fetchTaskListSuccess(payload))
      },
      err => {
        dispatch(fetchTaskListFail(err));
        throw err.response.status
      }
    )
  }
};
