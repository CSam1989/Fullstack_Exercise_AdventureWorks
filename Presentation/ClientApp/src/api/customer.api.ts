import { AxiosResponse } from "axios";

import { CustomerList } from "./../redux/types/State";
import { getHttpWithToken } from "./helpers/auth.header";
import { getPaginatedQueryParameters } from "./helpers/queryParams.helper";

const Url = "Customer";

export const getCustomers = async (pageNumber?: number, pageSize?: number) => {
  const http = getHttpWithToken();

  const response: AxiosResponse<CustomerList> = await http.get(
    Url + getPaginatedQueryParameters(pageNumber, pageSize)
  );

  return response.data;
};
