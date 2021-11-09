import { Action, createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Currency } from './currency.model';
import * as CurrencyActions from './currency.actions';

export const currenciesFeatureKey = 'currencies';

export interface State extends EntityState<Currency> {
  // additional entities state properties
}

export const adapter: EntityAdapter<Currency> = createEntityAdapter<Currency>();

export const initialState: State = adapter.getInitialState({
  // additional entity state properties
});


export const reducer = createReducer(
  initialState,
  on(CurrencyActions.addCurrency,
    (state, action) => adapter.addOne(action.currency, state)
  ),
  on(CurrencyActions.upsertCurrency,
    (state, action) => adapter.upsertOne(action.currency, state)
  ),
  on(CurrencyActions.addCurrencys,
    (state, action) => adapter.addMany(action.currencys, state)
  ),
  on(CurrencyActions.upsertCurrencys,
    (state, action) => adapter.upsertMany(action.currencys, state)
  ),
  on(CurrencyActions.updateCurrency,
    (state, action) => adapter.updateOne(action.currency, state)
  ),
  on(CurrencyActions.updateCurrencys,
    (state, action) => adapter.updateMany(action.currencys, state)
  ),
  on(CurrencyActions.deleteCurrency,
    (state, action) => adapter.removeOne(action.id, state)
  ),
  on(CurrencyActions.deleteCurrencys,
    (state, action) => adapter.removeMany(action.ids, state)
  ),
  on(CurrencyActions.loadCurrencys,
    (state, action) => adapter.setAll(action.currencys, state)
  ),
  on(CurrencyActions.clearCurrencys,
    state => adapter.removeAll(state)
  ),
);


export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors();
