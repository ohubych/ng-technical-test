import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { SelectOption } from '@app-shared/models';
import { accountOptions, currencyOptions, destinationOptions } from '@app/modules/shared/mock-data/options';
import { Account, Currency, Destination } from '@app-shared/enum';
import { NzMessageService } from 'ng-zorro-antd/message';
import * as shortId from 'short-uuid';

@Component({
    selector: 'app-add-currency',
    templateUrl: './add-currency.component.html',
    styleUrls: ['./add-currency.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddCurrencyComponent {
    public accountCtrl = new FormControl(Account.UBSGroup, Validators.required);
    public amountValueCtrl = new FormControl('', Validators.required);
    public amountCurrencyCtrl = new FormControl(Currency.XTZ, Validators.required);
    public freePayCtrl = new FormControl(false, Validators.required);
    public destinationCtrl = new FormControl(Destination.CH, [Validators.required]);
    public metaDataArray = new FormArray([]);
    public amountGroup = new FormGroup({
        value: this.amountValueCtrl,
        currency: this.amountCurrencyCtrl,
    });

    public form = new FormGroup({
        account: this.accountCtrl,
        amount: this.amountGroup,
        freePay: this.freePayCtrl,
        destination: this.destinationCtrl,
        metaData: this.metaDataArray,
    });

    public readonly accountOptions: SelectOption[] = accountOptions;
    public readonly currencyOptions: SelectOption[] = currencyOptions;
    public readonly destinationOptions: SelectOption[] = destinationOptions;

    constructor(private message: NzMessageService) {
    }

    public get isValid(): boolean {
        return this.form.valid && Boolean(this.metaDataArray.length) && this.metaDataArray.valid;
    }

    private showMessage(type: string): void {
        this.message.create(type, `Transaction successfully created`);
    }

    public addMetaGroup(data: { key: string, value: string }): void {
        this.metaDataArray.push(new FormGroup({
            key: new FormControl(data.key, Validators.required),
            value: new FormControl(data.value, Validators.required),
        }));
    }

    public deleteMetaGroup(i: number): void {
        this.metaDataArray.removeAt(i);
    }

    public create(): void {
        console.log(this.form.value);
        const id = shortId.generate();
        console.log(id);
        const date = new Date();
        console.log(date);
        this.showMessage('success');
        this.resetForm();
    }

    public resetForm(): void {
        this.accountCtrl.setValue(Account.UBSGroup);
        this.amountValueCtrl.setValue('', { emitEvent: false });
        this.amountCurrencyCtrl.setValue(Currency.XTZ);
        this.freePayCtrl.setValue(false);
        this.destinationCtrl.setValue(Destination.CH);
        this.metaDataArray.clear();
    };

}
