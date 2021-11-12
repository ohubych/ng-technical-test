import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { SelectOption } from '@app-shared/models';
import { accountOptions, currencyOptions, destinationOptions } from '@app/modules/shared/mock-data/options';
import { AccountEnum, CurrencyEnum, DestinationEnum } from '@app-shared/enum';
import { NzMessageService } from 'ng-zorro-antd/message';
import * as shortId from 'short-uuid';
import { Store } from '@ngrx/store';
import { State } from '@app/reducers';
import { addTransaction } from '@app/modules/transactions/store/transaction.actions';

@Component({
    selector: 'app-add-transaction',
    templateUrl: './add-transaction.component.html',
    styleUrls: ['./add-transaction.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddTransactionComponent implements OnInit {
    public accountCtrl = new FormControl(AccountEnum.UBSGroup, Validators.required);
    public amountValueCtrl = new FormControl('', Validators.required);
    public amountCurrencyCtrl = new FormControl(CurrencyEnum.XTZ, Validators.required);
    public freePayCtrl = new FormControl(false, Validators.required);
    public destinationCtrl = new FormControl(DestinationEnum.CH, [Validators.required]);
    public metaDataArray = new FormArray([]);
    public amountGroup = new FormGroup({
        value: this.amountValueCtrl,
        currency: this.amountCurrencyCtrl,
    });
    public loading = false;
    public form: FormGroup = new FormGroup({});
    public readonly accountOptions: SelectOption[] = accountOptions;
    public readonly currencyOptions: SelectOption[] = currencyOptions;
    public readonly destinationOptions: SelectOption[] = destinationOptions;

    constructor(
        private message: NzMessageService,
        readonly store: Store<State>
    ) {
    }

    ngOnInit(): void {
        this.initForm();
        this.loading = true;
    }

    public get isValid(): boolean {
        return this.form.valid && Boolean(this.metaDataArray.length) && this.metaDataArray.valid;
    }

    private showMessage(type: string): void {
        this.message.create(type, `Transaction successfully created`);
    }

    public initForm(): FormGroup {
        return new FormGroup({
            account: this.accountCtrl,
            amount: this.amountGroup,
            freePay: this.freePayCtrl,
            destination: this.destinationCtrl,
            metaData: this.metaDataArray,
        });
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
        const id = shortId.generate();
        const date = new Date();
        this.store.dispatch(addTransaction({ transaction: { id, date, ...this.form.value } }));
        this.showMessage('success');
        this.resetForm();
    }

    public resetForm(): void {
        this.accountCtrl.setValue(AccountEnum.UBSGroup);
        this.amountValueCtrl.setValue('', { emitEvent: false });
        this.amountCurrencyCtrl.setValue(CurrencyEnum.XTZ);
        this.freePayCtrl.setValue(false);
        this.destinationCtrl.setValue(DestinationEnum.CH);
        this.metaDataArray.clear();
    }
}
