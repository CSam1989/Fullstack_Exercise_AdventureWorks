import jwt_decode from "jwt-decode";
import { Middleware } from "redux";
import { IUser } from "../../interfaces/User";
import { RootState } from "../../redux/reducers/Root.reducer";
import { UserStorage } from "../auth.api";

export const checkTokenExpirationMiddleWare: Middleware<{}, RootState> = (
  store
) => (next) => (action) => {
  const userStorage = localStorage.getItem(UserStorage);

  const token = userStorage ? JSON.parse(userStorage)["token"] : undefined;

  if (token && (jwt_decode(token) as IUser).exp < Date.now() / 1000) {
    next(action);
    localStorage.removeItem(UserStorage);
  }
  next(action);
};
