import { API_CALL_ERROR, BEGIN_API_CALL } from "./action.types";

export interface IBeginApiCall {
  type: typeof BEGIN_API_CALL;
}

export interface IApiCallError {
  type: typeof API_CALL_ERROR;
}

export type ApiStatusActions = IBeginApiCall | IApiCallError;
