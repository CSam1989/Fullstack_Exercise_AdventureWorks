import { IAdminUser } from "./../../interfaces/AdminUser";
import { IUser } from "../../interfaces/User";
import {
  GET_USERS_SUCCESS,
  LOGIN_SUCCESS,
  LOGOUT,
  POST_USER_SUCCESS,
  PUT_USERROLE_SUCCESS,
} from "./action.types";
import { ApiStatusActions } from "./apiStatus.types";

export interface ILoginAction {
  type: typeof LOGIN_SUCCESS;
  payload: IUser;
}

export interface ILogoutAction {
  type: typeof LOGOUT;
}

export interface IGetUsersAction {
  type: typeof GET_USERS_SUCCESS;
  payload: IAdminUser[];
}

export interface IPostUserAction {
  type: typeof POST_USER_SUCCESS;
  payload: IAdminUser;
}

export interface IPutUserRoleAction {
  type: typeof PUT_USERROLE_SUCCESS;
  payload: IAdminUser;
}

export type AuthActions =
  | ILoginAction
  | ILogoutAction
  | IGetUsersAction
  | IPostUserAction
  | IPutUserRoleAction
  | ApiStatusActions;
