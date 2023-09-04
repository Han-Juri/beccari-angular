import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromStudent from './student.reducer';

export const selectStudentState = createFeatureSelector<fromStudent.State>(
  fromStudent.studentFeatureKey
);

export const selectStudent = createSelector(selectStudentState, (state) => state.data)

export const selectCourseOptions = createSelector(selectStudentState, (state) => state.courseOptions)