import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransactionsTableComponent } from './components/transactions-table/transactions-table.component';
import { TransactionsRoutingModule } from '@app/modules/transactions/transactions-routing.module';
import { SharedModule } from '@app-shared/shared.module';


@NgModule({
    declarations: [
        TransactionsTableComponent,
    ],
    imports: [
        CommonModule,
        TransactionsRoutingModule,
        SharedModule,
    ],
})
export class TransactionsModule {
}
