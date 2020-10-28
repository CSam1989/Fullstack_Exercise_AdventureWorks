import { IAdminUser } from "./../interfaces/AdminUser";
import { getHttpWithToken } from "./helpers/auth.header";
import { ILogin } from "./../interfaces/Login";
import { AxiosResponse } from "axios";
import { IUser } from "../interfaces/User";
import http from "./helpers/api.instance";
import { handleErrors, handleResponses } from "./helpers/api.utils";

export const UserStorage = "user";
const Url = "Auth";
const httpToken = getHttpWithToken();

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
  try {
    const response: AxiosResponse<IAdminUser[]> = await httpToken.get(Url);
    return handleResponses(response);
  } catch (error) {
    handleErrors(error);
  }
};

const createUser = async (props: IAdminUser) => {
  try {
    const response: AxiosResponse<IAdminUser> = await httpToken.post(
      `${Url}/Create`,
      { ...props }
    );
    return handleResponses(response);
  } catch (error) {
    handleErrors(error);
  }
};

const updateUserRole = async ({ userId, isAdmin }: IAdminUser) => {
  try {
    const response: AxiosResponse<IAdminUser> = await httpToken.put(
      `${Url}/UpdateRole`,
      { userId, isAdmin }
    );
    return handleResponses(response);
  } catch (error) {
    handleErrors(error);
  }
};

export default {
  login,
  logout,
  getUsers,
  createUser,
  updateUserRole,
};
