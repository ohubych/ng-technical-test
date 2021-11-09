import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer,
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import * as CurrencyState from '@app/modules/currencies-list/store/currency.reducer';

export interface State {
    currency: CurrencyState.State,
}

export const reducers: ActionReducerMap<State> = {
    currency: CurrencyState.reducer,
};


export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
