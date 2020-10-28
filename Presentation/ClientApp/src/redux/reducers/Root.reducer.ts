import { combineReducers } from "redux";

import { LOGOUT } from "./../types/action.types";
import { ApplicationState } from "./../types/State";
import apiStatusReducers from "./ApiStatus.reducer";
import { authReducer } from "./Auth.reducer";
import { customerReducer } from "./Customer.reducer";

const appReducer = combineReducers({
  apiCallsInProgress: apiStatusReducers,
  auth: authReducer,
  data: customerReducer,
});

export type RootState = ReturnType<typeof appReducer>;

const rootReducer = (state: ApplicationState | undefined, action: any) => {
  if (action.type === LOGOUT) state = undefined;

  return appReducer(state, action);
};

export default rootReducer;
