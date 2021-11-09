import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CurrenciesTableComponent } from './components/currencies-table/currencies-table.component';


const routes: Routes = [
    {
        path: '',
        component: CurrenciesTableComponent,
        canActivate: [],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class CurrenciesListRoutingModule {
}
