import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddTransactionComponent } from './components/add-transaction/add-transaction.component';
import { MainRoutingModule } from '@app/modules/main/main-routing.module';
import { SharedModule } from '@app-shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MetaDataFormComponent } from './components/meta-data-form/meta-data-form.component';

@NgModule({
    declarations: [
        AddTransactionComponent,
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
