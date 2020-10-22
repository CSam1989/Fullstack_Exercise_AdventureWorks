import { IUser } from "../../interfaces/User";
import { LOGIN_SUCCESS, LOGOUT } from "./action.types";
import { ApiStatusActions } from "./apiStatus.types";

export interface ILoginAction {
  type: typeof LOGIN_SUCCESS;
  payload: IUser;
}

export interface ILogoutAction {
  type: typeof LOGOUT;
}

export type AuthActions = ILoginAction | ILogoutAction | ApiStatusActions;
