import { ILogin } from "./../interfaces/Login";
import { AxiosResponse } from "axios";
import { IUser } from "../interfaces/User";
import http from "./helpers/api.instance";

const login = async ({ username, password }: ILogin) => {
  const response: AxiosResponse<IUser> = await http.post("Auth/login", {
    username,
    password,
  });
  if (response.data.token) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

const logout = () => {
  localStorage.removeItem("user");
};

export default {
  login,
  logout,
};
