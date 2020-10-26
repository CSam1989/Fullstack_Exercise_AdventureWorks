import jwt_decode from "jwt-decode";

import { IUser } from "./../../interfaces/User";

export const decodeUserToken = (token: string) => {
  const user: IUser = jwt_decode(token);
  user.token = token;
  return user;
};
