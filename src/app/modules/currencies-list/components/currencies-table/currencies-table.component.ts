import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-currencies-table',
    templateUrl: './currencies-table.component.html',
    styleUrls: ['./currencies-table.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CurrenciesTableComponent implements OnInit {
    constructor() {
    }

    ngOnInit(): void {
    }
}
