import { createAction, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';

import { Transaction } from './transaction.model';

export const loadTransactions = createAction(
  '[Transaction/API] Load Transactions',
  props<{ transactions: Transaction[] }>()
);

export const addTransaction = createAction(
  '[Transaction/API] Add Transaction',
  props<{ transaction: Transaction }>()
);

export const upsertTransaction = createAction(
  '[Transaction/API] Upsert Transaction',
  props<{ transaction: Transaction }>()
);

export const addTransactions = createAction(
  '[Transaction/API] Add Transactions',
  props<{ transactions: Transaction[] }>()
);

export const upsertTransactions = createAction(
  '[Transaction/API] Upsert Transactions',
  props<{ transactions: Transaction[] }>()
);

export const updateTransaction = createAction(
  '[Transaction/API] Update Transaction',
  props<{ transaction: Update<Transaction> }>()
);

export const updateTransactions = createAction(
  '[Transaction/API] Update Transactions',
  props<{ transactions: Update<Transaction>[] }>()
);

export const deleteTransaction = createAction(
  '[Transaction/API] Delete Transaction',
  props<{ id: string }>()
);

export const deleteTransactions = createAction(
  '[Transaction/API] Delete Transactions',
  props<{ ids: string[] }>()
);

export const clearTransactions = createAction(
  '[Transaction/API] Clear Transactions'
);

export const searchTransactionsById = createAction(
    '[Transaction/API] Search Transactions by id',
    props<{ search: string }>()
);
