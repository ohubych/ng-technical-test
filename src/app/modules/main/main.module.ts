import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddCurrencyComponent } from './components/add-currency/add-currency.component';
import { MainRoutingModule } from '@app/modules/main/main-routing.module';
import { SharedModule } from '@app-shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MetaDataFormComponent } from './components/meta-data-form/meta-data-form.component';

@NgModule({
    declarations: [
        AddCurrencyComponent,
        MetaDataFormComponent,
    ],
    imports: [
        CommonModule,
        MainRoutingModule,
        SharedModule,
        ReactiveFormsModule,
    ],
})
export class MainModule {
}
