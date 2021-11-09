import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurrenciesTableComponent } from './components/currencies-table/currencies-table.component';
import { CurrenciesListRoutingModule } from '@app/modules/currencies-list/currencies-list-routing.module';
import { SharedModule } from '@app-shared/shared.module';


@NgModule({
    declarations: [
        CurrenciesTableComponent,
    ],
    imports: [
        CommonModule,
        CurrenciesListRoutingModule,
        SharedModule,
    ],
})
export class CurrenciesListModule {
}
