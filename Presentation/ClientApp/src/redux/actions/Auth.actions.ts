import {
  GET_USERS_SUCCESS,
  POST_USER_SUCCESS,
  PUT_USERROLE_SUCCESS,
} from "./../types/action.types";
import {
  IGetUsersAction,
  IPostUserAction,
  IPutUserRoleAction,
} from "./../types/auth.types";
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

const PostUserSuccess = (payload: IAdminUser): IPostUserAction => {
  return {
    type: POST_USER_SUCCESS,
    payload,
  };
};

const PutUserRoleSuccess = (payload: IAdminUser): IPutUserRoleAction => {
  return {
    type: PUT_USERROLE_SUCCESS,
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

export const getUsersAction = (): AppThunkAction<AuthActions> => {
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

export const createUserAction = (
  user: IAdminUser
): AppThunkAction<AuthActions> => {
  return async (dispatch) => {
    try {
      dispatch(beginApiCall());
      const userId = await authService.createUser(user);
      user.userId = userId;
      dispatch(PostUserSuccess(user));
    } catch (error) {
      dispatch(apiCallError());
      throw error;
    }
  };
};

export const updateUserRoleAction = (
  user: IAdminUser
): AppThunkAction<AuthActions> => {
  return async (dispatch) => {
    try {
      dispatch(beginApiCall());
      await authService.updateUserRole(user);
      dispatch(PutUserRoleSuccess(user));
    } catch (error) {
      dispatch(apiCallError());
      throw error;
    }
  };
};
