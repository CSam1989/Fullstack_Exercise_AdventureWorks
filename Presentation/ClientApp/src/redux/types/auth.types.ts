import { IAdminUser } from "./../../interfaces/AdminUser";
import { IUser } from "../../interfaces/User";
import { GET_USERS_SUCCESS, LOGIN_SUCCESS, LOGOUT } from "./action.types";
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

export type AuthActions =
  | ILoginAction
  | ILogoutAction
  | IGetUsersAction
  | ApiStatusActions;
