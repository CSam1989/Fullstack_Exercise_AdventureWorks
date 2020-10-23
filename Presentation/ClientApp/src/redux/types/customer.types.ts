import { ICustomer } from "./../../interfaces/Customer";
import { GET_CUSTOMERS_SUCCESS } from "./action.types";
import { ApiStatusActions } from "./apiStatus.types";

export interface IGetCustomersAction {
  type: typeof GET_CUSTOMERS_SUCCESS;
  payload: ICustomer[];
}

export type CustomerActions = IGetCustomersAction | ApiStatusActions;
