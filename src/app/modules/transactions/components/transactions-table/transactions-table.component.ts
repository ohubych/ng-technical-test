import { ChangeDetectionStrategy, Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { State } from '@app/reducers';
import { Transaction } from '@app/modules/transactions/store/transaction.model';
import { selectAllTransactions } from '@app/modules/transactions/store/transaction.reducer';
import { deleteTransaction } from '@app/modules/transactions/store/transaction.actions';

@Component({
    selector: 'app-transactions-table',
    templateUrl: './transactions-table.component.html',
    styleUrls: ['./transactions-table.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TransactionsTableComponent {
    checked = false;
    loading = false;
    indeterminate = false;
    listOfCurrentPageData: readonly Transaction[] = [];
    setOfCheckedId = new Set<number>();

    readonly transactions$ = this.store.pipe(
        select(selectAllTransactions)
    );

    constructor(readonly store: Store<State>) {
    }

    onCurrentPageDataChange(listOfCurrentPageData: readonly Transaction[]): void {
        this.listOfCurrentPageData = listOfCurrentPageData;
        this.refreshCheckedStatus();
    }

    refreshCheckedStatus(): void {
        // const listOfEnabledData = this.listOfCurrentPageData.filter(({ disabled }) => !disabled);
        // this.checked = listOfEnabledData.every(({ id }) => this.setOfCheckedId.has(id));
        // this.indeterminate = listOfEnabledData.some(({ id }) => this.setOfCheckedId.has(id)) && !this.checked;
    }

    onItemChecked(id: number, checked: boolean): void {
        // this.updateCheckedSet(id, checked);
        this.refreshCheckedStatus();
    }

    onAllChecked(checked: boolean): void {
        // this.listOfCurrentPageData
        //     .filter(({ disabled }) => !disabled)
        //     .forEach(({ id }) => this.updateCheckedSet(id, checked));
        this.refreshCheckedStatus();
    }

    public deleteTransaction(id: string): void {
        this.store.dispatch(deleteTransaction({ id }));
    }
}
