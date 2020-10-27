import { GET_USERS_SUCCESS } from "./../types/action.types";
import { IGetUsersAction } from "./../types/auth.types";
import { IAdminUser } from "./../../interfaces/AdminUser";
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

const getUsersSucces = (payload: IAdminUser[]): IGetUsersAction => {
  return {
    type: GET_USERS_SUCCESS,
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

export const getUsers = (): AppThunkAction<AuthActions> => {
  return async (dispatch) => {
    try {
      dispatch(beginApiCall());
      const usersRespsone = await authService.getUsers();
      dispatch(getUsersSucces(usersRespsone.users));
    } catch (error) {
      dispatch(apiCallError());
      throw error;
    }
  };
};
