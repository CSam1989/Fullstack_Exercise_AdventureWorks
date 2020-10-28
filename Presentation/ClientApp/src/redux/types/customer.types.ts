import { CustomerList } from "./State";
import { ICustomer } from "./../../interfaces/Customer";
import { GET_CUSTOMERS_SUCCESS, PUT_CUSTOMER_SUCCESS } from "./action.types";
import { ApiStatusActions } from "./apiStatus.types";

export interface IGetCustomersAction {
  type: typeof GET_CUSTOMERS_SUCCESS;
  payload: CustomerList;
}

export interface IPutCustomerAction {
  type: typeof PUT_CUSTOMER_SUCCESS;
  payload: ICustomer;
}

export type CustomerActions =
  | IGetCustomersAction
  | IPutCustomerAction
  | ApiStatusActions;
