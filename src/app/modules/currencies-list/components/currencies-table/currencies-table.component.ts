import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { State } from '@app/reducers';
import { Currency } from '@app/modules/currencies-list/store/currency.model';
import { selectAllCurrency } from '@app/modules/currencies-list/store/currency.reducer';
import { addCurrency, deleteCurrency } from "@app/modules/currencies-list/store/currency.actions";

@Component({
    selector: 'app-currencies-table',
    templateUrl: './currencies-table.component.html',
    styleUrls: ['./currencies-table.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CurrenciesTableComponent implements OnInit {
    checked = false;
    loading = false;
    indeterminate = false;
    listOfData: readonly Currency[] = [];
    listOfCurrentPageData: readonly Currency[] = [];
    setOfCheckedId = new Set<number>();

    readonly currencies$ = this.store.pipe(
        select(selectAllCurrency)
    );

    constructor(readonly store: Store<State>) {
    }

    ngOnInit(): void {
        this.listOfData = [];

        this.currencies$
            .subscribe(list => console.log(list));
    }

    onCurrentPageDataChange(listOfCurrentPageData: readonly Currency[]): void {
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
        this.store.dispatch(deleteCurrency({ id }));
    }
}
