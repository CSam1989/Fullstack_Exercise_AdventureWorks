import { AuthActions } from "./../types/auth.types";
import { ApiStatusActions } from "./../types/apiStatus.types";
import { ApplicationState } from "./../types/State";
import { LOGOUT } from "./../types/action.types";
import { customerReducer } from "./Customer.reducer";
import { authReducer } from "./Auth.reducer";
import { combineReducers } from "redux";
import apiStatusReducers from "./ApiStatus.reducer";
import InitialState from "./initialState";

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
