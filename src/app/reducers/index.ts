import { ActionReducerMap, } from '@ngrx/store';
import * as TransactionState from '@app/modules/transactions/store/transaction.reducer';

export interface State {
    transaction: TransactionState.State,
}

export const reducers: ActionReducerMap<State> = {
    transaction: TransactionState.reducer,
};
