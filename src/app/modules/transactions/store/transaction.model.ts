import { CurrencyEnum, DestinationEnum } from '@app-shared/enum';

export interface Transaction {
    id: string;
    date: Date;
    account: string;
    amount: {
        value: number;
        currency: CurrencyEnum;
    };
    destination: DestinationEnum;
    freePay: boolean;
    metaData: { key:string; value: string; }[];
}
