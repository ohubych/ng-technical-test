import { createAction, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';

import { Currency } from './currency.model';

export const loadCurrencys = createAction(
  '[Currency/API] Load Currencys', 
  props<{ currencys: Currency[] }>()
);

export const addCurrency = createAction(
  '[Currency/API] Add Currency',
  props<{ currency: Currency }>()
);

export const upsertCurrency = createAction(
  '[Currency/API] Upsert Currency',
  props<{ currency: Currency }>()
);

export const addCurrencys = createAction(
  '[Currency/API] Add Currencys',
  props<{ currencys: Currency[] }>()
);

export const upsertCurrencys = createAction(
  '[Currency/API] Upsert Currencys',
  props<{ currencys: Currency[] }>()
);

export const updateCurrency = createAction(
  '[Currency/API] Update Currency',
  props<{ currency: Update<Currency> }>()
);

export const updateCurrencys = createAction(
  '[Currency/API] Update Currencys',
  props<{ currencys: Update<Currency>[] }>()
);

export const deleteCurrency = createAction(
  '[Currency/API] Delete Currency',
  props<{ id: string }>()
);

export const deleteCurrencys = createAction(
  '[Currency/API] Delete Currencys',
  props<{ ids: string[] }>()
);

export const clearCurrencys = createAction(
  '[Currency/API] Clear Currencys'
);
