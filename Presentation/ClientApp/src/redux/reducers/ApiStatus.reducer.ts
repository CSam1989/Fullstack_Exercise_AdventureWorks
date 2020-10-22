import { ApiStatusActions } from "./../types/apiStatus.types";
import { API_CALL_ERROR, BEGIN_API_CALL } from "../types/action.types";
import initialState from "./initialState";

const actionTypeEndsInSuccess = (type: string) => {
  return type.substring(type.length - 8) === "_SUCCESS";
};

const apiStatusReducers = (
  state = initialState.apiCallsInProgress,
  action: ApiStatusActions
) => {
  if (action.type === BEGIN_API_CALL) return state + 1;

  if (actionTypeEndsInSuccess(action.type) || action.type === API_CALL_ERROR) {
    return state - 1;
  }
  return state;
};

export default apiStatusReducers;
