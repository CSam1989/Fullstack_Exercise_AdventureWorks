import { AxiosInstance } from "axios";
import http from "./api.instance";

export const getHttpWithToken = () => {
  const token = getToken();
  if (token) {
    //applying token
    http.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    //deleting the token from header
    delete http.defaults.headers.common["Authorization"];
  }
  return http;
};

const getToken = (): string | undefined => {
  const userLocalStorage = localStorage.getItem("user");
  return userLocalStorage ? JSON.parse(userLocalStorage).token : undefined;
};
