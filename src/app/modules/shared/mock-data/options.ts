import { SelectOption } from '@app-shared/models';
import { AccountEnum, DestinationEnum, CurrencyEnum } from '@app-shared/enum';

export const accountOptions: SelectOption[] = [
    {
        value: AccountEnum.UBSGroup,
        label: 'UBS Group AG',
    },
    {
        value: AccountEnum.CreditSuisseGroup,
        label: 'Credit Suisse Group AG',
    },
];

export const currencyOptions: SelectOption[] = [
    {
        value: CurrencyEnum.BTC,
        label: CurrencyEnum.BTC,
    },
    {
        value: CurrencyEnum.XTZ,
        label: CurrencyEnum.XTZ,
    },
    {
        value: CurrencyEnum.ETH,
        label: CurrencyEnum.ETH,
    },
];

export const destinationOptions: SelectOption[] = [
    {
        value: DestinationEnum.CH,
        label: 'Switzerland',
    },
    {
        value: DestinationEnum.UA,
        label: 'Ukraine',
    },
];
