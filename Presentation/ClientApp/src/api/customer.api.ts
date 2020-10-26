import { AxiosResponse } from "axios";

import { CustomerList } from "./../redux/types/State";
import { getHttpWithToken } from "./helpers/auth.header";
import { getCustomerFilterAndPaginatedQueryParameters } from "./helpers/queryParams.helper";

const Url = "Customer";

export interface CustomerApiProps {
  pageNumber?: number;
  pageSize?: number;
  firstName?: string;
  lastName?: string;
  accountNumber?: string;
  sales?: number;
  mustSalesBeHigherThanSum?: boolean;
}

export const getCustomers = async (props?: CustomerApiProps) => {
  const http = getHttpWithToken();

  const response: AxiosResponse<CustomerList> = await http.get(
    Url + getCustomerFilterAndPaginatedQueryParameters(props)
  );

  return response.data;
};
