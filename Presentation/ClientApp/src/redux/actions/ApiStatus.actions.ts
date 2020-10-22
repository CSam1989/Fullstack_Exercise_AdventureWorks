import { IBeginApiCall, IApiCallError } from "./../types/apiStatus.types";
import { API_CALL_ERROR, BEGIN_API_CALL } from "../types/action.types";

export const beginApiCall = (): IBeginApiCall => {
  return { type: BEGIN_API_CALL };
};

export const apiCallError = (): IApiCallError => {
  return { type: API_CALL_ERROR };
};
