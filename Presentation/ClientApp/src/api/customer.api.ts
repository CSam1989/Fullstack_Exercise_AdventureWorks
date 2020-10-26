import { IPagination } from "./../interfaces/Pagination";
import { AxiosResponse } from "axios";

import { CustomerList } from "./../redux/types/State";
import { getHttpWithToken } from "./helpers/auth.header";
import { getCustomerFilterAndPaginatedQueryParameters } from "./helpers/queryParams.helper";

const Url = "Customer";

export interface CustomerApiFilterProps {
  firstName: string;
  lastName: string;
  accountNumber: string;
  sumTotalDue: number | undefined;
  mustSalesBeHigherThanSum: boolean | undefined;
  [propName: string]: any;
}

export const getCustomers = async (
  filterProps?: CustomerApiFilterProps,
  paginationProps?: IPagination
) => {
  const http = getHttpWithToken();
  const response: AxiosResponse<CustomerList> = await http.get(
    Url +
      getCustomerFilterAndPaginatedQueryParameters(paginationProps, filterProps)
  );

  return response.data;
};
