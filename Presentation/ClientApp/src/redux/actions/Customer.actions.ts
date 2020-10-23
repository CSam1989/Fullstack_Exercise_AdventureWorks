import { GET_CUSTOMERS_SUCCESS } from "../types/action.types";
import { AppThunkAction } from "../types/State";
import { ICustomer } from "./../../interfaces/Customer";
import { getCustomers } from "../../api/customer.api";
import {
  CustomerActions,
  IGetCustomersAction,
} from "./../types/customer.types";
import { apiCallError, beginApiCall } from "./ApiStatus.actions";

const GetCustomerSuccess = (payload: ICustomer[]): IGetCustomersAction => {
  return {
    type: GET_CUSTOMERS_SUCCESS,
    payload,
  };
};

export const getCustomersAction = (): AppThunkAction<CustomerActions> => {
  return async (dispatch) => {
    try {
      dispatch(beginApiCall());
      const customers = await getCustomers();
      dispatch(GetCustomerSuccess(customers));
    } catch (error) {
      dispatch(apiCallError());
      throw error;
    }
  };
};
