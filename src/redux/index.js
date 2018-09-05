import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import middlewares from "./middlewares/";
import reducer from "./modules/reducer";

let store = null;

  store = createStore(reducer, applyMiddleware(thunk,logger,...middlewares));

/**
 * @return Redux Store
 */
export default function configureStore() {
  return store;
}