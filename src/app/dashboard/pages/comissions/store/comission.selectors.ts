import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromComission from './comission.reducer';

export const selectComissionState = createFeatureSelector<fromComission.State>(
  fromComission.comissionFeatureKey
);

export const selectComisions = createSelector(selectComissionState, (state) => state.data)

export const selectCourseOptions = createSelector(selectComissionState, (state) => state.courseOptions)