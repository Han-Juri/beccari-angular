import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap, take } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { ComissionActions } from './comission.actions';
import { HttpClient } from '@angular/common/http';
import { ComissionWithCourse } from '../models';
import { enviroment } from 'src/enviroments/enviroment';
import { CoursesService } from '../../courses/courses.service';
import { Course } from '../../courses/models';


@Injectable()
export class ComissionEffects {

  loadComissions$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(ComissionActions.loadComissions),
      concatMap(() =>
        this.getComissionsFromDB().pipe(
          map(data => ComissionActions.loadComissionsSuccess({ data })),
          catchError(error => of(ComissionActions.loadComissionsFailure({ error }))))
      )
    );
  });

  loadCourseOptions$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(ComissionActions.loadComissions),
      concatMap(() =>
        this.getCourseOptions().pipe(
          map(data => ComissionActions.loadCourseOptionsSuccess({ data })),
          catchError(error => of(ComissionActions.loadCourseOptionsFailure({ error }))))
      )
    );
  });


  constructor(private actions$: Actions, private httpClient: HttpClient) {}

  private getComissionsFromDB(): Observable<ComissionWithCourse[]> {
    return this.httpClient.get<ComissionWithCourse[]>(enviroment.baseApiUrl + '/comissions?_expand=course')
  }

  private getCourseOptions(): Observable<Course[]> {
    return this.httpClient.get<Course[]>(enviroment.baseApiUrl + '/courses')
  }
}
