import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { State } from '@app/reducers';
import { Transaction } from '@app/modules/transactions/store/transaction.model';
import { selectSelectedWidget } from '@app/modules/transactions/store/transaction.reducer';
import { deleteTransaction, searchTransactionsById } from '@app/modules/transactions/store/transaction.actions';
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
    readonly transactions$: Observable<Transaction[]> = this.store.pipe(select(selectSelectedWidget));
    public searchIdCtrl = new FormControl('');
    public visible = false;
    private subs = new SubSink();

    constructor(readonly store: Store<State>) {
    }

    ngOnInit(): void {
        this.initIdSearch();
    }

    ngOnDestroy(): void {
        this.clearSearch();
        this.subs.unsubscribe();
    }

    public deleteTransaction(id: string): void {
        this.store.dispatch(deleteTransaction({ id }));
    }

    private initIdSearch(): void {
        this.clearSearch();
        this.subs.sink = this.searchIdCtrl.valueChanges
            .pipe(debounceTime(this.DEBOUNCE_TIME))
            .subscribe(search =>
                this.store.dispatch(searchTransactionsById({ search }))
            );
    }

    private clearSearch(): void {
        this.store.dispatch(searchTransactionsById({ search: '' }));
    }
}
