import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: '',
        loadChildren: () => import('src/app/modules/main/main.module').then(m => m.MainModule),
    },
    {
        path: 'currencies',
        loadChildren: () => import('src/app/modules/currencies-list/currencies-list.module').then(m => m.CurrenciesListModule),
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {
}
