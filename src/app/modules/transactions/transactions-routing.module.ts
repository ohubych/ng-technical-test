import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TransactionsTableComponent } from './components/transactions-table/transactions-table.component';


const routes: Routes = [
    {
        path: '',
        component: TransactionsTableComponent,
        canActivate: [],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class TransactionsRoutingModule {
}
