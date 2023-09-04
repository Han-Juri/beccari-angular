import { Course } from './../../courses/models/index';
import { createFeature, createReducer, on } from '@ngrx/store';
import { StudentActions } from './student.actions';
import { StudentWithCourse } from '../models';

export const studentFeatureKey = 'student';

export interface State {
  data: StudentWithCourse[];
  courseOptions: Course[];
  loading: boolean;
  error: unknown
}

export const initialState: State = {
  data: [],
  courseOptions: [],
  loading: false,
  error: null
};

export const reducer = createReducer(
  initialState,
  on(StudentActions.loadStudents, state => {
    return{
      ...state,
      loading: true,
    }
  }),

  on(StudentActions.loadStudentsSuccess, (state, action) => {
    return{
      ...state,
      data: action.data,
      loading: false
    }
  }),
  on(StudentActions.loadStudentsFailure, (state, action) => {
    return {
      ...state,
      error: action.error,
      loading: false
    }
  }),
  on(StudentActions.loadCourseOptions, (state) => state),
  on(StudentActions.loadCourseOptionsSuccess, (state, action) => {
    return {
      ...state,
      courseOptions: action.data
    }
  })
);

export const studentFeature = createFeature({
  name: studentFeatureKey,
  reducer,
});

