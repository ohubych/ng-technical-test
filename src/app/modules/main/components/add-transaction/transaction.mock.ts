import { Transaction } from '@app/modules/transactions/store/transaction.model';
import { CurrencyEnum, DestinationEnum } from '@app-shared/enum';
import moment from 'moment';

export const id = 'tekfkx1ndnd2';

export const transaction1: Transaction = {
    id,
    date: new Date(),
    destination: DestinationEnum.UA,
    freePay: true,
    amount: {
        value: 1.1,
        currency: CurrencyEnum.XTZ,
    },
    metaData: [
        {
            key: 'Name key',
            value: 'Value 1'
        }
    ],
    account: 'Account name'
};

export const transaction2: Transaction = {
    id: 'dnd2kfkx1nte',
    date: new Date(),
    destination: DestinationEnum.CH,
    freePay: false,
    amount: {
        value: 2.18,
        currency: CurrencyEnum.BTC,
    },
    metaData: [
        {
            key: 'Name key #1',
            value: 'Value #1'
        },
        {
            key: 'Name key #2',
            value: 'Value #2'
        }
    ],
    account: 'Account name'
};

export const startMonth = moment().startOf('month').toDate();
export const endMonth = moment().endOf('month').toDate();

export const transactions = [ transaction1, transaction2 ];
