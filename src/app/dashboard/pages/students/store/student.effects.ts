import { Course } from './../../courses/models/index';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap, take } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { StudentActions } from './student.actions';
import { HttpClient } from '@angular/common/http';
import { StudentWithCourse } from '../models';
import { enviroment } from 'src/enviroments/enviroment';


@Injectable()
export class StudentEffects {

  loadStudents$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(StudentActions.loadStudents),
      concatMap(() =>
        /** An EMPTY observable only emits completion. Replace with your own observable API request */
        this.getStudentsFromDB().pipe(
          map(data => StudentActions.loadStudentsSuccess({ data })),
          catchError(error => of(StudentActions.loadStudentsFailure({ error }))))
      )
    );
  });

  loadCourseOptions$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(StudentActions.loadCourseOptions),
      concatMap(() =>
        this.getCourseOptions().pipe(
          map(data => StudentActions.loadCourseOptionsSuccess({ data })),
          catchError(error => of(StudentActions.loadCourseOptionsFailure({ error }))))
      )
    );
  });

  constructor(private actions$: Actions, private httpClient: HttpClient) {}

  private getStudentsFromDB(): Observable<StudentWithCourse[]> {
    return this.httpClient.get<StudentWithCourse[]>(enviroment.baseApiUrl + '/students?_expand=course')
  }

  private getCourseOptions(): Observable<Course[]> {
    return this.httpClient.get<Course[]>(enviroment.baseApiUrl + '/courses')
  }

}
