import { ChangeDetectionStrategy, Component, EventEmitter, OnDestroy, OnInit, Output } from "@angular/core";
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SubSink } from 'subsink';

@Component({
    selector: 'app-meta-data-form',
    templateUrl: './meta-data-form.component.html',
    styleUrls: ['./meta-data-form.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MetaDataFormComponent implements OnInit, OnDestroy {
    @Output() add: EventEmitter<{ key: string, value: string }> = new EventEmitter<{ key: string, value: string }>();
    public keyCtrl = new FormControl('', Validators.required);
    public valueCtrl = new FormControl('', Validators.required);
    public form = new FormGroup({
        key: this.keyCtrl,
        value: this.valueCtrl,
    }, { updateOn: 'blur' });
    private subs = new SubSink();

    constructor() {
    }

    ngOnInit(): void {
        this.subs.sink = this.form.valueChanges.subscribe(formValue => {
            if (this.form.valid) {
                this.add.emit(formValue);
                this.form.reset();
            }
        });
    }

    ngOnDestroy(): void {
        this.subs.unsubscribe();
    }
}
