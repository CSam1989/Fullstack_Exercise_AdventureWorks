import { AxiosResponse } from "axios";

import { ICustomer } from "./../interfaces/Customer";
import { IPagination } from "./../interfaces/Pagination";
import { CustomerList } from "./../redux/types/State";
import { handleErrors, handleResponses } from "./helpers/api.utils";
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
  try {
    const response: AxiosResponse<CustomerList> = await http.get(
      Url +
        getCustomerFilterAndPaginatedQueryParameters(
          paginationProps,
          filterProps
        )
    );
    return handleResponses(response);
  } catch (error) {
    return handleErrors(error);
  }
};

export const updateCustomer = async (customer: ICustomer) => {
  const http = getHttpWithToken();
  try {
    const response = await http.put(Url + `/${customer.customerId}`, customer);
    return handleResponses(response);
  } catch (error) {
    handleErrors(error);
  }
};
