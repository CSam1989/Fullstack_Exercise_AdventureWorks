import { getHttpWithToken } from "./helpers/auth.header";
import { ICustomer } from "./../interfaces/Customer";
import { AxiosResponse } from "axios";

interface CustomerResponse {
  list: ICustomer[];
}
export const getCustomers = async () => {
  const http = getHttpWithToken();
  const response: AxiosResponse<CustomerResponse> = await http.get("Customer");

  return response.data.list;
};
