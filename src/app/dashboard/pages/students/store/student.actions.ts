import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { StudentWithCourse } from '../models';
import { HttpErrorResponse } from '@angular/common/http';
import { Course } from './../../courses/models/index';

export const StudentActions = createActionGroup({
  source: 'Student',
  events: {
    'Load Students': emptyProps(),
    'Load Students Success': props<{ data: StudentWithCourse[] }>(),
    'Load Students Failure': props<{ error: HttpErrorResponse }>(),
    
    'Load Course Options': emptyProps(),
    'Load Course Options Success': props<{ data: Course[] }>(),
    'Load Course Options Failure': props<{ error: HttpErrorResponse }>(),

  }
});
