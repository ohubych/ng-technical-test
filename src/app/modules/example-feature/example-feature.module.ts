import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { ExampleFeatureEffects } from './store/effects/example-feature.effects';
// Import { ExampleFeatureReducers } from './store/reducers/example-feature.reducers';

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        // StoreModule.forFeature('exampleFeature', ExampleFeatureReducers),
        EffectsModule.forFeature([ExampleFeatureEffects]),
    ],
})
export class ExampleFeatureModule {}
