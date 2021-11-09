import { createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Transaction } from './transaction.model';
import * as TransactionActions from './transaction.actions';
import moment from 'moment';

export const transactionsFeatureKey = 'transaction';

export interface State extends EntityState<Transaction> {
    // additional entities state properties
    searchId: string;
    dateRanges: Date[];
}

export const adapter: EntityAdapter<Transaction> = createEntityAdapter<Transaction>();

export const initialState: State = adapter.getInitialState({
    // additional entity state properties
    searchId: '',
    dateRanges: [],
});


export const reducer = createReducer(
    initialState,
    on(TransactionActions.addTransaction,
        (state, action) => adapter.addOne(action.transaction, state)
    ),
    on(TransactionActions.upsertTransaction,
        (state, action) => adapter.upsertOne(action.transaction, state)
    ),
    on(TransactionActions.addTransactions,
        (state, action) => adapter.addMany(action.transactions, state)
    ),
    on(TransactionActions.upsertTransactions,
        (state, action) => adapter.upsertMany(action.transactions, state)
    ),
    on(TransactionActions.updateTransaction,
        (state, action) => adapter.updateOne(action.transaction, state)
    ),
    on(TransactionActions.updateTransactions,
        (state, action) => adapter.updateMany(action.transactions, state)
    ),
    on(TransactionActions.deleteTransaction,
        (state, action) => adapter.removeOne(action.id, state)
    ),
    on(TransactionActions.deleteTransactions,
        (state, action) => adapter.removeMany(action.ids, state)
    ),
    on(TransactionActions.loadTransactions,
        (state, action) => adapter.setAll(action.transactions, state)
    ),
    on(TransactionActions.clearTransactions,
        state => adapter.removeAll(state)
    ),
    on(TransactionActions.clearTransactions,
        state => adapter.removeAll(state)
    ),
    on(TransactionActions.searchTransactionsById,
       (state, action) => ({ ...state, searchId: action.search })
    ),
    on(TransactionActions.searchTransactionsDate,
        (state, action) => ({ ...state, dateRanges: action.dates })
    )
);

const feature = createFeatureSelector<State>(transactionsFeatureKey);

const {
    selectAll,
} = adapter.getSelectors(feature);

export const selectAllTransactions = selectAll;
export const selectSearchId = createSelector(
    feature,
    ({ searchId }) => searchId
);
export const selectSearchRange = createSelector(
    feature,
    ({ dateRanges }) => dateRanges
);
export const selectTransactions = createSelector(
    selectSearchId,
    selectAllTransactions,
    selectSearchRange,
    (string, transactions, ranges) => {
        let filtered = transactions.filter(item => item.id.indexOf(string) !== -1);
        if (Boolean(ranges) && Boolean(ranges.length > 1)) {
            const [start, end] = ranges;
            const startDate = moment(start).startOf('day').toDate();
            const endDate = moment(end).endOf('day').toDate();
            const startTime = startDate.getTime();
            const endTime = endDate.getTime();
            const rangeFiltered = filtered.filter(({ date }) => (date.getTime() > startTime && date.getTime() < endTime));
            filtered = [...rangeFiltered];
        }
        return filtered;
    }
);
