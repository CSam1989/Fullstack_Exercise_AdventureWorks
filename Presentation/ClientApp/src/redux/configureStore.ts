import { applyMiddleware, compose, createStore } from "redux";
import thunk from "redux-thunk";
import { checkTokenExpirationMiddleWare } from "../api/helpers/token.middleware";

import rootReducer from "./reducers/Root.reducer";
import { ApplicationState } from "./types/State";

export default function configureStore(initialState?: ApplicationState) {
  const middleware = [thunk, checkTokenExpirationMiddleWare];

  const enhancers = [];
  const windowIfDefined =
    typeof window === "undefined" ? null : (window as any);
  if (windowIfDefined && windowIfDefined.__REDUX_DEVTOOLS_EXTENSION__) {
    enhancers.push(windowIfDefined.__REDUX_DEVTOOLS_EXTENSION__());
  }

  return createStore(
    rootReducer,
    initialState as any,
    compose(applyMiddleware(...middleware), ...enhancers)
  );
}
