import { createSelector } from '@ngrx/store';

import { ExampleFeatureState } from '../state/example-feature.state';

const selectExampleFeatures = (state: ExampleFeatureState) => state;

export const selectExampleFeatureList = createSelector(
    selectExampleFeatures,
    (state: ExampleFeatureState) => state.example
);
