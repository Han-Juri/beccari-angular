import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { ComissionWithCourse } from '../models';
import { HttpErrorResponse } from '@angular/common/http';
import { Course } from '../../courses/models';

export const ComissionActions = createActionGroup({
  source: 'Comission',
  events: {
    'Load Comissions': emptyProps(),
    'Load Comissions Success': props<{ data: ComissionWithCourse[] }>(),
    'Load Comissions Failure': props<{ error: HttpErrorResponse }>(),

    'Load Course Options': emptyProps(),
    'Load Course Options Success': props<{ data: Course[] }>(),
    'Load Course Options Failure': props<{ error: HttpErrorResponse }>(),
  }
});
