import { PUT_CUSTOMER_SUCCESS } from "./../types/action.types";
import { ICustomer } from "./../../interfaces/Customer";
import { getCustomers, updateCustomer } from "../../api/customer.api";
import { GET_CUSTOMERS_SUCCESS } from "../types/action.types";
import { AppThunkAction } from "../types/State";
import { CustomerApiFilterProps } from "./../../api/customer.api";
import { IPagination } from "./../../interfaces/Pagination";
import {
  CustomerActions,
  IGetCustomersAction,
  IPutCustomerAction,
} from "./../types/customer.types";
import { CustomerList } from "./../types/State";
import { apiCallError, beginApiCall } from "./ApiStatus.actions";

const GetCustomerSuccess = (payload: CustomerList): IGetCustomersAction => {
  return {
    type: GET_CUSTOMERS_SUCCESS,
    payload,
  };
};

const PutCustomerSuccess = (payload: ICustomer): IPutCustomerAction => {
  return {
    type: PUT_CUSTOMER_SUCCESS,
    payload,
  };
};

export const getCustomersAction = (
  filterProps?: CustomerApiFilterProps,
  paginationProps?: IPagination
): AppThunkAction<CustomerActions> => {
  return async (dispatch) => {
    try {
      dispatch(beginApiCall());
      const customers = await getCustomers(filterProps, paginationProps);
      dispatch(GetCustomerSuccess(customers));
    } catch (error) {
      dispatch(apiCallError());
      throw error;
    }
  };
};

export const updateCustomerAction = (
  customer: ICustomer
): AppThunkAction<CustomerActions> => {
  return async (dispatch) => {
    try {
      dispatch(beginApiCall());
      const test = await updateCustomer(customer);
      await dispatch(PutCustomerSuccess(customer));
    } catch (error) {
      console.log(error);
      dispatch(apiCallError());
      throw error;
    }
  };
};
