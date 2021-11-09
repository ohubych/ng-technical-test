import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransactionsTableComponent } from './components/transactions-table/transactions-table.component';
import { TransactionsRoutingModule } from '@app/modules/transactions/transactions-routing.module';
import { SharedModule } from '@app-shared/shared.module';
import { NzDropDownModule } from "ng-zorro-antd/dropdown";
import { ReactiveFormsModule } from "@angular/forms";


@NgModule({
    declarations: [
        TransactionsTableComponent,
    ],
  imports: [
    CommonModule,
    TransactionsRoutingModule,
    SharedModule,
    NzDropDownModule,
    ReactiveFormsModule
  ]
})
export class TransactionsModule {
}
