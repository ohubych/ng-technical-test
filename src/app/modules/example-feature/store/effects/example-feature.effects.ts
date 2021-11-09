import { Injectable } from '@angular/core';
import { Actions } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { ExampleFeatureState } from '../state/example-feature.state';

@Injectable()
export class ExampleFeatureEffects {
    /* @Effect()
       getExampleFeature$ = this.actions$.pipe(); */

    constructor(private actions$: Actions, private _store: Store<ExampleFeatureState>) {}
}
