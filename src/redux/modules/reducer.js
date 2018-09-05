import { combineReducers } from "redux";

import * as users from "./users"
import * as tasks from "./tasks"

export default combineReducers({
  ...users,
  ...tasks
});
