import { IAdminUser } from "./../../interfaces/AdminUser";
import { CustomerApiFilterProps } from "./../../api/customer.api";
import { IPagination } from "./../../interfaces/Pagination";
import { ICustomer } from "./../../interfaces/Customer";
import { IUser } from "../../interfaces/User";

export interface ApplicationState {
  apiCallsInProgress: number;
  auth: UserState;
  data: CustomerState;
}

export interface UserState {
  isLoggedIn: boolean;
  user: IUser | null;
  users: IAdminUser[] | undefined;
}

export interface CustomerState {
  customers: CustomerList;
  filters: CustomerApiFilterProps;
}

export interface CustomerList {
  list: ICustomer[];
  pagination: IPagination;
}

// This type can be used as a hint on action creators so that its 'dispatch' and 'getState' params are
// correctly typed to match your store.
export interface AppThunkAction<TAction> {
  (
    dispatch: (action: TAction | AppThunkAction<TAction>) => void,
    getState: () => ApplicationState
  ): void;
}
