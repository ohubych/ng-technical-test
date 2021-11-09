import { SelectOption } from '@app-shared/models';
import { Account, Destination, Currency } from '@app-shared/enum';

export const accountOptions: SelectOption[] = [
    {
        value: Account.UBSGroup,
        label: 'UBS Group AG',
    },
    {
        value: Account.CreditSuisseGroup,
        label: 'Credit Suisse Group AG',
    },
];

export const currencyOptions: SelectOption[] = [
    {
        value: Currency.BTC,
        label: Currency.BTC,
    },
    {
        value: Currency.XTZ,
        label: Currency.XTZ,
    },
    {
        value: Currency.ETH,
        label: Currency.ETH,
    },
];

export const destinationOptions: SelectOption[] = [
    {
        value: Destination.CH,
        label: 'Switzerland',
    },
    {
        value: Destination.UA,
        label: 'Ukraine',
    },
];
