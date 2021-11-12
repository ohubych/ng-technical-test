import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { AddTransactionComponent } from './add-transaction.component';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { transactions, startMonth, endMonth, id } from '@app/modules/main/components/add-transaction/transaction.mock';
import { initialState } from '@app/modules/transactions/store/transaction.reducer';
import { AccountEnum, CurrencyEnum, DestinationEnum } from '@app-shared/enum';
import { NzMessageModule, NzMessageService } from 'ng-zorro-antd/message';
import { CUSTOM_ELEMENTS_SCHEMA, DebugElement, forwardRef, Injectable } from "@angular/core";
import { FormBuilder, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { HttpClientModule } from '@angular/common/http';
import { By } from '@angular/platform-browser';

@Injectable()
class MockNzMessageService {
    constructor() {}

    create() {
        return {
            content: 'Transaction successfully created',
            createdAt: 'Fri Nov 12 2021 03:30:27 GMT+0200 (Eastern European Standard Time)',
            messageId: 'message--0',
            onClose: () => { },
            options: { nzDuration: 3000, nzAnimate: true, nzPauseOnHover: true },
            state: 'leave',
            type: 'success',
        };
    }
};

describe('AddTransactionComponent', () => {
    let component: AddTransactionComponent;
    let fixture: ComponentFixture<AddTransactionComponent>;

    let store: MockStore;
    let message: MockNzMessageService;
    let debugElement: DebugElement;
    let storeSpy: any;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
            declarations: [AddTransactionComponent],
            imports: [
                BrowserAnimationsModule,
                HttpClientModule,
                NzLayoutModule,
                NzButtonModule,
                NzGridModule,
                NzMenuModule,
                NzFormModule,
                NzInputModule,
                NzInputNumberModule,
                NzSelectModule,
                NzTableModule,
                NzMessageModule,
                NzSwitchModule,
                NzIconModule,
                ReactiveFormsModule],
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
                {
                    provide: FormBuilder,
                    useValue: new FormBuilder(),
                },
            ],
        }).compileComponents();
    }));

    beforeEach(() => {
        store = TestBed.inject(MockStore);
        fixture = TestBed.createComponent(AddTransactionComponent);
        debugElement = fixture.debugElement;
        storeSpy = spyOn(store, 'dispatch').and.callThrough();
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('form should be valid', () => {
        const submitBtn = debugElement.query(By.css('button.submit-bth'));
        expect(submitBtn.nativeElement.getAttribute('disabled')).toBe('true');
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
        component.addMetaGroup({ key: 'Key #2', value: '2.1' });
        fixture.detectChanges();
        expect(component.metaDataArray.length).toBe(2);
        component.deleteMetaGroup(1);
        fixture.detectChanges();
        expect(component.metaDataArray.length).toBe(1);
    });

    it('should be create new transaction', () => {
        const submitBtn = debugElement.query(By.css('button.submit-bth'));
        component.addMetaGroup({ key: 'Key #1', value: '1' });
        component.accountCtrl.setValue(AccountEnum.UBSGroup);
        component.amountValueCtrl.setValue(2.2);
        component.amountCurrencyCtrl.setValue(CurrencyEnum.BTC);
        component.freePayCtrl.setValue(false);
        component.destinationCtrl.setValue(DestinationEnum.UA);
        fixture.detectChanges();
        expect(component.isValid).toBeTruthy();
        expect(submitBtn.nativeElement.getAttribute('disabled')).toBe(null);
    });

    it('form should be reset', () => {
        component.resetForm();
        fixture.detectChanges();
        expect(component.form.value).toEqual({
            account: AccountEnum.UBSGroup,
            amount: {
                value: '',
                currency: CurrencyEnum.XTZ,
            },
            freePay: false,
            destination: DestinationEnum.CH,
            metaData: [],
        });
    });

    it('form and form controls should be created', () => {
        component.ngOnInit();
        expect(component.form.controls).toBeTruthy();
        expect(component.accountCtrl).toBeTruthy();
        expect(component.amountGroup).toBeTruthy();
        expect(component.freePayCtrl).toBeTruthy();
        expect(component.destinationCtrl).toBeTruthy();
        expect(component.metaDataArray).toBeTruthy();
    });


    it('should create new transaction and clear form', () => {
        component.create();
        fixture.detectChanges();

        expect(storeSpy).toHaveBeenCalled();
        expect(component.form.value).toEqual({
            account: AccountEnum.UBSGroup,
            amount: {
                value: '',
                currency: CurrencyEnum.XTZ,
            },
            freePay: false,
            destination: DestinationEnum.CH,
            metaData: [],
        });
    });

});
