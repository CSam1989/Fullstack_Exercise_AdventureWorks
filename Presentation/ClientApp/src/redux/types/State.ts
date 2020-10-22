import { IUser } from "../../interfaces/User";

export interface ApplicationState {
  apiCallsInProgress: number;
  auth: UserState;
}

export interface UserState {
  isLoggedIn: boolean;
  user: IUser | null;
}

// This type can be used as a hint on action creators so that its 'dispatch' and 'getState' params are
// correctly typed to match your store.
export interface AppThunkAction<TAction> {
  (
    dispatch: (action: TAction | AppThunkAction<TAction>) => void,
    getState: () => ApplicationState
  ): void;
}