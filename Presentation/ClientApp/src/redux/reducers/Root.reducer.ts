import { customerReducer } from "./Customer.reducer";
import { authReducer } from "./Auth.reducer";
import { combineReducers } from "redux";
import apiStatusReducers from "./ApiStatus.reducer";

const rootReducer = combineReducers({
  apiCallsInProgress: apiStatusReducers,
  auth: authReducer,
  data: customerReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
