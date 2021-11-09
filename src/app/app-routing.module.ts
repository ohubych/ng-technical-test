import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: '',
        loadChildren: () => import('src/app/modules/main/main.module').then(m => m.MainModule),
    },
    {
        path: 'transactions',
        loadChildren: () => import('@app/modules/transactions/transactions.module').then(m => m.TransactionsModule),
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {
}
