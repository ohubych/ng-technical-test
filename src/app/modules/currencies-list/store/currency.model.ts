import { CurrencyEnum, DestinationEnum } from '@app-shared/enum';

export interface Currency {
    id: string;
    date: Date | string;
    account: string;
    amount: {
        value: number;
        currency: CurrencyEnum;
    };
    destination: DestinationEnum;
    freePay: boolean;
    metaData: { key:string; value: string; }[];
}
