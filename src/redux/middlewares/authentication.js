import axios from "axios";

import * as USER_LOGIN from "../modules/users/userLogin";

const CACHED_LOCAL_KEY = localStorage.getItem("localKey");

export function setAuthenticationRequestHeader(
  accessToken = null,
  localKey = CACHED_LOCAL_KEY
) {
  let data = "";

  if (accessToken) {
    data = accessToken;
  }

  if (localKey) {
    data = localKey;
  }

  axios.defaults.headers.common["token"] = data;
}

setAuthenticationRequestHeader();

// 認証周り
export const authenticationMiddleware = store => next => action => {

  // ログイン時
  if (action.type === USER_LOGIN.LOGIN_SUCCESS) {
    setAuthenticationRequestHeader(
      action.data.token,
    );
    localStorage.setItem("localKey", action.data.token);
    axios.defaults.headers.common["token"] = action.data.token;
  } else if (action.type === USER_LOGIN.LOGIN_FAIL) {
    axios.defaults.headers.common["token"] = null;
  } else if (action.type === USER_LOGIN.LOGOUT) {
    localStorage.removeItem("localKey");
    axios.defaults.headers.common["token"] = null;
  }

  return next(action);
};

export default authenticationMiddleware;
