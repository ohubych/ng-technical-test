import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddTransactionComponent } from './components/add-transaction/add-transaction.component';


const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'index',
    },
    {
        path: 'index',
        component: AddTransactionComponent,
        canActivate: [],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class MainRoutingModule {
}
