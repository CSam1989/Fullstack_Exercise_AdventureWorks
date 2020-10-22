import { IUser } from "./../../interfaces/User";
import jwt_decode from "jwt-decode";

export const decodeUserToken = (token: string) => {
  const user: IUser = jwt_decode(token);
  user.token = token;
  return user;
};
