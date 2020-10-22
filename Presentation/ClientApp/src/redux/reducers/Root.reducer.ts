import { authReducer } from "./Auth.reducer";
import { combineReducers } from "redux";
import apiStatusReducers from "./ApiStatus.reducer";

export default combineReducers({
  apiCallsInProgress: apiStatusReducers,
  auth: authReducer,
});
