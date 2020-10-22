import { ILogin } from "./../../interfaces/Login";
import { IUser } from "../../interfaces/User";
import { LOGIN_SUCCESS, LOGOUT } from "../types/action.types";
import { AuthActions, ILoginAction } from "../types/auth.types";
import { AppThunkAction } from "../types/State";
import { apiCallError, beginApiCall } from "./ApiStatus.actions";
import authService from "../../api/auth.api";
import { decodeUserToken } from "../../api/helpers/token.decoder";

const loginSuccess = (payload: IUser): ILoginAction => {
  return {
    type: LOGIN_SUCCESS,
    payload,
  };
};

export const login = (loginProps: ILogin): AppThunkAction<AuthActions> => {
  return async (dispatch) => {
    try {
      dispatch(beginApiCall());
      const userRespsone = await authService.login(loginProps);
      const user = decodeUserToken(userRespsone.token);
      dispatch(loginSuccess(user));
    } catch (error) {
      dispatch(apiCallError());
      throw error;
    }
  };
};

export const logout = (): AppThunkAction<AuthActions> => {
  return (dispatch) => {
    authService.logout();
    dispatch({
      type: LOGOUT,
    });
  };
};
