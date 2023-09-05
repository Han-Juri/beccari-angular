import { createFeature, createReducer, on } from '@ngrx/store';
import { ComissionActions } from './comission.actions';
import { ComissionWithCourse } from '../models';
import { Course } from '../../courses/models';

export const comissionFeatureKey = 'comission';

export interface State {
  data: ComissionWithCourse[];
  error: unknown;
  courseOptions: Course[]
}

export const initialState: State = {
  data: [],
  error: null,
  courseOptions: []
};

export const reducer = createReducer(
  initialState,
  on(ComissionActions.loadComissions, state => state),
  on(ComissionActions.loadComissionsSuccess, (state, action) => {
    return {
      ...state,
      data: action.data
    }
  }),
  on(ComissionActions.loadComissionsFailure, (state, action) => {
    return{
      ...state,
      error:action.error
    }
  }),

  on(ComissionActions.loadCourseOptions, (state) => state),
  on(ComissionActions.loadCourseOptionsSuccess, (state, action) => {
    return {
      ...state,
      courseOptions: action.data
    }
  })
);

export const comissionFeature = createFeature({
  name: comissionFeatureKey,
  reducer,
});

