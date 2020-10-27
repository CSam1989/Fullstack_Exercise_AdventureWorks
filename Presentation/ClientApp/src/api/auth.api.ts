import { IAdminUser } from "./../interfaces/AdminUser";
import { getHttpWithToken } from "./helpers/auth.header";
import { ILogin } from "./../interfaces/Login";
import { AxiosResponse } from "axios";
import { IUser } from "../interfaces/User";
import http from "./helpers/api.instance";
import { handleErrors, handleResponses } from "./helpers/api.utils";

export const UserStorage = "user";
const Url = "Auth";

const login = async ({ username, password }: ILogin) => {
  try {
    const response: AxiosResponse<IUser> = await http.post(`${Url}/login`, {
      username,
      password,
    });
    if (response.data.token) {
      localStorage.setItem("user", JSON.stringify(response.data));
    }
    return handleResponses(response);
  } catch (error) {
    handleErrors(error);
  }
};

const logout = () => {
  localStorage.removeItem(UserStorage);
};

const getUsers = async () => {
  const httpToken = getHttpWithToken();

  try {
    const response: AxiosResponse<IAdminUser[]> = await httpToken.get(Url);
    return handleResponses(response);
  } catch (error) {
    handleErrors(error);
  }
};

export default {
  login,
  logout,
  getUsers,
};
