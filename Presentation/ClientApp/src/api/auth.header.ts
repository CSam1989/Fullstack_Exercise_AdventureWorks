import { AxiosInstance } from "axios";

export const setAuthToken = (instance: AxiosInstance) => {
  const token = getToken();
  if (token) {
    //applying token
    instance.defaults.headers.common["Authorization"] = token;
  } else {
    //deleting the token from header
    delete instance.defaults.headers.common["Authorization"];
  }
  return instance;
};

const getToken = (): string | undefined => {
  const userLocalStorage = localStorage.getItem("user");
  return userLocalStorage ? JSON.parse(userLocalStorage).token : undefined;
};
