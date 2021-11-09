import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { State } from '@app/reducers';
import { Transaction } from '@app/modules/transactions/store/transaction.model';
import { selectTransactions } from '@app/modules/transactions/store/transaction.reducer';
import {
    deleteTransaction,
    searchTransactionsById,
    searchTransactionsDate,
} from '@app/modules/transactions/store/transaction.actions';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { SubSink } from 'subsink';

@Component({
    selector: 'app-transactions-table',
    templateUrl: './transactions-table.component.html',
    styleUrls: ['./transactions-table.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TransactionsTableComponent implements OnInit, OnDestroy {
    private readonly DEBOUNCE_TIME = 300;
    private subs = new SubSink();
    public readonly transactions$: Observable<Transaction[]> = this.store.pipe(select(selectTransactions));
    public searchIdCtrl = new FormControl('');
    public rangePickerCtrl = new FormControl(null);
    public searchVisible = {
        id: false,
        date: false,
    };

    constructor(readonly store: Store<State>) {
    }

    ngOnInit(): void {
        this.initIdSearch();
        this.initRangeSearch();
    }

    ngOnDestroy(): void {
        this.clearIdSearch();
        this.clearRangesSearch();
        this.subs.unsubscribe();
    }

    private initIdSearch(): void {
        this.clearIdSearch();
        this.subs.sink = this.searchIdCtrl.valueChanges
            .pipe(debounceTime(this.DEBOUNCE_TIME))
            .subscribe(search =>
                this.store.dispatch(searchTransactionsById({ search }))
            );
    }

    private clearIdSearch(): void {
        this.store.dispatch(searchTransactionsById({ search: '' }));
    }

    private clearRangesSearch(): void {
        this.store.dispatch(searchTransactionsDate({ dates: [] }));
    }

    private initRangeSearch(): void {
        this.clearRangesSearch();
        this.subs.sink = this.rangePickerCtrl.valueChanges
            .subscribe((dates: Date[]) =>
                this.store.dispatch(searchTransactionsDate({ dates }))
            );
    }

    public deleteTransaction(id: string): void {
        this.store.dispatch(deleteTransaction({ id }));
    }
}
