import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCurrencyComponent } from './components/add-currency/add-currency.component';


const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'index',
    },
    {
        path: 'index',
        component: AddCurrencyComponent,
        canActivate: [],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class MainRoutingModule {
}
