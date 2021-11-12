import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { AddTransactionComponent } from './add-transaction.component';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { transactions, startMonth, endMonth, id } from '@app/modules/main/components/add-transaction/transaction.mock';
import { initialState } from '@app/modules/transactions/store/transaction.reducer';
import { AccountEnum, CurrencyEnum, DestinationEnum } from '@app-shared/enum';
import { NzMessageService } from 'ng-zorro-antd/message';
import { CUSTOM_ELEMENTS_SCHEMA, forwardRef } from '@angular/core';
import { FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';

class MockNzMessageService {
    constructor() {}

    create: () => ({
        content: 'Transaction successfully created',
        createdAt: 'Fri Nov 12 2021 03:30:27 GMT+0200 (Eastern European Standard Time)',
        messageId: 'message--0',
        onClose: () => { },
        options: { nzDuration: 3000, nzAnimate: true, nzPauseOnHover: true },
        state: 'leave',
        type: 'success',
    })
};

describe('AddTransactionComponent', () => {
    let component: AddTransactionComponent;
    let fixture: ComponentFixture<AddTransactionComponent>;

    let store: MockStore;
    let message: MockNzMessageService;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
            declarations: [AddTransactionComponent],
            imports: [FormsModule, ReactiveFormsModule],
            providers: [
                provideMockStore({
                    initialState: { transaction: initialState },
                    selectors: [
                        { selector: 'selectAllTransactions', value: transactions },
                        { selector: 'selectSearchId', value: id },
                        { selector: 'selectSearchRange', value: [startMonth, endMonth] },
                        { selector: 'selectTransactions', value: transactions },
                    ],
                }),
                { provide: NzMessageService, useClass: MockNzMessageService },
                {
                    provide: NG_VALUE_ACCESSOR,
                    multi: true,
                    useExisting: forwardRef(() => AddTransactionComponent),
                },
            ],
        }).compileComponents();
    }));

    beforeEach(() => {
        store = TestBed.inject(MockStore);
        fixture = TestBed.createComponent(AddTransactionComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('form should be valid', () => {
        component.addMetaGroup({ key: 'Key #1', value: '1' });
        component.amountValueCtrl.setValue(1.1);
        component.accountCtrl.setValue(AccountEnum.UBSGroup);
        component.amountCurrencyCtrl.setValue(CurrencyEnum.BTC);
        component.freePayCtrl.setValue(false);
        component.destinationCtrl.setValue(DestinationEnum.UA);
        fixture.detectChanges();
        expect(component.isValid).toBeTruthy();
    });

    it('should be added one item to meta group', () => {
        component.addMetaGroup({ key: 'Key #1', value: '1' });
        fixture.detectChanges();
        expect(component.addMetaGroup.length).toBeGreaterThan(0);
    });

    it('should be deleted one item from meta group from array', () => {
        component.addMetaGroup({ key: 'Key #1', value: '1' });
        component.addMetaGroup({ key: 'Key #2', value: '2' });
        fixture.detectChanges();
        expect(component.addMetaGroup.length).toBe(2);
        component.deleteMetaGroup(1);
        fixture.detectChanges();
        expect(component.addMetaGroup.length).toBe(1);
    });

    it('should be create new transaction', () => {
        component.addMetaGroup({ key: 'Key #1', value: '1' });
        component.accountCtrl.setValue(AccountEnum.UBSGroup);
        component.amountValueCtrl.setValue(2.2);
        component.amountCurrencyCtrl.setValue(CurrencyEnum.BTC);
        component.freePayCtrl.setValue(false);
        component.destinationCtrl.setValue(DestinationEnum.UA);
        fixture.detectChanges();
        expect(component.isValid).toBeTruthy();
    });

    it('form should be reset', () => {
        component.resetForm();
        fixture.detectChanges();
        expect(component.form.value).toBe({
            destination: DestinationEnum.UA,
            freePay: false,
            amount: {
                value: '',
                currency: CurrencyEnum.XTZ,
            },
            metaData: [],
            account: AccountEnum.UBSGroup,
        });
    });

});
